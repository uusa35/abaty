import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import BgContainer from '../../components/containers/BgContainer';
import ElementsHorizontalList from '../../components/Lists/ElementsHorizontalList';
import {images} from '../../constants/images';
import {ABATI} from './../../../app';
import I18n from './../../I18n';
import widgetStyles from '../../components/widgets/widgetStyles';
const FavoriteProductIndexScreen = () => {
  const {productFavorites} = useSelector(state => state);
  const [currentElements, setCurrentElements] = useState(productFavorites);

  useEffect(() => {
    setCurrentElements(productFavorites);
  }, [productFavorites]);

  return (
    <BgContainer showImage={false}>
      <View
        style={{
          flex: 1,
          marginTop: '10%',
        }}>
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
      </View>
    </BgContainer>
  );
};

export default FavoriteProductIndexScreen;

const styles = StyleSheet.create({});
