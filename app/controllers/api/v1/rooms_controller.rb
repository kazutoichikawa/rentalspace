module Api
  module V1
    class RoomsController < ApplicationController
      def index
        build = Build.find(params[:build_id])
        rooms = build.rooms

        render json: {
          rooms: rooms
        }, status: :ok
      end
    end
  end
end
