import React from "react";
import { Dimensions, Text, View, StyleSheet, Button, Modal, TouchableHighlight, Image } from "react-native";
import { MapView } from "expo";
import { SearchBar } from 'react-native-elements';
import PropTypes from "prop-types";
import SwipeUpSearch from '../components/SwipeUpSearch';
import MapPopup from "../components/MapPopup";
import MapViewDirections from 'react-native-maps-directions';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
const deltas = {latitudeDelta: 0.0922, longitudeDelta: 0.0421};
const GOOGLE_MAPS_APIKEY = 'AIzaSyBO8JtI4QwXlt2khUX66l71yAi2hEKCsPo';

export default class MapScreen extends React.Component {
	static navigationOptions = {
    title: 'Map',
	};

	constructor(props) {
    super(props);
    const initialOrigin = this.props.navigation.getParam('coordinates');
    let destination  = undefined;
    let origin = undefined;

		this.state = {
      isAnonymous: this.props.navigation.getParam('isAnonymous'),
      region: {...initialOrigin, ...deltas},
      servicesToDisplay: undefined
    }

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

    if (this.destination !== undefined) {
      sites = sites.filter(site => this.destination.latitude === parseFloat(site.lat) && this.destination.longitude === parseFloat(site.lon));
    } else if (servicesToDisplay !== undefined) {
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
            title={site.name}
            // onPress={() => this.serviceClick(site, true)}
            image={this.setMapMarker(site.service)}
            ref={ref => { this.marker = ref; }}
          >
            <MapView.Callout onPress={() => this.setDestination(site.lat, site.lon)}>
              <Text>
                {this.createSiteDescription(site.hours, site.street, site.province, site.postal_code, site.phone_number)}
              </Text>
              <Text style={styles.clickableText}>Directions</Text>
            </MapView.Callout>
          </MapView.Marker>
        );
      });
    }
  }

  setMapMarker(serviceType) {
    let marker;

    switch (serviceType) {
      case "Supervised Injection":
        marker = require('../../assets/needle_marker.png');
        break;
      case "Replacement":
        marker = require('../../assets/replacement_marker.png');
        break;
      case "Pipe":
        marker = require('../../assets/pipe_marker.png');
        break;
      case "Nurse":
        marker = require('../../assets/nurse_marker.png');
        break;
      case "Mobile Unit":
        marker = require('../../assets/mobile_unit_marker.png');
        break;
      case "Detox":
        marker = require('../../assets/detox_marker.png');
        break;
      default:
        // TODO: need a default marker
    }

    return marker;
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
  
  setDestination(lat, lon) {
    const destLat = parseFloat(lat);
    const destLon = parseFloat(lon);
    this.destination = { latitude: destLat, longitude: destLon }
    
    if (this.origin !== undefined) {
      const latitudeDelta = destLat > this.origin.latitude ? destLat - this.origin.latitude : this.origin.latitude - destLat;
      const longitudeDelta = destLon > this.origin.longitude ? destLon - this.origin.longitude : this.origin.longitude - destLon;
      this.marker.hideCallout();
      this.setState({
        region: {
          latitude: (destLat + this.origin.latitude) / 2,
          longitude: (destLon + this.origin.longitude) / 2,
          latitudeDelta: latitudeDelta + ((200 * latitudeDelta) / windowHeight),
          longitudeDelta: longitudeDelta + ((200 * longitudeDelta) / windowWidth)
        }
      });
    }
  }

  // renderCurrentLocation() {
  //   return (
  //     <MapView.Marker
  //       anchor={{x: 0.5, y: 0.5}}
  //       coordinate={{
  //         "latitude": parseFloat(this.state.origin.latitude),
  //         "longitude": parseFloat(this.state.origin.longitude)
  //       }}
  //       image={require('../../assets/current_location_marker.png')}
  //     />
  //   );
  // }

	render() {
    const { isAnonymous, region } = this.state;
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
          showsUserLocation={!isAnonymous ? true : false}
          followsUserLocation={!isAnonymous ? true : false}
          onUserLocationChange={!isAnonymous ? (params) => this.origin = { latitude: params.nativeEvent.coordinate.latitude, longitude: params.nativeEvent.coordinate.longitude } : undefined}
        >
          {this.renderSites()}
          {/* {this.renderCurrentLocation()} */}
          {this.destination !== undefined && this.origin !== undefined ? 
          <MapViewDirections 
            origin={this.origin} 
            destination={this.destination} 
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  clickableText: {
    color: '#4289DD',
    textDecorationLine: 'underline',
    paddingTop: 5
  }
});

MapScreen.propTypes = {
	navigation: PropTypes.object.isRequired
};