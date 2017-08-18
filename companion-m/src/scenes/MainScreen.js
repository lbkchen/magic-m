import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MapView from 'react-native-maps';

import Button from '../common/Button';
import Input from '../common/Input';
import { marginTop } from '../styles/layout';
import colors from '../styles/colors';

export default class MainScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activity: 'activity',
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
      <View style={styles.activityContainer}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Your current activity is
          </Text>
        </View>
        <View style={styles.activityNameContainer}>
          <Text style={styles.activityName}>
            {this.state.activity.toUpperCase()}
          </Text>
        </View>
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
            <View style={styles.buttonColumnContainer}>
              <Button style={styles.button} text="BUTT"/>
              <Button style={styles.button} text="BUTT"/>
              <Button style={styles.button} text="BUTT"/>
              <Button style={styles.button} text="BUTT"/>
              <Button style={styles.button} text="BUTT"/>
            </View>
            <View style={styles.buttonColumnContainer}>
              <Button style={styles.button} text="BUTT"/>
              <Button style={styles.button} text="BUTT"/>
              <Button style={styles.button} text="BUTT"/>
              <Button style={styles.button} text="BUTT"/>
              <Button style={styles.button} text="BUTT"/>
            </View>
          </View>
          <View style={styles.bigButtonContainer}>
            <Button style={styles.bigButton} text="BUTT"/>
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

  // MAP SECTION
  mapContainer: {
    flex: 1,
  },

  // EVERYTHING ELSE
  contentContainer: {
    flex: 2,
  },

  // ACTIVITY SECTION
  activityContainer: {
    flex: 1,
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
  },
  description: {
    fontSize: 12,
    color: colors.light_charcoal,
  },
  activityNameContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityName: {
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: 2,
    color: colors.charcoal,
  },

  // BUTTON SECTION
  buttonContainer: {
    flex: 4,
    flexDirection: 'row',
  },
  buttonColumnContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  button: {
    margin: 5
  },

  // BIG BUTTON SECTION
  bigButtonContainer: {
    flex: 1,
  },
  bigButton: {
    margin: 15,
    backgroundColor: colors.red,
  },
});
