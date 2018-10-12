import React from 'react';
import SplashScreen from "./src/screens/Splash";
import {createStackNavigator} from "react-navigation";
import ChooseCityScreen from "./src/screens/ChooseCity";
import MapScreen from "./src/screens/Map";

const routeConfigs = {};
routeConfigs[SplashScreen.ScreenName] = {screen: SplashScreen};
routeConfigs[ChooseCityScreen.ScreenName] = {screen: ChooseCityScreen};
routeConfigs[MapScreen.ScreenName] = {screen: MapScreen};

const stackNavigatorConfig = {
    headerMode: "none"
};

export default createStackNavigator(routeConfigs, stackNavigatorConfig);
