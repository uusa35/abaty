import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import ProductList from '../../components/widgets/product/ProductList';
import PropTypes from 'prop-types';
import BgContainer from '../../components/containers/BgContainer';

const ProductIndexScreen = () => {
  const {searchProducts, searchParams} = useSelector((state) => state);
  return (
    <BgContainer showImage={false}>
      <ProductList
        products={searchProducts}
        showName={true}
        searchElements={searchParams}
        showSearch={true}
        showMore={false}
        showSortSearch={true}
        showProductsFilter={true}
      />
    </BgContainer>
  );
};

export default ProductIndexScreen;

const styles = StyleSheet.create({});
