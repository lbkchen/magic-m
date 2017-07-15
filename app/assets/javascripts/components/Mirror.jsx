class Mirror extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activities: this.props.activities,
    };
    /* Order is important and must match backend. */
    this.ACTIVITIES = [
      "home",
      "work",
      "school",
      "groceries",
      "shopping",
      "partying",
      "adventure",
      "unknown",
      "eating",
      "mortal_peril",
    ];
    this.ACTIVITY_NAMES = {
      home:         "home",
      work:         "work",
      school:       "school",
      groceries:    "groceries",
      shopping:     "shopping",
      partying:     "partying",
      adventure:    "adventure",
      unknown:      "unknown",
      eating:       "eating",
      mortal_peril: "mortal peril",
    };
    this.DEV_REFRESH_RATE = 2000;  // Refresh every 2 seconds
    this.PROD_REFRESH_RATE = 10000; // Refresh every 10 seconds

    console.log(this.props.mirror);
    console.log(this.props.activities);
    this.rerender = this.rerender.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(() => this.rerender() || this.shuffleActivities(), this.DEV_REFRESH_RATE);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  /* Returns common name for activity's programmatic name */
  getActivityName(activity) {
    return this.ACTIVITY_NAMES[activity];
  }

  getActivityIndex(activity) {
    return this.ACTIVITIES.indexOf(activity);
  }

  /**
   * Returns an object mapping all activities to an array of members for each
   * activity in order of last updated. Looks like this:
   * {
   *   school: ["Ken", "Kenny"],
   *   prison: ["Bro", "Graham"],
   *   mortal_peril: ["Jamie"],
   * }
   */
  getActivitySummary() {
    const activities = this.state.activities;
    let summary = {};
    Object.keys(activities).forEach((member) => {
      let activity = activities[member];
      if (summary.hasOwnProperty(activity)) {
        summary[activity].push(member);
      } else {
        summary[activity] = [member];
      }
    });
    return summary;
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

  shuffleActivities() {
    this.ACTIVITIES = _.shuffle(this.ACTIVITIES);
    this.setState(this.state);
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
      return response.json();
    })
    .then((json) => {
      this.setState({ activities: json });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  renderMembers() {
    const activities = this.state.activities;
    const members = Object.keys(activities);
    const summary = this.getActivitySummary();
    console.log(summary);
    return (
      members.map((member, i) => {
        let activity = activities[member];
        let index = this.getActivityIndex(activity);
        let positionIndex = summary[activity].indexOf(member);
        let numMembers = summary[activity].length;
        console.log(member, positionIndex);
        return (
          <ClockHand
            degrees={this.getRotationDegreesByIndex(index)}
            positionIndex={positionIndex}
            numMembers={numMembers}
            name={member}
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
