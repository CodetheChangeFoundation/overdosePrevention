import {Button, Text, View} from "react-native";
import React from "react";
import MapScreen from "./Map";
import PropTypes from "prop-types";

export default class ChooseCityScreen extends React.Component {
    static ScreenName = "ChooseCityScreen";

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Choose City Screen</Text>
                <Button
                    title="Go To Map Screen"
                    onPress={() => this.props.navigation.navigate(MapScreen.ScreenName)}
                />
            </View>
        );
    }
}

ChooseCityScreen.propTypes = {
    navigation: PropTypes.object.isRequired
};