class TagsController < ApplicationController
    skip_before_action :authorize, only: [:index, :tag_posts, :recommend]
 
    def create
hold_tags=params[:tags]
post=Post.find(session[:post_id])
hold_tags.each do |t|
    tag=Tag.find_by(name:t)

    if tag
        post.tags << tag

    else

        post.tags.create(name: t, views:0)
    end
 
  
end
user=User.find(params[:id])
session[:author_id]=user.id
render json: user
    end

    def index
      
tag= Tag.all.order(created_at: :desc)
render json: tag
    end

    def tag_posts
        tag=Tag.find_by(name: params[:name])
        session[:tag_name]=params[:name]
        render json: tag.posts
     
    end

    def recommend
        if session[:tag_name] && !session[:author_id]
            tag=Tag.find_by(name: session[:tag_name])
            render json: tag.posts.shuffle()
     
        elsif session[:author_id]
       user=User.find(session[:author_id])
         render json: user.posts.shuffle()

        else 
            tag=Tag.find(rand(1..Tag.all.length))
        end
   
       
    end
  
end
