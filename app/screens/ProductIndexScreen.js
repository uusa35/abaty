import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {text, links} from '../constants';
import FastImage from 'react-native-fast-image';
import validate from 'validate.js';
import {NavContext} from './../redux/NavContext';
import {View} from 'react-native-animatable';
import ProductList from '../components/widgets/product/ProductList';
import PropTypes from 'prop-types';

class ProductIndexScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {products, navigation} = this.props;
    return (
      <NavContext.Provider value={{navigation}}>
        <ProductList elements={products} showName={true} />
      </NavContext.Provider>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products
  };
}

export default connect(mapStateToProps)(ProductIndexScreen);

ProductIndexScreen.propTypes = {
  products: PropTypes.array.isRequired
};

const styles = StyleSheet.create({});
