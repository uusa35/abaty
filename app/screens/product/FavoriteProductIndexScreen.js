import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import BgContainer from '../../components/containers/BgContainer';
import ElementsHorizontalList from '../../components/Lists/ElementsHorizontalList';
import {images} from '../../constants/images';
import {ABATI} from './../../../app';

const FavoriteProductIndexScreen = () => {
  const {productFavorites} = useSelector((state) => state);
  const [currentElements, setCurrentElements] = useState(productFavorites);

  useEffect(() => {
    setCurrentElements(productFavorites);
  }, [productFavorites]);

  return (
    <BgContainer showImage={false}>
      <ElementsHorizontalList
        elements={currentElements}
        searchParams={{}}
        type="product"
        searchElements={{}}
        showMore={false}
        showFooter={false}
        showSearch={false}
        showProductsFilter={false}
        emptyListImage={ABATI ? 'emptyProductFavorite' : ''}
      />
    </BgContainer>
  );
};

export default FavoriteProductIndexScreen;

const styles = StyleSheet.create({});
