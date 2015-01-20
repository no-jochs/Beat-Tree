class Api::UsersController < ApplicationController
  
  def index
    json = Neo4j::Session.query('MATCH ()-[r]->() RETURN r.added_by AS user, COUNT(r.added_by) as count ORDER BY count DESC LIMIT 10');
    render json: json, status: :ok
  end
  
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
  
  def show
    @user = User.find_by(username: params[:id])
    
    if @user
      @relcount = Neo4j::Session.query("MATCH (a:Track)-[r]->(b:Track) WHERE r.added_by = '#{@user.username}' RETURN COUNT(r)")
      @trackcount = Neo4j::Session.query("MATCH (a:Track) WHERE a.added_by = '#{@user.username}' RETURN COUNT(a)")
      @relationships = Neo4j::Session.query("MATCH (n:Track)-[r]->(n2) WHERE r.added_by = '#{@user.username}' RETURN startNode(r) AS startNode, endNode(r) AS endNode, type(r) as type")
      render "api/users/show"
    else
      render json: ["Not Found"], status: :not_found
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