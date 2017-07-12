class ClockHand extends React.Component {

  constructor(props) {
    super(props);

  }

  componentWillReceiveProps(nextProps) {
    if (this.props.degrees != nextProps.degrees) {
      // Placeholder
    }
  }

  getRotationStyle() {
    let rotateStyle = {
      transform: `rotate(${this.props.degrees}deg) translateZ(0)`,
    };
    return rotateStyle;
  }

  render() {
    return (
      <div>
      <div className="clock-hand" style={this.getRotationStyle()}>
      </div>
      <div className="clock-member" style={this.getRotationStyle()}>
      </div>
      </div>
    );
  }
}

const PropTypes = React.PropTypes;
ClockHand.propTypes = {
  degrees: PropTypes.number.isRequired,
};
