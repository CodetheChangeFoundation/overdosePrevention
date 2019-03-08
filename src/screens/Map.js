import {Button, Text, View} from "react-native";
import React from "react";
import ChooseCityScreen from "./ChooseCity";
import PropTypes from "prop-types";
import {MapView} from "expo";

const deltas = {latitudeDelta: 0.0922, longitudeDelta: 0.0421};
export default class MapScreen extends React.Component {
    render() {
        // initialRegion is San Francisco if no params are passed in
        let initialRegion = this.props.navigation.getParam('coordinates',
            {
                latitude: 37.78825,
                longitude: -122.4324,
            }
        );
        initialRegion = {...initialRegion, ...deltas}
        return (
            <View style={{ flex: 1, justifyContent: 'center'}}>
                <MapView
                    style={{ flex: 1 }}
                    provider="google"
                    initialRegion={initialRegion}
                />
                <Button
                    title="Go Back To Choose City Screen"
                    onPress={() => this.props.navigation.navigate('ChooseCityScreen')}
                />
            </View>
        );
    }
}

MapScreen.propTypes = {
    navigation: PropTypes.object.isRequired
};