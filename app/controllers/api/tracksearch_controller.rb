class Api::TracksearchController < ApplicationController
  
  def index
    searchstring = params[:q]
    
    @tracks = Neo4j::Session.query.match(t: :Track).where("t.track_name =~ \"(?i).*#{searchstring}.*\"").pluck(:t)
    
    render json: @tracks, status: :ok
  end
  
  private
  
  def query_params
  end
  
  def escape(string)
    string.gsub(/"/,"/'")
  end
end
