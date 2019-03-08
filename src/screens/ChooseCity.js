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
        return (
            <Button
                key={name}
                title={name}
                containerViewStyle={{width: "40%"}}
                backgroundColor={color}
                rounded={true}
                onPress={() => this.props.navigation.navigate('MapScreen', {coordinates: coordinates})}
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
