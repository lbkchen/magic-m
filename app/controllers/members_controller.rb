class MembersController < ApplicationController

  def create
    if @member.save
      render json: @member
    else
      error_response @member
    end
  end

  private

  def members_parameters
    params.require(:member).permit()
  end
end
