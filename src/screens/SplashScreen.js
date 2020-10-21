import React from "react";
import PropTypes from "prop-types";
import { SafeAreaView, View, StyleSheet, Image, Dimensions } from "react-native";

const windowHeight = Dimensions.get('window').height;

export default class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let self = this;
    setTimeout(function() {
      self.props.navigation.navigate('Home', {  });
    },6000);
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <View style={styles.containerStyle}>
          <Image
            style={{flex: 1, width: null, height: windowHeight}}
            source={require('../../assets/bevel_app-animation.gif')}
            resizeMode="contain"
          />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
});

SplashScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};