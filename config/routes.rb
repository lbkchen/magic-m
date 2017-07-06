Rails.application.routes.draw do
  devise_for :mirrors
  devise_for :members
  get 'home/index'
  root 'home#index'
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :mirrors do
    resources :members
  end
end
