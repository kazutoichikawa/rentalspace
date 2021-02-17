module Api
  module V1
    class BuildsController < ApplicationController
      def index
        builds = Build.all

        render json: {
          builds: builds
        }, status: :ok
      end
    end
  end
end
