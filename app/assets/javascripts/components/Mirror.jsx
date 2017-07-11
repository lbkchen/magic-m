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
    this.state = {
      activities: this.props.activities,
    };
    console.log(this.props.mirror);
    console.log(this.props.activities);
    this.rerender = this.rerender.bind(this);
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

  rerender() {
    fetch(`/mirrors/${this.props.mirror.id}/activities`, {
      credentials: "include"
    })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((json) => {
      console.log(json);
      this.setState({ activities: json });
      console.log(this.state.activities);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  renderUpdateButton() {
    return (
      <button onClick={this.rerender}>
        Rerender
      </button>
    )
  }

  renderMembers() {
    let activities = this.state.activities;
    let members = Object.keys(activities);
    return (
      members.map((member, i) => {
        let activity = activities[member];
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
        {this.renderUpdateButton()}
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
