import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SplashScreen from "./src/screens/SplashScreen";
import ChooseCityScreen from "./src/screens/ChooseCity";
import MapScreen from "./src/screens/Map";

const AppNavigator = createStackNavigator(
  {
    Splash: {
      screen: SplashScreen,
      navigationOptions: {
        headerShown: false
      },
    },
    Home: ChooseCityScreen,
    Map: MapScreen
  },
  {
    initialRouteName: "Splash",
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