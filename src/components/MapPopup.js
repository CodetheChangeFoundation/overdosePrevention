import React from 'react';
import { Dimensions, Text, View, ScrollView, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import ResponsiveButton from "../components/ResponsiveButton";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

class MapPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: this.props.modalVisible
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.modalVisible != prevProps.modalVisible) {
      this.setState({
        modalVisible: this.props.modalVisible
      })
    }
  }

  createSiteDescription(hours, street, province, postalCode, phoneNumber) {
    return `${street}, ${postalCode} ${province}\n${this.formatPhoneNumber(phoneNumber)}${hours}`;
  }

  formatPhoneNumber(phoneNumber) {
    if (phoneNumber) {
      return `${phoneNumber}\n`;
    }
  }

  render() {
    if (this.state.modalVisible) {
      return (
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <ScrollView 
              alwaysBounceVertical={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false} 
            >
              <Text>{this.props.destination.name}</Text>
              <Text>{`\n`}Address</Text>
              <Text>{this.props.destination.street}</Text>
              <Text>{this.props.destination.province}, {this.props.destination.country}</Text>
              <Text>{this.props.destination.postal_code}</Text>
              <Text>{`\n`}Phone Number</Text>
              <Text>{this.props.destination.phone_number}</Text>
              <Text>{`\n`}Hours</Text>
              <Text>{this.props.destination.hours}</Text>
            </ScrollView>
          </View>
          <View style={styles.closeButtonContainer}>
            <ResponsiveButton
              key='close'
              label='X'
              labelStyle={{fontWeight: '600'}}
              style={styles.closeButton}
              gradientColors={['#F3CB14', '#E58B37']}
              horizontalGradient={true}
              onPress={this.props.hideModal}
            />
          </View>
          <View style={styles.directionsButtonContainer}>
            <ResponsiveButton
              key='directions'
              label='Directions'
              labelStyle={{fontWeight: '600'}}
              style={styles.directionsButton}
              gradientColors={['#F3CB14', '#E58B37']}
              horizontalGradient={true}
              onPress={() => this.props.centerMapOnRoute()}
            />
          </View>
        </View>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    flexDirection: 'column',
    backgroundColor: '#FFF',
    width: WINDOW_WIDTH * 0.8,
    height: WINDOW_HEIGHT * 2 / 3,
    paddingHorizontal: 30,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderWidth: 3,
    borderColor: '#E58B37',
    justifyContent: 'space-between'
  },
  closeButtonContainer: {
    position: 'absolute',
    bottom: (WINDOW_HEIGHT * 5 / 6) - 12,
    right: (WINDOW_WIDTH * 0.1) - 20,
  },
  closeButton: {
    paddingVertical: 11,
    paddingHorizontal: 15,
    borderRadius: 100
  },
  directionsButtonContainer: {
    marginTop: -25
  },
  directionsButton: {
    alignSelf: 'center',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 100
  }
});

MapPopup.propTypes = {
  destination: PropTypes.object,
  modalVisible: PropTypes.bool.isRequired,
  centerMapOnRoute: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired
};

export default MapPopup;