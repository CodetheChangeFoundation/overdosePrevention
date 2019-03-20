import React from "react";
import {SearchBar} from 'react-native-elements';
import PropTypes from "prop-types";
import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from "react-native";
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
        type: "Safe Injection",
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

const windowWidth =  Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// A map of each service type and the corresponding logo and style to use
const logosToUse = {
    "Replacement": {
        viewStyle: {backgroundColor: '#E53737'},
        logo: <ReplacementLogo width = {windowWidth * 0.15} height = {windowWidth * 0.15}/>
    },
    "Detox": {
        viewStyle: {backgroundColor: '#4289DD'},
        logo: <DetoxLogo width = {windowWidth * 0.15} height = {windowWidth * 0.15}/>
    } ,
    "Nurse": {
        viewStyle: {backgroundColor: '#DD4271'},
        logo: <NurseLogo width = {windowWidth * 0.15} height = {windowWidth * 0.15}/>
    },
    "Safe Injection": {
        viewStyle: {backgroundColor: '#C237E5'},
        logo: <NeedleLogo width = {windowWidth * 0.15} height = {windowWidth * 0.15}/>
    },
    "Mobile Unit": {
        viewStyle: {backgroundColor: '#74DD42'},
        logo: <MobileUnitLogo width = {windowWidth * 0.15} height = {windowWidth * 0.15}/>
    },
    "Pipe": {
        viewStyle: {backgroundColor: '#E58B37'},
        logo: <PipeLogo width = {windowWidth * 0.15} height = {windowWidth * 0.15}/>
    },
};

/*
* SearchContainer is the actual data with the search bar and all the different services
* for the bottom search container in the map screen
*/
class SearchContainer extends React.Component {
    constructor(props) {
        super(props);
        this.renderService = this.renderService.bind(this);
    }

    /*
    * Renders an individual service
    * @param {Object} service - a service that contains type of service, name, and its coordinates
    */
    renderService(service) {
        const containerWidth = sampleData.length >= 4 ? windowWidth * 0.19 : windowWidth * 0.27;
        return (
            <View style = {{width: containerWidth, alignItems: "center", margin: windowWidth * 0.02}}>
                <TouchableOpacity
                    onPress = {() => this.props.onLogoPress(service.coordinates)}
                    style = {[{borderRadius: 40, padding: 10}, logosToUse[service.type].viewStyle]}>
                    {logosToUse[service.type].logo}
                </TouchableOpacity>
                <Text>
                    {`${service.type}: ${service.name}`}
                </Text>
            </View>
        );
    }

    render() {
        const searchBar = (
            <SearchBar
                round = {true}
                placeholder = "Search for a place or address"
                containerStyle = {styles.SwipeUpSearch}
                platform = 'default'
                inputContainerStyle = {styles.SwipeUpSearch}
                inputStyle = {{backgroundColor: '#babfc6', borderRadius: 7}}
                lightTheme = {true}
            />
        );

        // isExpanded refers to whether or not the containing upwards sliding component is expanded
        if (!this.props.isExpanded) {
            return (
                <View>
                    {searchBar}
                </View>
            );
        }

        else {
            const services = sampleData.map(this.renderService);
            return (
                <View>
                    {searchBar}
                    <View
                        style = {{flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap'}}>
                        {services}
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    SwipeUpSearch: {
        backgroundColor: '#ccd2dd'
    }
});

SearchContainer.propTypes = {
    onLogoPress: PropTypes.func.isRequired,
    isExpanded: PropTypes.bool.isRequired
}

export default SearchContainer;