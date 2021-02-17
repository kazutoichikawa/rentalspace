Rails.application.routes.draw do
  devise_for :users
  namespace :api do
    namespace :v1 do
      resources :admins
      resources :builds do
        resources :rooms, only: %i[index]
      end
      resources :pre_reserves, only: %i[index create]
      put 'pre_reserves/replace', to: 'pre_reserves#replace'
      resources :reserves, only: %i[create]
    end
  end
end
