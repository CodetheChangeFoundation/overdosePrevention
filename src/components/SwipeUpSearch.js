import React from "react";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";
import SwipeUpDown from 'react-native-swipe-up-down';
import SearchContainer from './SearchContainer';

/*
* SwipeUpSearch is the component for the swipe up search bar at the bottom of the map screen
*/
class SwipeUpSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false
    }
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
    const flexStyle = this.state.isExpanded ? styles.expanded : styles.collapsed;
    return (
      <SwipeUpDown
        hasRef={ref => (this.swipeUpDownRef = ref)}
        animation="easeInEaseOut"
        itemMini={
          <SearchContainer
            isExpanded={false}
            onServicePress={this.onServiceButtonClick}
          />
        }
        itemFull={
          <SearchContainer
            isExpanded={true}
            onServicePress={this.onServiceButtonClick}
          />
        }
        onShowMini={() =>
          this.setState({isExpanded: false}
        )}
        onShowFull={() =>
          this.setState({isExpanded: true}
        )}
        style={[styles.swipeUpSearch, flexStyle]}
        swipeHeight={60}
      />
    );
  }
}

const styles = StyleSheet.create({
  swipeUpSearch: {
    backgroundColor: '#FFF',
    height: 40,
    alignItems: 'center'
  },
  expanded: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  collapsed: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

SwipeUpSearch.propTypes = {
  onServicePress: PropTypes.func.isRequired
}

export default SwipeUpSearch;