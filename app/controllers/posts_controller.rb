class PostsController < ApplicationController
    skip_before_action :authorize, only: [:index, :search, :shoe, :update]
    def create
        session.delete :blog
        post=@current_user.posts.create!(post_params)
            session[:post_id]=post.id
            session[:author_id]=@current_user.id
             
               message = "please follow these instructions strictly: generate topics that are only one word long for this blog and PLEASE separate them with commas and do not number them: #{params[:blog]} "
               chatbot = Chatbot.new('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')
               response = chatbot.respond_to(message)

            arr=response.dig("choices", 0, "message", "content").split(',') 
          
               render json: {:post=>post, :response=>arr}
        
           end;

def index
    session.delete :blog
   if !session[:tag_name]
     session[:tag_name]='Ruby'
   end

posts=Post.all
        render json: posts


end

def update

    session.delete :blog
    post=Post.find(params[:id])
    session[:author_id]=post.user.id;
    session[:page_views]=1
    session[:post_id]=post.id
    if session[:tag_name]
    session.delete :tag_name
    end
if params[:likes]
    post.update(likes: post.likes+1)
    render json: post
elsif params[:views]
    
   post.update(views: post.views+1)
    posts=Post.all.order(likes: :desc)
   
    render json: post

end
if params[:tag]
    session[:tag_name]=params[:tag]

 
end
if params[:blog]

  user=User.find_by(id: session[:user_id]);

   new_post= post.update!(blog: params[:blog],title: params[:title]);
  
    render json: user
end

end
def search
    posts=Post.all
    session[:post_title]=params[:title]

  post= posts.where("title LIKE ?", "%" + session[:post_title]+ "%")
 
   render json: post
 
end
def show
   
    session.delete :blog
session[:post_id]=params[:id]
end
def shoe
    session.delete :blog
    post=Post.find(session[:post_id])
    if post.tags.length!=0
    session[:tag_name]=post.tags.first.name
    else
        session[:tag_name]="Ruby"
    end
    render json: post

end 

def destroy
    post=Post.find(params[:id])
  
    post.destroy

    user=User.find(session[:user_id])
    render json: user
  
  end
private
 def post_params
       params.permit(:user_id, :blog, :likes, :title, :views)
    end
       
end