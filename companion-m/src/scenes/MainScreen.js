import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MapView from 'react-native-maps';

import Button from '../common/Button';
import Input from '../common/Input';
import { marginTop } from '../styles/layout';

export default class MainScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activity: null
    };
  }

  componentWillMount() {
    const memberRoute = `http://192.168.0.139:3000/members/${this.props.id}`;
    fetch(memberRoute).then((response) => {
      return response.json();
    }).then((json) => {
      console.log(json);
      this.setState({ activity: json.activity });
    }).catch((error) => {
      console.error(error);
    });
  }

  renderMap() {
    return (
      <MapView
        style={styles.mapContainer}
        provider="google"
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    );
  }

  renderActivityLabel() {
    return (
      <View>
        <Text>{this.state.activity}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.fullContainer}>
        {this.renderMap()}
        <View style={styles.contentContainer}>
          {this.renderActivityLabel()}
          <Button />
          <Button />
          <Button />
          <Button />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  mapContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 2,
  },
});
