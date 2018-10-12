import {Button, Text, View} from "react-native";
import React from "react";
import ChooseCityScreen from "./ChooseCity";

export default class SplashScreen extends React.Component {
    static ScreenName = "SplashScreen";

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <Text>Splash Screen</Text>
                <Button
                    title="Go to Next Screen"
                    onPress={() => this.props.navigation.navigate(ChooseCityScreen.ScreenName)}
                />
            </View>
        );
    }
}