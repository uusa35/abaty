import React, {useState, useMemo} from 'react';
import {StyleSheet, Text, Linking, RefreshControl, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
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
import {useNavigation} from 'react-navigation-hooks';
import KeyBoardContainer from '../../components/containers/KeyBoardContainer';

const NormalProductShowScreen = () => {
  const {product, token, settings} = useSelector((state) => state);
  const {phone, mobile, shipment_prices, size_chart} = settings;
  const dispatch = useDispatch();
  const navigation = useNavigation();
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
      <KeyBoardContainer behavior="position">
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
          <View>
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
            {product.weight && (
              <ProductInfoWidgetElement
                elementName="product_weight"
                name={`${product.weight} ${I18n.t('kg')}`}
                showIcon={false}
              />
            )}
            <ProductInfoWidgetElement
              elementName="contactus_order_by_phone"
              name={phone}
              link={() => Linking.openURL(`tel:${mobile}`)}
            />
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
            {size_chart && (
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
            )}
          </View>
        </View>
        {validate.isObject(product.videoGroup) &&
          !validate.isEmpty(product.videoGroup) && (
            <VideosVerticalWidget videos={product.videoGroup} />
          )}
        {/*{!validate.isEmpty(homeProducts) ? (*/}
        {/*  <ProductHorizontalWidget*/}
        {/*    elements={homeProducts}*/}
        {/*    showName={true}*/}
        {/*    title={I18n.t('related_products')}*/}
        {/*  />*/}
        {/*) : null}*/}
      </KeyBoardContainer>
      <ActionBtnWidget />
    </BgContainer>
  );
};

NormalProductShowScreen.navigationOptions = ({navigation}) => ({
  // headerTransparent: navigation.state.params.headerBg,
  // headerStyle: {
  //   backgroundColor: navigation.state.params.headerBgColor
  // }
});

export default NormalProductShowScreen;

NormalProductShowScreen.propTypes = {};

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
