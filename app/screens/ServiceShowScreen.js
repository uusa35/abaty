import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  Linking,
  RefreshControl
} from 'react-native';
import {connect} from 'react-redux';
import ImagesWidget from '../components/widgets/ImagesWidget';
import {width, text, isIOS} from './../constants';
import ProductInfoWidget from '../components/widgets/product/ProductInfoWidget';
import {NavContext} from './../redux/NavContext';
import UserInfoWidgetElement from '../components/widgets/user/UserInfoWidgetElement';
import ProductInfoWidgetElement from './../components/widgets/product/ProductInfoWidgetElement';
import {View} from 'react-native-animatable';
import I18n, {isRTL} from './../I18n';
import {Icon} from 'react-native-elements';
import {first} from 'lodash';
import {
  getCategoryElements,
  getDesigner,
  getSearchServices,
  getService
} from '../redux/actions';
import validate from 'validate.js';
import VideosWidget from '../components/widgets/VideosWidget';
import MainSliderWidget from '../components/widgets/MainSliderWidget';
import ServiceHorizontalWidget from '../components/widgets/service/ServiceHorizontalWidget';
import ServiceInfoWidget from '../components/widgets/service/ServiceInfoWidget';

class ServiceShowScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {refresh: false};
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.service !== this.props.service;
  }

  render() {
    const {
      service,
      currency,
      navigation,
      settings,
      dispatch,
      services,
      token
    } = this.props;
    console.log('product', service);
    return (
      <NavContext.Provider value={{navigation}}>
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
                  getService({id: service.id, api_token: token ? token : null})
                );
              }}
            />
          }
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentInset={{bottom: 50}}>
          <ImagesWidget
            elements={service.images
              .concat({id: service.id, large: service.large})
              .reverse()}
            width={width}
            height={550}
            name={service.name}
            exclusive={service.exclusive}
            isOnSale={service.isOnSale}
            isReallyHot={service.isReallyHot}
          />
          <View style={{width: '90%'}}>
            <View animation="bounceInLeft" easing="ease-out">
              <ServiceInfoWidget element={service} />
            </View>
            <View
              animation="bounceInLeft"
              easing="ease-out"
              style={{marginTop: 15}}>
              {service.description ? (
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
                    {service.description}
                  </Text>
                </View>
              ) : null}
              {!validate.isEmpty(service.user) ? (
                <ProductInfoWidgetElement
                  elementName="designer"
                  name={service.user.slug}
                  link={() =>
                    dispatch(
                      getDesigner({
                        element: service.user,
                        searchElements: {user_id: service.user.id}
                      })
                    )
                  }
                />
              ) : null}
              <ProductInfoWidgetElement
                elementName="categories"
                name={first(service.categories).name}
                link={() =>
                  dispatch(
                    getSearchServices({
                      element: first(service.categories),
                      category: first(service.categories),
                      searchElements: {
                        product_category_id: first(service.categories).id
                      }
                    })
                  )
                }
              />
              <ProductInfoWidgetElement
                elementName="sku"
                name={service.sku}
                showArrow={false}
              />
              <ProductInfoWidgetElement
                elementName="product_weight"
                name={service.weight}
                showArrow={false}
              />
              <ProductInfoWidgetElement
                elementName="contactus_order_by_phone"
                name={settings.phone}
                link={() => Linking.openURL(`tel:${settings.mobile}`)}
              />
              {settings.shipment_prices ? (
                <ProductInfoWidgetElement
                  elementName="shipment_prices"
                  link={() =>
                    navigation.navigate('ImageZoom', {
                      images: [
                        {id: service.id, large: settings.shipment_prices}
                      ],
                      name: service.name,
                      index: 0
                    })
                  }
                />
              ) : null}
              {settings.size_chart ? (
                <ProductInfoWidgetElement
                  elementName="size_chart"
                  link={() =>
                    navigation.navigate('ImageZoom', {
                      images: [{id: service.id, large: settings.size_chart}],
                      name: service.name,
                      index: 0
                    })
                  }
                />
              ) : null}
            </View>
          </View>
          {validate.isObject(service.videoGroup) &&
          !validate.isEmpty(service.videoGroup) ? (
            <VideosWidget videos={service.videoGroup} />
          ) : null}
          {!validate.isEmpty(services) ? (
            <ServiceHorizontalWidget
              elements={services}
              showName={true}
              currency={currency}
              title="featured_products"
            />
          ) : null}
        </ScrollView>
      </NavContext.Provider>
    );
  }
}

function mapStateToProps(state) {
  return {
    service: state.service,
    currency: state.currency,
    settings: state.settings,
    services: state.services,
    token: state.token
  };
}

export default connect(mapStateToProps)(ServiceShowScreen);

const styles = StyleSheet.create({});
