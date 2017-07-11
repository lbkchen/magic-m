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
      transform: `rotate(${this.props.degrees}deg)`,
      transformOrigin: "bottom", 
    };
    return rotateStyle;
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
};
