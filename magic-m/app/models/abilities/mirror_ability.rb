class Abilities::MirrorAbility
  include CanCan::Ability

  def initialize(mirror)
    mirror ||= Mirror.new

    can [
      :show, 
      :create,
      :destroy,
      :activities,
    ], Mirror, id: mirror.id

    can [
      :index,
    ], Mirror

    can [
      :index,
    ], Member, mirror_id: mirror.id
  end
end
