class Api::TracksController < ApplicationController
  
  def index
    @tracks = Track.all
    render json: @tracks
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
    
    puts "OH HAI!"
    puts "HERE IS YR TRACK PARAMS:"
    puts track_params
    puts "HERE IS YR tauParams:"
    puts tauParams
    
    if @track.update(track_params)
      if tauParams
        if tauParams[:new_samples]
          associatedID = tauParams[:new_samples]
          associatedTrack = Track.find_by_spotify_id(associatedID)
          @track.samples << associatedTrack
          render json: [@track, associatedTrack], status: :expectation_failed
        else
          render json: @track, status: :expectation_failed
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