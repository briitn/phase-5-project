Rails.application.routes.draw do
  
  resources :drafts
  resources :tags
  resources :comments
  resources :posts
  resources :users
  post '/recommend', to: 'tags#recommend'
  post '/filtered', to: 'tags#tag_posts'
  post '/save', to: "sessions#save_blog"
  get '/getBlog', to: "sessions#get_saved_blog"
  get '/searched', to: 'sessions#search'
  get '/authors', to: "sessions#find_author"
  post '/posts/search', to: 'posts#search'
  get '/aBlog', to: 'posts#shoe'
  post "users/login", to: "sessions#create"
  get 'loggedin', to: "users#shoe"
  patch '/likes', to: "posts#update"
  patch '/views', to: "posts#update"
  patch '/posts', to: "posts#update"
  delete "/logout", to: "sessions#destroy"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
