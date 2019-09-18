import React, {Fragment, useState, useEffect, useMemo} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  Linking,
  RefreshControl
} from 'react-native';
import {connect} from 'react-redux';
import ImagesWidget from '../components/widgets/ImagesWidget';
import {width, text} from './../constants';
import ProductInfoWidgetElement from './../components/widgets/product/ProductInfoWidgetElement';
import {View} from 'react-native-animatable';
import I18n from './../I18n';
import {first} from 'lodash';
import {getDesigner, getSearchServices, getService} from '../redux/actions';
import validate from 'validate.js';
import VideosWidget from '../components/widgets/VideosWidget';
import ServiceInfoWidget from '../components/widgets/service/ServiceInfoWidget';
import PropTypes from 'prop-types';
import ActionBtnWidget from '../components/widgets/ActionBtnWidget';
import ServiceHorizontalWidget from '../components/widgets/service/ServiceHorizontalWidget';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';

const ServiceShowScreen = ({
  service,
  services,
  phone,
  mobile,
  dispatch,
  token,
  colors,
  navigation
}) => {
  const [refresh, setRefresh] = useState(false);
  const [scrollVal, setScrollVal] = useState(0);
  const [btnVisible, setBtnVisible] = useState(false);
  const [headerBg, setHeaderBg] = useState(true);
  const [headerBgColor, setHeaderBgColor] = useState('transparent');

  useEffect(() => {
    navigation.setParams({headerBg, headerBgColor});
  }, [headerBg]);

  return (
    <Fragment>
      <HeaderImageScrollView
        horizontal={false}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        maxHeight={550}
        minHeight={90}
        style={{width}}
        scrollViewBackgroundColor="transparent"
        overlayColor="white"
        renderForeground={() => (
          <ImagesWidget
            colors={colors}
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
        )}
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
        onScrollEndDrag={e => {
          if (e.nativeEvent.contentOffset.y > scrollVal) {
            setBtnVisible(true);
          } else {
            setBtnVisible(false);
          }
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentInset={{bottom: 50}}>
        <View style={{alignSelf: 'center', width: '95%'}}>
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
                colors={colors}
                elementName="company"
                name={service.user.slug}
                link={() =>
                  dispatch(
                    getDesigner({
                      id: service.user_id,
                      searchParams: {user_id: service.user_id},
                      redirect: true
                    })
                  )
                }
              />
            ) : null}
            <ProductInfoWidgetElement
              colors={colors}
              elementName="categories"
              name={first(service.categories).name}
              link={() =>
                dispatch(
                  getSearchServices({
                    element: first(service.categories),
                    searchElements: {
                      service_category_id: first(service.categories).id
                    },
                    redirect: true
                  })
                )
              }
            />
            {service.sku ? (
              <ProductInfoWidgetElement
                colors={colors}
                elementName="sku"
                name={service.sku}
                showArrow={false}
              />
            ) : null}
            {service.individuals ? (
              <ProductInfoWidgetElement
                colors={colors}
                elementName="individuals_served"
                name={service.individuals}
                showArrow={false}
              />
            ) : null}
            <ProductInfoWidgetElement
              colors={colors}
              elementName="contactus_order_by_phone"
              name={phone}
              link={() => Linking.openURL(`tel:${mobile}`)}
            />
          </View>
        </View>
        {validate.isObject(service.videoGroup) &&
        !validate.isEmpty(service.videoGroup) ? (
          <VideosWidget videos={service.videoGroup} colors={colors} />
        ) : null}
        {validate.isArray(services) && !validate.isEmpty(services) ? (
          <ServiceHorizontalWidget
            dispatch={dispatch}
            colors={colors}
            showName={true}
            title="our_services"
            elements={services}
          />
        ) : null}
      </HeaderImageScrollView>
      <ActionBtnWidget colors={colors} />
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    service: state.service,
    services: state.services,
    phone: state.settings.phone,
    mobile: state.settings.mobile,
    token: state.token,
    colors: state.settings.colors
  };
}

ServiceShowScreen.navigationOptions = ({navigation}) => ({
  headerTransparent: navigation.state.params.headerBg,
  headerStyle: {
    backgroundColor: navigation.state.params.headerBgColor
  }
});

export default connect(mapStateToProps)(ServiceShowScreen);

ServiceShowScreen.propTypes = {
  services: PropTypes.array.isRequired,
  service: PropTypes.object.isRequired,
  token: PropTypes.string
};

const styles = StyleSheet.create({});
