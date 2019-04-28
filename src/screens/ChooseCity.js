import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Text, Dimensions, Picker } from "react-native";
import { Location } from 'expo';
import Toaster from 'react-native-toaster';
import ResponsiveButton from '../components/ResponsiveButton';
import OpsLogo from "../components/logos/OpsLogo";

// TODO: remove
const cityData = [
  {
    name: "Vancouver",
    color: ['rgba(55, 208, 229, 0.9)', 'rgba(66, 137, 221, 0.9)'],
    coordinates: {
      latitude: 49.2827,
      longitude: -123.1207,
    }
  },
  {
    name: "Surrey",
    color: ['rgba(194, 55, 229, 0.9)', 'rgba(209, 66, 221, 0.9)'],
    coordinates: {
      latitude: 49.1913,
      longitude: -122.8490,
    }
  },
  {
    name: "Burnaby",
    color: ['rgba(229, 55, 55, 0.9)', 'rgba(221, 66, 150, 0.9)'],
    coordinates: {
      latitude: 49.2488,
      longitude: -122.9805,
    }
  },
  {
    name: "Richmond",
    color: ['rgba(55, 229, 93, 0.9)', 'rgba(66, 221, 175, 0.9)'],
    coordinates: {
      latitude: 49.1666,
      longitude: -123.1336,
    }
  }
];

// TODO: remove
const serviceData = [
	{
		name: "Insite Supervised Injection Site",
		address: "139 E Hastings St, Vancouver, BC",
		phoneNumber: "(604) 694-7779",
		hours: "Monday to Sunday - 9:00AM to 3:00AM",
		city: "Vancouver",
		coordinates: {
      latitude: 49.281603,
      longitude: -123.101245,
    }
	},
	{
		name: "The University of British Columbia",
		address: "2329 West Mall, Vancouver, BC",
		phoneNumber: "(604) 822-2211",
		hours: "Monday to Sunday - 8:00AM to 6:00PM",
		city: "Vancouver",
		coordinates: {
      latitude: 49.261084,
      longitude: -123.245829,
    }
	}
];

const windowWidth =  Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class ChooseCityScreen extends React.Component {
  static navigationOptions = {
    title: 'Location'
  };

  constructor(props) {
    super(props);
    this.state = {
      isAnonymous: 1,
      locationDisabled: false
    }
    this.enableLocationServices = this.enableLocationServices.bind(this);
  }

  // TODO: refactor to use API
  renderCities() {
    let allCitiesRendered = [];
    for (let i = 0; i < cityData.length; i += 2) {
      allCitiesRendered.push(this.renderCityRow(i));
    }
    return allCitiesRendered;
  }

  renderCityRow(index) {
		let firstCity = cityData[index];
		let firstCityServices = []; // array of services from service data
		for (let i = 0, n = serviceData.length; i < n; i++) {
			if (serviceData[i].city === firstCity.name) {
				firstCityServices.push(serviceData[i]);
			}
		}

		let secondCity;
		let secondCityServices = []; // array of services from service data
    if (index + 1 != cityData.length) {
      secondCity = cityData[index + 1];
      for (let i = 0, n = serviceData.length; i < n; i++) {
        if (serviceData[i].city === secondCity.name) {
          secondCityServices.push(serviceData[i]);
        }
      }
    }
      
    return (
      <View key={index} style={{flexDirection: "row", justifyContent: "space-between", padding: 10}}>
        {this.renderCityButton(firstCity.name, firstCity.color, firstCity.coordinates, firstCityServices)}
        {this.renderCityButton(secondCity.name, secondCity.color, secondCity.coordinates, secondCityServices)}
      </View>
    );
  }

  renderCityButton(name, color, coordinates, services) {
    return (
      <ResponsiveButton
        key={name}
        label={name}
        containerViewStyle={{width: "40%"}}
        labelStyle={{fontWeight: '600'}}
        style={styles.cityButton}
        backgroundColor={color}
        gradientColors={color}
        horizontalGradient={false}
        rounded={true}
        onPress={() => this.props.navigation.navigate('Map', {coordinates: coordinates, services: services})}
      />
    );
  }

  enableLocationServices = async () => {
    let self = this;
    Location.requestPermissionsAsync();
    let locationEnabled = await Location.hasServicesEnabledAsync();
    if (locationEnabled) {
      navigator.geolocation.watchPosition((position) => {
        self.props.navigation.navigate('Map', {
          coordinates: position.coords
        });
      },
      (error) => {
        console.log(error);
        this.setLocationFlag();
      });
    } else {
      this.setLocationFlag();
    }
  }

  setLocationFlag() {
    this.setState({
      isAnonymous: 1,
      locationDisabled: true
    });
  }

  render() {
    let locationError = "Location services disabled, please choose a city."
    return (
      <View style={styles.containerStyle}>
        {this.state.locationDisabled ? 
        <Toaster 
          message={{
            text: locationError,
            styles: {    
              container: {
                backgroundColor: '#FF0000',
                height: windowWidth * 0.1,
                alignItems: 'center',
                justifyContent: 'center'
              },
              text: {
                color: '#FFF',
                fontWeight: '600'
            }}
          }}
        /> : undefined}
        <View style={styles.opsLogoStyle}>
          <OpsLogo/>
        </View>
        <View>
          <Picker
            selectedValue={this.state.isAnonymous}
            onValueChange={(itemValue) => this.setState({isAnonymous: itemValue})}
            style={styles.picker}
          >
            <Picker.Item label="Stay anonymous" value={1}/>
            {!this.state.locationDisabled ? <Picker.Item label="Use my current location" value={0}/> : undefined}
          </Picker>
        </View>
        {this.state.isAnonymous ? <Text style={styles.textStyle}>Select City</Text> : undefined}
        {this.state.isAnonymous ? <View>{this.renderCities()}</View> : undefined}
        {!this.state.isAnonymous ?
        <ResponsiveButton
          onPress={this.enableLocationServices}
          horizontalGradient={true}
          labelStyle={{fontWeight: '600'}}
          style={styles.continueButton}
          gradientColors={['#F3CB14', '#E58B37']}
          label="Continue"
        /> : undefined }
        <Text style={styles.disclaimer}>
          No information will be tracked or saved.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  continueButton: {
    alignItems: 'center',
    padding: 15,
    width: windowWidth * 0.8,
    borderRadius: 30,
    marginTop: windowHeight * 0.05,
  },
  cityButton: {
    alignItems: 'flex-start',
    padding: 20,
    width: windowWidth * 0.4,
    borderRadius: 15,
    marginLeft: windowWidth * 0.02,
    marginRight: windowWidth * 0.02,
  },
  picker: {
    backgroundColor: '#FFF',
    color: '#000',
    height: windowWidth * 0.5,
    width: windowWidth
  },
  textStyle: {
    color: "#474a59",
    fontWeight: '300',
    width: '80%',
    fontSize: 18,
    marginLeft: 15,
    marginTop: 15
  },
  disclaimer: {
    marginTop: '10%',
    fontWeight: '200'
  },
  opsLogoStyle: {
    padding: 0
  },
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

ChooseCityScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};
