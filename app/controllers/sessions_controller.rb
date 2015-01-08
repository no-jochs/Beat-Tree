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
      redirect_to "http://localhost:3000/#feed"
    else
      flash[:errors] = ["Invalid Username or Password"]
      render "new"
    end
    
  end
  
  def destroy
    logout!
    render json: "Logged out.", status: :ok
  end
  
  private
  
  def user_params
    params.require(:user).permit(:username, :password)
  end
  
end