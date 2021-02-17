module Api
  module V1
    class ReservesController < ApplicationController
      def create
        posted_pre_reserves = PreReserve.where(id: params[:pre_reserve_ids])
        reserve = Reseve.new(
          build_id: posted_pre_reserves.first.build_id,
          total_price: total_price(posted_pre_reserves),
        )
        if reserve.save_with_update_pre_reserves!(posted_pre_reserves)
          render json: {}, status: :no_content
        else
          render json: {}, status: :internal_server_error
        end
      end

      private

      def total_price(posted_pre_reserves)
        posted_pre_reserves.sum {|pre_reserve| pre_reserve.total_amount }
      end
    end
  end
end
