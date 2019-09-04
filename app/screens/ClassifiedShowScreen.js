import React, {Fragment, useState, useMemo, useContext} from 'react';
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
import VideosWidget from '../components/widgets/VideosWidget';
import PropTypes from 'prop-types';
import ActionBtnWidget from '../components/widgets/ActionBtnWidget';
import ClassifiedListHorizontal from '../components/widgets/classified/ClassifiedListHorizontal';
import {useNavigation} from 'react-navigation-hooks';

const ClassifiedShowScreen = ({
  classified,
  classifieds,
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
  const {navigate} = useNavigation();
  return (
    <Fragment>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => {
              setRefresh(false);
              dispatch(
                getProduct({id: classified.id, api_token: token ? token : null})
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
          elements={classified.images
            .concat({id: classified.id, large: classified.large})
            .reverse()}
          width={width}
          height={550}
          name={classified.name}
          exclusive={classified.exclusive}
          isOnSale={classified.isOnSale}
          isReallyHot={classified.isReallyHot}
        />
        <View style={{width: '90%'}}>
          <ProductInfoWidget element={product} />
          <View
            animation="bounceInLeft"
            easing="ease-out"
            style={{marginTop: 15}}>
            {classified.description ? (
              <View>
                <Text style={styles.title}>{I18n.t('description')}</Text>
                <Text style={styles.normalText}>{classified.description}</Text>
              </View>
            ) : null}
            <ProductInfoWidgetElement
              elementName="designer"
              name={classified.user.slug}
              link={() =>
                dispatch(
                  getDesigner({
                    id: classified.user.id,
                    searchElements: {user_id: classified.user.id}
                  })
                )
              }
            />
            <ProductInfoWidgetElement
              elementName="categories"
              name={first(classified.categories).name}
              link={() =>
                dispatch(
                  getSearchProducts({
                    element: first(classified.categories),
                    category: first(classified.categories),
                    searchElements: {
                      product_category_id: first(classified.categories).id
                    }
                  })
                )
              }
            />
            <ProductInfoWidgetElement
              elementName="sku"
              name={classified.sku}
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
          </View>
        </View>
        {validate.isObject(classified.videoGroup) &&
        !validate.isEmpty(classified.videoGroup) ? (
          <VideosWidget videos={classified.videoGroup} colors={colors} />
        ) : null}
        {!validate.isEmpty(homeProducts) ? (
          <ClassifiedListHorizontal
            elements={classifieds}
            showName={true}
            title="featured_products"
            colors={colors}
            dispatch={dispatch}
          />
        ) : null}
      </ScrollView>
      <ActionBtnWidget />
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    classified: state.classified,
    phone: state.settings.phone,
    shipment_prices: state.settings.shipment_prices,
    mobile: state.settings.mobile,
    weight: state.settings.weight,
    classifieds: state.classifieds,
    token: state.token,
    cart: state.cart,
    colors: state.settings.colors
  };
}

export default connect(mapStateToProps)(ClassifiedShowScreen);

ClassifiedShowScreen.propTypes = {
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
