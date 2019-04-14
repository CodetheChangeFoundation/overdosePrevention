import {Button, Text, View} from "react-native";
import React from "react";
import ChooseCityScreen from "./ChooseCity";
import SwipeUpSearch from '../components/SwipeUpSearch';
import PropTypes from "prop-types";
import {MapView} from "expo";

const deltas = {latitudeDelta: 0.0922, longitudeDelta: 0.0421};
export default class MapScreen extends React.Component {
    constructor(props) {
        super(props);
        let initialRegion = this.props.navigation.getParam('coordinates',
            {
                latitude: 37.78825,
                longitude: -122.4324,
            }
        );
        initialRegion = {...initialRegion, ...deltas}
        this.state = {
            region: initialRegion
        }
        this.changeRegion = this.changeRegion.bind(this);
    }

    /*
    * Sets this state's region to new coordinates
    * @param {Object}, coordinates is a latitude and longitude of the focused region
    */
    changeRegion(coordinates) {
        this.setState({
            region: {...coordinates, ...deltas}
        });
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center'}}>
                <Button
                    title="Go Back To Choose City Screen"
                    onPress={() => this.props.navigation.navigate('ChooseCityScreen')}
                />
                <MapView
                    style={{ flex: 1 }}
                    provider="google"
                    region={this.state.region}
                />
                <SwipeUpSearch
                    onLogoPress = {this.changeRegion}
                />
            </View>
        );
    }
}

MapScreen.propTypes = {
    navigation: PropTypes.object.isRequired
};