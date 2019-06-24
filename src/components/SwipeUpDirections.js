import React from "react";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import SwipeUpDown from './react-native-swipe-up-down/index';
import { Ionicons } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');
const GOOGLE_MAPS_APIKEY = 'AIzaSyBO8JtI4QwXlt2khUX66l71yAi2hEKCsPo';

class SwipeUpDirections extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drawRoute: this.props.drawRoute,
      travelMode: this.props.travelMode,
      searchLocation: '',
      instructions: this.props.instructions
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.drawRoute != prevProps.drawRoute) {
      this.setState({ drawRoute: this.props.drawRoute });
    }

    if (this.props.travelMode != prevProps.travelMode) {
      this.setState({ travelMode: this.props.travelMode });
    }

    if (this.props.instructions != prevProps.instructions) {
      this.setState({ instructions: this.props.instructions });
    }
  }

  render() {
    const { drawRoute, travelMode, searchLocation, instructions } = this.state;
    if (drawRoute) {
      return (
        <SwipeUpDown
          animation="easeInEaseOut"
          disablePressToShow={true}
          hasRef={ref => (this.swipeUpDownRef = ref)}
          onMoveDown={() => this.swipeUpDownRef.showFull()}
          // disableSwipeDown={this.origin === undefined ? true : false}
          style={styles.swipeUpDirections}
          swipeHeight={WINDOW_HEIGHT/3}
          itemMini={
            <View style={styles.itemMini}>
              <View>
                <Text style={styles.clickableText} onPress={this.props.hideDirections}>Cancel</Text>
                <Text>To {this.props.destination.name}</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text>From: </Text>{!this.props.isAnonymous ? <Text>Current location</Text> : <Text style={styles.clickableText} onPress={() => {this.swipeUpDownRef.showFull()}}>{searchLocation != '' ? searchLocation : 'Enter a location'}</Text>}
                </View>
                <Text>{instructions === undefined ? 'undefined' : instructions.map(a => { return a })}</Text>
              </View>
              <View style={styles.travelModeBar}>
                <Ionicons name="md-car" size={32} color={travelMode === 'DRIVING' ? '#E58B37' : '#BDB8B3'} onPress={() => this.props.changeTravelMode('DRIVING')}/>
                <Ionicons name="md-subway" size={32} color={travelMode === 'TRANSIT' ? '#E58B37' : '#BDB8B3'} onPress={() => this.props.changeTravelMode('TRANSIT')}/>
                <Ionicons name="md-walk" size={32} color={travelMode === 'WALKING' ? '#E58B37' : '#BDB8B3'} onPress={() => this.props.changeTravelMode('WALKING')}/>
                <Ionicons name="md-bicycle" size={32} color={travelMode === 'BICYCLING' ? '#E58B37' : '#BDB8B3'} onPress={() => this.props.changeTravelMode('BICYCLING')}/>
              </View>
            </View>
          }
          itemFull={
            <View style={styles.itemFull}>
              <Text style={styles.clickableText} onPress={this.props.hideDirections}>Cancel</Text>
              <Text>To {this.props.destination.name}</Text>
              <View style={{flexDirection: 'row'}}>
                <Text>From: {!this.props.isAnonymous ? 'Current location' : ''}</Text>
              </View>
              {this.props.isAnonymous ?
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
                  predefinedPlaces={!this.props.isAnonymous ? [this.currentLocation] : []}
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
                    this.props.setOrigin(details.geometry.location.lat, details.geometry.location.lng);
                    this.swipeUpDownRef.showMini();
                    this.props.centerMapOnRoute();
                  }}
                />
              : undefined }
              <Text>{instructions === undefined ? 'undefined' : instructions.map(a => { return a })}</Text>
              <View style={styles.travelModeBar}>
                <Ionicons name="md-car" size={32} color={travelMode === 'DRIVING' ? '#E58B37' : '#BDB8B3'} onPress={() => this.props.changeTravelMode('DRIVING')}/>
                <Ionicons name="md-subway" size={32} color={travelMode === 'TRANSIT' ? '#E58B37' : '#BDB8B3'} onPress={() => this.props.changeTravelMode('TRANSIT')}/>
                <Ionicons name="md-walk" size={32} color={travelMode === 'WALKING' ? '#E58B37' : '#BDB8B3'} onPress={() => this.props.changeTravelMode('WALKING')}/>
                <Ionicons name="md-bicycle" size={32} color={travelMode === 'BICYCLING' ? '#E58B37' : '#BDB8B3'} onPress={() => this.props.changeTravelMode('BICYCLING')}/>
              </View>
            </View>
          }
        />
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  clickableText: {
    color: '#4289DD',
    textDecorationLine: 'underline'
  },
  swipeUpDirections: {
    backgroundColor: '#F00'
  },
  travelModeBar: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    height: 32,
    position: 'absolute',
    top: (WINDOW_HEIGHT / 3) - 32 - 29,
    left: 0
  },
  itemMini: {
    height: WINDOW_HEIGHT / 3,
    backgroundColor: '#FF0'
  },
  itemFull: {
    height: '100%',
  }
});

SwipeUpDirections.propTypes = {
  centerMapOnRoute: PropTypes.func.isRequired,
  changeTravelMode: PropTypes.func.isRequired,
  destination: PropTypes.object,
  drawRoute: PropTypes.bool.isRequired,
  hideDirections: PropTypes.func.isRequired,
  instructions: PropTypes.array,
  isAnonymous: PropTypes.number.isRequired,
  setOrigin: PropTypes.func.isRequired,
  travelMode: PropTypes.string.isRequired,
}

export default SwipeUpDirections;