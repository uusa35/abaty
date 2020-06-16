import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import ProductList from '../components/widgets/product/ProductList';
import I18n from '../I18n';
import {getAllProducts} from '../redux/actions/product';
import BgContainer from '../components/containers/BgContainer';

const PageTwoScreen = () => {
  const {products} = useSelector((state) => state);
  const dispatch = useDispatch();
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

PageTwoScreen.navigationOptions = ({navigation}) => ({
  // headerTitle: navigation.state.params.title
  // title : has(navigation.state,'params') ? navigation.state.params.title : I18n.t('categories')
  title: I18n.t('products'),
});

export default PageTwoScreen;

const styles = StyleSheet.create({});
