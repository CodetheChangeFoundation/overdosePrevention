import React from 'react';
import PropTypes from "prop-types";
import Carousel from 'react-native-snap-carousel';
import { View } from "react-native";

class CityCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: props.items
    };
  }

  componentDidMount() {
    this.combineCities();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.items.length !== this.props.items.length) {
      this.combineCities();
    }
  }

  combineCities() {
    let items = this.props.items;
    let newItems = [];

    for (let i = 0; i < items.length; i += 2) {
      newItems.push(
        <View key={i + 10}>
          {items[i]}
          {items[i + 1]}
        </View>
      );
    }

    this.setState({
      items: newItems
    });
  }

  renderItem({item, index}) {
    return (
      <View>
        {item}
      </View>
    );
  }

  render() {
    return (
      <Carousel
        renderItem={this.renderItem}
        data={this.state.items}
        sliderWidth={375}
        itemWidth={325}
        loop={true}
      />
    );
  }
}

CityCarousel.propTypes = {
  items: PropTypes.array.isRequired
};

export default CityCarousel;