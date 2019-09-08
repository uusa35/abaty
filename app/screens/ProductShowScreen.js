import React, {Fragment, useState, useMemo, useContext, useEffect} from 'react';
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
import ActionBtnWidget from '../components/widgets/ActionBtnWidget';
import {useNavigation} from 'react-navigation-hooks';
import {NavigationContext} from 'react-navigation';

const ProductShowScreen = ({
  product,
  dispatch,
  phone,
  mobile,
  shipment_prices,
  size_chart,
  weight,
  homeProducts,
  token,
  colors
}) => {
  const [refresh, setRefresh] = useState(false);
  const [headerBg, setHeaderBg] = useState(true);
  const [headerBgColor, setHeaderBgColor] = useState('transparent');
  const [currentY, setCurrentY] = useState(0);
  const navigation = useContext(NavigationContext);
  const {navigate} = useNavigation();

  useEffect(() => {
    navigation.setParams({headerBg, headerBgColor});
  }, [headerBg]);

  useMemo(() => {
    console.log('the currentY', currentY);
    if (currentY > 100) {
      setHeaderBg(false);
      setHeaderBgColor('#e5e5e5');
    } else {
      setHeaderBg(true);
      setHeaderBgColor('transparent');
    }
  }, [currentY]);

  return (
    <Fragment>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        onScroll={e => setCurrentY(e.nativeEvent.contentOffset.y)}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => {
              setRefresh(false);
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
        <View style={{width: '90%'}}>
          <ProductInfoWidget element={product} />
          <View
            animation="bounceInLeft"
            easing="ease-out"
            style={{marginTop: 15}}>
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
                    redirect: true
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
            {weight ? (
              <ProductInfoWidgetElement
                elementName="product_weight"
                name={weight}
                showArrow={false}
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
                  navigate('ImageZoom', {
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
          <VideosWidget videos={product.videoGroup} colors={colors} />
        ) : null}
        {!validate.isEmpty(homeProducts) ? (
          <ProductHorizontalWidget
            elements={homeProducts}
            showName={true}
            title="featured_products"
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

export default connect(mapStateToProps)(ProductShowScreen);

ProductShowScreen.navigationOptions = ({navigation}) => ({
  headerTransparent: navigation.state.params.headerBg,
  headerStyle: {
    backgroundColor: navigation.state.params.headerBgColor
  }
});

ProductShowScreen.propTypes = {
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
