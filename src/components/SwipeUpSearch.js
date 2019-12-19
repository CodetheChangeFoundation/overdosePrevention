import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import SearchContainer from './SearchContainer';
import BottomDrawer from './rn-bottom-drawer/BottomDrawer';

const WINDOW_HEIGHT = Dimensions.get("window").height;

class SwipeUpSearch extends React.Component {
  constructor(props) {
    super(props);
    this.onServiceButtonClick = this.onServiceButtonClick.bind(this);
  }

  onServiceButtonClick(type) {
    this.drawer.closeBottomDrawer();
    this.props.onServicePress(type);
  }

  render() {
    return (
      <BottomDrawer
        containerHeight={WINDOW_HEIGHT-100}
        downDisplay={WINDOW_HEIGHT-220}
        startUp={false}
        shadow={false}
        offset={34}
        ref={ref => this.drawer = ref}
      >
        <SearchContainer onServicePress={this.onServiceButtonClick} servicesToDisplay={this.props.servicesToDisplay} />
      </BottomDrawer>
    );
  }
}

SwipeUpSearch.propTypes = {
  onServicePress: PropTypes.func.isRequired,
  servicesToDisplay: PropTypes.any
}

export default SwipeUpSearch;