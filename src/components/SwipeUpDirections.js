import React from "react";
import { Dimensions, View, ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";
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
      showSearch: true,
      searchLocation: '',
      instructions: this.props.instructions,
      autoFocus: false
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.instructions != prevProps.instructions) {
      this.setState({ instructions: this.props.instructions });
    }
  }

  renderInstructions() {
    const { instructions } = this.state;
    if (instructions === undefined) return null;

    let output = [];
    for (let i = 0; i<instructions.length; i++) {
      output.push(<Text key={i}>{instructions[i].replace(/(<([^>]+)>)/ig,"")+'\n'}</Text>);
    }
    return output;
  }

  render() {
    const { showSearch, searchLocation, instructions, autoFocus } = this.state;
    return (
      <SwipeUpDown
        animation="easeInEaseOut"
        disablePressToShow={true}
        hasRef={ref => (this.swipeUpDownRef = ref)}
        onShowMini={() => searchLocation !== '' ? this.setState({showSearch: false}) : null}
        style={styles.swipeUpDirections}
        swipeHeight={WINDOW_HEIGHT/3}
        itemMini={
          <View style={styles.itemMini}>
            <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 10, borderBottomWidth: 1}}>
              <View style={{flex: 1, marginRight: 10}}>
                <Text style={styles.subtitle}>To {this.props.destination.name}</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.body}>From: {!this.props.isAnonymous ? <Text style={styles.body}>My Location</Text> : <Text style={[styles.clickableText, styles.body]} onPress={() => {this.setState({showSearch: true, autoFocus: true}); this.swipeUpDownRef.showFull()}}>{searchLocation != '' ? searchLocation : 'Enter a location'}</Text>}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={this.props.hideDirections}>
                <Ionicons style={{width: 32}} name="md-close-circle" size={32} color='#000'/>
              </TouchableOpacity>
            </View>

            <View style={styles.instructions}>
              {this.renderInstructions()}
            </View>
          </View>
        }
        itemFull={
          <View style={styles.itemFull}>
            <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 10, borderBottomWidth: 1}}>
              <View style={{flex: 1, marginRight: 10}}>
                <Text style={styles.subtitle}>To {this.props.destination.name}</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.body}>From: {!this.props.isAnonymous ? 'My Location' : !showSearch ? <Text style={[styles.clickableText, styles.body]} onPress={() => this.setState({showSearch: true})}>{searchLocation}</Text> : null}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={this.props.hideDirections}>
                <Ionicons style={{width: 32}} name="md-close-circle" size={32} color='#000'/>
              </TouchableOpacity>
            </View>

            {(this.props.isAnonymous && showSearch) ?
              <GooglePlacesAutocomplete
                placeholder='Enter Location'
                minLength={2}
                autoFocus={autoFocus}
                returnKeyType={'default'}
                fetchDetails={true}
                query={{ key: GOOGLE_MAPS_APIKEY, types: 'address' }}
                getDefaultValue={() => searchLocation}
                styles={{}}
                renderRightButton={() => {if (searchLocation !== '') return <Text style={styles.clickableText} onPress={() => this.setState({showSearch: false})}>Cancel</Text>}}
                textInputProps={{onFocus: () => this.setState({autoFocus: false})}}
                onPress={(data, details = null) => {
                  this.setState({showSearch: false, searchLocation: details.formatted_address});
                  this.props.setOrigin(details.geometry.location.lat, details.geometry.location.lng);
                  this.swipeUpDownRef.showMini();
                  this.props.centerMapOnRoute();
                }}
              />
            : null }

            {(!this.props.isAnonymous || !showSearch) ? 
              <ScrollView
                alwaysBounceVertical={false}
                bounces={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}

              >
                {this.renderInstructions()}
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
  title: {
    fontSize: 20
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 3
  },
  heading: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 14,
    marginBottom: 3
  },
  small: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 5
  },
  body: {
    fontSize: 16
  },
  instructions: {
    flex: 1,
    flexShrink: 1
  }
});

SwipeUpDirections.propTypes = {
  centerMapOnRoute: PropTypes.func.isRequired,
  destination: PropTypes.object,
  hideDirections: PropTypes.func.isRequired,
  instructions: PropTypes.array,
  isAnonymous: PropTypes.number.isRequired,
  setOrigin: PropTypes.func.isRequired
}

export default SwipeUpDirections;