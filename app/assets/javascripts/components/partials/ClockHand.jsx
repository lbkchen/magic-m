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
    console.log(this.getRotationStyle());
    console.log(this.getRotationStyle(this.props.positionIndex));
    return (
      <div>
        <div className="clock-hand" style={this.getRotationStyle()}>
        </div>
        <div
          className="clock-member"
          style={this.getRotationStyle(this.props.positionIndex)}
        >
        </div>
      </div>
    );
  }
}

const PropTypes = React.PropTypes;
ClockHand.propTypes = {
  degrees: PropTypes.number.isRequired,
  positionIndex: PropTypes.number.isRequired,
};
