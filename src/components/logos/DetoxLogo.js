import React from "react";
import PropTypes from "prop-types";
import { Svg } from "expo";
import { View } from "react-native";

const { Path } = Svg;

class DetoxLogo extends React.Component {
	render() {
		const width = this.props.width ? this.props.width : 100;
		const height = this.props.height ? this.props.height: 100;

		return (
			<View>
				<Svg width={width} height={height} viewBox={`0 0 456 512`} fill="none" preserveAspectRatio="none">
					<Path d="M315.649 76.3089C315.649 110.453 287.971 138.131 253.827 138.131C219.683 138.131 192.005 110.453 192.005 76.3089C192.005 42.1653 219.683 14.4865 253.827 14.4865C287.971 14.4865 315.649 42.1653 315.649 76.3089Z" fill="black"/>
					<Path d="M253.052 169.212C290.275 169.212 323.892 156.266 323.892 156.266L297.13 327.72H210.524L183.762 156.266C183.762 156.266 215.828 169.212 253.052 169.212Z" fill="black"/>
					<Path d="M215.085 327.72H244.76V436.528C244.76 444.722 238.117 451.365 229.922 451.365C221.728 451.365 215.085 444.722 215.085 436.528V327.72Z" fill="black"/>
					<Path d="M262.894 327.72H292.569V436.528C292.569 444.722 285.926 451.365 277.732 451.365C269.537 451.365 262.894 444.722 262.894 436.528V327.72Z" fill="black"/>
					<Path d="M307.212 186.553C303.678 173.361 311.506 159.801 324.698 156.266L357.767 279.679C359.534 286.275 355.62 293.055 349.024 294.822C342.428 296.589 335.648 292.675 333.88 286.079L307.212 186.553Z" fill="black"/>
					<Path d="M183.762 156.266C196.954 159.801 204.782 173.361 201.247 186.553L174.579 286.079C172.811 292.675 166.031 296.59 159.435 294.822C152.839 293.055 148.925 286.275 150.692 279.679L183.762 156.266Z" fill="black"/>
					<Path fill-rule="evenodd" clip-rule="evenodd" d="M142.813 17.184C37.169 55.6352 -13.1468 190.986 34.3799 321.565C81.9066 452.144 207.453 523.486 313.096 485.035C418.74 446.584 469.056 311.233 421.529 180.654C419.972 176.376 422.178 171.646 426.456 170.089C430.734 168.532 435.464 170.738 437.021 175.016C486.654 311.38 435.464 458.041 318.735 500.527C202.006 543.013 68.5207 463.568 18.8881 327.203C-30.7444 190.839 20.4452 44.1781 137.174 1.69227C141.452 0.135231 146.182 2.34095 147.739 6.61888C149.296 10.8968 147.091 15.627 142.813 17.184Z" fill="black"/>
					<Path d="M138.932 0.197582C145.423 -1.21853 150.837 5.23314 148.315 11.3799L98.9141 131.792C95.6933 139.643 83.5084 138.19 81.8696 129.864C77.8083 109.231 71.3539 84.1029 62.6518 73.7321C53.9496 63.3613 30.3241 52.6415 10.7093 45.0589C2.79473 41.9993 3.48019 29.7473 11.7706 27.9387L138.932 0.197582Z" fill="black"/>
				</Svg>
			</View>
		);
	}
}

DetoxLogo.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number
}

export default DetoxLogo;

