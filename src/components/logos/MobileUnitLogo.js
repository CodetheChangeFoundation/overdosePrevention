import React from "react";
import PropTypes from "prop-types";
import * as Svg from 'react-native-svg';
import { View } from "react-native";

const { Path } = Svg;

class MobileUnitLogo extends React.Component {
	render() {
		const width = this.props.width ? this.props.width : 50;
		const height = this.props.height ? this.props.height: 50;

		return (
			<View>
				<Svg width={width} height={height} viewBox="0 0 512 357" fill="none" xmlns="http://www.w3.org/2000/svg">
					<Path fill-rule="evenodd" clip-rule="evenodd" d="M229.6 304.8V284.8H256V124.8H147.286L81.0969 124.493L32 124.8C14.3269 124.8 0 139.127 0 156.8V276.8C0 281.218 3.58172 284.8 8 284.8H54.4V291.6C54.4 293.809 56.1909 295.6 58.4 295.6H94.4C95.7085 295.6 96.8702 294.972 97.6 294V340.8C97.6 349.637 104.763 356.8 113.6 356.8H169.6C178.437 356.8 185.6 349.637 185.6 340.8V304.8C185.6 309.218 189.182 312.8 193.6 312.8H221.6C226.018 312.8 229.6 309.218 229.6 304.8ZM163.2 204.8C163.2 223.357 148.157 238.4 129.6 238.4C111.043 238.4 96 223.357 96 204.8C96 186.243 111.043 171.2 129.6 171.2C148.157 171.2 163.2 186.243 163.2 204.8Z" fill="black"/>
					<Path fill-rule="evenodd" clip-rule="evenodd" d="M282.4 304.8V284.8H256V124.8H364.714L430.903 124.493L480 124.8C497.673 124.8 512 139.127 512 156.8V276.8C512 281.218 508.418 284.8 504 284.8H457.6V291.6C457.6 293.809 455.809 295.6 453.6 295.6H417.6C416.292 295.6 415.13 294.972 414.4 294V340.8C414.4 349.637 407.237 356.8 398.4 356.8H342.4C333.563 356.8 326.4 349.637 326.4 340.8V304.8C326.4 309.218 322.818 312.8 318.4 312.8H290.4C285.982 312.8 282.4 309.218 282.4 304.8ZM348.8 204.8C348.8 223.357 363.843 238.4 382.4 238.4C400.957 238.4 416 223.357 416 204.8C416 186.243 400.957 171.2 382.4 171.2C363.843 171.2 348.8 186.243 348.8 204.8Z" fill="black"/>
					<Path d="M147.286 127.807L163.629 64H348.371L364.714 127.807L430.903 127.5L397.44 0H114.56L81.0969 127.5L147.286 127.807Z" fill="black"/>
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

