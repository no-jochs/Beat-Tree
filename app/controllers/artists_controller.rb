class ArtistsController < ApplicationController
  before_action :set_artist, only: [:show, :edit, :update, :destroy]
  
  def index
  end
  
  def show
  end
  
  def new
    @artist = Artist.new
  end
  
  def create
    @artist = Artist.new(artist_params)
    
    respond_to do |format|
      if @artist.save
        format.html { redirect_to @artist, notice: 'Artist node sucessfully created' }
        format.json { render action: 'show', status: :created, location: @artist }
      else
        format.html { render action: 'new' }
        format.json { render json: @artist.errors, status: :unprocessable_entity }
      end
    end
  end
  
  def update
    respond_to do |format|
      if @artist.update(artist_params)
        format.html { redirect_to @artist, notice: 'Artist node sucessfullly updated' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end
  
  def edit
  end
  
  def destroy
    @artist.destroy
    respond_to do |format|
      format.html { redirect_to artists_url }
      format.json { head :no_content }
    end
  end
  
  private
  
  def set_artist
    @artist = Artist.find(params[:id])
  end
  
  def artist_params
    params[:artist]
  end

end