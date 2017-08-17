class Members::RegistrationsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, only: [:create]
  before_action :configure_account_update_params, only: [:update]

  respond_to :json
  skip_before_action :verify_authenticity_token

  # GET /resource/sign_up
  # def new
  #   super
  # end

  # POST /resource
  def create
    mirror = Mirror.find_by codename: sign_up_params[:mirror_codename]
    params[:member][:mirror_id] = mirror.id
    super
  end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  # def update
  #   super
  # end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_up_params
    devise_parameter_sanitizer.permit(
      :sign_up, keys: [:username,
                       :first_name,
                       :last_name,
                       :mirror_codename,
                       :mirror_password,
                       :mirror_id]
    )
  end

  # If you have extra params to permit, append them to the sanitizer.
  def configure_account_update_params
    devise_parameter_sanitizer.permit(
      :account_update, keys: [:username,
                              :first_name,
                              :last_name,
                              :mirror_codename,
                              :mirror_password,
                              :mirror_id]
    )
  end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end
end
