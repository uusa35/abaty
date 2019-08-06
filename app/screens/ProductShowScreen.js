import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  Linking,
  RefreshControl
} from 'react-native';
import {connect} from 'react-redux';
import ImagesWidget from '../components/widgets/ImagesWidget';
import {width, text, isIOS} from './../constants';
import ProductInfoWidget from '../components/widgets/product/ProductInfoWidget';
import {NavContext} from './../redux/NavContext';
import UserInfoWidgetElement from '../components/widgets/user/UserInfoWidgetElement';
import ProductInfoWidgetElement from './../components/widgets/product/ProductInfoWidgetElement';
import {View} from 'react-native-animatable';
import I18n, {isRTL} from './../I18n';
import {Icon} from 'react-native-elements';
import {first} from 'lodash';
import {
  getCategoryElements,
  getDesigner,
  getProduct,
  getSearchProducts
} from '../redux/actions';
import validate from 'validate.js';
import ProductHorizontalWidget from '../components/widgets/product/ProductHorizontalWidget';
import VideosWidget from '../components/widgets/VideosWidget';
import MainSliderWidget from '../components/widgets/MainSliderWidget';
import PropTypes from 'prop-types';

class ProductShowScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {refresh: false};
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.product !== this.props.product;
  }

  render() {
    const {
      product,
      currency,
      navigation,
      settings,
      dispatch,
      phone,
      mobile,
      shipment_prices,
      size_chart,
      weight,
      homeProducts,
      token
    } = this.props;
    return (
      <NavContext.Provider value={{navigation}}>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={() => {
                this.setState({refresh: false});
                dispatch(
                  getProduct({id: product.id, api_token: token ? token : null})
                );
              }}
            />
          }
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentInset={{bottom: 50}}>
          <ImagesWidget
            elements={product.images
              .concat({id: product.id, large: product.large})
              .reverse()}
            width={width}
            height={550}
            name={product.name}
            exclusive={product.exclusive}
            isOnSale={product.isOnSale}
            isReallyHot={product.isReallyHot}
          />
          <View style={{width: '90%'}}>
            <View animation="bounceInLeft" easing="ease-out">
              <ProductInfoWidget element={product} />
            </View>
            <View
              animation="bounceInLeft"
              easing="ease-out"
              style={{marginTop: 15}}>
              {product.description ? (
                <View>
                  <Text
                    style={{
                      textAlign: 'left',
                      fontSize: 20,
                      fontFamily: text.font,
                      paddingBottom: 0
                    }}>
                    {I18n.t('description')}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'left',
                      fontSize: 17,
                      fontFamily: text.font,
                      padding: 10
                    }}>
                    {product.description}
                  </Text>
                </View>
              ) : null}
              <ProductInfoWidgetElement
                elementName="designer"
                name={product.user.slug}
                link={() =>
                  dispatch(
                    getDesigner({
                      element: product.user,
                      searchElements: {user_id: product.user.id}
                    })
                  )
                }
              />
              <ProductInfoWidgetElement
                elementName="categories"
                name={first(product.categories).name}
                link={() =>
                  dispatch(
                    getSearchProducts({
                      element: first(product.categories),
                      category: first(product.categories),
                      searchElements: {
                        product_category_id: first(product.categories).id
                      }
                    })
                  )
                }
              />
              <ProductInfoWidgetElement
                elementName="sku"
                name={product.sku}
                showArrow={false}
              />
              <ProductInfoWidgetElement
                elementName="product_weight"
                name={weight}
                showArrow={false}
              />
              <ProductInfoWidgetElement
                elementName="contactus_order_by_phone"
                name={phone}
                link={() => Linking.openURL(`tel:${mobile}`)}
              />
              {shipment_prices ? (
                <ProductInfoWidgetElement
                  elementName="shipment_prices"
                  link={() =>
                    navigation.navigate('ImageZoom', {
                      images: [{id: product.id, large: shipment_prices}],
                      name: product.name,
                      index: 0
                    })
                  }
                />
              ) : null}
              {size_chart ? (
                <ProductInfoWidgetElement
                  elementName="size_chart"
                  link={() =>
                    navigation.navigate('ImageZoom', {
                      images: [{id: product.id, large: size_chart}],
                      name: product.name,
                      index: 0
                    })
                  }
                />
              ) : null}
            </View>
          </View>
          {validate.isObject(product.videoGroup) &&
          !validate.isEmpty(product.videoGroup) ? (
            <VideosWidget videos={product.videoGroup} />
          ) : null}
          {!validate.isEmpty(homeProducts) ? (
            <ProductHorizontalWidget
              elements={homeProducts}
              showName={true}
              currency={currency}
              title="featured_products"
            />
          ) : null}
        </ScrollView>
      </NavContext.Provider>
    );
  }
}

function mapStateToProps(state) {
  return {
    product: state.product,
    currency: state.currency,
    phone: state.settings.phone,
    shipment_prices: state.settings.shipment_prices,
    size_chart: state.settings.size_chart,
    mobile: state.settings.mobile,
    weight: state.settings.weight,
    homeProducts: state.homeProducts,
    token: state.token
  };
}

export default connect(mapStateToProps)(ProductShowScreen);

ProductShowScreen.propTypes = {
  product: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired,
  homeProducts: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired
};

const styles = StyleSheet.create({});
