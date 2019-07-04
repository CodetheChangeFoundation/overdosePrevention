import React from "react";
import { View, FlatList, Text, StyleSheet, TouchableHighlight } from "react-native";
import PropTypes from "prop-types";
import { SearchBar } from 'react-native-elements';

class SiteSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchLocation: '',
      showSearchResults: false
    }
  }

  render() {
    const {searchLocation, showSearchResults } = this.state;
    return (
      <View style={styles.searchContainer}>
        <SearchBar
          platform="ios"
          lightTheme={true}
          placeholder="Search"
          value={searchLocation}
          onChangeText={(searchLocation) => this.setState({searchLocation, showSearchResults: searchLocation.length > 1})}
          onCancel={() => this.setState({showSearchResults: false})}
          onFocus={() => this.setState({showSearchResults: searchLocation.length > 1})}
        />

        {showSearchResults &&
          <FlatList
            style={styles.searchResultsContainer}
            data={this.props.sites.filter((item) => item.name.includes(searchLocation))}
            renderItem={({item, separators}) => (
              <TouchableHighlight
                style={styles.searchResult}
                onPress={() => { this.props.setDestination(item); this.props.setRegionAndModal(); this.setState({showSearchResults: false}) }}
                onShowUnderlay={separators.highlight}
                onHideUnderlay={separators.unhighlight}
                underlayColor="#CED0CE">
                <View>
                  <Text style={styles.body}>{item.name}</Text>
                </View>
              </TouchableHighlight>
            )}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListEmptyComponent={() => <View style={styles.searchResult}><Text style={styles.body}>No results found</Text></View>}
          />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  searchResultsContainer: {
    backgroundColor: '#FFF'
  },
  searchResult: {
    padding: 10
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#CED0CE",
    marginLeft: 10
  },
  body: {
    fontSize: 16
  }
})

SiteSearch.propTypes = {
  sites: PropTypes.array.isRequired,
  setDestination: PropTypes.func.isRequired,
  setRegionAndModal: PropTypes.func.isRequired
}

export default SiteSearch;