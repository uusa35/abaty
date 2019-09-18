import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import BrandList from '../components/widgets/brand/BrandList';
import {SafeAreaView} from 'react-navigation';
import BrandIndexScreen from './BrandIndexScreen';
import {getAllProducts} from '../redux/actions';
import ProductList from '../components/widgets/product/ProductList';
import {productsSelector} from '../redux/selectors/collections';
import {colorsSelector} from '../redux/selectors/collection';
import I18n from '../I18n';

const PageTwoScreen = ({products, colors, dispatch, navigation}) => {
  [title, setTitle] = useState('');
  useEffect(() => {
    navigation.setParams({title: I18n.t('products')});
  }, [title]);

  return (
    <ProductList
      colors={colors}
      dispatch={dispatch}
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
    products: productsSelector(state),
    colors: colorsSelector(state)
  };
}

PageTwoScreen.navigationOptions = ({navigation}) => ({
  // headerTitle: navigation.state.params.title
  // title : has(navigation.state,'params') ? navigation.state.params.title : I18n.t('categories')
  title: I18n.t('products')
});

export default connect(mapStateToProps)(PageTwoScreen);

PageTwoScreen.propTypes = {
  products: PropTypes.array.isRequired
};

const styles = StyleSheet.create({});
