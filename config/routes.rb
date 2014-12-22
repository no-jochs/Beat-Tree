Rails.application.routes.draw do
  root 'tracks#index'
  
  resources :tracks do
    resources :comments
  end
  
  resources :artists do
    resources :comments
  end
  
  resources :comments

end
