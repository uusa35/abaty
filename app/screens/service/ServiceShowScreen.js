import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, Linking, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ImagesWidget from '../../components/widgets/ImagesWidget';
import {width, text, height} from './../../constants/sizes';
import ProductInfoWidgetElement from './../../components/widgets/product/ProductInfoWidgetElement';
import {View} from 'react-native-animatable';
import I18n from './../../I18n';
import {first} from 'lodash';
import {getDesigner} from '../../redux/actions/user';
import {getSearchServices, getService} from '../../redux/actions/service';
import validate from 'validate.js';
import ServiceInfoWidget from '../../components/widgets/service/ServiceInfoWidget';
import PropTypes from 'prop-types';
import ActionBtnWidget from '../../components/widgets/ActionBtnWidget';
import ServiceHorizontalWidget from '../../components/widgets/service/ServiceHorizontalWidget';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import VideosVerticalWidget from '../../components/widgets/video/VideosVerticalWidget';
import BgContainer from '../../components/containers/BgContainer';
import {useNavigation} from '@react-navigation/native';
import KeyBoardContainer from '../../components/containers/KeyBoardContainer';
import {getProduct} from '../../redux/actions/product';
import {isIOS} from '../../constants';

const ServiceShowScreen = () => {
  const {service, services, settings, token} = useSelector(state => state);
  const {phone, mobile} = settings;
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const navigation = useNavigation();

  const handleRefresh = () => {
    setRefresh(false);
    dispatch(
      getService({
        id: service.id,
        api_token: token ? token : null,
        redirect: false,
      }),
    );
  };

  return (
    <BgContainer showImage={false} white={true}>
      <KeyBoardContainer
        behavior="position"
        handleRefresh={() => handleRefresh()}
        showRefresh={true}>
        <ImagesWidget
          elements={service.images
            .concat({id: service.id, large: service.large})
            .reverse()}
          width={width}
          height={height / 1.5}
          name={service.name}
          exclusive={service.exclusive}
          isOnSale={service.isOnSale}
          isReallyHot={service.isReallyHot}
        />
        <View style={{alignSelf: 'center', width: '95%'}}>
          <ServiceInfoWidget element={service} />
          <View
            style={{
              borderWidth: 0.5,
              padding: 20,
              margin: 10,
              borderRadius: 5,
              borderColor: 'lightgrey',
            }}>
            {service.description && (
              <View>
                <Text
                  style={{
                    textAlign: 'left',
                    fontSize: 20,
                    fontFamily: text.font,
                    paddingBottom: 0,
                  }}>
                  {I18n.t('description')}
                </Text>
                <Text
                  style={{
                    textAlign: 'left',
                    fontSize: 17,
                    fontFamily: text.font,
                    padding: 10,
                    lineHeight: 25,
                  }}>
                  {service.description}
                </Text>
              </View>
            )}
            {!validate.isEmpty(service.user) && (
              <ProductInfoWidgetElement
                elementName="company"
                name={service.user.slug}
                link={() =>
                  dispatch(
                    getDesigner({
                      id: service.user_id,
                      searchParams: {user_id: service.user_id},
                      redirect: true,
                    }),
                  )
                }
              />
            )}
            {service.categories && (
              <ProductInfoWidgetElement
                elementName="categories"
                name={first(service.categories).name}
                link={() =>
                  dispatch(
                    getSearchServices({
                      element: first(service.categories),
                      searchElements: {
                        service_category_id: first(service.categories).id,
                      },
                      redirect: true,
                    }),
                  )
                }
              />
            )}
            {service.sku && (
              <ProductInfoWidgetElement
                elementName="sku"
                name={service.sku}
                showArrow={false}
              />
            )}
            {service.individuals && (
              <ProductInfoWidgetElement
                elementName="individuals_served"
                name={service.individuals}
                showArrow={false}
              />
            )}
            {(service.user.fullMobile || mobile) && (
              <ProductInfoWidgetElement
                elementName="contactus_order_by_phone"
                name={phone}
                link={() =>
                  Linking.openURL(
                    `tel:${
                      service.user.fullMobile ? service.user.fullMobile : mobile
                    }`,
                  )
                }
              />
            )}
          </View>
        </View>
        <View style={{paddingBottom: !isIOS ? '8%' : 0}}>
          {validate.isObject(service.videoGroup) &&
            !validate.isEmpty(service.videoGroup) && (
              <VideosVerticalWidget videos={service.videoGroup} />
            )}
        </View>
        {/*{validate.isArray(services) && !validate.isEmpty(services) &&*/}
        {/*  <ServiceHorizontalWidget*/}
        {/*    showName={true}*/}
        {/*    title={I18n.t('our_services')}*/}
        {/*    elements={services}*/}
        {/*  />*/}
        {/*}*/}
      </KeyBoardContainer>
      {/*<ActionBtnWidget />*/}
    </BgContainer>
  );
};

ServiceShowScreen.navigationOptions = ({navigation}) => ({
  // headerTransparent: navigation.state.params.headerBg,
  // headerStyle: {
  //   backgroundColor: navigation.state.params.headerBgColor
  // }
});

export default ServiceShowScreen;

const styles = StyleSheet.create({});
