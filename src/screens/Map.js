import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import SwipeUpSearch from '../components/SwipeUpSearch';
import SwipeUpDirections from '../components/SwipeUpDirections';
import MapPopup from "../components/MapPopup";
import TravelModeBar from "../components/TravelModeBar";
import SiteSearch from "../components/SiteSearch";

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
      modalVisible: false,
      drawRoute: false,
      travelMode: 'DRIVING',
      instructions: undefined,
      fromLocation: ''
    }

    this.destination = undefined;
    this.origin = undefined;
    this.isAnonymous = this.props.navigation.getParam('isAnonymous');
    this.currentRegion = {...initialOrigin, ...DELTAS};
    this.filterSites = this.filterSites.bind(this);
    this.centerMapOnRoute = this.centerMapOnRoute.bind(this);
    this.changeTravelMode = this.changeTravelMode.bind(this);
    this.setOrigin = this.setOrigin.bind(this);
    this.setDestination = this.setDestination.bind(this);
    this.setfromLocation = this.setfromLocation.bind(this);
  }

  setOrigin(lat, lng) {
    this.origin = {
      latitude: parseFloat(lat),
      longitude: parseFloat(lng)
    };
  }

  setDestination(site) {
    this.destination = site;
  }

  changeTravelMode(mode) {
    this.setState({
      travelMode: mode
    })
  }

  setfromLocation(location) {
    this.setState({
      fromLocation: location
    })
  }

  filterSites(type) {
    this.setState({
      region: this.currentRegion,
      servicesToDisplay: type
    });
  }
  
  renderSites() {
    const { servicesToDisplay, drawRoute } = this.state;
    let sites = this.props.navigation.getParam('services');

    if (drawRoute && this.destination !== undefined) {
      sites = sites.filter(site => this.destination.lat === site.lat && this.destination.lon === site.lon);
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
            onPress={() => { this.destination = site; this.setState({region: this.currentRegion, modalVisible: true}) }}
            image={MARKER_IMAGES[site.service] ? MARKER_IMAGES[site.service] : MARKER_IMAGES["Default"]}
          />
        );
      });
    }
  }
  
  centerMapOnRoute() {
    this.setState({
      modalVisible: false,
      drawRoute: true
    });

    if (this.origin !== undefined && this.destination !== undefined) {
      const destLat = parseFloat(this.destination.lat);
      const destLon = parseFloat(this.destination.lon);
      const latitudeDelta = destLat > this.origin.latitude ? destLat - this.origin.latitude : this.origin.latitude - destLat;
      const longitudeDelta = destLon > this.origin.longitude ? destLon - this.origin.longitude : this.origin.longitude - destLon;
      const multiplier = destLat > this.origin.latitude ? 0.4 : 1.6;

      this.setState({
        region: {
          latitude: (multiplier * destLat + (2 - multiplier) * this.origin.latitude) / 2,
          longitude: (destLon + this.origin.longitude) / 2,
          latitudeDelta: latitudeDelta * 1.8,
          longitudeDelta: longitudeDelta * 1.8
        }
      });
    }
  }

	render() {
    const { region, modalVisible, drawRoute, travelMode, instructions, fromLocation } = this.state;

    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <MapView
          style={{ flex: 1 }}
          provider="google"
          region={region}
          onRegionChangeComplete={(region) => this.currentRegion = region}
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
          { drawRoute && this.origin !== undefined && this.destination !== undefined &&
            <MapViewDirections 
              origin={this.origin} 
              destination = {{ latitude: parseFloat(this.destination.lat), longitude: parseFloat(this.destination.lon) }}
              mode={travelMode}
              strokeWidth={3}
              strokeColor="#4289DD"
              apikey={GOOGLE_MAPS_APIKEY}
              onReady={result => {
                this.setState({instructions: result.instructions});
              }}
            />
          }
        </MapView>

        {!drawRoute &&
          <SiteSearch
            sites={this.props.navigation.getParam('services')}
            setDestination={this.setDestination}
            setRegionAndModal={() => this.setState({region: this.currentRegion, modalVisible: true})}
          />
        }

        <SwipeUpSearch 
          onServicePress={this.filterSites}
          servicesToDisplay={this.state.servicesToDisplay}
        />

        { drawRoute &&
          <SwipeUpDirections 
            centerMapOnRoute={this.centerMapOnRoute}
            destination={this.destination}
            hideDirections={() => this.setState({ drawRoute: false })}
            instructions={instructions}
            isAnonymous={this.isAnonymous}
            fromLocation={fromLocation}
            setfromLocation={this.setfromLocation}
            setOrigin={this.setOrigin}
          />
        }

        { drawRoute && 
          <TravelModeBar 
            travelMode={travelMode} 
            changeTravelMode={this.changeTravelMode}
          />
        }
        
        { modalVisible &&
          <MapPopup 
            centerMapOnRoute={this.centerMapOnRoute}
            destination={this.destination} 
            hideModal={() => this.setState({modalVisible: false})}
          />
        }

      </View>
    );
  }
}

MapScreen.propTypes = {
	navigation: PropTypes.object.isRequired
};