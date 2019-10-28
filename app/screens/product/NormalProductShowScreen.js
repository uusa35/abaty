import React, {Fragment, useState, useMemo, useCallback} from 'react';
import {StyleSheet, Text, Linking, RefreshControl, View} from 'react-native';
import {connect} from 'react-redux';
import ImagesWidget from '../../components/widgets/ImagesWidget';
import {width, text} from './../../constants';
import ProductInfoWidget from '../../components/widgets/product/ProductInfoWidget';
import ProductInfoWidgetElement from './../../components/widgets/product/ProductInfoWidgetElement';
import I18n from './../../I18n';
import {first} from 'lodash';
import {
  getClassified,
  getDesigner,
  getProduct,
  getSearchProducts
} from '../../redux/actions';
import validate from 'validate.js';
import ProductHorizontalWidget from '../../components/widgets/product/ProductHorizontalWidget';
import PropTypes from 'prop-types';
import ActionBtnWidget from '../../components/widgets/ActionBtnWidget';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import VideosHorizontalWidget from '../../components/widgets/video/VideosHorizontalWidget';
import {SafeAreaView, ScrollView} from 'react-navigation';
import VideosVerticalWidget from '../../components/widgets/video/VideosVerticalWidget';

const NormalProductShowScreen = ({
  product,
  dispatch,
  phone,
  mobile,
  shipment_prices,
  size_chart,
  weight,
  homeProducts,
  token,
  colors,
  navigation
}) => {
  const [refresh, setRefresh] = useState(false);
  const [headerBg, setHeaderBg] = useState(true);
  const [headerBgColor, setHeaderBgColor] = useState('transparent');

  useMemo(() => {
    navigation.setParams({headerBg, headerBgColor});
  }, [headerBg, headerBgColor]);

  const handleRefresh = useCallback(() => {
    setRefresh(false);
    dispatch(getProduct({id: product.id, api_token: token ? token : null}));
  }, [refresh]);

  return (
    <Fragment>
      <ScrollView
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
        contentInset={{bottom: 50}}>
        <ImagesWidget
          colors={colors}
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
        <View style={{alignSelf: 'center', width: '95%'}}>
          <ProductInfoWidget element={product} />
          <View animation="bounceInLeft" easing="ease-out">
            {product.description ? (
              <View>
                <Text style={styles.title}>{I18n.t('description')}</Text>
                <Text style={styles.normalText}>{product.description}</Text>
              </View>
            ) : null}
            <ProductInfoWidgetElement
              colors={colors}
              elementName="designer"
              name={product.user.slug}
              link={() =>
                dispatch(
                  getDesigner({
                    id: product.user_id,
                    searchParams: {user_id: product.user_id},
                    redirect: true
                  })
                )
              }
            />
            <ProductInfoWidgetElement
              colors={colors}
              elementName="categories"
              name={first(product.categories).name}
              link={() =>
                dispatch(
                  getSearchProducts({
                    element: first(product.categories),
                    category: first(product.categories),
                    searchParams: {
                      product_category_id: first(product.categories).id
                    },
                    redirect: true
                  })
                )
              }
            />
            <ProductInfoWidgetElement
              colors={colors}
              elementName="sku"
              name={product.sku}
              showIcon={false}
            />
            {weight ? (
              <ProductInfoWidgetElement
                colors={colors}
                elementName="product_weight"
                name={weight}
                showIcon={false}
              />
            ) : null}
            <ProductInfoWidgetElement
              colors={colors}
              elementName="contactus_order_by_phone"
              name={phone}
              link={() => Linking.openURL(`tel:${mobile}`)}
            />
            {shipment_prices ? (
              <ProductInfoWidgetElement
                colors={colors}
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
                colors={colors}
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
          <VideosVerticalWidget videos={product.videoGroup} />
        ) : null}
        {!validate.isEmpty(homeProducts) ? (
          <ProductHorizontalWidget
            elements={homeProducts}
            showName={true}
            title="related_products"
            colors={colors}
            dispatch={dispatch}
          />
        ) : null}
      </ScrollView>
      <ActionBtnWidget colors={colors} />
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    product: state.product,
    phone: state.settings.phone,
    shipment_prices: state.settings.shipment_prices,
    size_chart: state.settings.size_chart,
    mobile: state.settings.mobile,
    weight: state.settings.weight,
    homeProducts: state.homeProducts,
    token: state.token,
    cart: state.cart,
    colors: state.settings.colors
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
  token: PropTypes.string
};

const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  title: {
    textAlign: 'left',
    fontSize: 20,
    fontFamily: text.font,
    paddingBottom: 0
  },
  normalText: {
    textAlign: 'left',
    fontSize: 17,
    fontFamily: text.font,
    padding: 10
  }
});
