Rails.application.routes.draw do
  root 'static_pages#index'
  
  namespace :api, defaults: { format: :json} do
    resources :tracks, only: [:create, :update, :index, :show, :destroy]
    resources :artists, only: [:create, :update, :index, :show, :destroy]
  end
  
  resources :tracks do
    resources :comments
  end
  
  resources :artists
  
  resources :comments

end
