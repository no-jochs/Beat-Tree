class SessionsController < ApplicationController
  
  def new
    @user = User.new
    
    render "new"
  end
  
  def create
    @user = User.find_by_credentials(
      user_params[:username],
      user_params[:password]
    )
    
    if @user
      login!(@user)
      redirect_to "https://www.beat-tree.com/#feed"
    else
      flash[:errors] = ["Invalid Username or Password"]
      render "new"
    end
    
  end
  
  def destroy
    logout!
    redirect_to "https://www.beat-tree.com"
  end
  
  private
  
  def user_params
    params.require(:user).permit(:username, :password)
  end
  
end