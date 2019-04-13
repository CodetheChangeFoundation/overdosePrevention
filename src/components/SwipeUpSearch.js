import React from "react";
import SwipeUpDown from 'react-native-swipe-up-down';
import SearchContainer from './SearchContainer';
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";

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
    onServiceButtonClick(coordinates) {
        this.swipeUpDownRef.showMini();
        this.props.onLogoPress(coordinates);
    }

    render() {
        const flexStyle = this.state.isExpanded ? styles.expandedStyle : styles.nonExpandedStyle;
        return (
            <SwipeUpDown
                hasRef={ref => (this.swipeUpDownRef = ref)}
                itemMini = {
                    <SearchContainer
                        isExpanded = {false}
                        onLogoPress = {this.onServiceButtonClick}
                    />
                }
                animation = 'spring'
                itemFull = {
                    <SearchContainer
                        isExpanded = {true}
                        onLogoPress = {this.onServiceButtonClick}
                    />
                }
                onShowMini = {() =>
                    this.setState({isExpanded: false}
                )}
                onShowFull  = {() =>
                    this.setState({isExpanded: true}
                )}
                style = {[styles.SwipeUpSearch, flexStyle]}
                swipeHeight={60}
            />
        )
    }
}

const styles = StyleSheet.create({
    SwipeUpSearch: {
        backgroundColor: '#ccd2dd'
    },
    expandedStyle: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    nonExpandedStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

SwipeUpSearch.propTypes = {
    onLogoPress: PropTypes.func.isRequired
}

export default SwipeUpSearch;