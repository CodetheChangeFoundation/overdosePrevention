import React from "react";
import PropTypes from "prop-types";
import { Svg, Path } from "react-native-svg";
import { View } from "react-native";

class NurseLogo extends React.Component {
	render() {
		const width = this.props.width ? this.props.width : 50;
		const height = this.props.height ? this.props.height: 50;

		return (
			<View>
				<Svg width={width} height={height} viewBox="0 0 512 322" fill="none" xmlns="http://www.w3.org/2000/svg">
					<Path fill-rule="evenodd" clip-rule="evenodd" d="M374.81 97.2908L385.041 54.3591C385.255 53.4585 385.823 52.6822 386.617 52.2055C387.411 51.7288 388.363 51.5918 389.259 51.8254L509.425 83.1582C510.063 83.3244 510.619 83.6627 511.05 84.1154C511.261 84.3369 511.439 84.5823 511.581 84.8441C511.772 85.1947 511.9 85.5747 511.96 85.9664C511.98 86.0969 511.993 86.2288 511.998 86.3613C511.999 86.403 512 86.4447 512 86.4865C512 86.7483 511.971 87.0118 511.91 87.2718C511.889 87.3616 511.865 87.4503 511.837 87.5375L448.151 295.809C447.602 297.603 445.78 298.234 444.14 298.803C443.9 298.887 443.664 298.968 443.436 299.052C441.618 299.723 438.897 300.668 435.227 301.795C427.886 304.049 416.748 307.027 401.437 309.976C370.814 315.875 323.503 321.66 256.499 321.315C189.511 320.969 141.792 315.185 110.762 309.465C95.2481 306.605 83.9073 303.761 76.4179 301.621C72.6733 300.551 69.8916 299.657 68.0328 299.025C67.8233 298.954 67.6055 298.884 67.3829 298.812C65.683 298.265 63.7113 297.63 63.1576 295.799L0.147476 87.4871C-0.123598 86.5909 -0.0180322 85.623 0.439854 84.8063C0.897739 83.9896 1.66846 83.3947 2.57444 83.1584L122.741 51.8256C123.637 51.592 124.589 51.7291 125.383 52.2058C126.176 52.6825 126.745 53.4587 126.959 54.3593L137.189 97.2909L159.186 12.97C159.51 11.7266 160.937 10.6877 162.154 10.3762C162.49 10.2902 162.984 10.1655 163.628 10.0081C164.917 9.69325 166.806 9.24716 169.23 8.71636C174.077 7.65489 181.067 6.25393 189.674 4.88645C206.877 2.15304 230.588 -0.454605 256.586 0.0670799C282.503 0.587173 305.893 3.18676 322.8 5.65461C331.256 6.88899 338.099 8.09158 342.835 8.98714C345.203 9.43496 347.044 9.80611 348.298 10.0662C348.925 10.1963 349.405 10.2986 349.73 10.3688C349.825 10.3893 349.907 10.4071 349.975 10.422L350.102 10.4497L350.157 10.4619C350.315 10.4936 350.47 10.5362 350.621 10.5892C351.105 10.7581 351.531 11.0281 351.882 11.3693C352.224 11.7006 352.5 12.106 352.683 12.5692C352.744 12.7222 352.794 12.8799 352.832 13.0413L374.81 97.2908ZM126.959 106.5L117.5 65.5L27.5 89C30.6458 89.7393 31.8407 89.9377 33.4945 90.2122C35.1689 90.4902 37.3138 90.8462 42.4302 91.9209C65.2146 96.7066 91.0982 101.679 126.959 106.5ZM475.195 90.4576C477.239 89.8861 479.629 89.2178 482.5 88.5L394.5 65.5L385 106.5C420.861 101.679 446.785 96.7064 469.57 91.9207C471.152 91.5884 472.968 91.0804 475.195 90.4576ZM285.439 143.991H225.872V190.818H169.404V250.729H225.872V297.557H285.439V250.729H341.907V190.818H285.439V143.991Z" fill="black"/>
				</Svg>
			</View>
		);
	}
}

NurseLogo.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number
}

export default NurseLogo;