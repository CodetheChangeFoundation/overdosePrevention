import React from "react";
import PropTypes from "prop-types";
import { Svg } from "expo";
import { View } from "react-native";

const { Path } = Svg;

class MobileUnitLogo extends React.Component {
	render() {
		const width = this.props.width ? this.props.width : 90;
		const height = this.props.height ? this.props.height: 90;

		return (
			<View>
				<Svg width={width} height={height} viewBox="0 0 512 357" fill="none">
					<Path fill-rule="evenodd" clip-rule="evenodd" d="M0 156.8C0 139.127 14.3269 124.8 32 124.8H480C497.673 124.8 512 139.127 512 156.8V276.8C512 281.218 508.418 284.8 504 284.8H8C3.58172 284.8 0 281.218 0 276.8V156.8ZM163.2 204.8C163.2 223.357 148.157 238.4 129.6 238.4C111.043 238.4 96 223.357 96 204.8C96 186.243 111.043 171.2 129.6 171.2C148.157 171.2 163.2 186.243 163.2 204.8ZM382.4 238.4C400.957 238.4 416 223.357 416 204.8C416 186.243 400.957 171.2 382.4 171.2C363.843 171.2 348.8 186.243 348.8 204.8C348.8 223.357 363.843 238.4 382.4 238.4Z" fill="black"/>
					<Path d="M97.6 268.8H185.6V340.8C185.6 349.637 178.437 356.8 169.6 356.8H113.6C104.763 356.8 97.6 349.637 97.6 340.8V268.8Z" fill="black"/>
					<Path d="M185.6 268.8H229.6V304.8C229.6 309.218 226.018 312.8 221.6 312.8H193.6C189.182 312.8 185.6 309.218 185.6 304.8V268.8Z" fill="black"/>
					<Path d="M54.4 273.6H98.4V291.6C98.4 293.809 96.6091 295.6 94.4 295.6H58.4C56.1909 295.6 54.4 293.809 54.4 291.6V273.6Z" fill="black"/>
					<Path d="M417.6 273.6H461.6V291.6C461.6 293.809 459.809 295.6 457.6 295.6H421.6C419.391 295.6 417.6 293.809 417.6 291.6V273.6Z" fill="black"/>
					<Path d="M286.4 268.8H330.4V304.8C330.4 309.218 326.818 312.8 322.4 312.8H294.4C289.982 312.8 286.4 309.218 286.4 304.8V268.8Z" fill="black"/>
					<Path d="M329.6 268.8H417.6V340.8C417.6 349.637 410.437 356.8 401.6 356.8H345.6C336.763 356.8 329.6 349.637 329.6 340.8V268.8Z" fill="black"/>
					<Path fill-rule="evenodd" clip-rule="evenodd" d="M163.629 64L142.903 141.107L81.0969 124.493L114.56 0H397.44L430.903 124.493L369.097 141.107L348.371 64H163.629Z" fill="black"/>
				</Svg>
			</View>
		);
	}
}

MobileUnitLogo.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number
}

export default MobileUnitLogo;

