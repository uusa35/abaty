import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  Linking,
  RefreshControl,
  View
} from 'react-native';
import {connect} from 'react-redux';
import ImagesWidget from '../components/widgets/ImagesWidget';
import {width, text} from './../constants';
import ProductInfoWidget from '../components/widgets/product/ProductInfoWidget';
import ProductInfoWidgetElement from './../components/widgets/product/ProductInfoWidgetElement';
import I18n from './../I18n';
import {first} from 'lodash';
import {getDesigner, getProduct, getSearchProducts} from '../redux/actions';
import validate from 'validate.js';
import ProductHorizontalWidget from '../components/widgets/product/ProductHorizontalWidget';
import VideosWidget from '../components/widgets/VideosWidget';
import PropTypes from 'prop-types';
import {Button} from 'react-native-elements';
import {find} from 'lodash';

class ProductShowScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {refresh: false, showCartBtn: false};
  }

  shouldComponentUpdate(nextProps, nextState) {
    // find(this.props.cart, (c) => {
    //     if(c.product_id === this.props.product.id) {
    //         console.log('fired');
    //         this.setState({ showCartBtn : true});
    //     }
    // });
    return (
      nextProps.product !== this.props.product ||
      nextProps.cart !== this.props.cart
    );
  }

  render() {
    const {
      product,
      currency,
      navigation,
      dispatch,
      phone,
      mobile,
      shipment_prices,
      size_chart,
      weight,
      homeProducts,
      token,
      colors
    } = this.props;
    const {showCartBtn} = this.state;
    return (
      <View style={{flex: 1}}>
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
          automaticallyAdjustContentInsets={true}
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
            <ProductInfoWidget element={product} />
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
                      id: product.user.id,
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
        <View
          style={{
            height: showCartBtn ? 80 : 0,
            backgroundColor: 'transparent'
          }}>
          {this.state.showCartBtn ? (
            <Button
              // onPress={() => navigation.navigate('CartIndex')}
              onPress={() => this.findInCart()}
              raised
              containerStyle={{width: '100%'}}
              buttonStyle={{
                backgroundColor: colors.btn_bg_theme_color,
                height: 80
              }}
              title={I18n.t('go_to_cart')}
              titleStyle={{
                fontFamily: text.font,
                color: colors.btn_text_theme_color
              }}
            />
          ) : null}
        </View>
      </View>
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
    token: state.token,
    colors: state.settings.colors,
    cart: state.cart
  };
}

export default connect(mapStateToProps)(ProductShowScreen);

ProductShowScreen.propTypes = {
  product: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired,
  homeProducts: PropTypes.array.isRequired,
  token: PropTypes.string
};

const styles = StyleSheet.create({});
