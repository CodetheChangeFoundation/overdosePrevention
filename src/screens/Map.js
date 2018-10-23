import {Button, Text, View} from "react-native";
import React from "react";
import ChooseCityScreen from "./ChooseCity";
import PropTypes from "prop-types";

export default class MapScreen extends React.Component {
    static ScreenName = "MapScreen";

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Map Screen</Text>
                <Button
                    title="Map Screen"
                    onPress={() => this.props.navigation.navigate(ChooseCityScreen.ScreenName)}
                />
            </View>
        );
    }
}

MapScreen.propTypes = {
    navigation: PropTypes.object.isRequired
};