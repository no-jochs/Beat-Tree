class Api::SessionsController < ApplicationController
  
  def create
    @user = User.find_by_credentials(
      params[:username],
      params[:password]
    )
    
    if @user
      login!(@user)
      redirect_to "http://www.beat-tree.com/#feed"
    else
      render json: ["Invalid username or password."], status: :unauthorized
    end
    
  end
  
  def destroy
    logout!
    render json: ["Logged out."], status: :ok
  end
  
end
