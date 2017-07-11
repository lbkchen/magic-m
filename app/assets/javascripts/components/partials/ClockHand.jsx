class ClockHand extends React.Component {

  constructor(props) {
    super(props);
  }

  getRotationStyle() {
    return {
      transform: `rotate(${this.props.degrees}deg)`,
      transformOrigin: "bottom",
    };
  }

  render() {
    return (
      <div className="clock-hand" style={this.getRotationStyle()}>
      </div>
    );
  }
}

const PropTypes = React.PropTypes;
ClockHand.propTypes = {
  degrees: PropTypes.number.isRequired,
  // numMembers: PropTypes.number.isRequired,
};
