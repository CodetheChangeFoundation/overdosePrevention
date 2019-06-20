import React from "react";
import { Dimensions, Text, View, StyleSheet, Button, Modal, TouchableHighlight, TouchableWithoutFeedback, Image } from "react-native";
import { MapView } from "expo";
import { SearchBar } from 'react-native-elements';
import PropTypes from "prop-types";
import SwipeUpSearch from '../components/SwipeUpSearch';
import MapPopup from "../components/MapPopup";
import MapViewDirections from 'react-native-maps-directions';
import ResponsiveButton from "../components/ResponsiveButton";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');
const DELTAS = {latitudeDelta: 0.0922, longitudeDelta: 0.0421};
const GOOGLE_MAPS_APIKEY = 'AIzaSyBO8JtI4QwXlt2khUX66l71yAi2hEKCsPo';
const MARKER_IMAGES = {
  "Supervised Injection": require('../../assets/needle_marker.png'),
  "Replacement": require('../../assets/replacement_marker.png'),
  "Pipe": require('../../assets/pipe_marker.png'),
  "Nurse": require('../../assets/nurse_marker.png'),
  "Mobile Unit": require('../../assets/mobile_unit_marker.png'),
  "Detox": require('../../assets/detox_marker.png'),
  "Default": require('../../assets/default_marker.png')
}

export default class MapScreen extends React.Component {
	static navigationOptions = {
    title: 'Map',
	};

	constructor(props) {
    super(props);
    const initialOrigin = this.props.navigation.getParam('coordinates');

		this.state = {
      region: {...initialOrigin, ...DELTAS},
      servicesToDisplay: undefined,
      modalVisible: false
    }

    this.destination = undefined;
    this.origin = undefined;
    this.isAnonymous = this.props.navigation.getParam('isAnonymous'),
    this.filterSites = this.filterSites.bind(this);
    this.setDestination = this.setDestination.bind(this);
  }

  filterSites(type) {
    this.setState({
      servicesToDisplay: type
    });
  }
  
  renderSites() {
    const { servicesToDisplay } = this.state;
    let sites = this.props.navigation.getParam('services');

    // if (this.destination !== undefined) {
    //   sites = sites.filter(site => this.destination.latitude === parseFloat(site.lat) && this.destination.longitude === parseFloat(site.lon));
    // } else 
    
    if (servicesToDisplay !== undefined) {
      sites = sites.filter(site => servicesToDisplay === site.service);
    }

    if (sites) {
      return sites.map(site => {
        return (
          <MapView.Marker
            key={site.sid}
            coordinate={{
              "latitude": parseFloat(site.lat),
              "longitude": parseFloat(site.lon)
            }}
            onPress={() => { this.destination = site; this.setState({modalVisible: true}) }}
            image={MARKER_IMAGES[site.service] ? MARKER_IMAGES[site.service] : MARKER_IMAGES["Default"]}
            // ref={ref => { this.marker = ref; }}
          />
        );
      });
    }
  }

    // TODO: create a modal and complete functions below
  createSiteDescription(hours, street, province, postalCode, phoneNumber) {
    // TODO: takes in a service's hours and address and formats it
    return `${street}, ${postalCode} ${province}\n${this.formatPhoneNumber(phoneNumber)}${hours}`;
  }

  formatPhoneNumber(phoneNumber) {
    // TODO: takes in a phone number and formats it
    if (phoneNumber)
    {
      return `${phoneNumber}\n`;
    }
  }
  
  setDestination() {
    const destLat = parseFloat(this.destination.lat);
    const destLon = parseFloat(this.destination.lon);
    // this.destination = { latitude: destLat, longitude: destLon }

    if (this.origin !== undefined) {
      const latitudeDelta = destLat > this.origin.latitude ? destLat - this.origin.latitude : this.origin.latitude - destLat;
      const longitudeDelta = destLon > this.origin.longitude ? destLon - this.origin.longitude : this.origin.longitude - destLon;
      // this.marker.hideCallout();
      this.setState({
        region: {
          latitude: (destLat + this.origin.latitude) / 2,
          longitude: (destLon + this.origin.longitude) / 2,
          latitudeDelta: latitudeDelta + ((250 * latitudeDelta) / WINDOW_HEIGHT),
          longitudeDelta: longitudeDelta + ((250 * longitudeDelta) / WINDOW_WIDTH)
        }
      });
    }
  }

	render() {
    const { region, modalVisible } = this.state;

    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        {/* <SearchBar
          round={true}
          placeholder="Search for a place or address"
          containerStyle={{backgroundColor: '#CCD2DD', height: 45}}
          platform="default"
          inputContainerStyle={{backgroundColor: '#CCD2DD'}}
          inputStyle={{
            backgroundColor: '#BABFC6', 
            borderRadius: 7
          }}
          lightTheme={true}
          searchIcon={null}
          clearIcon={null}
        /> */}
        
        <MapView
          style={{ flex: 1 }}
          provider="google"
          region={region}
          showsUserLocation={!this.isAnonymous ? true : false}
          followsUserLocation={!this.isAnonymous ? true : false}
          onUserLocationChange={!this.isAnonymous ? 
            (params) => {
              this.origin = { 
                latitude: params.nativeEvent.coordinate.latitude,
                longitude: params.nativeEvent.coordinate.longitude 
              };
            } : undefined}
        >
          {this.renderSites()}
          {this.destination !== undefined && this.origin !== undefined ? 
          <MapViewDirections 
            origin={this.origin} 
            d destination = {{ latitude: parseFloat(this.destination.lat), longitude: parseFloat(this.destination.lon) }}
            strokeWidth={3}
            strokeColor="#4289DD"
            apikey={GOOGLE_MAPS_APIKEY} 
            onStart={(params) => {
              // console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
              // console.log(params.waypoints);
            }} 
            onReady={result => {
              // console.log(`Distance: ${result.distance} km`);
              // console.log(`Duration: ${result.duration} min.`);
              // console.log(result.coordinates);
              // console.log(result.fare);
            }} />
          : undefined}
        </MapView>

        <SwipeUpSearch
          onServicePress={this.filterSites}
        />
        
        {modalVisible ?
          <TouchableWithoutFeedback onPress={() => this.setState({modalVisible: false})}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback>
                <View style={styles.modal}>
                  <View>
                    <Text>{this.destination.name}</Text>
                    <Text>{`\n`}Address</Text>
                    <Text>{this.destination.street}</Text>
                    <Text>{this.destination.province}, {this.destination.country}</Text>
                    <Text>{this.destination.postal_code}</Text>
                    <Text>{`\n`}Phone Number</Text>
                    <Text>{this.destination.phone_number}</Text>
                    <Text>{`\n`}Hours</Text>
                    <Text>{this.destination.hours}</Text>
                  </View>
                  <View>
                    <ResponsiveButton
                      key='directions'
                      label='Directions'
                      labelStyle={{fontWeight: '600'}}
                      style={styles.directionsButton}
                      gradientColors={['#F3CB14', '#E58B37']}
                      horizontalGradient={true}
                      onPress={() => {this.setState({modalVisible: false}); this.setDestination()}}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        : undefined}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  clickableText: {
    color: '#4289DD',
    textDecorationLine: 'underline',
    paddingTop: 5
  },
  modalContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    position: 'relative',
    flexDirection: 'column',
    backgroundColor: '#FFF',
    width: WINDOW_WIDTH * 0.8,
    height: WINDOW_HEIGHT * 2/3,
    padding: 20,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#E58B37',
    justifyContent: 'space-between'
  },
  directionsButton: {
    alignSelf: 'center',
    marginBottom: -45,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 100
  }
});

MapScreen.propTypes = {
	navigation: PropTypes.object.isRequired
};