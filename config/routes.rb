Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get 'dashboard/index'
  get 'angular_test' => 'angular_test#index'
  resources :customers, only: [ :index, :show ]
  root 'dashboard#index'
end
