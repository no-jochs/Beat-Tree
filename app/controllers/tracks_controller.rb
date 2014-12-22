class TracksController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]
  
  def index
    @tracks = Track.all
  end
  
  def show
  end
  
  def new
    @track = Track.new
  end
  
  def edit
  end
  
  def create
    @track = Track.new(track_params)
    
    respond_to do |format|
      if @track.save
        format.html { redirect_to @track, notice: 'Track node was successfully created.'}
        format.json { render action: 'show', status: :created, location: @track }
      else
        format.html { render action: 'new' }
        format.json { render json: @track.errors, status: :unprocessable_entity }
      end
    end
  end
  
  def update
    respond_to do |format|
      if @track.update(track_params)
        format.html { redirect_to @track, notice: 'Track node was successfully updated.'}
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @track.errors, status: :unprocessable_entity }
      end
    end
  end
  
  def destroy
    @track.destroy
    respond_to do |format|
      format.html { redirect_to tracks_url }
      format.json { head :no_content }
    end
  end
  
  private
  
  def set_track
    @track = Track.find(params[:id])
  end
  
  def track_params
    params[:track]
  end
  
end
