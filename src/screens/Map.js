import React from "react";
import { Text, View, Modal, TouchableHighlight, Image } from "react-native";
import { MapView } from "expo";
import { SearchBar } from 'react-native-elements';
import PropTypes from "prop-types";
import SwipeUpSearch from '../components/SwipeUpSearch';
import MapPopup from "../components/MapPopup";

const deltas = {latitudeDelta: 0.0922, longitudeDelta: 0.0421};

export default class MapScreen extends React.Component {
	static navigationOptions = {
    title: 'Map',
	};

	constructor(props) {
    super(props);
        
    // initialRegion is San Francisco if no params are passed in
    let initialRegion = this.props.navigation.getParam('coordinates',
      {
        latitude: 37.78825,
        longitude: -122.4324,
      }
    );
    initialRegion = {...initialRegion, ...deltas}

		this.state = {
			currentService: null,
			isPopupActive: false,
			region: initialRegion,
    }
    this.changeRegion = this.changeRegion.bind(this);
	}

	serviceClick(service, popupState) {
		this.setState({
			isPopupActive: popupState,
			currentService: service
		});
  }
    
  /*
  * Sets this state's region to new coordinates
  * @param {Object}, coordinates is a latitude and longitude of the focused region
  */
  changeRegion(coordinates) {
    this.setState({
      region: {...coordinates, ...deltas}
    });
  }
  
  renderServices() {
    let services = this.props.navigation.getParam('services');

    if (services) {
      return services.map((service) => {
        return (
          <MapView.Marker
            key={service.sid}
            coordinate={{
              "latitude": parseFloat(service.lat),
              "longitude": parseFloat(service.lon)
            }}
            title={service.name}
            description={this.createSiteDescription(service.hours, service.street, service.province, service.postal_code, service.phone_number)}
            onPress={() => this.serviceClick(service, true)}
            image={this.setMapMarker(service.service)}
          >
            <MapView.Callout>
              <Text>
                {this.createSiteDescription(service.hours, service.street, service.province, service.postal_code, service.phone_number)}
              </Text>
            </MapView.Callout>
          </MapView.Marker>
        );
      });
    }
  }

  setMapMarker(serviceType) {
    let marker;

    switch (serviceType) {
      case "Supervised Injection":
        marker = require('../../assets/needle_marker.png');
        break;
      case "Replacement":
        marker = require('../../assets/replacement_marker.png');
        break;
      case "Pipe":
        marker = require('../../assets/pipe_marker.png');
        break;
      case "Nurse":
        marker = require('../../assets/nurse_marker.png');
        break;
      case "Mobile Unit":
        marker = require('../../assets/mobile_unit_marker.png');
        break;
      case "Detox":
        marker = require('../../assets/detox_marker.png');
        break;
      default:
        // TODO: need a default marker
    }

    return marker;
  }

  createSiteDescription(hours, street, province, postalCode, phoneNumber) {
    // TODO: takes in a service's hours and address and formats it, calls formatContactInfo()
    return `${street}, ${postalCode} ${province}\n${phoneNumber}\n${hours}`;
  }

  formatContactInfo(street, province, postalCode, phoneNumber) {
    // TODO: takes in a service's address and number and formats it
    // formats phone number
    return `${street}, ${postalCode} ${province}\n${phoneNumber}`;
  }
  
  // TODO: create a modal
	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center' }}>
				{/* <Modal
					visible={this.state.isPopupActive}
					transparent={true}
        >
					<View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.3)'}}>
						<View style={{margin: "10% 10% 10% 10%", backgroundColor: 'rgba(255,255,255, 0.9)'}}>
							<MapPopup service={this.state.currentService}></MapPopup>
							<View style={{alignItems: "center"}}>
								<TouchableHighlight
									onPress={() => {
										this.serviceClick(null, false);
									}}
                >
									<Text>Hide Modal</Text>
								</TouchableHighlight>
							</View>
						</View>
					</View>
				</Modal> */}

        {/* <SearchBar
          round={true}
          placeholder="Search for a place or address"
          containerStyle={{backgroundColor: '#CCD2DD', height: 45}}
          platform="default"
          inputContainerStyle={{backgroundColor: '#CCD2DD'}}
          inputStyle={{
            backgroundColor: '#BABFC6', 
            borderRadius: 7
          }}
          lightTheme={true}
          searchIcon={null}
          clearIcon={null}
        /> */}

				<MapView
					style={{ flex: 1 }}
					provider="google"
					initialRegion={this.state.region}
				>
          {this.renderServices()}
				</MapView>		

        <SwipeUpSearch
          onLogoPress={this.changeRegion}
        />
			</View>
		);
	}
}

MapScreen.propTypes = {
	navigation: PropTypes.object.isRequired
};