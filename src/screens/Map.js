import React from "react";
import { Text, View, Modal, TouchableHighlight, Image } from "react-native";
import { MapView } from "expo";
import { SearchBar } from 'react-native-elements';
import PropTypes from "prop-types";
import SwipeUpSearch from '../components/SwipeUpSearch';
import MapPopup from "../components/MapPopup";

const deltas = {latitudeDelta: 0.0922, longitudeDelta: 0.0421}; // TODO: ??

export default class MapScreen extends React.Component {
	static navigationOptions = {
    title: 'Map',
	};

	constructor(props) {
    super(props);
        
    // TODO: not needed, shouldn't be San Fran initial region
    let initialRegion = this.props.navigation.getParam('coordinates',
      {
        latitude: 37.78825,
        longitude: -122.4324,
      }
    );
    initialRegion = {...initialRegion, ...deltas}

		this.state = {
      region: initialRegion,
      servicesToDisplay: undefined
    }

    this.filterSites = this.filterSites.bind(this);
	}

 filterSites(type) {
    this.setState({
      servicesToDisplay: type
    });
  }
  
  renderSites() {
    let sites = this.props.navigation.getParam('services');

    if (this.state.servicesToDisplay !== undefined)
    {
      sites = sites.filter(site => this.state.servicesToDisplay === site.service);
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
            onPress={() => this.serviceClick(site, true)}
            image={this.setMapMarker(site.service)}
          >
            <MapView.Callout>
              <Text>
                {this.createSiteDescription(site.hours, site.street, site.province, site.postal_code, site.phone_number)}
              </Text>
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
  
	render() {
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
          initialRegion={this.state.region}
        >
          {this.renderSites()}
        </MapView>		
        
        <SwipeUpSearch
          onServicePress={this.filterSites}
        />
      </View>
    );
  }
}

MapScreen.propTypes = {
	navigation: PropTypes.object.isRequired
};