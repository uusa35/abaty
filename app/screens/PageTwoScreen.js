import React, {useEffect, useState, useMemo, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ProductList from '../components/widgets/product/ProductList';
import I18n from '../I18n';
import {getAllProducts} from '../redux/actions/product';
import validate from 'validate.js';
import {first, last} from 'lodash';

const PageTwoScreen = ({products, dispatch}) => {
  [title, setTitle] = useState('');
  const end = useRef();
  const [currentProducts, setCurrentProducts] = useState([]);

  useEffect(() => {
    end.current = last(currentProducts).id;
    if (end.current !== last(products).id) {
      console.log('fired from Pagetow');
      dispatch(getAllProducts());
      setCurrentProducts(products);
    }
  }, [products]);

  useMemo(() => {
    if (!validate.isEmpty(products)) {
      setCurrentProducts(products);
    }
  }, [currentProducts, products]);

  return (
    <ProductList
      products={products}
      showName={true}
      searchElements={{}}
      showSearch={false}
      showFooter={true}
      showRefresh={true}
      searchParams={{}}
    />
  );
};

function mapStateToProps(state) {
  return {
    products: state.products,
    colors: state.settings.colors,
    searchParams: state.searchParams,
  };
}

PageTwoScreen.navigationOptions = ({navigation}) => ({
  // headerTitle: navigation.state.params.title
  // title : has(navigation.state,'params') ? navigation.state.params.title : I18n.t('categories')
  title: I18n.t('products'),
});

export default connect(mapStateToProps)(PageTwoScreen);

PageTwoScreen.propTypes = {
  products: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({});
