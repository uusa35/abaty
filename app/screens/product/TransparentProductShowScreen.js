import React, {useState, useMemo} from 'react';
import {StyleSheet, Text, Linking, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ImagesWidget from '../../components/widgets/ImagesWidget';
import {width, text, height} from './../../constants/sizes';
import ProductInfoWidget from '../../components/widgets/product/ProductInfoWidget';
import ProductInfoWidgetElement from './../../components/widgets/product/ProductInfoWidgetElement';
import I18n from './../../I18n';
import {first, shuffle, take} from 'lodash';
import {getProduct, getSearchProducts} from '../../redux/actions/product';
import {getDesigner} from '../../redux/actions/user';
import validate from 'validate.js';
import ProductHorizontalWidget from '../../components/widgets/product/ProductHorizontalWidget';
import ActionBtnWidget from '../../components/widgets/ActionBtnWidget';
import BgContainer from '../../components/containers/BgContainer';
import {EXPO} from '../../../app';
import VideosVerticalWidget from '../../components/widgets/video/VideosVerticalWidget';
import KeyBoardContainer from '../../components/containers/KeyBoardContainer';

const TransparentProductShowScreen = ({navigation}) => {
  const {product, settings, products, token} = useSelector(state => state);
  const {phone, shipment_prices, size_chart, mobile} = settings;
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const [headerBg, setHeaderBg] = useState(true);
  const [headerBgColor, setHeaderBgColor] = useState('transparent');

  useMemo(() => {
    navigation.setParams({headerBg, headerBgColor});
  }, [headerBg, headerBgColor]);

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

  return (
    <BgContainer showImage={false}>
      <KeyBoardContainer behavior="position" handleRefresh={handleRefresh}>
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
          directPurchase={product.directPurchase}
        />
        <View style={{alignSelf: 'center', width: '95%'}}>
          <ProductInfoWidget element={product} />
          <View
            style={{
              borderWidth: 0.5,
              padding: 20,
              margin: 10,
              borderRadius: 5,
              borderColor: 'lightgrey',
            }}>
            {product.description && (
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
            )}
            {product.user && (
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
            )}
            {product.categories && (
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
            )}
            {product.sku && (
              <ProductInfoWidgetElement
                elementName="sku"
                name={product.sku}
                showIcon={false}
              />
            )}
            {product.weight && (
              <ProductInfoWidgetElement
                elementName="product_weight"
                name={`${product.weight} ${I18n.t('kg')}`}
                showIcon={false}
              />
            )}
            {(product.user.fullMobile || mobile) && (
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
            )}
            {!validate.isEmpty(shipment_prices) && (
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
            )}
            {product.has_attributes && product.size_chart_image ? (
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
            ) : !validate.isEmpty(size_chart) && product.has_attributes ? (
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
          !validate.isEmpty(product.videoGroup) && (
            <VideosVerticalWidget videos={product.videoGroup} />
          )}
        {!validate.isEmpty(products) && EXPO && (
          <ProductHorizontalWidget
            elements={take(shuffle(products), 5)}
            showName={true}
            title={I18n.t('related_products')}
          />
        )}
      </KeyBoardContainer>
      {!EXPO && <ActionBtnWidget />}
    </BgContainer>
  );
};

TransparentProductShowScreen.navigationOptions = ({navigation}) => ({
  headerTransparent: navigation.state.params.headerBg,
  headerStyle: {
    backgroundColor: navigation.state.params.headerBgColor,
  },
});

export default TransparentProductShowScreen;

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
