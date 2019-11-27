import React, {useEffect, useState, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ProductList from '../components/widgets/product/ProductList';
import I18n from '../I18n';

const PageTwoScreen = ({products, colors, dispatch, navigation}) => {
  [title, setTitle] = useState('');

  // useMemo(() => {
  //   navigation.setParams({title: I18n.t('products')});
  // }, [navigation]);

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
