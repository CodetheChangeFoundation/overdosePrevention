import {Button, Text, View} from "react-native";
import React from "react";
import ChooseCityScreen from "./ChooseCity";

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