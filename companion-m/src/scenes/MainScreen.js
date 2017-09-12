import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import MapView from 'react-native-maps';

import Button from '../common/Button';
import Input from '../common/Input';
import { marginTop } from '../styles/layout';
import colors from '../styles/colors';
import { NETWORK_IP } from '../../config/secrets';

export default class MainScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activity: 'activity',
      region: this.getInitialRegion(),
      lat: 37.78825,
      lon: -122.4324,
      locationTracking: true,
    };

    this.locationInterval = null; // Set after mounted
    this.activityInterval = null; // Set after mounted
    this.updateInterval = null; // Set after mounted

    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.getCurrentActivity = this.getCurrentActivity.bind(this);
    this.setActivity = this.setActivity.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
    this.toggleLocationTracking = this.toggleLocationTracking.bind(this);
  }

  componentDidMount() {
    this.getCurrentActivity();
    this.getCurrentLocation();
    this.startLocationTracking();
    this.startActivityTracking();
    this.startUpdateTracking();
  }

  componentWillUnmount() {
    this.stopLocationTracking();
    this.stopActivityTracking();
    this.stopUpdateTracking();
  }

  startLocationTracking() {
    this.locationInterval = setInterval(this.getCurrentLocation, 2000);
  }

  stopLocationTracking() {
    clearInterval(this.locationInterval);
  }

  startActivityTracking() {
    this.activityInterval = setInterval(this.getCurrentActivity, 2000);
  }

  stopActivityTracking() {
    clearInterval(this.activityInterval);
  }

  startUpdateTracking() {
    this.updateInterval = setInterval(this.setActivity, 30000);
  }

  stopUpdateTracking() {
    clearInterval(this.updateInterval);
  }

  /**
   * Gets the user's current activity from the DB, call this function
   * to refresh UI, no impact on Mirror or DB.
   */
  getCurrentActivity(callback) {
    const memberRoute = `http://${NETWORK_IP}:3000/members/${this.props.id}`;
    fetch(memberRoute).then((response) => {
      return response.json();
    }).then((json) => {
      this.setState({ activity: json.activity });
      callback && callback(json);
    }).catch((error) => {
      console.error(error);
    });
  }

  /**
   * Gets the user's current location and updates UI.
   */
  getCurrentLocation(callback) {
    navigator.geolocation.getCurrentPosition((position) => {

      this.setState({
        region: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: this.state.region.latitudeDelta,
          longitudeDelta: this.state.region.longitudeDelta,
        },
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
      callback && callback(position);
    });
  }

  /**
   * Returns the initial region to show in the map. Centered in SF!
   */
  getInitialRegion() {
    return {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  }

  /**
   * Sets the user's current activity by using lat, lon values and passing
   * them INTO THE DB. Will update user activity as well as lat, lon in
   * the DB, so stop this function from being called to suppress updates.
   */
  setActivity(callback) {
    const locationRoute = `http://${NETWORK_IP}:3000/members/${this.props.id}/location`;
    const payload = {
      method: 'PUT',
      body: JSON.stringify({
        member: {
          lat: this.state.lat,
          lon: this.state.lon,
        },
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
    };
    fetch(locationRoute, payload).then((response) => {
      return response.json();
    }).then((json) => {
      console.log(json);
      console.log("SET ACTIVITY");
      callback && callback(json);
    }).catch((error) => {
      console.error(error);
    });
  }

  onRegionChange(region) {
    this.setState({ region: region });
  }

  toggleLocationTracking() {
    if (this.state.locationTracking) {
      this.stopLocationTracking();
    } else {
      this.startLocationTracking();
    }
    this.setState({ locationTracking: !this.state.locationTracking });
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
    const bigButtonStyle = this.state.locationTracking ? styles.bigButtonRed : styles.bigButtonGreen;
    const bigButtonText = this.state.locationTracking ? "Turn Off Tracking": "Turn On Tracking";
    return (
      <View style={styles.fullContainer}>
        {this.renderMap()}
        <View style={styles.contentContainer}>
          {this.renderActivityLabel()}
          <View style={styles.buttonContainer}>
            <View style={styles.buttonColumnContainer}>
              <Button style={styles.button} text="Home"/>
              <Button style={styles.button} text="Work"/>
              <Button style={styles.button} text="School"/>
              <Button style={styles.button} text="Groceries"/>
              <Button style={styles.button} text="Shopping"/>
            </View>
            <View style={styles.buttonColumnContainer}>
              <Button style={styles.button} text="Partying"/>
              <Button style={styles.button} text="Adventure"/>
              <Button style={styles.button} text="Unknown"/>
              <Button style={styles.button} text="Eating"/>
              <Button style={styles.button} text="Mortal Peril"/>
            </View>
          </View>
          <View style={styles.bigButtonContainer}>
            <Button
              style={bigButtonStyle}
              text={bigButtonText}
              onPress={this.toggleLocationTracking}
            />
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
  bigButtonRed: {
    margin: 15,
    backgroundColor: colors.red,
  },
  bigButtonGreen: {
    margin: 15,
    backgroundColor: colors.green,
  },
});
