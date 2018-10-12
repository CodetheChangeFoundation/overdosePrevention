import {Button, Text, View} from "react-native";
import React from "react";
import MapScreen from "./Map";

export default class ChooseCityScreen extends React.Component {
    static ScreenName = "ChooseCityScreen";

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <Text>Choose City Screen</Text>
                <Button
                    title="Choose City Screen"
                    onPress={() => this.props.navigation.navigate(MapScreen.ScreenName)}
                />
            </View>
        );
    }
}