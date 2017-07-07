class MirrorsController < ApplicationController
  load_and_authorize_resource

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

  def activities
    # Returns a summary of all activities of members
    @mirror = Mirror.find(params[:id])
    @mirror.members.map{ |m| [m.first_name, m.activity] }.to_h  # TODO: test
  end

  private

  def current_ability
    @current_ability ||= MirrorAbility.new(current_mirror)
  end
end
