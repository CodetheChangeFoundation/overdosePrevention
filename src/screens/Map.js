import { Button, Text, View, Modal, TouchableHighlight, Image } from "react-native";
import React from "react";
import ChooseCityScreen from "./ChooseCity";
import PropTypes from "prop-types";
import { MapView, Marker } from "expo";

const deltas = { latitudeDelta: 0.0922, longitudeDelta: 0.0421 };
export default class MapScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentService: null,
			isPopupActive: false,
			region: null,
		}
	}

	serviceClick(service) {
		console.log("service marker was clicked");
		this.setState({
			isPopupActive: true,
			currentService: service
		});
	}

	render() {
		// initialRegion is San Francisco if no params are passed in
		let initialRegion = this.props.navigation.getParam('coordinates',
			{
				latitude: 37.78825,
				longitude: -122.4324,
			}
		);
		initialRegion = { ...initialRegion, ...deltas }
		this.state.region = initialRegion;

		let services = this.props.navigation.getParam('services');

		return (
			<View style={{ flex: 1, justifyContent: 'center' }}>
				<Modal
					visible={this.state.isPopupActive}>
					<View style={{ marginTop: 22 }}>
						<View>
							<Text>Test Modal</Text>
							<TouchableHighlight
								onPress={() => {
									this.setState({ isPopupActive: false });
								}}>
								<Text>Hide Modal</Text>
							</TouchableHighlight>
						</View>
					</View>
				</Modal>

				<MapView
					style={{ flex: 1 }}
					provider="google"
					initialRegion={initialRegion}
				>
					{services.map((service) => {
						return (
							<MapView.Marker
								key={service.address}
								coordinate={service.coordinates}
								title={service.name}
								description={service.hours}
								onPress={() => this.serviceClick(service)}
							>
							 	<Image
									source={require('../../assets/marker.png')}
								/>							
								<MapView.Callout>
									<View>
										<Text>{service.name}{"\n"}{service.hours}</Text>
									</View>
								</MapView.Callout>

							</MapView.Marker>
						)
					})}
				</MapView>			

				<Button
					title="Go Back To Choose City Screen"
					onPress={() => this.props.navigation.navigate('ChooseCityScreen')}
				/>
			</View>
		);
	}
}

MapScreen.propTypes = {
	navigation: PropTypes.object.isRequired
};