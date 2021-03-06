class Abilities::MemberAbility
  include CanCan::Ability

  def initialize(member)
    member ||= Member.new

    can [
      :create,
      :show,
      :destroy,
      :location,
      :activity,
    ], Member, id: member.id

    can [
      :index,
    ], Member
  end
end
