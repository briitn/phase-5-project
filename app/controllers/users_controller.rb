class UsersController < ApplicationController
  skip_before_action :authorize, only: [:create, :index, :show]
    def create
        user=User.create!(user_params)
        session[:user_id] = user.id 
        render json: user, status: :created
    end
    def index
        user= User.all 
        render json: user
      end
      def show
      
          user=User.find(params[:id])
          session[:author_id]=user.id
          render json: user
        
      end

      def shoe
user=User.find(session[:user_id])
render json: user
      end
    private
def user_params
  params.permit(:username, :password, :bio, :image_url) 
end
end
