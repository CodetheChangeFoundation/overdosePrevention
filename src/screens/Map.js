import {Button, Text, View} from "react-native";
import React from "react";
import ChooseCityScreen from "./ChooseCity";
import PropTypes from "prop-types";
import {MapView} from "expo";

export default class MapScreen extends React.Component {
    static ScreenName = "MapScreen";

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center'}}>
                <MapView
                    style={{ flex: 1 }}
                    provider="google"
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
                <Button
                    title="Go Back To Choose City Screen"
                    onPress={() => this.props.navigation.navigate(ChooseCityScreen.ScreenName)}
                />
            </View>
        );
    }
}

MapScreen.propTypes = {
    navigation: PropTypes.object.isRequired
};