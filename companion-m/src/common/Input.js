import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

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

  renderLabel() {
    if (this.props.label) {
      return (
        <Text style={styles.textStyle}>
          {this.props.label}
        </Text>
      );
    }
  }

  render() {
    const inputStyle = styles.inputStyle;

    return (
      <View style={[this.props.style]}>
        {this.renderLabel()}
        <TextInput
          style={[inputStyle]}
          onChangeText={this.updateText}
          value={this.state.text}
          secureTextEntry={this.props.secureTextEntry || false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputStyle: {
    height: 50,
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    fontSize: 16,
  },
  textStyle: {
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1,
  }
});
