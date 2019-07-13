import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {NavContext} from './../redux/NavContext';
import {View} from 'react-native-animatable';
import ProductList from '../components/widgets/product/ProductList';
import PropTypes from 'prop-types';
import {has} from 'lodash';
import {getAllProducts, getSearchProducts} from '../redux/actions';

class ProductIndexAllScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(): void {
    this.props.dispatch(getAllProducts());
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

export default connect(mapStateToProps)(ProductIndexAllScreen);

ProductIndexAllScreen.propTypes = {
  products: PropTypes.array.isRequired
};

const styles = StyleSheet.create({});