Rails.application.routes.draw do
  devise_for :mirrors, controllers: {
    passwords: 'mirrors/passwords',
    registrations: 'mirrors/registrations',
    sessions: 'mirrors/sessions'
  }
  devise_for :members, controllers: {
    passwords: 'members/passwords',
    registrations: 'members/registrations',
    sessions: 'members/sessions'
  }
  get 'home/index'
  root 'mirrors#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :mirrors do
    member do
      get 'activities'
    end
    resources :members
  end
end
