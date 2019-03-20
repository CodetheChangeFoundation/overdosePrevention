import React from "react";
import { TouchableOpacity, Text, ImageBackground } from "react-native";
import { LinearGradient } from 'expo';
import PropTypes from "prop-types";


class ResponsiveButton extends React.Component {
    render() {
        const end = this.props.horizontalGradient ? [1,0] : [0,1];
        return (
            <TouchableOpacity onPress = {this.props.onPress}>
                <LinearGradient
                    colors = {this.props.gradientColors}
                    start = {[0,0]}
                    style = {this.props.style}
                    end= {end}>
                        <Text
                            style = {[{color: "white", opacity: 1}, this.props.labelStyle]}>
                            {this.props.label}
                        </Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }
}

ResponsiveButton.propTypes = {
    gradientColors: PropTypes.array.isRequired,
    horizontalGradient: PropTypes.bool,
    labelStyle: PropTypes.object,
    label: PropTypes.string.isRequired,
};

export default ResponsiveButton;