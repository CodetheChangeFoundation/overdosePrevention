import React from "react";
import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import DetoxLogo from './logos/DetoxLogo';
import NurseLogo from './logos/NurseLogo';
import NeedleLogo from './logos/NeedleLogo';
import ReplacementLogo from './logos/ReplacementLogo';
import MobileUnitLogo from "./logos/MobileUnitLogo";
import PipeLogo from "./logos/PipeLogo";

const serviceTypes = [
  "Nurse",
  "Detox",
  "Supervised Injection",
  "Replacement",
  "Mobile Unit",
  "Pipe"
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

  renderService(serviceType) {
    // TODO: TouchableOpacity takes a lot of clicks before it works
    return (
      <TouchableOpacity
        key={serviceType}
        onPress={() => this.props.onServicePress(serviceType)}
        style={styles.serviceContainer}
      >
        <View style={[styles.serviceLogo, logosToUse[serviceType].viewStyle]}>
          {logosToUse[serviceType].logo}
        </View>
        <Text>
          {serviceType}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    if (!this.state.isExpanded) {
      return (
        <View>
          <Text style={styles.textStyle}>Filter</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.servicesBox}>
          {serviceTypes.map(this.renderService)}
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
  onServicePress: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired
}

export default SearchContainer;