Rails.application.routes.draw do
  root to: redirect('/events')

  get 'events', to: 'site#index'
  get 'events/new', to: 'site#index'
  get 'events/:id', to: 'site#index'
  get 'events/:id/edit', to: 'site#index'

  get 'notes', to: 'site#index'
  get 'notes/new', to: 'site#index'
  get 'notes/:id', to: 'site#index'
  get 'notes/:id/edit', to: 'site#index'

  get '/tick_tack_toes/index' => 'tick_tack_toes#index'

  namespace :api do
    resources :notes, only: [:index, :show, :create, :destroy, :update]
    resources :events, only: [:index, :show, :create, :destroy, :update]
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end