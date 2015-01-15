class UsersController < ApplicationController
  
  def new
    @user = User.new
    
    render 'new'
  end
  
  def create
    @user = User.new(user_params)
    
    if @user.save
      login!(@user)
      redirect_to "http://www.beat-tree.com/#welcome"
    else
      puts @user.errors.full_messages
      flash[:errors] = @user.errors.full_messages
      render 'new'
    end
  end
  
  private
  
  def user_params
    params.require(:user).permit(:username, :password, :email, :fname, :lname, :location, :img_url, :password_confirmation)
  end
end
