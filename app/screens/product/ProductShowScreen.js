import React, {Fragment, useState, useMemo, useCallback} from 'react';
import {StyleSheet, Text, Linking, RefreshControl, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ImagesWidget from '../../components/widgets/ImagesWidget';
import {width, text, height} from './../../constants/sizes';
import ProductInfoWidget from '../../components/widgets/product/ProductInfoWidget';
import ProductInfoWidgetElement from './../../components/widgets/product/ProductInfoWidgetElement';
import I18n from './../../I18n';
import {first, take, shuffle} from 'lodash';
import {getProduct, getSearchProducts} from '../../redux/actions/product';
import validate from 'validate.js';
import ProductHorizontalWidget from '../../components/widgets/product/ProductHorizontalWidget';
import PropTypes from 'prop-types';
import ActionBtnWidget from '../../components/widgets/ActionBtnWidget';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import VideosHorizontalWidget from '../../components/widgets/video/VideosHorizontalWidget';
import {getDesigner} from '../../redux/actions/user';

const ProductShowScreen = ({navigation}) => {
  const {product, settings, token, homeProducts} = useSelector(state => state);
  const {phone, mobile, shipment_prices, size_chart, weight} = settings;
  const dispatch = useDispatch();
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
    <Fragment>
      <HeaderImageScrollView
        vertical={false}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        maxHeight={height / 1.5}
        minHeight={90}
        style={{width}}
        scrollViewBackgroundColor="transparent"
        overlayColor="white"
        renderForeground={() => (
          <ImagesWidget
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
        )}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => {
              handleRefresh();
            }}
          />
        }
        automaticallyAdjustContentInsets={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentInset={{bottom: 50}}>
        <View style={{alignSelf: 'center', width: '95%'}}>
          <ProductInfoWidget element={product} />
          <View>
            {product.description ? (
              <View>
                <Text style={styles.title}>{I18n.t('description')}</Text>
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
            {!validate.isEmpty(product.categories) ? (
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
            <ProductInfoWidgetElement
              elementName="sku"
              name={product.sku}
              showIcon={false}
            />
            {weight ? (
              <ProductInfoWidgetElement
                elementName="product_weight"
                name={weight}
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
            {product.show_attribute && product.size_chart_image ? (
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
        {validate.isObject(product.videoGroup) &&
        !validate.isEmpty(product.videoGroup) ? (
          <VideosHorizontalWidget videos={product.videoGroup} />
        ) : null}
        {!validate.isEmpty(homeProducts) ? (
          <ProductHorizontalWidget
            elements={take(shuffle(homeProducts), 5)}
            showName={true}
            title={I18n.t('related_products')}
          />
        ) : null}
      </HeaderImageScrollView>
      <ActionBtnWidget />
    </Fragment>
  );
};

ProductShowScreen.navigationOptions = ({navigation}) => ({
  headerTransparent: navigation.state.params.headerBg,
  headerStyle: {
    backgroundColor: navigation.state.params.headerBgColor,
  },
});

export default ProductShowScreen;

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
