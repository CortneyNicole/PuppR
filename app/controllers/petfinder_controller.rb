class PetfinderController < ApplicationController

  def index
    pets = PetFinderAdapter.new
    render json: pets.custom_search(params)
  end

  # need to save dog from carousel
  def favorites
    @user = User.first

  end

end
