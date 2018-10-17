import React from 'react';
import {createStackNavigator} from "react-navigation";
import ChooseCityScreen from "./src/screens/ChooseCity";
import MapScreen from "./src/screens/Map";

const routeConfigs = {};
routeConfigs[ChooseCityScreen.ScreenName] = {screen: ChooseCityScreen};
routeConfigs[MapScreen.ScreenName] = {screen: MapScreen};

const stackNavigatorConfig = {
    headerMode: "none"
};

export default createStackNavigator(routeConfigs, stackNavigatorConfig);
