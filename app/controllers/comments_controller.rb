class CommentsController < ApplicationController
    skip_before_action :authorize, only: [:index]
    def create
       comment= @current_user.comments.create!(comments_params)
        render json: comment
    end
def index
    comments=Comment.where(post_id: session[:post_id])
    render json: comments
end

    private
    def comments_params
        params.permit(:user_id, :post_id, :comment)
      
    end
end
