class Api::TracksController < ApplicationController
  
  def index
    @tracks = Track.all
    render json: @tracks
  end
  
  def show
    @track = Track.find(params[:id])
    render json: @track
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
end
