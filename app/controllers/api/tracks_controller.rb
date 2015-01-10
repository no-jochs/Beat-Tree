class Api::TracksController < ApplicationController
  
  def index
    @tracks = Track.query_as(:t).where("t.created_at > #{Time.now.to_i - 60*60*3}").return(:t).limit(10)
    render json: @tracks, status: :ok
  end
  
  def show
    if params[:id] == "db_check"
      @track = Track.where(
        track_spotify_id: params[:track_spotify_id]
      ).first
      if @track
        render json: @track, status: :ok
      else
        render json: ["Track Does Not Exist"], status: :not_found
      end
    else
      @track = Track.find(params[:id])
      if @track
        render "api/tracks/show", status: :ok
      else
        render json: ["Track Does Not Exist"], status: :not_found
      end
    end
    
  end
  
  def update
    @track = Track.find(params[:id])
    
    if @track.update(track_params)
      if tauParams
        if tauParams[:new_samples]
          associatedID = tauParams[:new_samples]
          associatedTrack = Track.find_by_spotify_id(associatedID)
          @sample = Samples.new
          @sample.from_node = @track
          @sample.to_node = associatedTrack
          @sample.added_by = current_user.username
          @sample.save
          render "api/tracks/show", status: :ok
        elsif tauParams[:new_covers]
          associatedID = tauParams[:new_covers]
          associatedTrack = Track.find_by_spotify_id(associatedID)
          @cover = Covers.new
          @cover.from_node = @track
          @cover.to_node = associatedTrack
          @cover.added_by = current_user.username
          @cover.save
          render "api/tracks/show", status: :ok
        elsif tauParams[:new_remixes]
          associatedID = tauParams[:new_remixes]
          associatedTrack = Track.find_by_spotify_id(associatedID)
          @remixes = Remixes.new
          @remixes.from_node = @track
          @remixes.to_node = associatedTrack
          @remixes.added_by = current_user.username
          @remixes.save
          render "api/tracks/show", status: :ok
        else
          render json: ['There was an error with your parameters'], status: :bad_request
        end
      else
        render json: @track, status: :ok
      end
    else
      render json: @track.errors, status: :unprocessable_entity
    end
    
  end
  
  def create
    @track = Track.new(track_params)
    
    if @track.save
      render json: @track, status: :created
    else
      render json: @track.errors, status: :unprocessable_entity
    end
    
  end
  
  def destroy
    @track = Track.find(track_params)
    @track.destroy!
    render json: @track, status: :no_content
  end
  
  def edit
    @track = Track.find(params[:id])
    
    if @track.update(track_params)
      render json: @track, status: :accepted
    else
      render json: @track, status: :unprocessable_entity
    end
    
  end
  
  private
  
  def track_params
    params.permit(:track_spotify_id, :track_name, :track_number, :track_preview_url, :track_spotify_uri, :track_popularity, :track_href, :track_external_url, :track_duration_ms, :artist_name, :artist_spotify_id, :artist_spotify_href, :artist_href, :album_name, :album_spotify_id, :album_spotify_uri, :album_l_image, :album_m_image, :album_s_image, :album_href)
  end
  
  def tauParams
    params.permit(:new_samples, :new_covers, :new_remixes)
  end
  
end