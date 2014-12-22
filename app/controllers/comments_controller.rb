class CommentsController < ApplicationController
  before_action :set_comment, only: [:show, :edit, :update, :destroy]
  before_action :set_track, only: [:new, :create, :destroy, :update]

  def new
    @comment = Comment.new
  end

  def create
    @comment = Comment.new(comment_params)

    respond_to do |format|
      if @comment.save
        # create a relationship with a created property between post and comment
        @track.comments.create(@comment, :created => Time.now.to_i)
        # alternative
        # @post.comments << @comment

        format.html { redirect_to @track, notice: 'Comment was successfully created.' }
        format.json { render action: 'show', status: :created, location: @comment }
      else
        format.html { render action: 'new' }
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @comment.update(comment_params)
        format.html { redirect_to @comment, notice: 'Comment was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    # it will automatically destroy the relationship as well
    @comment.destroy
    respond_to do |format|
      format.html { redirect_to @track }
      format.json { head :no_content }
    end
  end

  private

  def set_comment
    @comment = Comment.find(params[:id])
  end

  def set_track
    @track = Track.find(params[:track_id])
  end

  def comment_params
    params[:comment]
  end
end
