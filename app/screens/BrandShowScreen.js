import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {text, links} from '../constants';
import FastImage from 'react-native-fast-image';
import validate from 'validate.js';
import {NavContext} from './../redux/NavContext';
import {View} from 'react-native-animatable';
import PropTypes from 'prop-types';
import ProductList from '../components/widgets/product/ProductList';

class BrandShowScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {brand, searchParams} = this.props;
    return (
      <ProductList
        elements={brand.products}
        showName={true}
        searchElements={searchParams}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    brand: state.brand,
    searchParams: state.searchParams
  };
}

export default connect(mapStateToProps)(BrandShowScreen);

BrandShowScreen.propTypes = {
  brand: PropTypes.object.isRequired,
  searchParams: PropTypes.object.isRequired
};
const styles = StyleSheet.create({});
