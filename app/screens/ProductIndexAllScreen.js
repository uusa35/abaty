import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {NavContext} from './../redux/NavContext';
import ProductList from '../components/widgets/product/ProductList';
import PropTypes from 'prop-types';
import {has} from 'lodash';
import {getAllProducts, getSearchProducts} from '../redux/actions';
import {setProducts} from '../redux/actions/sagas/requestSagas';

class ProductIndexAllScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(): void {
    this.props.dispatch(getAllProducts());
  }

  render() {
    const {products} = this.props;
    return (
      <ProductList
        products={products}
        showName={true}
        searchElements={{}}
        showSearch={true}
        showFooter={false}
        showRefresh={false}
      />
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
