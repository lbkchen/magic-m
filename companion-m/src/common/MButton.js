import React from 'react';
import { StyleSheet, View } from 'react-native';

export default class MButton extends React.Component {

  render() {
    const textStyle = styles.textStyle;
    const buttonStyle = styles.buttonStyle;

    return (
      <TouchableOpacity
        style={[buttonStyle, this.props.style]}
        onPress={this.props.onPress}
      >
        <Text style={[textStyle, this.props.style]}>
          {this.props.children}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#439ad8',
    borderRadius: 5,
  },
};
