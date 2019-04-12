import {View} from "react-native";
import {Picker, Item, Icon} from "native-base";
import {Button} from "react-native-elements";
import React from "react";
import MapScreen from "./Map";
import PropTypes from "prop-types";
import OpsLogo from "../components/OpsLogo";

const cityData = [
    {
        name: "Vancouver",
        color: "blue",
        coordinates: {
            latitude: 49.2827,
            longitude: -123.1207,
        }
    },
    {
        name: "Surrey",
        color: "purple",
        coordinates: {
            latitude: 49.1913,
            longitude: -122.8490,
        }
    },
    {
        name: "Burnaby",
        color: "red",
        coordinates: {
            latitude: 49.2488,
            longitude: -122.9805,
        }
    },
    {
        name: "Richmond",
        color: "green",
        coordinates: {
            latitude: 49.1666,
            longitude: -123.1336,
        }
    }
];

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

export default class ChooseCityScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isAnonymous: true}
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

    renderCityButton(name, color, cityCoordinates, cityServices) {
        return (
            <Button
                key={name}
                title={name}
                containerViewStyle={{width: "40%"}}
                backgroundColor={color}
                rounded={true}
				onPress={() => this.props.navigation.navigate('MapScreen', {coordinates: cityCoordinates, services: cityServices
				})}
            />
        );
    }


    // The second picker is not a picker, Its a hack to keep styling consistent
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <View styles={{padding:25}}> <OpsLogo/> </View>
                    <View styles={{padding:15}}>
                        <Item picker>
                            <Picker
                             //  iosIcon is causing dependency issues
                             // iosIcon={<Icon name="ios-arrow-down-outline"/>}
                                placeholder="Stay anonymous?"
                                placeholderStyle={{color: "#474a59"}}
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
                                placeholderStyle={{color: "#474a59"}}
                            />
                        </Item>
                    </View>
                    <View>{this.renderCities()}</View>
            </View>
        );
    }
}

ChooseCityScreen.propTypes = {
    navigation: PropTypes.object.isRequired
};
