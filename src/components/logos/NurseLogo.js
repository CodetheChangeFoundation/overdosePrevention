import React from "react";
import {Svg} from "expo";
import PropTypes from "prop-types";
import {View} from "react-native";

const { Path } = Svg;

class NurseLogo extends React.Component {
    render() {
        const width = this.props.width ? this.props.width : 90;
        const height = this.props.height ? this.props.height: 90;

        return (
            <View>
                <Svg width={width} height={height} viewBox="0 0 512 322" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M165.335 16.68L141.358 108.594C177.207 113.134 216.929 116.446 256.516 116.446C319.251 116.446 382.044 108.13 429.195 99.799C452.76 95.6353 472.396 91.4721 486.134 88.3512C493.003 86.7908 498.397 85.4912 502.069 84.5829C503.905 84.1287 505.311 83.7723 506.255 83.5301C506.728 83.4089 507.085 83.3163 507.322 83.2543C507.441 83.2233 507.53 83.1999 507.589 83.1844L507.671 83.163L507.674 83.1621C507.675 83.162 507.675 83.1619 508.557 86.4902L507.674 83.1621C508.882 82.8419 510.17 83.2015 511.037 84.1018C511.904 85.0022 512.215 86.3017 511.849 87.497L448.151 295.809C447.856 296.773 447.154 297.56 446.229 297.961L444.858 294.802C446.229 297.961 446.227 297.962 446.225 297.962L446.221 297.964L446.208 297.97L446.166 297.988C446.132 298.002 446.084 298.022 446.023 298.048C445.9 298.099 445.724 298.172 445.492 298.265C445.028 298.451 444.345 298.717 443.436 299.052C441.618 299.723 438.897 300.668 435.227 301.795C427.886 304.049 416.748 307.027 401.437 309.976C370.814 315.875 323.503 321.66 256.499 321.315C189.511 320.969 141.792 315.185 110.762 309.465C95.2481 306.605 83.9073 303.761 76.4179 301.621C72.6733 300.551 69.8916 299.657 68.0328 299.025C67.1034 298.71 66.4047 298.459 65.9316 298.285C65.6951 298.198 65.515 298.131 65.3907 298.083C65.3286 298.059 65.2804 298.041 65.246 298.027L65.2049 298.011L65.1922 298.006L65.1877 298.004C65.1861 298.004 65.1846 298.003 66.4533 294.802L65.1846 298.003C64.2081 297.616 63.4617 296.805 63.1576 295.799L0.147476 87.4871C-0.123598 86.5909 -0.018032 85.623 0.439854 84.8063C0.897739 83.9896 1.66846 83.3947 2.57444 83.1584L122.741 51.8256C123.637 51.592 124.589 51.7291 125.383 52.2058C126.177 52.6825 126.745 53.4587 126.959 54.3593L137.189 97.2909L159.186 12.97C159.499 11.771 160.432 10.8325 161.629 10.5126L162.518 13.8391C161.629 10.5126 161.63 10.5124 161.63 10.5122L161.641 10.5094L161.668 10.5021L161.77 10.4755C161.857 10.4525 161.986 10.4192 162.154 10.3762C162.49 10.2902 162.984 10.1655 163.628 10.0081C164.917 9.69325 166.806 9.24716 169.23 8.71636C174.077 7.65489 181.067 6.25393 189.674 4.88645C206.877 2.15304 230.588 -0.454605 256.586 0.0670799C282.503 0.587173 305.893 3.18676 322.8 5.65461C331.256 6.88899 338.099 8.09159 342.835 8.98714C345.203 9.43496 347.044 9.80611 348.298 10.0662C348.925 10.1963 349.405 10.2986 349.73 10.3688C349.825 10.3893 349.907 10.4071 349.975 10.422L350.102 10.4497L350.198 10.4711L350.234 10.4789C350.234 10.4791 350.235 10.4792 349.496 13.7754L350.235 10.4792C352.091 10.895 353.258 12.7363 352.842 14.5919C352.426 16.4474 350.585 17.6146 348.73 17.199C348.729 17.199 348.73 17.199 348.73 17.199L348.705 17.1936L348.621 17.1751C348.546 17.1584 348.431 17.1332 348.277 17.1C347.969 17.0336 347.508 16.9352 346.899 16.809C345.683 16.5567 343.881 16.1934 341.555 15.7536C336.903 14.8737 330.156 13.6876 321.805 12.4687C305.098 10.0301 282.005 7.4649 256.447 6.95204C230.969 6.44077 207.681 8.99789 190.754 11.6875C182.295 13.0315 175.437 14.4066 170.703 15.4433C168.382 15.9516 166.572 16.3784 165.335 16.68ZM132.529 107.441L121.076 59.3765L17.4894 86.386C23.8202 87.8739 32.2602 89.7848 42.4302 91.9209C65.2146 96.7066 96.6678 102.62 132.529 107.441ZM8.49865 91.3111L69.2515 292.161C69.5419 292.263 69.874 292.378 70.2483 292.505C71.9994 293.1 74.6731 293.96 78.3097 294.999C85.5829 297.077 96.7089 299.872 112.011 302.693C142.615 308.335 189.927 314.085 256.534 314.428C323.125 314.772 369.985 309.022 400.134 303.214C415.209 300.31 426.107 297.392 433.206 295.212C436.756 294.122 439.356 293.217 441.053 292.591C441.429 292.453 441.76 292.328 442.048 292.218L503.477 91.3285C499.772 92.2432 494.423 93.5299 487.66 95.0664C473.831 98.2078 454.085 102.394 430.393 106.58C383.029 114.949 319.802 123.332 256.516 123.332C215.119 123.332 173.646 119.745 136.594 114.925C98.4613 109.965 64.9723 103.692 41.0146 98.6602C29.0343 96.1438 19.4336 93.9367 12.823 92.3574C11.1979 91.9691 9.75342 91.6188 8.49865 91.3111Z" fill="black"/>
                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M348.613 10.5074C346.773 10.9874 345.67 12.8682 346.15 14.7082L371.63 112.38C372.11 114.22 373.991 115.323 375.831 114.843C377.671 114.363 378.773 112.482 378.293 110.642L352.814 12.97C352.334 11.1299 350.453 10.0274 348.613 10.5074Z" fill="black"/>
                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M386.617 52.2055C385.823 52.6822 385.255 53.4585 385.041 54.3591L371.612 110.712C371.35 111.814 371.645 112.974 372.403 113.815C373.161 114.656 374.283 115.071 375.406 114.925C413.539 109.964 447.028 103.692 470.985 98.66C482.966 96.1436 492.566 93.9364 499.177 92.3571C502.482 91.5674 505.04 90.9347 506.775 90.4986C507.642 90.2805 508.304 90.1116 508.75 89.9969C508.973 89.9395 509.142 89.8956 509.256 89.866L509.386 89.8321L509.431 89.8203C509.432 89.8201 509.432 89.8202 508.557 86.4902L509.432 89.82C510.946 89.4219 512.001 88.0523 512 86.4865C511.998 84.9208 510.941 83.5532 509.425 83.1582L389.259 51.8254C388.363 51.5918 387.411 51.7288 386.617 52.2055ZM494.51 86.3858C488.18 87.8737 479.74 89.7845 469.57 91.9207C446.785 96.7064 415.332 102.62 379.471 107.441L390.924 59.3763L494.51 86.3858Z" fill="black"/>
                    <Path fill-rule="evenodd" clip-rule="evenodd" d="M225.872 143.991H285.439V190.818H341.907V250.729H285.439V297.557H225.872V250.729H169.404V190.818H225.872V143.991ZM229.315 147.434V194.261H172.847V247.286H229.315V294.113H281.996V247.286H338.464V194.261H281.996V147.434H229.315Z" fill="black"/>
                </Svg>
            </View>
        )
    }
}

NurseLogo.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
}

export default NurseLogo;