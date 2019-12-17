import React from "react";
import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
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
  },
  "Clear Filter": {
    viewStyle: {backgroundColor: '#D0D0D0'},
    logo: <View style={{height: 50, width: 50, justifyContent: 'center', alignItems: 'center'}}><Ionicons name="md-close" size={50} color="#000" /></View>
  }
};

const windowWidth = Dimensions.get('window').width;

class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.renderService = this.renderService.bind(this);
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
        <Text style={styles.serviceText}>
          {serviceType}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.servicesBox}>
        <Text style={styles.filterStyle}>Filter</Text>
        {serviceTypes.map(this.renderService)}
        { this.props.servicesToDisplay !== undefined &&
          <TouchableOpacity
            onPress={() => this.props.onServicePress(undefined)}
            style={styles.serviceContainer}
          >
            <View style={[styles.serviceLogo, logosToUse["Clear Filter"].viewStyle]}>
              {logosToUse["Clear Filter"].logo}
            </View>
            <Text style={styles.serviceText}>Clear Filter</Text>
          </TouchableOpacity>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  servicesBox: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  serviceContainer: {
    width: "25%",
    alignItems: "center",
    marginBottom: 10,
  },
  serviceLogo: {
    borderRadius: 40,
    padding: 10
  },
  serviceText: {
    textAlign: "center"
  },
  filterStyle: {
    fontWeight: '600',
    width: '100%',
    fontSize: 18,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginBottom: 25,
    paddingTop: 20
  }
});

SearchContainer.propTypes = {
  onServicePress: PropTypes.func.isRequired,
  onFilterPress: PropTypes.func,
  servicesToDisplay: PropTypes.any
}

export default SearchContainer;