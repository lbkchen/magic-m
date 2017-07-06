class MembersController < ApplicationController

  def create
    if @member.save
      render json: @member
    else
      error_response @member
    end
  end

  def destroy
    @member = Member.find(params[:id])
    if @member.destroy
      render json: @member
    else
      error_response(@member)
    end
  end

  def location
    @member = Member.find(params[:id])
    if @member.update(members_location_parameters)
      render json: @member
    else
      error_response @member
    end
  end

  def activity
    Member.find(params[:id]).activity
  end

  private

  def members_parameters
    params.require(:member).permit()  # FIXME
  end

  def members_location_parameters
    params.require(:member).permit(:lat, :lon)
  end

end
