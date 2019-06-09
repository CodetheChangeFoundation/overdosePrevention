import React from "react";
import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import DetoxLogo from './logos/DetoxLogo';
import NurseLogo from './logos/NurseLogo';
import NeedleLogo from './logos/NeedleLogo';
import ReplacementLogo from './logos/ReplacementLogo';
import MobileUnitLogo from "./logos/MobileUnitLogo";
import PipeLogo from "./logos/PipeLogo";

// Sample format of what would need to be passed onto this component
const sampleData = [
  {
    name: "Service One",
    type: "Nurse",
    coordinates: {
      latitude: 49.1913,
      longitude: -122.8490,
    }
  },
  {
    name: "Service Two",
    type: "Detox",
    coordinates: {
      latitude: 49.1913,
      longitude: -122.8490,
    }
  },
  {
    name: "Service Three",
    type: "Supervised Injection",
    coordinates: {
      latitude: 49.1913,
      longitude: -122.8490,
    }
  },
  {
    name: "Service Four",
    type: "Replacement",
    coordinates: {
      latitude: 49.1913,
      longitude: -122.8490,
    }
  },
  {
    name: "Service Five",
    type: "Mobile Unit",
    coordinates: {
      latitude: 49.1913,
      longitude: -122.8490,
    }
  },
  {
    name: "Service Six",
    type: "Pipe",
    coordinates: {
      latitude: 49.1913,
      longitude: -122.8490,
    }
  }
];

// A map of each service type and the corresponding logo and style to use
const logosToUse = {
  "Supervised Injection": {
    viewStyle: {backgroundColor: '#C237E5'},
    logo: <NeedleLogo/>
  },
  "Pipe": {
    viewStyle: {backgroundColor: '#E58B37'},
    logo: <PipeLogo/>
  },
  "Nurse": {
    viewStyle: {backgroundColor: '#DD4271'},
    logo: <NurseLogo/>
  },
  "Replacement": {
    viewStyle: {backgroundColor: '#E53737'},
    logo: <ReplacementLogo/>
  },
  "Detox": {
    viewStyle: {backgroundColor: '#4289DD'},
    logo: <DetoxLogo/>
  },
  "Mobile Unit": {
    viewStyle: {backgroundColor: '#74DD42'},
    logo: <MobileUnitLogo/>
  }
};

const windowWidth = Dimensions.get('window').width;

/*
* SearchContainer is the actual data with the search bar and all the different services
* for the bottom search container in the map screen
*/
class SearchContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: props.isExpanded
    };

    this.renderService = this.renderService.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isExpanded !== this.props.isExpanded) {
      this.setState({
        isExpanded: this.props.isExpanded
      });
    }
  }


  /*
  * Renders an individual service
  * @param {Object} service - a service that contains type of service, name, and its coordinates
  */
  renderService(service) {
    return (
      <View key={service.name} style={styles.serviceContainer}>
        <TouchableOpacity
          onPress={() => this.props.onLogoPress(service.coordinates)}
          style={[styles.serviceLogo, logosToUse[service.type].viewStyle]}
        >
          {logosToUse[service.type].logo}
        </TouchableOpacity>
        <Text>
          {service.type}
        </Text>
      </View>
    );
  }

  render() {
    // isExpanded refers to whether or not the containing upwards sliding component is expanded
    if (!this.state.isExpanded) {
      return (
        <View>
          <Text style={styles.textStyle}>Filter</Text>
        </View>
      );
    } else {
      const services = sampleData.map(this.renderService);
      return (
        <View>
          <View style={styles.servicesBox}>
            {services}
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  servicesBox: {
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    flexWrap: 'wrap'
  },
  serviceContainer: {
    // width: sampleData.length >= 4 ? windowWidth * 0.19 : windowWidth * 0.27,
    width: "25%",
    alignItems: "center",
    margin: windowWidth * 0.02
  },
  serviceLogo: {
    borderRadius: 40,
    padding: 10
  },
  textStyle: {
    color: "#FFF",
    fontWeight: '600',
    width: '100%',
    fontSize: 18,
    marginTop: 10,
    height: 250
  }
});

SearchContainer.propTypes = {
  onLogoPress: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired
}

export default SearchContainer;