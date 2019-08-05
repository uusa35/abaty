import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {NavContext} from './../redux/NavContext';
import ProductList from '../components/widgets/product/ProductList';
import PropTypes from 'prop-types';
import I18n from './../I18n';
import {text, width} from '../constants';
import {Button} from 'react-native-elements';
import validate from 'validate.js';

class FavoriteIndexScreen extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.productFavorites !== nextProps.productFavorites;
  }

  render() {
    const {productFavorites, navigation, searchParams, colors} = this.props;
    return (
      <NavContext.Provider value={{navigation}}>
        {!validate.isEmpty(productFavorites) ? (
          <ProductList
            elements={productFavorites}
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
              onPress={() => navigation.navigate('Home')}
              raised
              title={I18n.t('shop_now')}
              type="outline"
              containerStyle={{marginBottom: 20}}
              titleStyle={{
                fontFamily: text.font,
                color: colors.main_text_theme_color
              }}
            />
          </View>
        )}
      </NavContext.Provider>
    );
  }
}

function mapStateToProps(state) {
  return {
    productFavorites: state.productFavorites,
    searchParams: state.searchParams,
    colors: state.settings.colors
  };
}

export default connect(mapStateToProps)(FavoriteIndexScreen);

FavoriteIndexScreen.propTypes = {
  productFavorites: PropTypes.array.isRequired
};

const styles = StyleSheet.create({});
