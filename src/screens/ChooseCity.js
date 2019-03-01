import {View} from "react-native";
import {Picker, Item, Icon} from "native-base";
import {Button} from "react-native-elements";
import React from "react";
import MapScreen from "./Map";
import PropTypes from "prop-types";
import OpsLogo from "../components/OpsLogo";

export default class ChooseCityScreen extends React.Component {
    static ScreenName = "ChooseCityScreen";

    constructor(props) {
        super(props);
        let cityData = [
            {name: "Vancouver", color: "blue"},
            {name: "Surrey", color: "purple"},
            {name: "Burnaby", color: "red"},
            {name: "Richmond", color: "green"}
        ];
        this.state = {isAnonymous: true, cityData: cityData}
    }

    renderCityButton(name, color) {
        return (
            <Button
                key={name}
                title={name}
                containerViewStyle={{width: "40%"}}
                backgroundColor={color}
                rounded={true}
                onPress={() => this.props.navigation.navigate(MapScreen.ScreenName)}
            />
        );
    }

    renderCities() {
        let allCitiesRendered = [];
        for (let i = 0; i < this.state.cityData.length; i += 2) {
            allCitiesRendered.push(this.renderCityRow(i));
        }
        return allCitiesRendered;
    }

    renderCityRow(index) {
        let firstCity = this.state.cityData[index];
        let secondCity;
        if (index + 1 != this.state.cityData.length) {
            secondCity = this.state.cityData[index + 1];
        }
        return (
            <View key={index} style={{flexDirection: "row", justifyContent: "space-between", padding: 10}}>
                {this.renderCityButton(firstCity.name, firstCity.color)}
                {this.renderCityButton(secondCity.name, secondCity.color)}
            </View>
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
                                iosIcon={<Icon name="ios-arrow-down-outline"/>}
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
