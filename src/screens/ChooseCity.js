import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Text, Dimensions, Picker } from "react-native";
import { Location } from 'expo';
import Toaster from 'react-native-toaster';
import ResponsiveButton from '../components/ResponsiveButton';
import OpsLogo from "../components/logos/OpsLogo";
import CityCarousel from "../components/CityCarousel";

const colours = [
  ['rgba(55, 208, 229, 0.9)', 'rgba(66, 137, 221, 0.9)'],
  ['rgba(194, 55, 229, 0.9)', 'rgba(209, 66, 221, 0.9)'],
  ['rgba(229, 55, 55, 0.9)', 'rgba(221, 66, 150, 0.9)'],
  ['rgba(55, 229, 93, 0.9)', 'rgba(66, 221, 175, 0.9)']
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
      locationDisabled: false,
      cities: [],
      sites: []
    }
    this.enableLocationServices = this.enableLocationServices.bind(this);
  }

  componentDidMount() {
    let self = this;

    const cityUrl = "https://8zt1ebdsoj.execute-api.ca-central-1.amazonaws.com/prod/city";
    fetch(cityUrl, {
      method: "GET",
      body: null,
      headers: {}
    }).then((response) => {
      self.setState({
        cities: JSON.parse(response._bodyInit)
      });
    });

    const siteUrl = "https://8zt1ebdsoj.execute-api.ca-central-1.amazonaws.com/prod/site";
    fetch(siteUrl, {
      method: "GET",
      body: null,
      headers: {}
    }).then((response) => {
      self.setState({
        sites: JSON.parse(response._bodyInit)
      });
    });
  }

  renderCities() {
    let allCitiesRendered = [];
    for (let i = 0; i < this.state.cities.length; i += 2) {
      allCitiesRendered.push(this.renderCityRow(i));
    }

    console.log("HELLO");
    console.log(allCitiesRendered);
    return allCitiesRendered;
  }

  renderCityRow(index) {
    let firstCity = this.state.cities[index];
    let firstCityServices = this.addSites(firstCity.cid);
    let secondCity;
    let secondCityServices = [];

    if (index + 1 !== this.state.cities.length) {
      secondCity = this.state.cities[index + 1];
      secondCityServices = this.addSites(secondCity.cid);
    }

    let i = index > 3 ? 0 : index;
    
    return (
      <View key={index} style={{flexDirection: "row", justifyContent: "space-between", padding: 10}}>
        {this.renderCityButton(firstCity.city, colours[i], {"latitude": parseFloat(firstCity.lat), "longitude": parseFloat(firstCity.lon)}, firstCityServices)}
        {this.renderCityButton(secondCity.city, colours[i+1], {"latitude": parseFloat(secondCity.lat), "longitude": parseFloat(secondCity.lon)}, secondCityServices)}
      </View>
    );
  }

  addSites(cid) {
    let services = [];
    this.state.sites.forEach(site => {
      if (site.cid === cid) {
        services.push(site);
      }
    });
    
    return services;
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
        {this.state.isAnonymous ? <CityCarousel items={this.renderCities()} /> : undefined}
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
    marginTop: '5%',
    fontWeight: '200'
  },
  opsLogoStyle: {
    padding: 0,
    marginTop: "5%"
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
