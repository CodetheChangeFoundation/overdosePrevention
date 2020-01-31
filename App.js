import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import ChooseCityScreen from "./src/screens/ChooseCity";
import MapScreen from "./src/screens/Map";

const AppNavigator = createStackNavigator(
  {
    Home: ChooseCityScreen,
    Map: MapScreen
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#FFF'
      },
      headerTitleStyle: {
        fontWeight: '600'
      }
    }
  }
);

export default createAppContainer(AppNavigator);