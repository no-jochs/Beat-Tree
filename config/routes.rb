Rails.application.routes.draw do
  resources :users

  root 'static_pages#home'
  get 'johnochs', to: 'static_pages#johnochs'
  get 'learnmore', to: 'static_pages#learnmore'
  
  namespace :api, defaults: { format: :json} do
    resources :tracks, only: [:create, :update, :index, :show, :destroy]
    resources :tracksearch, only: [:index]
    resource :neojson, only: [:show]
    resources :users, only: [:create, :show, :update, :destroy]
    resource :session, only: [:create, :destroy]
    resources :relationships, only: [:show, :update, :destroy]
  end
  
  
  resources :users, only: [:create, :new, :destroy]
  resource :session, only: [:new, :create, :destroy]
  resources :stats, only: [:index]

end
