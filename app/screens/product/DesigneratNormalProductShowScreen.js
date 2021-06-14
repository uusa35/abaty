import React, {useState, useCallback} from 'react';
import {StyleSheet, Text, Linking, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ImagesWidget from '../../components/widgets/ImagesWidget';
import {
  width,
  text,
  height,
  productWidget,
  iconSizes,
} from './../../constants/sizes';
import ProductInfoWidget from '../../components/widgets/product/ProductInfoWidget';
import ProductInfoWidgetElement from './../../components/widgets/product/ProductInfoWidgetElement';
import I18n from './../../I18n';
import {first} from 'lodash';
import {getProduct, getSearchProducts} from '../../redux/actions/product';
import {getDesigner, rateElement} from '../../redux/actions/user';
import validate from 'validate.js';
import PropTypes from 'prop-types';
import ActionBtnWidget from '../../components/widgets/ActionBtnWidget';
import VideosVerticalWidget from '../../components/widgets/video/VideosVerticalWidget';
import BgContainer from '../../components/containers/BgContainer';
import KeyBoardContainer from '../../components/containers/KeyBoardContainer';
import {APP_CASE, DESIGNERAT, EXPO} from './../../../app';
import {useNavigation} from '@react-navigation/native';
import widgetStyles from '../../components/widgets/widgetStyles';
import DesigneratAddToCartStickyFooter from '../../components/widgets/product/DesigneratAddToCartStickyFooter';
import {addToCart} from '../../redux/actions/cart';
import {Rating} from 'react-native-ratings';
import {isIOS} from '../../constants';

const DesineratNormalProductShowScreen = ({showRating = true}) => {
  const {product, token, settings, products, guest} = useSelector(
    state => state,
  );
  const {phone, mobile, shipment_prices, size_chart, colors} = settings;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [refresh, setRefresh] = useState(false);
  const [headerBg, setHeaderBg] = useState(true);
  const [headerBgColor, setHeaderBgColor] = useState('transparent');
  const [addToCartStatus, setAddToCartStatus] = useState(false);
  const [cartItem, setCartItem] = useState({});
  const [rating, setRating] = useState(product.rating);

  const handleRating = useCallback(
    rating => {
      if (rating !== product.rating) {
        setRating(rating);
        return dispatch(rateElement({value: rating, product_id: product.id}));
      }
    },
    [rating],
  );

  const handleRefresh = () => {
    setRefresh(false);
    dispatch(
      getProduct({
        id: product.id,
        api_token: token ? token : null,
        redirect: false,
      }),
    );
  };

  useCallback(() => {
    if (!validate.isEmpty(cartItem)) {
      setAddToCartStatus(true);
    } else {
      setAddToCartStatus(false);
    }
  }, [cartItem, cartItem.qty]);

  const handleAddToCart = () => {
    if (!validate.isEmpty(cartItem)) {
      return dispatch(addToCart(cartItem));
    }
  };

  return (
    <BgContainer showImage={false} white={true}>
      <KeyBoardContainer
        behavior="position"
        handleRefresh={() => handleRefresh()}
        showRefresh={true}>
        <ImagesWidget
          sku={!EXPO ? product.sku : null}
          qr={product.qr}
          elements={product.images
            .concat({id: product.id, large: product.large})
            .reverse()}
          width={width}
          height={height / 1.5}
          name={product.name}
          exclusive={product.exclusive}
          isOnSale={product.isOnSale}
          isReallyHot={product.isReallyHot}
          hasStock={product.has_stock}
          directPurchase={product.directPurchase}
        />
        <View
          style={{alignSelf: 'center', width: '95%', backgroundColor: 'white'}}>
          {product.brand && (
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                justifyContent: 'flex-start',
                maxWidth: productWidget[APP_CASE].small.width,
                height: 40,
                flexDirection: 'row',
                alignSelf: 'flex-start',
                borderWidth: 1,
                borderColor: 'lightgrey',
                marginLeft: 10,
                marginBottom: 10,
                marginTop: 20,
              }}>
              <View
                style={{
                  flex: 1,
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontFamily: text.font, color: 'black'}}>
                  {I18n.t('brand')}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.btn_bg_theme_color,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: text.font,
                    color: colors.btn_text_theme_color,
                  }}>
                  {product.brand.slug}
                </Text>
              </View>
            </View>
          )}
          <View
            style={{
              alignItems: 'center',
              marginTop: 10,
              marginLeft: 10,
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            <Rating
              type="custom"
              readonly={guest}
              showRating={false}
              startingValue={rating}
              count={10}
              ratingCount={5}
              ratingColor={colors.btn_bg_theme_color}
              ratingBackgroundColor={'white'}
              onFinishRating={rating => handleRating(rating)}
              imageSize={iconSizes.smaller}
            />

            <Text
              style={[
                widgetStyles.headerFour,
                {paddingLeft: 15, paddingRight: 15},
              ]}>
              {I18n.t('be_first_who_rates')}
            </Text>
          </View>
          <ProductInfoWidget
            element={product}
            setAddToCartStatus={setAddToCartStatus}
            setCartItem={setCartItem}
            handleAddToCart={handleAddToCart}
          />
          <View
            style={{
              borderWidth: 0.5,
              padding: 20,
              margin: 10,
              borderRadius: 5,
              borderColor: 'lightgrey',
            }}>
            {product.description ? (
              <View>
                <Text
                  style={[
                    styles.title,
                    {color: settings.colors.btn_bg_theme_color},
                  ]}>
                  {I18n.t('description')}
                </Text>
                <Text style={[styles.normalText, {lineHeight: 30}]}>
                  {product.description}
                </Text>
              </View>
            ) : null}
            {product.user ? (
              <ProductInfoWidgetElement
                elementName="company"
                name={product.user.slug}
                link={() =>
                  dispatch(
                    getDesigner({
                      id: product.user_id,
                      searchParams: {user_id: product.user_id},
                      redirect: true,
                    }),
                  )
                }
              />
            ) : null}
            {product.categories ? (
              <ProductInfoWidgetElement
                elementName="categories"
                name={first(product.categories).name}
                link={() =>
                  dispatch(
                    getSearchProducts({
                      element: first(product.categories),
                      category: first(product.categories),
                      searchParams: {
                        product_category_id: first(product.categories).id,
                      },
                      redirect: true,
                    }),
                  )
                }
              />
            ) : null}
            {product.sku ? (
              <ProductInfoWidgetElement
                elementName="sku"
                name={product.sku}
                showIcon={false}
              />
            ) : null}
            {product.weight ? (
              <ProductInfoWidgetElement
                elementName="product_weight"
                name={`${product.weight} ${I18n.t('kg')}`}
                showIcon={false}
              />
            ) : null}
            {(product.user.fullMobile || mobile) && !DESIGNERAT ? (
              <ProductInfoWidgetElement
                elementName="contactus_order_by_phone"
                name={
                  product.user.fullMobile ? product.user.fullMobile : mobile
                }
                link={() =>
                  Linking.openURL(
                    `tel:${
                      product.user.fullMobile ? product.user.fullMobile : mobile
                    }`,
                  )
                }
              />
            ) : null}
            {!validate.isEmpty(shipment_prices) ? (
              <ProductInfoWidgetElement
                elementName="shipment_fees"
                link={() =>
                  navigation.navigate('ImageZoom', {
                    images: [{id: product.id, large: shipment_prices}],
                    name: product.name,
                    index: 0,
                  })
                }
              />
            ) : null}
            {product.show_size_chart && product.size_chart_image ? (
              <ProductInfoWidgetElement
                elementName="size_chart"
                link={() =>
                  navigation.navigate('ImageZoom', {
                    images: [{id: product.id, large: product.size_chart_image}],
                    name: product.name,
                    index: 0,
                  })
                }
              />
            ) : !validate.isEmpty(size_chart) && product.show_attribute ? (
              <ProductInfoWidgetElement
                elementName="size_chart"
                link={() =>
                  navigation.navigate('ImageZoom', {
                    images: [{id: product.id, large: size_chart}],
                    name: product.name,
                    index: 0,
                  })
                }
              />
            ) : null}
          </View>
        </View>
        <View style={{paddingBottom: !isIOS ? '8%' : 0}}>
          {validate.isObject(product.videoGroup) &&
            !validate.isEmpty(product.videoGroup) && (
              <VideosVerticalWidget videos={product.videoGroup} />
            )}
        </View>
        {/*{!validate.isEmpty(products) && EXPO && (*/}
        {/*  <ProductHorizontalWidget*/}
        {/*    elements={take(shuffle(products), 5)}*/}
        {/*    showName={true}*/}
        {/*    title={I18n.t('related_products')}*/}
        {/*  />*/}
        {/*)}*/}
      </KeyBoardContainer>
      <DesigneratAddToCartStickyFooter
        disabled={addToCartStatus}
        handleAddToCart={handleAddToCart}
      />
      {/*<ActionBtnWidget />*/}
    </BgContainer>
  );
};

export default DesineratNormalProductShowScreen;

DesineratNormalProductShowScreen.propTypes = {};

const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    textAlign: 'left',
    fontSize: 20,
    fontFamily: text.font,
    paddingBottom: 0,
  },
  normalText: {
    textAlign: 'left',
    fontSize: 17,
    fontFamily: text.font,
    padding: 10,
  },
});
