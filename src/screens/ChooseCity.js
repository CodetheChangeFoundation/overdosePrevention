import { View, StyleSheet, Text, Dimensions } from "react-native";
import { Picker, Item } from "native-base";
import { Dropdown } from "react-native-material-dropdown";
import ResponsiveButton from '../components/ResponsiveButton';
import React from "react";
import MapScreen from "./Map";
import PropTypes from "prop-types";
import OpsLogo from "../components/OpsLogo";

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

const windowWidth =  Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class ChooseCityScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAnonymous: true,
            currentCity: {
                name: "Vancouver",
                coordinates: {
                    latitude: 49.2827,
                    longitude: -123.1207,
            }},
            activeButton: ""
        }
        this.setCurrentCity = this.setCurrentCity.bind(this);
        this.navigateToMapScreen = this.navigateToMapScreen.bind(this);
    }

    renderCities() {
        let allCitiesRendered = [];
        for (let i = 0; i < cityData.length; i += 2) {
            allCitiesRendered.push(this.renderCityRow(i));
        }
        return allCitiesRendered;
    }

    renderCityRow(index) {
        let firstCity = cityData[index];
        let secondCity;
        if (index + 1 != cityData.length) {
            secondCity = cityData[index + 1];
        }
        return (
            <View key={index} style={{flexDirection: "row", justifyContent: "space-between", padding: 10}}>
                {this.renderCityButton(firstCity.name, firstCity.color, firstCity.coordinates)}
                {this.renderCityButton(secondCity.name, secondCity.color, secondCity.coordinates)}
            </View>
        );
    }

    renderCityButton(name, color, coordinates) {
        const gradientColors = this.state.activeButton === name ? ['#f1e100', '#dd9904'] : color;
        return (
            <ResponsiveButton
                key = {name}
                label = {name}
                labelStyle = {{fontWeight: '600'}}
                style = {styles.cityButton}
                gradientColors = {gradientColors}
                horizontalGradient = {false}
                onPress = {() => this.setCurrentCity(name, coordinates)}
            />
        );
    }

    setCurrentCity(name, coordinates) {
        this.setState({
            currentCity: {
                name: name,
                coordinates: coordinates
            },
            activeButton: name
        });
    }

    navigateToMapScreen() {
        this.props.navigation.navigate('MapScreen',
            {coordinates: this.state.currentCity.coordinates});
    }

    // The second picker is not a picker, Its a hack to keep styling consistent
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{padding:25}}>
                        <OpsLogo/>
                    </View>
                    <View>
                        <Item picker>
                            <Picker
                             //  iosIcon is causing dependency issues
                             // iosIcon={<Icon name="ios-arrow-down-outline"/>}
                                placeholder="Stay anonymous?"
                                placeholderStyle={{color: "#474a59", fontWeight: '300', width: '80%'}}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.isAnonymous}
                                onValueChange={(itemValue) => this.setState({isAnonymous: itemValue})}
                            >
                                <Picker.Item label="Stay anonymous" value="true"/>
                                <Picker.Item label="Use my current location" value="false"/>
                            </Picker>
                        </Item>
                        <Item picker>
                            <Picker
                                placeholder="Select City"
                                enabled = {false}
                                placeholderStyle={{color: "#474a59", fontWeight: '300', width: '80%'}}
                            />
                        </Item>
                    </View>
                    <View>{this.renderCities()}</View>
                    <ResponsiveButton
                        onPress = {this.navigateToMapScreen}
                        horizontalGradient = {true}
                        labelStyle = {{fontWeight: '600'}}
                        style = {styles.continueButton}
                        gradientColors = {['#F3CB14', '#E58B37']}
                        label = "Continue"
                    />
                    <Text style = {{marginTop: '10%', fontWeight: '200'}}>
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
    }
})

ChooseCityScreen.propTypes = {
    navigation: PropTypes.object.isRequired
};
