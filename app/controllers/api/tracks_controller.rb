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
    @track = Track.new(track_params)
    
    if @track.save
      render json: @track, status: :ok
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
    params[:track]
  end
end
