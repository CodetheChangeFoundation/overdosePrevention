import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import PropTypes from "prop-types";

/* Responsive Button is a wrapper around a TouchableOpacity button with a linear gradient */
class TravelModeBar extends React.Component {
  constructor(props) {
    super(props);
		this.state = {
      travelMode: this.props.travelMode
    }
    this.renderIcon = this.renderIcon.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.travelMode != prevProps.travelMode) {
      this.setState({ travelMode: this.props.travelMode });
    }
  }

  renderIcon(icon, mode) {
    const { travelMode } = this.state;
    return (
      <TouchableOpacity onPress={() => this.props.changeTravelMode(mode)}>
        <Ionicons name={icon} size={32} color={travelMode === mode ? '#C45146' : '#BDB8B3'}/>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.travelModeBar}>
        {this.renderIcon("md-car", "DRIVING")}
        {this.renderIcon("md-subway", "TRANSIT")}
        {this.renderIcon("md-walk", "WALKING")}
        {this.renderIcon("md-bicycle", "BICYCLING")}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  travelModeBar: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    height: 48+34,
    position: 'absolute',
    bottom: -34,
    left: 0,
    borderTopWidth: 1,
    paddingTop: 8,
    paddingBottom: 8
  }
})

TravelModeBar.propTypes = {
  travelMode: PropTypes.string.isRequired,
  changeTravelMode: PropTypes.func.isRequired
};

export default TravelModeBar;