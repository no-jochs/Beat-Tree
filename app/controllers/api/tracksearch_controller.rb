class Api::TracksearchController < ApplicationController
  
  def index
    @tracks = Neo4j::Session.query.match(t: :Track).where(
      "t.track_name =~ \"(?i).*#{query_params[:q]}.*\""
      ).pluck(:t)
    
    render json: @tracks, status: :ok
  end
  
  private
  
  def query_params
    params.permit(:q)
  end
end
