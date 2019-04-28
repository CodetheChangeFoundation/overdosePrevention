import { createStackNavigator, createAppContainer } from "react-navigation";
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