import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ProductList from '../components/widgets/product/ProductList';
import I18n from '../I18n';
import {getAllProducts} from '../redux/actions/product';
import BgContainer from '../components/containers/BgContainer';

const PageTwoScreen = ({products, dispatch}) => {
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <BgContainer>
      <ProductList
        products={products}
        showName={true}
        searchElements={{}}
        showSearch={true}
        showFooter={true}
        showRefresh={true}
        showSortSearch={true}
        showProductsFilter={true}
      />
    </BgContainer>
  );
};

function mapStateToProps(state) {
  return {
    products: state.products,
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
