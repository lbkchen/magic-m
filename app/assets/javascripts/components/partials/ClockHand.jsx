class ClockHand extends React.Component {

  constructor(props) {
    super(props);

  }

  componentWillReceiveProps(nextProps) {
    if (this.props.degrees != nextProps.degrees) {
      // Placeholder
    }
  }

  getRotationStyle(index = 0) {
    /* Need translateZ to prevent sub-pixel snapping */
    let rotateStyle = {
      transform: `rotate(${this.props.degrees}deg)
                  translateY(-${index * 100}%)
                  translateZ(0px)`,
    };
    return rotateStyle;
  }

  render() {
    return (
      <div>
        <div className="clock-hand" style={this.getRotationStyle()} />
        <div className="number-label" style={this.getRotationStyle()}>
          {this.props.numMembers}
        </div>
        <div
          className={`clock-member fade-${this.props.positionIndex}`}
          style={this.getRotationStyle(this.props.positionIndex)}
        >
          {this.props.name}
        </div>
      </div>
    );
  }
}

const PropTypes = React.PropTypes;
ClockHand.propTypes = {
  degrees: PropTypes.number.isRequired,
  positionIndex: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  numMembers: PropTypes.number.isRequired,
};
