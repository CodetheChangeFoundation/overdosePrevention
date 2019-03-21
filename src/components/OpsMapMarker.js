import React from 'react';
import PropTypes from "prop-types";
import {Svg} from "expo";
import { View } from "react-native";

const { Path, Circle, Defs, LinearGradient, Stop} = Svg;

class OpsMapMarker extends React.Component {
	render() {
		const width = this.props.width ? this.props.width : 100;
		const height = this.props.height ? this.props.height : 100;

		return (
			<View>
				<Svg width={width} height={height} viewBox="0 0 30 40" fill="none" preserveAspectRatio="none">
					<Path d="M29.9723 15C29.9723 23.2843 23.269 30 15.0001 30C6.7311 30 0.0277781 23.2843 0.0277781 15C0.0277781 6.71573 6.7311 0 15.0001 0C23.269 0 29.9723 6.71573 29.9723 15Z" fill="url(#paint0_linear)" />
					<Path d="M15 40C27.7764 28.8 30.305 18 29.9723 14H14.9999L15 40Z" fill="url(#paint1_linear)" />
					<Path d="M15 40C2.22367 28.8 -0.30501 18 0.0277067 14H14.9999L15 40Z" fill="url(#paint2_linear)" />
					<Circle cx="15" cy="15" r="10" fill="white" />
					<Defs>
						<LinearGradient id="paint0_linear" x1="15" y1="0" x2="15" y2="40" gradientUnits="userSpaceOnUse">
							<Stop stop-color="#F3CB14" />
							<Stop offset="1" stop-color="#E58B37" />
						</LinearGradient>
						<LinearGradient id="paint1_linear" x1="15" y1="0" x2="15" y2="40" gradientUnits="userSpaceOnUse">
							<Stop stop-color="#F3CB14" />
							<Stop offset="1" stop-color="#E58B37" />
						</LinearGradient>
						<LinearGradient id="paint2_linear" x1="15" y1="0" x2="15" y2="40" gradientUnits="userSpaceOnUse">
							<Stop stop-color="#F3CB14" />
							<Stop offset="1" stop-color="#E58B37" />
						</LinearGradient>
					</Defs>
				</Svg>
			</View>
		);
	}
}

OpsMapMarker.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number
}

export default OpsMapMarker;