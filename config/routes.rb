Rails.application.routes.draw do
  root 'static_pages#index'
  
  resources :tracks do
    resources :comments
  end
  
  resources :artists
  
  resources :comments

end
