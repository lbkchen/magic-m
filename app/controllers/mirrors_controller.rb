class MirrorsController < ApplicationController

  def create
    if @mirror.save
      render json: @mirror
    else
      error_response(@mirror)
    end
  end

  def destroy
    @mirror = Mirror.find(params[:id])
    if @mirror.destroy
      render json: @mirror
    else
      error_response(@mirror)
    end
  end

  private


end
