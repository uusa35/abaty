import React, {Fragment, useState} from 'react';
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
import {width, text, height} from './../constants';
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
import {
  phoneSelector,
  productSelector,
  tokenSelector
} from '../redux/selectors/collection';
import {cartSelector} from '../redux/selectors/collections';

const ProductShowScreen = ({
  product,
  navigation,
  dispatch,
  phone,
  mobile,
  shipment_prices,
  size_chart,
  weight,
  homeProducts,
  token
}) => {
  const [refresh, setRefresh] = useState(false);
  const [scrollVal, setScrollVal] = useState(0);
  const [btnVisible, setBtnVisible] = useState(false);
  return (
    <Fragment>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        onScrollEndDrag={e => {
          if (e.nativeEvent.contentOffset.y > scrollVal) {
            setBtnVisible(true);
          } else {
            setBtnVisible(false);
          }
        }}
        onScrollBeginDrag={e => setScrollVal(e.nativeEvent.contentOffset.y)}
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
            title="featured_products"
          />
        ) : null}
      </ScrollView>
      {btnVisible ? <ActionBtnWidget /> : null}
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    product: productSelector(state),
    phone: phoneSelector(state),
    shipment_prices: state.settings.shipment_prices,
    size_chart: state.settings.size_chart,
    mobile: state.settings.mobile,
    weight: state.settings.weight,
    homeProducts: state.homeProducts,
    token: tokenSelector(state),
    cart: cartSelector(state)
  };
}
export default connect(mapStateToProps)(React.memo(ProductShowScreen));

ProductShowScreen.propTypes = {
  product: PropTypes.object.isRequired,
  homeProducts: PropTypes.array.isRequired,
  token: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    marginTop: -100
  },
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
