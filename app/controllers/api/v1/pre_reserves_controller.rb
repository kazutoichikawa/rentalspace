module Api
  module V1
    class PreReservesController < ApplicationController
      before_action :set_room, only: %i[create replace]

      def index
        pre_reserves = PreReserve.active
        if pre_reserves.exists?
          render json: {
            pre_reserve_ids: pre_reserves.map { |pre_reserve| pre_reserve.id },
            build: pre_reserves[0].build,
            count: pre_reserves.sum { |pre_reserve| pre_reserve[:count] },
            amount: pre_reserves.sum { |pre_reserve| pre_reserve.total_amount },
          }, status: :ok
        else
          render json: {}, status: :no_content
        end
      end

      def create
        if PreReserve.active.other_build(@reserved_room.build.id).exists?
          return render json: {
            existing_build: PreReserve.other_build(@reserved_room.build.id).first.build.name,
            new_build: room.find(params[:room_id]).build.name,
          }, status: :not_acceptable
        end

        def replace
          PreReserve.active.other_build(@oreserved_room.build.id).each do |pre_reserve|
            pre_reserve.update_attribute(:active, false)
        end
  
          set_pre_reserve(@oreserved_room)
  
          if @pre_reserve.save
            render json: {
              pre_reserve: @pre_reserve
            }, status: :created
          else
            render json: {}, status: :internal_server_error
          end
        end

        set_line_room(@reserved_room)

        if @line_room.save
          render json: {
            line_room: @line_room
          }, status: :created
        else
          render json: {}, status: :internal_server_error
        end
      end

      private

      def set_room
        @reserved_room = room.find(params[:room_id])
      end

      def set_line_room(reserved_room)
        if reserved_room.line_room.present?
          @line_room = reserved_room.line_room
          @line_room.attributes = {
            count: reserved_room.line_room.count + params[:count],
            active: true
          }
        else
          @line_room = reserved_room.build_line_room(
            count: params[:count],
            build: reserved_room.build,
            active: true
          )
        end
      end
    end
  end
end
