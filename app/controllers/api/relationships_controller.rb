class Api::RelationshipsController < ApplicationController
  
  def show
    @startNode = Track.find_by(track_spotify_id: params[:id])
    @endNode = Track.find_by(track_spotify_id: params[:endNodeId])
    type = params[:type]
    
    if type == "SAMPLES"
      @rel = Track.query_as(:t)
                  .match("t-[r:SAMPLES]->(t2)")
                  .where("t.track_spotify_id = '#{@startNode.track_spotify_id}' AND t2.track_spotify_id = '#{@endNode.track_spotify_id}'")
                  .pluck(:r).first
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
  
  def update
    puts "here is yr params: #{params}"
    @startNode = Track.find_by(track_spotify_id: params[:id])
    @endNode = Track.find_by(track_spotify_id: params[:endNodeId])
    type = params[:type]
    @rel = Track.query_as(:t)
                .match("t-[r:#{type}]->(t2)")
                .where("t.track_spotify_id = '#{@startNode.track_spotify_id}' AND t2.track_spotify_id = '#{@endNode.track_spotify_id}'")
                .pluck(:r).first
    
    if @rel.added_by != current_user.username
      render json: ['Not authorized'], status: :not_authorized
      return
    end
    
    if type == "SAMPLES"
      if @rel.update(relationship_params)
        redirect_to "#relationship/type=SAMPLES&startNodeId=#{@startNode.track_spotify_id}&endNodeId=#{@endNode.track_spotify_id}"
      else
        render json: @rel.errors.full_messages, status: :unprocessable_entity
      end
    elsif type == "COVERS"
      @rel.notes = relationship_params[:notes]
      if @rel.save
        redirect_to "#relationship/type=COVERS&startNodeId=#{@startNode.track_spotify_id}&endNodeId=#{@endNode.track_spotify_id}"
      else
        render json: @rel.errors.full_messages, status: :unprocessable_entity
      end
    elsif type == "REMIXES"
      @rel.notes = relationship_params[:notes]
      if @rel.save
        redirect_to "#relationship/type=COVERS&startNodeId=#{@startNode.track_spotify_id}&endNodeId=#{@endNode.track_spotify_id}"
      else
        render json: @rel.errors.full_messages, status: :unprocessable_entity
      end
    else
      render json: ['Not Found'], status: :conflict
    end
  end
  
  private
  
  def relationship_params
    params.require(:relationship).permit(:sample_type, :added_by, :notes, :significance, :child_url,
                                         :parent_url, :child_start_time, :child_start_time, :parent_start_time)
  end
  
end