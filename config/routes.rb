Rails.application.routes.draw do
  resources :users

  root 'static_pages#home'
  get 'johnochs', to: 'static_pages#johnochs'
  
  namespace :api, defaults: { format: :json} do
    resources :tracks, only: [:create, :update, :index, :show, :destroy]
    resources :artists, only: [:create, :update, :index, :show, :destroy]
    resources :tracksearch, only: [:index]
    resource :neojson, only: [:show]
    resources :users, only: [:create, :show, :update, :destroy]
    resource :session, only: [:create, :destroy]
    resources :relationships, only: [:index, :update, :destroy]
  end
  
  resources :tracks do
    resources :comments
  end
  
  resources :users, only: [:create, :new, :destroy]
  resource :session, only: [:new, :create, :destroy]
  resources :artists
  resources :stats, only: [:index]
  
  resources :comments

end
