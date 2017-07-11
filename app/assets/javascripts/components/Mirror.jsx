class Mirror extends React.Component {

  constructor(props) {
    super(props);

    this.ACTIVITIES = [
      "home",
      "work",
      "school",
      "groceries",
      "shopping",
      "partying",
      "adventuring",
      "unknown",
      "prison",
      "mortal_peril",
    ];
    this.ACTIVITY_NAMES = {
      home:         "home",
      work:         "work",
      school:       "school",
      groceries:    "groceries",
      shopping:     "shopping",
      partying:     "partying",
      adventuring:  "adventuring",
      unknown:      "unknown",
      prison:       "prison",
      mortal_peril: "mortal peril",
    };

    console.log(this.props.mirror);
    console.log(this.props.activities);
  }

  /* Returns common name for activity's programmatic name */
  getActivityName(activity) {
    return this.ACTIVITY_NAMES[activity];
  }

  getActivityIndex(activity) {
    return this.ACTIVITIES.indexOf(activity);
  }

  getRotationStyle(degrees) {
    return {
      transform: `rotate(${degrees}deg)`,
      transformOrigin: "center",
    };
  }

  getRotationDegreesByIndex(index) {
    return (index / this.ACTIVITIES.length) * 360;
  }

  getRotationStyleByIndex(index) {
    const degrees = this.getRotationDegreesByIndex(index);
    return this.getRotationStyle(degrees);
  }

  renderActivities() {
    return (
      this.ACTIVITIES.map((activity, i) => {
        return (
          <div
            className="rotable-container"
            style={this.getRotationStyleByIndex(i)}
            key={`activity_${i}`}
          >
            <div className="rotable-text">
              {this.getActivityName(activity)}
            </div>
          </div>
        );
      })
    );
  }

  renderMembers() {
    members = Object.keys(this.props.activities);
    return (
      members.map((member, i) => {
        let activity = this.props.activities[member];
        let index = this.getActivityIndex(activity);
        return (
          <ClockHand
            degrees={this.getRotationDegreesByIndex(index)}
            key={`clock_hand_${i}`}
          />
        );
      })
    );
  }

  render() {
    return (
      <div className="mirror">
        {this.renderActivities()}
        {this.renderMembers()}
      </div>
    );
  }
}

const PropTypes = React.PropTypes;
Mirror.propTypes = {
  mirror: PropTypes.shape({
    id: PropTypes.number.isRequired,
    codename: PropTypes.string.isRequired,
  }),
  activities: PropTypes.object.isRequired,
};
