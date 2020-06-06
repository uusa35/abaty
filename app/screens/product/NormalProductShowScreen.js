import React, {Fragment, useState, useMemo, useCallback} from 'react';
import {StyleSheet, Text, Linking, RefreshControl, View} from 'react-native';
import {connect} from 'react-redux';
import ImagesWidget from '../../components/widgets/ImagesWidget';
import {width, text, height, bottomContentInset} from './../../constants/sizes';
import ProductInfoWidget from '../../components/widgets/product/ProductInfoWidget';
import ProductInfoWidgetElement from './../../components/widgets/product/ProductInfoWidgetElement';
import I18n from './../../I18n';
import {first} from 'lodash';
import {getProduct, getSearchProducts} from '../../redux/actions/product';
import {getDesigner} from '../../redux/actions/user';
import validate from 'validate.js';
import PropTypes from 'prop-types';
import ActionBtnWidget from '../../components/widgets/ActionBtnWidget';
import VideosVerticalWidget from '../../components/widgets/video/VideosVerticalWidget';
import BgContainer from '../../components/containers/BgContainer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const NormalProductShowScreen = ({
  product,
  dispatch,
  phone,
  mobile,
  shipment_prices,
  size_chart,
  homeProducts,
  token,
  navigation,
  settings,
}) => {
  const [refresh, setRefresh] = useState(false);
  const [headerBg, setHeaderBg] = useState(true);
  const [headerBgColor, setHeaderBgColor] = useState('transparent');

  useMemo(() => {
    navigation.setParams({headerBg, headerBgColor});
  }, [headerBg, headerBgColor]);

  const handleRefresh = useCallback(() => {
    setRefresh(false);
    dispatch(
      getProduct({
        id: product.id,
        api_token: token ? token : null,
        redirect: false,
      }),
    );
  }, [refresh]);

  return (
    <BgContainer showImage={false}>
      <KeyboardAwareScrollView
        horizontal={false}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => handleRefresh()}
          />
        }
        automaticallyAdjustContentInsets={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentInset={{bottom: bottomContentInset}}
        style={{paddingBottom: bottomContentInset}}
        ListFooterComponentStyle={{
          marginBottom: bottomContentInset,
        }}>
        <ImagesWidget
          sku={product.sku}
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
        />
        <View style={{alignSelf: 'center', width: '95%'}}>
          <ProductInfoWidget element={product} />
          <View>
            {product.description ? (
              <View>
                <Text
                  style={[
                    styles.title,
                    {color: settings.colors.btn_bg_theme_color},
                  ]}>
                  {I18n.t('description')}
                </Text>
                <Text style={styles.normalText}>{product.description}</Text>
              </View>
            ) : null}
            <ProductInfoWidgetElement
              elementName="designer"
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
            <ProductInfoWidgetElement
              elementName="sku"
              name={product.sku}
              showIcon={false}
            />
            {product.weight ? (
              <ProductInfoWidgetElement
                elementName="product_weight"
                name={`${product.weight} ${I18n.t('kg')}`}
                showIcon={false}
              />
            ) : null}
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
                    index: 0,
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
                    index: 0,
                  })
                }
              />
            ) : null}
          </View>
        </View>
        {validate.isObject(product.videoGroup) &&
        !validate.isEmpty(product.videoGroup) ? (
          <VideosVerticalWidget videos={product.videoGroup} />
        ) : null}
        {/*{!validate.isEmpty(homeProducts) ? (*/}
        {/*  <ProductHorizontalWidget*/}
        {/*    elements={homeProducts}*/}
        {/*    showName={true}*/}
        {/*    title={I18n.t('related_products')}*/}
        {/*  />*/}
        {/*) : null}*/}
      </KeyboardAwareScrollView>
      <ActionBtnWidget />
    </BgContainer>
  );
};

function mapStateToProps(state) {
  return {
    product: state.product,
    phone: state.settings.phone,
    shipment_prices: state.settings.shipment_prices,
    size_chart: state.settings.size_chart,
    mobile: state.settings.mobile,
    homeProducts: state.homeProducts,
    token: state.token,
    cart: state.cart,
    settings: state.settings,
  };
}

NormalProductShowScreen.navigationOptions = ({navigation}) => ({
  // headerTransparent: navigation.state.params.headerBg,
  // headerStyle: {
  //   backgroundColor: navigation.state.params.headerBgColor
  // }
});

export default connect(mapStateToProps)(NormalProductShowScreen);

NormalProductShowScreen.propTypes = {
  product: PropTypes.object.isRequired,
  homeProducts: PropTypes.array.isRequired,
  token: PropTypes.string,
};

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
