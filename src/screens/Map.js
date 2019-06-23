import React from "react";
import { Dimensions, Text, TextInput, View, ScrollView, StyleSheet, Button, TouchableHighlight, Image } from "react-native";
import { MapView } from "expo";
import { Ionicons } from '@expo/vector-icons';
import { SearchBar } from 'react-native-elements';
import PropTypes from "prop-types";
import SwipeUpSearch from '../components/SwipeUpSearch';
import MapPopup from "../components/MapPopup";
import MapViewDirections from 'react-native-maps-directions';
import ResponsiveButton from "../components/ResponsiveButton";
import SwipeUpDown from '../components/react-native-swipe-up-down/index';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

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
      modalVisible: false,
      drawRoute: false,
      searchLocation: '',
      travelMode: 'DRIVING',
      instructions: undefined
    }

    this.destination = undefined;
    this.origin = undefined;
    this.isAnonymous = this.props.navigation.getParam('isAnonymous');
    this.currentRegion = {...initialOrigin, ...DELTAS};
    this.filterSites = this.filterSites.bind(this);
    this.drawRoute = this.drawRoute.bind(this);
    this.changeTravelMode = this.changeTravelMode.bind(this);
  }

  changeTravelMode(mode) {
    this.setState({
      travelMode: mode
    })
  }

  filterSites(type) {
    this.setState({
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
            // ref={ref => { this.marker = ref; }}
          />
        );
      });
    }
  }

  createSiteDescription(hours, street, province, postalCode, phoneNumber) {
    return `${street}, ${postalCode} ${province}\n${this.formatPhoneNumber(phoneNumber)}${hours}`;
  }

  formatPhoneNumber(phoneNumber) {
    if (phoneNumber) {
      return `${phoneNumber}\n`;
    }
  }
  
  drawRoute() {
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
    const { region, modalVisible, drawRoute, searchLocation, travelMode, instructions } = this.state;

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
          {drawRoute && this.origin !== undefined && this.destination !== undefined ? 
          <MapViewDirections 
            origin={this.origin} 
            destination = {{ latitude: parseFloat(this.destination.lat), longitude: parseFloat(this.destination.lon) }}
            mode={travelMode}
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
              // console.log(result.instructions);
              this.setState({instructions: result.instructions});
            }} />
          : undefined}
        </MapView>

        <SwipeUpSearch
          onServicePress={this.filterSites}
        />

        {drawRoute ?
          <SwipeUpDown
            animation="easeInEaseOut"
            disablePressToShow={true}
            hasRef={ref => (this.swipeUpDownRef = ref)}
            onMoveDown={() => this.swipeUpDownRef.showFull()}
            // disableSwipeDown={this.origin === undefined ? true : false}
            itemMini={
              <View>
                <Text style={styles.clickableText} onPress={() => {this.setState({drawRoute: false})}}>Cancel</Text>
                <Text>To {this.destination.name}</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text>From: </Text>{!this.isAnonymous ? <Text>Current location</Text> : <Text style={styles.clickableText} onPress={() => {this.swipeUpDownRef.showFull()}}>{searchLocation != '' ? searchLocation : 'Enter a location'}</Text>}
                </View>
                {/* <Text>{this.origin === undefined ? '' : 'TODO: Show Turn By Turn Directions'}</Text> */}
                <Text>{instructions === undefined ? 'undefined' : instructions.map(a => { return a })}</Text>
                <View style={styles.travelModeBar}>
                  <Ionicons name="md-car" size={32} color={travelMode === 'DRIVING' ? '#E58B37' : '#BDB8B3'} onPress={() => this.changeTravelMode('DRIVING')}/>
                  <Ionicons name="md-subway" size={32} color={travelMode === 'TRANSIT' ? '#E58B37' : '#BDB8B3'} onPress={() => this.changeTravelMode('TRANSIT')}/>
                  <Ionicons name="md-walk" size={32} color={travelMode === 'WALKING' ? '#E58B37' : '#BDB8B3'} onPress={() => this.changeTravelMode('WALKING')}/>
                  <Ionicons name="md-bicycle" size={32} color={travelMode === 'BICYCLING' ? '#E58B37' : '#BDB8B3'} onPress={() => this.changeTravelMode('BICYCLING')}/>
                </View>
              </View>
            }
            itemFull={
              <View style={styles.itemFull}>
                <Text style={styles.clickableText} onPress={() => {this.setState({drawRoute: false})}}>Cancel</Text>
                <Text>To {this.destination.name}</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text>From: {!this.isAnonymous ? 'Current location' : ''}</Text>
                </View>
                {this.isAnonymous ?
                  <GooglePlacesAutocomplete
                    placeholder='Enter Location'
                    minLength={2}
                    autoFocus={false}
                    returnKeyType={'default'}
                    fetchDetails={true}
                    query={{ key: GOOGLE_MAPS_APIKEY, types: 'address' }}
                    disableScroll={true}
                    isRowScrollable={false}
                    getDefaultValue={() => searchLocation}
                    predefinedPlaces={!this.isAnonymous ? [this.currentLocation] : []}
                    styles={{
                      textInputContainer: {
                        backgroundColor: 'rgba(0,0,0,0)',
                        borderTopWidth: 0,
                        borderBottomWidth:0
                      },
                      textInput: {
                        marginLeft: 0,
                        marginRight: 0,
                        height: 38,
                        color: '#5d5d5d',
                        fontSize: 16
                      },
                      predefinedPlacesDescription: {
                        color: '#1faadb'
                      },
                    }}
                    listViewDisplayed={false}
                    onPress={(data, details = null) => {
                      this.setState({searchLocation: details.formatted_address});
                      this.origin = {
                        latitude: parseFloat(details.geometry.location.lat),
                        longitude: parseFloat(details.geometry.location.lng)
                      };
                      this.swipeUpDownRef.showMini();
                      this.drawRoute();
                    }}
                  />
                : undefined }
                {/* <Text>{this.origin === undefined ? '' : 'TODO: Show Turn By Turn Directions'}</Text> */}
                <Text>{instructions === undefined ? 'undefined' : instructions.map(a => { return a })}</Text>
              </View>
            }
            style={styles.swipeUpDirections}
            swipeHeight={WINDOW_HEIGHT/3}
          />
        : undefined}
        
        {modalVisible ?
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <ScrollView 
                alwaysBounceVertical={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false} 
              >
                <Text>{this.destination.name}</Text>
                <Text>{`\n`}Address</Text>
                <Text>{this.destination.street}</Text>
                <Text>{this.destination.province}, {this.destination.country}</Text>
                <Text>{this.destination.postal_code}</Text>
                <Text>{`\n`}Phone Number</Text>
                <Text>{this.destination.phone_number}</Text>
                <Text>{`\n`}Hours</Text>
                <Text>{this.destination.hours}</Text>
              </ScrollView>
            </View>
            <View style={styles.closeButtonContainer}>
              <ResponsiveButton
                key='close'
                label='X'
                labelStyle={{fontWeight: '600'}}
                style={styles.closeButton}
                gradientColors={['#F3CB14', '#E58B37']}
                horizontalGradient={true}
                onPress={() => this.setState({modalVisible: false})}
              />
            </View>
            <View style={styles.directionsButtonContainer}>
              <ResponsiveButton
                key='directions'
                label='Directions'
                labelStyle={{fontWeight: '600'}}
                style={styles.directionsButton}
                gradientColors={['#F3CB14', '#E58B37']}
                horizontalGradient={true}
                onPress={() => this.drawRoute()}
              />
            </View>
          </View>
        : undefined}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  clickableText: {
    color: '#4289DD',
    textDecorationLine: 'underline'
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    flexDirection: 'column',
    backgroundColor: '#FFF',
    width: WINDOW_WIDTH * 0.8,
    height: WINDOW_HEIGHT * 2/3,
    paddingHorizontal: 30,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderWidth: 3,
    borderColor: '#E58B37',
    justifyContent: 'space-between'
  },
  closeButtonContainer: {
    position: 'absolute',
    bottom: (WINDOW_HEIGHT * 5/6) - 12,
    right: (WINDOW_WIDTH * 0.1) - 20,
  },
  closeButton: {
    paddingVertical: 11,
    paddingHorizontal: 15,
    borderRadius: 100
  },
  directionsButtonContainer: {
    marginTop: -25
  },
  directionsButton: {
    alignSelf: 'center',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 100
  },
  swipeUpDirections: {
    backgroundColor: '#FFF'
  },
  travelModeBar: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  itemFull: {
    height: '100%'
  }
});

MapScreen.propTypes = {
	navigation: PropTypes.object.isRequired
};