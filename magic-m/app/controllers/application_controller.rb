class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  rescue_from CanCan::AccessDenied do |exception|
    respond_to do |format|
      format.json { head :forbidden, content_type: 'text/html' }
      format.html { redirect_to root_url, notice: exception.message }
      format.js   { head :forbidden, content_type: 'text/html' }
    end
  end

  # def current_user
  #   current_mirror || current_member
  # end
  #
  # def current_ability
  #   @current_ability ||= Ability.new(current_user)  # FIXME: Could be redundant
  # end
end
