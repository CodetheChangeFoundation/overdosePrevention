import React from 'react';
import PropTypes from "prop-types";
import Carousel from 'react-native-snap-carousel';
import { Dimensions, StyleSheet, Text, View } from "react-native";
import ResponsiveButton from './ResponsiveButton';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
const colours = [
  ['rgba(55, 208, 229, 0.9)', 'rgba(66, 137, 221, 0.9)'],
  ['rgba(194, 55, 229, 0.9)', 'rgba(209, 66, 221, 0.9)'],
  ['rgba(229, 55, 55, 0.9)', 'rgba(221, 66, 150, 0.9)'],
  ['rgba(55, 229, 93, 0.9)', 'rgba(66, 221, 175, 0.9)']
];

class CityCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cities: props.cities,
      sites: props.sites
    };
  }

  renderCities() {
    const { cities, sites } = this.state;
    let allCitiesRendered = [];
    let cityButtons = [];

    for (let i = 0; i < cities.length; i++) {
      let cityButton = this.renderCityButton(cities[i].city, colours[i%4], { "latitude": parseFloat(cities[i].lat), "longitude": parseFloat(cities[i].lon) }, this.addSites(cities[i].cid))
      cityButtons.push(cityButton);
      if ((i+1)%4 === 0 || (i+1) === cities.length) {
        allCitiesRendered.push(<View key={i} style={styles.cityButtonsContainer}>{cityButtons}</View>);
        cityButtons = [];
      }
    }

    return allCitiesRendered;
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

  renderItem({item, index}) {
    return (
      <View>
        {item}
      </View>
    );
  }

  render() {
    return (
      <Carousel
        renderItem={this.renderItem}
        data={this.renderCities()}
        sliderWidth={windowWidth}
        itemWidth={windowWidth * 0.85}
        loop={true}
      />
    );
  }
}

const styles = StyleSheet.create({
  cityButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  cityButton: {
    borderRadius: 15,
    marginBottom: windowWidth * 0.05,
    padding: 20,
    width: (windowWidth * 0.8)/2
  }
});

CityCarousel.propTypes = {
  cities: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
  sites: PropTypes.array.isRequired
};

export default CityCarousel;