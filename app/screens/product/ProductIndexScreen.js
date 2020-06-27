import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import ProductList from '../../components/widgets/product/ProductList';
import PropTypes from 'prop-types';
import BgContainer from '../../components/containers/BgContainer';
import ElementsHorizontalList from '../../components/Lists/ElementsHorizontalList';

const ProductIndexScreen = () => {
  const {searchProducts, searchParams} = useSelector((state) => state);
  return (
    <BgContainer showImage={false}>
      <ElementsHorizontalList
        elements={searchProducts}
        searchParams={searchParams}
        type="product"
        columns={2}
        showRefresh={true}
        showFooter={true}
        showSearch={true}
        showSortSearch={true}
        showProductsFilter={true}
        showTitleIcons={true}
        showMore={true}
      />
    </BgContainer>
  );
};

export default ProductIndexScreen;

const styles = StyleSheet.create({});
