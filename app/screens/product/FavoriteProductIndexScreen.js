import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import BgContainer from '../../components/containers/BgContainer';
import ElementsHorizontalList from '../../components/Lists/ElementsHorizontalList';
import {images} from '../../constants/images';
import {ABATI} from './../../../app';

const FavoriteProductIndexScreen = () => {
  const {productFavorites} = useSelector((state) => state);

  return (
    <BgContainer showImage={false}>
      <ElementsHorizontalList
        elements={productFavorites}
        searchParams={{}}
        type="product"
        searchElements={{}}
        showMore={false}
        showFooter={true}
        showSearch={false}
        showProductsFilter={false}
        emptyListImage={ABATI ? images.emptyProductFavorite : null}
      />
    </BgContainer>
  );
};

export default FavoriteProductIndexScreen;

const styles = StyleSheet.create({});
