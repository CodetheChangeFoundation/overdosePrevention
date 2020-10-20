import React from "react";
import { Alert, Dimensions, View, ScrollView, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import PropTypes from "prop-types";
import SwipeUpDown from './react-native-swipe-up-down/index';
import { Ionicons } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import GOOGLE_MAPS_APIKEY from './GoogleMapsAPIKey';
import ResponsiveButton from './ResponsiveButton';

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

class SwipeUpDirections extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showSearch: this.props.fromLocation === '' ? true : false,
      fromLocation: this.props.fromLocation,
      instructions: this.props.instructions,
      autoFocus: false
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.instructions != prevProps.instructions) {
      this.setState({ instructions: this.props.instructions });
    }

    if (this.props.fromLocation != prevProps.fromLocation) {
      this.setState({ fromLocation: this.props.fromLocation });
    }
  }

  renderHeader(isMini) {
    const { fromLocation } = this.state;
    let closeButton, fromText = null;

    if (isMini) {
      closeButton = (
        <TouchableOpacity onPress={this.props.hideDirections}>
          <Ionicons style={{width: 32}} name="md-close-circle" size={32} color='#000'/>
        </TouchableOpacity>
      );
    } else {
      closeButton = (
        <TouchableOpacity onPress={() => this.swipeUpDownRef.showMini()}>
          <Text style={[styles.subtitle, styles.clickableText]}>Done</Text>
        </TouchableOpacity>
      );
    }

    if (!this.props.isAnonymous) {
      fromText = 'My Location';
    } else {
      fromText = (
        <Text 
          style={[styles.clickableText, styles.body]}
          onPress={() => {this.setState({showSearch: true, autoFocus: true}); this.swipeUpDownRef.showFull()}}>
            {fromLocation !== '' ? fromLocation : 'Enter a location'}
        </Text>
      );
    }

    return (
      <View style={{flexDirection: 'row', paddingBottom: 10, borderBottomWidth: 1}}>
        <View style={{flex: 1, marginRight: 10}}>
          <Text style={styles.subtitle}>To {this.props.destination.name}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.body}>From: {fromText}</Text>
          </View>
          {(fromLocation !== '' || fromText === 'My Location') &&
            <>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Text style={styles.body}>Estimated Time: {Math.round(this.props.duration)} minutes</Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <ResponsiveButton
                  label='Open in Google Maps'
                  labelStyle={{fontWeight: '600'}}
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    borderRadius: 13
                  }}
                  gradientColors={['#C45146', '#C45146']}
                  horizontalGradient={false}
                  rounded={true}
                  onPress={async () => {
                    const url = `https://www.google.com/maps/dir/?api=1&destination=${this.props.destination.lat},${this.props.destination.lon}&origin=${encodeURIComponent(this.props.fromLocation)}&travelmode=${this.props.travelMode.toLowerCase()}`
                    Linking.openURL(url);
                  }}
                />
              </View>
            </>
          }
        </View>
        {closeButton}
      </View>
    );
  }

  renderInstructions() {
    const { instructions } = this.state;
    if (instructions === undefined) return null;

    let output = [];
    for (let i = 0; i<instructions.length; i++) {
      output.push(<Text key={i} style={styles.body}>{instructions[i].replace(/(<([^>]+)>)/ig," ").replace(/\s+/g," ").trim()+'\n'}</Text>);
    }
    return output;
  }

  render() {
    const { showSearch, fromLocation, autoFocus } = this.state;
    return (
      <SwipeUpDown
        animation="easeInEaseOut"
        disablePressToShow={true}
        disableSwipeDown={true}
        hasRef={ref => (this.swipeUpDownRef = ref)}
        onShowMini={() => fromLocation !== '' && this.setState({showSearch: false})}
        style={styles.swipeUpDirections}
        swipeHeight={WINDOW_HEIGHT/3}
        itemMini={
          <View style={styles.itemMini}>
            {this.renderHeader(true)}

            <View style={styles.instructions}>
              {this.renderInstructions()}
            </View>
          </View>
        }
        itemFull={
          <View style={styles.itemFull}>
            {this.renderHeader(false)}

            {(this.props.isAnonymous && showSearch) ?
              <GooglePlacesAutocomplete
                placeholder='Enter Location'
                minLength={2}
                autoFocus={autoFocus}
                returnKeyType={'default'}
                fetchDetails={true}
                isRowScrollable={false}
                disableScroll={false}
                query={{ key: GOOGLE_MAPS_APIKEY, types: 'address' }}
                getDefaultValue={() => fromLocation}
                styles={searchBarStyles}
                renderRightButton={() => {if (fromLocation !== '') return <Text style={styles.clickableText} onPress={() => this.setState({showSearch: false})}>Cancel</Text>}}
                textInputProps={{onFocus: () => this.setState({autoFocus: false})}}
                onPress={(data, details = null) => {
                  this.setState({showSearch: false});
                  this.props.setfromLocation(details.formatted_address);
                  this.props.setOrigin(details.geometry.location.lat, details.geometry.location.lng);
                  this.swipeUpDownRef.showMini();
                  this.props.centerMapOnRoute();
                }}
              />
            : null }

            {(!this.props.isAnonymous || !showSearch) ? 
              <ScrollView
                alwaysBounceVertical={true}
                bounces={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={styles.instructions}
              >
                {this.renderInstructions()}
                <View style={{height: 200}}/>
              </ScrollView>
            : null}

          </View>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  clickableText: {
    color: '#4289DD'
  },
  swipeUpDirections: {
    backgroundColor: '#FFF'
  },
  itemMini: {
    height: '100%',
    backgroundColor: '#FFF'
  },
  itemFull: {
    height: '100%',
    backgroundColor: '#FFF'
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 3
  },
  body: {
    fontSize: 16
  },
  instructions: {
    paddingVertical: 5
  }
});

const searchBarStyles = StyleSheet.create({
  row: {
    width: WINDOW_WIDTH-20
  },
  textInputContainer: {
    width: '100%',
    backgroundColor: '#FFF',
    alignItems: 'center'
  },
  description: {
    fontSize: 16
  },
  poweredContainer: {
    display: 'none'
  }
})

SwipeUpDirections.propTypes = {
  centerMapOnRoute: PropTypes.func.isRequired,
  destination: PropTypes.object,
  duration: PropTypes.number,
  fromLocation: PropTypes.string.isRequired,
  hideDirections: PropTypes.func.isRequired,
  instructions: PropTypes.array,
  isAnonymous: PropTypes.number.isRequired,
  setfromLocation: PropTypes.func.isRequired,
  setOrigin: PropTypes.func.isRequired,
  travelMode: PropTypes.string
}

export default SwipeUpDirections;