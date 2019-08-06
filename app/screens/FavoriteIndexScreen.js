import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import ProductList from '../components/widgets/product/ProductList';
import PropTypes from 'prop-types';
import I18n from './../I18n';
import {text, width} from '../constants';
import {Button} from 'react-native-elements';
import validate from 'validate.js';
import {
  productFavoritesSelector,
  searchParamsSelector
} from '../redux/selectors/collections';
import {colorsSelector} from '../redux/selectors/collection';
import {useNavigation} from 'react-navigation-hooks';

const FavoriteIndexScreen = ({productFavorites, searchParams, colors}) => {
  const {navigate} = useNavigation();
  console.log('the productFavorites', productFavorites);

  return (
    <View>
      {!validate.isEmpty(productFavorites) ? (
        <ProductList
          products={productFavorites}
          showName={true}
          showSearch={false}
          title={I18n.t('wishlist')}
          showTitle={false}
          showMore={false}
          showFooter={false}
          searchElements={searchParams}
        />
      ) : (
        <View
          style={{
            marginTop: 300,
            width: width - 50,
            alignSelf: 'center'
          }}>
          <Button
            raised
            title={I18n.t('no_items')}
            type="outline"
            containerStyle={{marginBottom: 20}}
            titleStyle={{fontFamily: text.font}}
          />
          <Button
            onPress={() => navigate('Home')}
            raised
            title={I18n.t('shop_now')}
            type="outline"
            containerStyle={{marginBottom: 20}}
            titleStyle={{
              fontFamily: text.font,
              color: colors.main_text_theme_color
            }}
            col
          />
        </View>
      )}
    </View>
  );
};

function mapStateToProps(state) {
  return {
    productFavorites: productFavoritesSelector(state),
    searchParams: searchParamsSelector(state),
    colors: colorsSelector(state)
  };
}

export default connect(mapStateToProps)(React.memo(FavoriteIndexScreen));

FavoriteIndexScreen.propTypes = {
  productFavorites: PropTypes.array.isRequired
};

const styles = StyleSheet.create({});
