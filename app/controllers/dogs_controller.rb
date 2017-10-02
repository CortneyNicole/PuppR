class DogsController < ApplicationController
  def new
  end

  def create
    @dog = Dog.new(dog_details)
    @user = User.first

    if @dog.save
      Favorite.create(dog_id: @dog.id, user_id: @user.id)
      p "This is save #{@dog}"
    else
      p @dog
    end
  end

  def index
    @user = User.first
    render json: @user.dogs
  end

  private

    def dog_details
      params.require(:dog).permit(:size, :name, :age, :photo, :description, :sex, :shelter_id)
    end
end