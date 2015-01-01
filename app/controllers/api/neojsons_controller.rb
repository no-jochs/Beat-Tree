class Api::NeojsonsController < ApplicationController
  
  def show
    if params[:query_type] == 'predandprog'
      # json2 = Neo4j::Session.query("MATCH (a:Track)")
      json = Neo4j::Session.query("MATCH (n:Track)-[r]-(n2:Track) WHERE n.track_spotify_id = '#{params[:node_id]}' RETURN type(r) AS type, startNode(r) AS startNode, endNode(r) as endNode")
      render json: json, status: :ok
    else
      render json: ['Not Implemented'], status: :not_implemented
    end
  end
  
  private
  
  def query_params
    params.require(:query_type, :node_id)
  end
  
end
