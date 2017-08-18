/** Props:
 *
 * @prop style        - component style
 * @prop children     - component children
 * @prop onPress      - callback to be executed on press
 * @prop height       - height dimension (if not specified, uses flex)
 * @prop width        - width dimension
 */

import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import colors from '../styles/colors';

export default class Button extends React.Component {

  constructor(props) {
    super(props);

    // TODO: ADD DISABLE BUTTON PRESS AFTER SUBMITTING REQUEST
  }

  render() {
    const textStyle = styles.textStyle;
    const buttonStyle = styles.buttonStyle;
    const sizeStyle = {
      height: this.props.height || undefined,
      width: this.props.width || undefined,
    };

    return (
      <TouchableOpacity
        style={[buttonStyle, this.props.style, sizeStyle]}
        onPress={this.props.onPress}
      >
        <Text style={[textStyle]}>
          {this.props.text}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    alignSelf: 'center',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: colors.blue,
    borderRadius: 5,
  },
});
