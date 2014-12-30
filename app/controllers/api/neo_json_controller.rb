class NeoJsonController < ApplicationController
  
  def index
    render :json ['Not Implemented'], status: :not_implemented
  end
  
  private
  
  def query_params
    params.require(:query_type).permit(:node)
  end
  
end
