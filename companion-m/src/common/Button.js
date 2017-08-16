import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export default class Button extends React.Component {

  render() {
    const textStyle = styles.textStyle;
    const buttonStyle = styles.buttonStyle;

    return (
      <TouchableOpacity
        style={[buttonStyle, this.props.style]}
        onPress={this.props.onPress}
      >
        <Text style={[textStyle]}>
          {this.props.children}
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
    alignSelf: 'stretch',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#439ad8',
    borderRadius: 5,
  },
});
