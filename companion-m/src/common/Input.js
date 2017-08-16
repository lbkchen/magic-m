import React from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';

export default class Input extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      text: '',
    }
    this.updateText = this.updateText.bind(this);
  }

  updateText(text) {
    this.setState({ text: text });
  }

  render() {
    const inputStyle = styles.inputStyle;

    return (
      <TextInput
        style={[inputStyle, this.props.style]}
        onChangeText={this.updateText}
        value={this.state.text}
        secureTextEntry={this.props.secureTextEntry || false}
      />
    );
  }
}

const styles = StyleSheet.create({
  inputStyle: {
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    paddingLeft: 20,
    paddingRight: 20,
  },
});
