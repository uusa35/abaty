import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  Linking,
  RefreshControl
} from 'react-native';
import {connect} from 'react-redux';
import ImagesWidget from '../components/widgets/ImagesWidget';
import {width, text, height} from './../constants';
import ProductInfoWidgetElement from './../components/widgets/product/ProductInfoWidgetElement';
import {View} from 'react-native-animatable';
import I18n from './../I18n';
import {first} from 'lodash';
import {getDesigner, getSearchServices, getService} from '../redux/actions';
import validate from 'validate.js';
import VideosWidget from '../components/widgets/VideosWidget';
import ServiceInfoWidget from '../components/widgets/service/ServiceInfoWidget';
import PropTypes from 'prop-types';
import {servicesSelector} from '../redux/selectors/collections';
import {
  mobileSelector,
  phoneSelector,
  serviceSelector,
  tokenSelector
} from '../redux/selectors/collection';

const ServiceShowScreen = ({service, phone, mobile, dispatch, token}) => {
  const [refresh, setRefresh] = useState(false);
  return (
    <ScrollView
      style={{borderWidth: 1, marginTop: -(height * 0.1)}}
      contentContainerStyle={{
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={() => {
            setRefresh(false);
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
              elementName="company"
              name={service.user.slug}
              link={() =>
                dispatch(
                  getDesigner({
                    id: service.user.id,
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
                  searchElements: {
                    service_category_id: first(service.categories).id
                  }
                })
              )
            }
          />
          {service.sku ? (
            <ProductInfoWidgetElement
              elementName="sku"
              name={service.sku}
              showArrow={false}
            />
          ) : null}
          {service.individuals ? (
            <ProductInfoWidgetElement
              elementName="individuals_served"
              name={service.individuals}
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
      {validate.isObject(service.videoGroup) &&
      !validate.isEmpty(service.videoGroup) ? (
        <VideosWidget videos={service.videoGroup} />
      ) : null}
    </ScrollView>
  );
};

function mapStateToProps(state) {
  return {
    service: serviceSelector(state),
    phone: phoneSelector(state),
    mobile: mobileSelector(state),
    services: servicesSelector(state),
    token: tokenSelector(state)
  };
}

export default connect(mapStateToProps)(React.memo(ServiceShowScreen));

ServiceShowScreen.propTypes = {
  services: PropTypes.array.isRequired,
  service: PropTypes.object.isRequired,
  token: PropTypes.string
};

const styles = StyleSheet.create({});
