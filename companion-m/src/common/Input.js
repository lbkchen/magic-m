import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

export default class Input extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      focus: false,
    }
    this.updateText = this.updateText.bind(this);
    this.setFocus = this.setFocus.bind(this);
    this.unsetFocus = this.unsetFocus.bind(this);
  }

  updateText(text) {
    this.setState({ text: text });
    this.props.onChangeText && this.props.onChangeText(text); 
  }

  setFocus() {
    this.setState({ focus: true });
  }

  unsetFocus() {
    this.setState({ focus: false });
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
    let inputStyle = [styles.inputStyle];
    if (this.state.focus) {
      inputStyle.push(styles.focusedInputStyle);
    }
    return (
      <View style={[this.props.style]}>
        {this.renderLabel()}
        <TextInput
          style={inputStyle}
          onChangeText={this.updateText}
          value={this.state.text}
          secureTextEntry={this.props.secureTextEntry || false}
          onFocus={this.setFocus}
          onEndEditing={this.unsetFocus}
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
  focusedInputStyle: {
    borderWidth: 1,
    borderColor: 'rgba(64, 115, 196, 0.6)',
  },
  textStyle: {
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1,
  },
});
