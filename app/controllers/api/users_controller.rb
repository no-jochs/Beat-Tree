class Api::UsersController < ApplicationController
  
  def create
    @user = User.new(user_params)
    
    if @user.save && user_params[:password] == params[:password_confirmation]
      render json: @user, status: :ok
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  def show
    @user = User.find_by(username: params[:id])
    
    if @user
      render json: @user, status: :ok
    else
      render json: ["User not found."], status: :not_found
    end
  end
  
  def update
    @user = User.find_by(username: params[:id])
    
    if @user == current_user
      if @user.update(user_params)
        render json: @user, status: :ok
      else
        render json: @user.errors.full_messages, status: :unprocessable_entity
      end
    else
      render json: ["Not permitted."], status: :forbidden
    end
  end
  
  def destroy
    @user = User.find_by(username: params[:id])
    
    if @user == current_user
      render json: @user, status: :ok
    else
      render json: ["Not permitted."], status: :forbidden
    end
  end
  
  private
  
  def user_params
    params.require(:user).permit(:username, :password, :email, :fname, :lname, :location, :img_url)
  end
end