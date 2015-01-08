class Api::RelationshipsController < ApplicationController
  
  def index
    @startNode = Track.find_by(track_spotify_id: params[:startNodeId])
    @endNode = Track.find_by(track_spotify_id: params[:endNodeId])
    type = params[:type]
    
    if type == "SAMPLES"
      @rel = Track.query_as(:t).match("t-[r:SAMPLES]->(t2)").where("t.track_spotify_id = '#{@startNode.track_spotify_id}' AND t2.track_spotify_id = '#{@endNode.track_spotify_id}'").pluck(:r).first
      if @startNode && @endNode && @rel
        render 'api/relationships/relationship', status: :ok
      else
        render json: ['Not Found'], status: :not_found
      end
    elsif type == "COVERS"
      @rel = Track.query_as(:t).match("t-[r:COVERS]->(t2)").where("t.track_spotify_id = '#{@startNode.track_spotify_id}' AND t2.track_spotify_id = '#{@endNode.track_spotify_id}'").pluck(:r).first
      if @startNode && @endNode && @rel
        render 'api/relationships/relationship', status: :ok
      else
        render json: ['Not Found'], status: :not_found
      end
    elsif type == "REMIXES"
      @rel = Track.query_as(:t).match("t-[r:REMIXES]->(t2)").where("t.track_spotify_id = '#{@startNode.track_spotify_id}' AND t2.track_spotify_id = '#{@endNode.track_spotify_id}'").pluck(:r).first
      if @startNode && @endNode && @rel
        render 'api/relationships/relationship', status: :ok
      else
        render json: ['Not Found'], status: :not_found
      end
    else
      render json: ['Not Found'], status: :not_found
    end
  end
  
end