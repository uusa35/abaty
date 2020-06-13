import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import ProductList from '../../components/widgets/product/ProductList';
import BgContainer from '../../components/containers/BgContainer';
import {images} from '../../constants/images';

const FavoriteProductIndexScreen = () => {
  const {productFavorites} = useSelector((state) => state);

  return (
    <BgContainer showImage={false}>
      <ProductList
        products={productFavorites}
        searchElements={{}}
        showMore={false}
        showSearch={false}
        showProductsFilter={false}
        emptyImage={images.emptyProductFavorite}
      />
    </BgContainer>
  );
};

export default FavoriteProductIndexScreen;

const styles = StyleSheet.create({});
