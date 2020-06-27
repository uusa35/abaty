import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import BgContainer from '../../components/containers/BgContainer';
import {images} from '../../constants/images';
import ElementsHorizontalList from '../../components/Lists/ElementsHorizontalList';

const FavoriteProductIndexScreen = () => {
  const {productFavorites} = useSelector((state) => state);

  return (
    <BgContainer showImage={false}>
      <ElementsHorizontalList
        elements={productFavorites}
        searchParams={{}}
        type="product"
        columns={2}
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
