class MirrorAbility
  include CanCan::Ability

  def initialize(mirror)
    mirror ||= Mirror.new

    can [
      :create,
      :destroy,
      :activities,
    ], Mirror, id: mirror.id
  end
end
