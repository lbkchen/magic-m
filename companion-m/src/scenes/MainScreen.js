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
      region: this.getInitialRegion(),
      lat: 37.78825,
      lon: -122.4324,
    };

    this.onRegionChange = this.onRegionChange.bind(this);
  }

  componentWillMount() {
    this.getCurrentActivity();
    this.getCurrentLocation();
  }

  getCurrentActivity(callback) {
    const memberRoute = `http://192.168.0.139:3000/members/${this.props.id}`;
    fetch(memberRoute).then((response) => {
      return response.json();
    }).then((json) => {
      console.log(json);
      this.setState({ activity: json.activity });
      callback && callback(json);
    }).catch((error) => {
      console.error(error);
    });
  }

  getCurrentLocation(callback) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);

      this.setState({
        region: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
      callback && callback(position);
    });
  }

  getInitialRegion() {
    return {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  }

  onRegionChange(region) {
    this.setState({ region: region });
  }

  renderMap() {
    console.log(this.state);
    return (
      <MapView
        style={styles.mapContainer}
        provider="google"
        region={this.state.region}
        onRegionChange={this.onRegionChange}
      >
        <MapView.Marker
          coordinate={{
            latitude: this.state.lat,
            longitude: this.state.lon,
          }}
          title="You're here!"
          description="You are here."
        />
      </MapView>
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
          <View style={styles.buttonContainer}>
            <Button height={30} width={120} text="BUTT"/>
          </View>
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
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 30,
  },
});
