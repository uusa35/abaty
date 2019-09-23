import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ProductList from '../components/widgets/product/ProductList';
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
    products: state.products,
    colors: state.settings.colors
  };
}

PageTwoScreen.navigationOptions = ({navigation}) => ({
  // headerTitle: navigation.state.params.title
  // title : has(navigation.state,'params') ? navigation.state.params.title : I18n.t('categories')
  title: I18n.t('products')
});

export default connect(mapStateToProps)(PageTwoScreen);

PageTwoScreen.propTypes = {
  products: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

const styles = StyleSheet.create({});
