import React from 'react';
import { Dimensions, Text, View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import ResponsiveButton from "../components/ResponsiveButton";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

class MapPopup extends React.Component {
  constructor(props) {
    super(props);
  }

  formatAddress(street, province, country, postal_code) {
    let output = '';
    if (street) output += street + '\n';
    if (province && country) {
      output += province + ', ' + country + '\n';
    } else if (province) {
      output += province + '\n';
    } else if (country) {
      output += country + '\n';
    }
    if (postal_code) output += postal_code + '\n';
    return output.substring(0, output.length-2);
  }

  formatPhoneNumber(phoneNumber) {
    var cleaned = ('' + phoneNumber).replace(/\D/g, '')
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return null
  }

  formatHours(hours) {
    return hours;
  }

  render() {
    const { name, service, street, province, country, postal_code, phone_number, hours } = this.props.destination;
    return (
      <View style={styles.modalContainer}>
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity onPress={this.props.hideModal}>
            <LinearGradient
              colors={['#C45146', '#C45146']}
              style={styles.closeButton}
              start={[0,0]}
              end={[1,0]}
            >
              <Ionicons name="md-close" size={28} color='#FFF'/>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.modal}>
          <ScrollView 
            alwaysBounceVertical={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false} 
          >
            {service ? <Text style={styles.small}>{service.toUpperCase()}</Text> : null}
            {name ? <Text style={styles.title}>{name}</Text> : null}
            
            {(street || province || country || postal_code) ?
              <View>
                <Text style={styles.heading}>Address</Text>
                <Text style={styles.body}>{this.formatAddress(street, province, country, postal_code)}</Text>
              </View>
            : null}

            {phone_number ?
              <View>
                <Text style={styles.heading}>Phone Number</Text>
                <Text style={styles.body}>{this.formatPhoneNumber(phone_number)}</Text>
              </View>
            : null}

            {hours &&
              <View>
                <Text style={styles.heading}>Hours</Text>
                <Text style={styles.body}>{this.formatHours(hours)}</Text>
              </View>
            }
            
          </ScrollView>
        </View>
        <View style={styles.directionsButtonContainer}>
          <ResponsiveButton
            key='directions'
            label='Directions'
            labelStyle={{fontWeight: '600'}}
            style={styles.directionsButton}
            gradientColors={['#C45146', '#C45146']}
            horizontalGradient={true}
            onPress={() => this.props.centerMapOnRoute()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    bottom: -34,
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
    paddingHorizontal: 25,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'black',
    justifyContent: 'space-between'
  },
  closeButtonContainer: {
    marginRight: (WINDOW_WIDTH * 0.1) - 15,
    marginBottom: -20,
    zIndex: 999,
    alignSelf: "flex-end"
  },
  closeButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  directionsButtonContainer: {
    marginTop: -25
  },
  directionsButton: {
    alignSelf: 'center',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25
  },
  title: {
    fontSize: 20
  },
  heading: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 14,
    marginBottom: 3
  },
  small: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 5
  },
  body: {
    fontSize: 16
  }
});

MapPopup.propTypes = {
  destination: PropTypes.object,
  centerMapOnRoute: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired
};

export default MapPopup;