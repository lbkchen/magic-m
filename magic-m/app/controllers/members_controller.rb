class MembersController < ApplicationController
  before_action :authenticate_member!, except: [:index], if: :mirror_viewable?
  before_action :redirect_back, only: [:index], unless: :mirror_viewable?

  skip_before_action :verify_authenticity_token

  load_and_authorize_resource

  def index
    # render json: @members
    @members = Member.where mirror_id: params[:mirror_id]
  end

  def create
    if @member.save
      render json: @member
    else
      error_response @member
    end
  end

  def destroy
    if @member.destroy
      render json: @member
    else
      error_response(@member)
    end
  end

  def location
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
    params.require(:member).permit(:activity)
  end

  def current_ability
    @current_ability ||= Abilities::MemberAbility.new(current_member)
  end

  def mirror_viewable?
    logged_into_this_member = member_signed_in? &&
                              current_member.mirror_id == params[:mirror_id].to_i
    logged_into_this_mirror = mirror_signed_in? &&
                              params[:mirror_id].to_i == current_mirror.id
    logged_into_this_member || logged_into_this_mirror
  end

  def redirect_back
    redirect_to mirrors_path
  end
end
