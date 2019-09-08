import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
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
