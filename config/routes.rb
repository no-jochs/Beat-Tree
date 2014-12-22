Rails.application.routes.draw do
  root 'tracks#index'
  
  resources :tracks do
    resources :comments
  end
  
  resources :artists
  
  resources :comments

end
