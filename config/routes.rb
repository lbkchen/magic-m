Rails.application.routes.draw do
  devise_for :mirrors, controllers: {
    passwords: 'mirrors/passwords',
    registrations: 'mirrors/registrations'
  }
  devise_for :members, controllers: {
    passwords: 'members/passwords',
    registrations: 'members/registrations'
  }
  get 'home/index'
  root 'home#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :mirrors do
    resources :members
  end
end
