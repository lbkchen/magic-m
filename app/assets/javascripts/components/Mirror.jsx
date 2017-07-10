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

  getRotationStyle(degrees) {
    return {
      transform: `rotate(${degrees}deg)`,
      transformOrigin: "center",
    };
  }

  getRotationStyleByIndex(index) {
    const degrees = (index / this.ACTIVITIES.length) * 360;
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

  render() {
    return (
      <div className="mirror">
        {this.renderActivities()}
      </div>
    );
  }
}

Mirror.propTypes = {

};
