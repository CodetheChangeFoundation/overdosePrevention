import React from 'react';
import { View, Text } from "react-native";

class MapPopup extends React.Component {
	render() {
			
		if (this.props.service === null) {
			return(<View></View>);
		} else {
			return (
				<View>
					<View>
						<Text>{this.props.service.name}</Text>
					</View>
					<View>
						
						<Text>Address</Text>
						<Text>{this.props.service.address}</Text>
						<Text>Phone Number</Text>
						<Text>{this.props.service.phoneNumber}</Text>
						<Text>Hours</Text>
						<Text>{this.props.service.hours}</Text>
					</View>					
				</View>
			);
		}		
	}
}

export default MapPopup;