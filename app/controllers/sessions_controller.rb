class SessionsController < ApplicationController
    skip_before_action :authorize, only: [:search, :create, :find_author] 

    def create 
        user= User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            session[:user_id]= user.id
 
            render json: user
        else
            render json: {errors: ["Invalid username or password"]}, status: :unauthorized
        end
    end
def search 

if session[:tag_name]
    tag=Tag.find_by(name: session[:tag_name])
        
    render json: tag.posts
elsif session[:post_title]

title= session[:post_title]
    posts=Post.all
    post= posts.where("title LIKE ?", "%" + session[:post_title]+ "%")
 
    render json: post
end
end
def destroy
    session.delete :user_id
    head :no_content
end


def find_author
    user=User.find(session[:author_id])

    render json: user
end
end
