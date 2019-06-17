import React from "react";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";
import SwipeUpDown from '../components/react-native-swipe-up-down/index';
import SearchContainer from './SearchContainer';

/*
* SwipeUpSearch is the component for the swipe up search bar at the bottom of the map screen
*/
class SwipeUpSearch extends React.Component {
  constructor(props) {
    super(props);
    this.onServiceButtonClick = this.onServiceButtonClick.bind(this);
  }

  /*
  * Collapses the swipe up down view when a service button is clicked
  * @param {Object} coordinates - latitude and longitude of the service
  */
  onServiceButtonClick(type) {
    this.swipeUpDownRef.showMini();
    this.props.onServicePress(type);
  }

  render() {
    return (
      <SwipeUpDown
        animation="easeInEaseOut"
        disablePressToShow={false}
        hasRef={ref => (this.swipeUpDownRef = ref)}
        itemMini={
          <SearchContainer onServicePress={this.onServiceButtonClick} />
        }
        itemFull={
          <SearchContainer onServicePress={this.onServiceButtonClick} />
        }
        style={styles.swipeUpSearch}
      />
    );
  }
}

const styles = StyleSheet.create({
  swipeUpSearch: {
    backgroundColor: '#FFF'
  }
});

SwipeUpSearch.propTypes = {
  onServicePress: PropTypes.func.isRequired
}

export default SwipeUpSearch;