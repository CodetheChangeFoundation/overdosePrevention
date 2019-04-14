import { Button, Text, View, Modal, TouchableHighlight, Image } from "react-native";
import React from "react";
import ChooseCityScreen from "./ChooseCity";
import SwipeUpSearch from '../components/SwipeUpSearch';
import PropTypes from "prop-types";
import { MapView, Marker } from "expo";
import MapPopup from "../components/MapPopup";

const deltas = { latitudeDelta: 0.0922, longitudeDelta: 0.0421 };
export default class MapScreen extends React.Component {

// 	constructor(props) {
// 		super(props);

// 		this.state = {
// 			currentService: null,
// 			isPopupActive: false,
// 			region: null,
// 		}
// 	}

// 	serviceClick(service, popupState) {
// 		this.setState({
// 			isPopupActive: popupState,
// 			currentService: service
// 		});
// 	}

// 	render() {
// 		// initialRegion is San Francisco if no params are passed in
// 		let initialRegion = this.props.navigation.getParam('coordinates',
// 			{
// 				latitude: 37.78825,
// 				longitude: -122.4324,
// 			}
// 		);
// 		initialRegion = { ...initialRegion, ...deltas }
// 		this.state.region = initialRegion;

// 		let services = this.props.navigation.getParam('services');

// 		return (
// 			<View style={{ flex: 1, justifyContent: 'center' }}>
// 				<Modal
// 					visible={this.state.isPopupActive}
// 					transparent={true}>
// 					<View style={{flex: 1,backgroundColor: 'rgba(0,0,0,0.3)'}}>
// 						<View style={{margin: "10% 10% 10% 10%", backgroundColor: 'rgba(255,255,255, 0.9)'}}>
// 							<MapPopup service={this.state.currentService}></MapPopup>
// 							<View style={{alignItems: "center"}}>
// 								<TouchableHighlight
// 									onPress={() => {
// 										this.serviceClick(null, false);
// 									}}>
// 									<Text>Hide Modal</Text>
// 								</TouchableHighlight>
// 							</View>
// 						</View>
// 					</View>
// 				</Modal>

// 				<MapView
// 					style={{ flex: 1 }}
// 					provider="google"
// 					initialRegion={initialRegion}
// 				>
// 					{services.map((service) => {
// 						return (
// 							<MapView.Marker
// 								key={service.address}
// 								coordinate={service.coordinates}
// 								title={service.name}
// 								description={service.hours}
// 								onPress={() => this.serviceClick(service, true)}
// 							>
// 							 	<Image
// 									source={require('../../assets/marker.png')}
// 								/>							
// 								{/* <MapView.Callout>
// 									<View>
// 										<Text>{service.name}{"\n"}{service.hours}</Text>
// 									</View>
// 								</MapView.Callout> */}

// 							</MapView.Marker>
// 						)
// 					})}
// 				</MapView>			

// 				<Button
// 					title="Go Back To Choose City Screen"
// 					onPress={() => this.props.navigation.navigate('ChooseCityScreen')}
// 				/>
// 			</View>
// 		);
// 	}

    constructor(props) {
        super(props);
        let initialRegion = this.props.navigation.getParam('coordinates',
            {
                latitude: 37.78825,
                longitude: -122.4324,
            }
        );
        initialRegion = {...initialRegion, ...deltas}
        this.state = {
            region: initialRegion
        }
        this.changeRegion = this.changeRegion.bind(this);
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

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center'}}>
                <Button
                    title="Go Back To Choose City Screen"
                    onPress={() => this.props.navigation.navigate('ChooseCityScreen')}
                />
                <MapView
                    style={{ flex: 1 }}
                    provider="google"
                    region={this.state.region}
                />
                <SwipeUpSearch
                    onLogoPress = {this.changeRegion}
                />
            </View>
        );
    }
}

MapScreen.propTypes = {
	navigation: PropTypes.object.isRequired
};