import React from "react";
import PropTypes from "prop-types";
import { SafeAreaView, View, StyleSheet, Text, Image, Dimensions, Picker, Linking } from "react-native";
import { Location, Permissions } from 'expo';
import Toaster from 'react-native-toaster';
import ResponsiveButton from '../components/ResponsiveButton';
import OpsLogo from "../components/logos/OpsLogo";
import CityCarousel from "../components/CityCarousel";

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
      fetchStatus: "Loading",
      cities: [],
      sites: []
    }
    this.enableLocationServices = this.enableLocationServices.bind(this);
  }

  componentDidMount() {
    let self = this;
    const cityUrl = "https://tm4j6jd16k.execute-api.ca-central-1.amazonaws.com/prod/city";
    const siteUrl = "https://tm4j6jd16k.execute-api.ca-central-1.amazonaws.com/prod/site";
    
    fetch(cityUrl)
      .then(response => response.json())
      .then(responseJSON => {
        self.setState({
          cities: responseJSON
        });
      })
      .then(() => {
        fetch(siteUrl)
          .then(response => response.json())
          .then(responseJSON => {
            self.setState({
              sites: responseJSON,
              fetchStatus: "Success"
            });
          })
          .catch(function(error) {
            self.setState({
              fetchStatus: "Failure"
            });
          });
      })
      .catch(function(error) {
        self.setState({
          fetchStatus: "Failure"
        });
      });
  }

  enableLocationServices = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        isAnonymous: 1,
        locationDisabled: true
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.props.navigation.navigate('Map', {
      isAnonymous: 0,
      coordinates: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      },
      services: this.state.sites
    });
  }

  renderToaster() {
    const { locationDisabled } = this.state;
    const locationError = "Location services disabled, please choose a city.";
    if (locationDisabled) {
      return (
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
        />
      )
    } else {
      return null;
    }
  }

  renderLogoAndPicker() {
    const { isAnonymous, locationDisabled } = this.state;
    return (
      <View>
        {this.renderToaster()}
        <View style={styles.opsLogoStyle}>
          <OpsLogo />
        </View>
        <Picker 
          selectedValue={isAnonymous} 
          onValueChange={itemValue => this.setState({ isAnonymous: itemValue }) }>
          <Picker.Item label="Stay anonymous" value={1} />
          {!locationDisabled ? ( <Picker.Item label="Use my current location" value={0} /> ) : ( undefined )}
        </Picker>
      </View>
    );
  }

  renderDisclaimer() {
    return (
      <View>
        <Text style={styles.disclaimer}>
          No information will be tracked or saved.
        </Text>
        <Text style={styles.ctc}>
          Developed by <Text style={styles.clickableText} onPress={() => this.handleWebsiteLinkPress('http://codethechange.ca')}>Code the Change Foundation</Text>.
        </Text>
      </View>
    )
  }

  handleWebsiteLinkPress(link) {
    Linking.openURL(link);
  };

  render() {
    const { isAnonymous, fetchStatus, cities, sites } = this.state;
    if (isAnonymous) {
      if (fetchStatus === "Success") {
        return (
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.containerStyle}>
              {this.renderLogoAndPicker()}
              <View style={styles.carouselContainer}>
                <Text style={styles.textStyle}>Select City</Text>
                <CityCarousel cities={cities} sites={sites} navigation={this.props.navigation}/>
              </View>
              {this.renderDisclaimer()}
            </View>
          </SafeAreaView>
        );
      } else if (fetchStatus === "Failure") {
        return (
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.containerStyle}>
              {this.renderLogoAndPicker()}
              <View style={styles.carouselContainer}>
                <Text style={styles.disclaimer}>An error occurred while retrieving the data. Please try again.</Text>
                <ResponsiveButton
                  onPress={() => {this.setState({fetchStatus: 'Loading'}); this.componentDidMount()}}
                  horizontalGradient={true}
                  labelStyle={{ fontWeight: "600" }}
                  style={styles.tryAgainButton}
                  gradientColors={["#F3CB14", "#E58B37"]}
                  label="Try Again"
                />
              </View>
              {this.renderDisclaimer()}
            </View>
          </SafeAreaView>
        );
      } else {
        return (
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.containerStyle}>
              {this.renderLogoAndPicker()}
              <View style={styles.carouselContainer}>
                <Image style={{width: 60, height: 60}} source={require('../../assets/loading_spinner.gif')} />
                <Text style={styles.disclaimer}>Loading</Text>
              </View>
              {this.renderDisclaimer()}
            </View>
          </SafeAreaView>
        );
      }
    } else {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.containerStyle}>
            {this.renderLogoAndPicker()}
            <ResponsiveButton
              onPress={this.enableLocationServices}
              horizontalGradient={true}
              labelStyle={{ fontWeight: "600" }}
              style={styles.continueButton}
              gradientColors={["#F3CB14", "#E58B37"]}
              label="Continue"
            />
            {this.renderDisclaimer()}
          </View>
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  opsLogoStyle: {
    marginTop: 35,
    alignSelf: 'center'
  },
  continueButton: {
    alignItems: 'center',
    alignSelf: 'center',
    padding: 15,
    width: windowWidth * 0.8,
    borderRadius: 30,
    marginTop: windowHeight * 0.05,
  },
  tryAgainButton: {
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  carouselContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    color: "#474a59",
    fontWeight: '300',
    width: windowWidth * 0.85,
    fontSize: 18,
    alignSelf: 'center',
    marginBottom: 10
  },
  disclaimer: {
    marginBottom: 5,
    fontWeight: '200',
    textAlign: 'center'
  },
  ctc: {
    marginBottom: 15,
    fontWeight: '200',
    textAlign: 'center',
    fontSize: 12
  },
  clickableText: {
    color: '#4289DD'
  }
});

ChooseCityScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};
