class MirrorsController < ApplicationController
  before_action :authenticate_mirror!

  load_and_authorize_resource

  def index
    # render json: @mirrors
  end

  def show
    @activities = activities_hash
  end

  def create
    if @mirror.save
      render json: @mirror
    else
      error_response(@mirror)
    end
  end

  def destroy
    if @mirror.destroy
      render json: @mirror
    else
      error_response(@mirror)
    end
  end

  def activities
    # Returns a summary of all activities of members
    render json: activities_hash  # TODO: test
  end

  private

  def activities_hash
    @mirror.members.map{ |m| [m.first_name, m.activity] }.to_h
  end

  def current_ability
    @current_ability ||= Abilities::MirrorAbility.new(current_mirror)
  end
end
