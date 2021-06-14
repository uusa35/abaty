import React, {Fragment, useState, useMemo, useContext} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  Linking,
  RefreshControl,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ImagesWidget from '../../components/widgets/ImagesWidget';
import {width, text, height, iconSizes} from './../../constants/sizes';
import I18n from './../../I18n';
import {
  getClassified,
  getSearchClassifieds,
} from '../../redux/actions/classified';
import validate from 'validate.js';
import PropTypes from 'prop-types';
import {map, round, filter, first} from 'lodash';
import ClassifiedInfoWidgetElement from '../../components/widgets/classified/ClassifiedInfoWidgetElement';
import ClassifiedListHorizontal from '../../components/widgets/classified/ClassifiedListHorizontal';
import MapViewWidget from '../../components/widgets/MapViewWidget';
import PropertiesWidget from '../../components/widgets/classified/PropertiesWidget';
import QuickCallActionBtnWidget from '../../components/widgets/QuickCallActionBtnWidget';
import ClassifiedInfoWidgetMainTitle from '../../components/widgets/classified/ClassifiedInfoWidgetMainTitle';
import CommentScreenModal from './../CommentScreenModal';
import {getProductConvertedFinalPrice, getWhatsappLink} from '../../helpers';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import VideosHorizontalWidget from '../../components/widgets/video/VideosHorizontalWidget';
import BgContainer from '../../components/containers/BgContainer';

const NormalClassifiedShowScreen = ({navigation}) => {
  const {classified, commentModal, token, auth, settings} = useSelector(
    state => state,
  );
  const {exchange_rate} = useContext(GlobalValuesContext);
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const [headerBg, setHeaderBg] = useState(true);
  const [headerBgColor, setHeaderBgColor] = useState('transparent');
  const [multiItems, setMultiItems] = useState([]);
  const [nonMultiItems, setNonMultiItems] = useState([]);

  const handleRefresh = () => {
    return dispatch(
      getClassified({
        id: classified.id,
        api_token: token ? token : null,
        redirect: false,
      }),
    );
  };

  useMemo(() => {
    setMultiItems(filter(classified.items, i => i.categoryGroup.is_multi));
    setNonMultiItems(filter(classified.items, i => !i.categoryGroup.is_multi));
  }, [classified]);

  // useMemo(() => {
  //   if (headerBg && headerBgColor) {
  //     navigation.setParams({headerBg, headerBgColor});
  //   }
  // }, [headerBg]);

  return (
    <BgContainer showImage={false}>
      <ScrollView
        horizontal={false}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => handleRefresh()}
          />
        }
        automaticallyAdjustContentInsets={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentInset={{bottom: 50}}>
        {classified.images && (
          <ImagesWidget
            resizeMode="cover"
            elements={classified.images
              .concat({id: classified.id, large: classified.large})
              .reverse()}
            width={width}
            height={height / 1.5}
            name={classified.name}
            isFeatured={classified.is_featured}
            qr={settings.logo}
          />
        )}
        <View style={{flex: 1, paddingLeft: '5%', paddingRight: '5%'}}>
          {classified.user && (
            <ClassifiedInfoWidgetMainTitle
              element={classified}
              editMode={auth && auth.id === classified.user_id && token}
            />
          )}
          {!validate.isEmpty(classified.items) && (
            <PropertiesWidget
              elements={filter(
                classified.items,
                i => !i.categoryGroup.is_multi,
              )}
            />
          )}
          <View style={{marginTop: 15}}>
            {classified.description && (
              <View>
                <Text style={styles.title}>{I18n.t('description')}</Text>
                <Text style={styles.normalText}>{classified.description}</Text>
              </View>
            )}
            {classified.user && (
              <ClassifiedInfoWidgetElement
                elementName="user_name"
                name={classified.user.slug}
                showIcon={false}
                // link={() =>
                //   dispatch(
                //     getDesigner({
                //       id: classified.user.id,
                //       searchElements: {user_id: classified.user.id}
                //     })
                //   )
                // }
              />
            )}
            {classified.has_items && classified.items && (
              <Fragment>
                {map(nonMultiItems, (p, i) => (
                  <ClassifiedInfoWidgetElement
                    key={i}
                    elementName={p.categoryGroup.name}
                    name={
                      p.categoryGroup.is_multi
                        ? p.property.name
                        : p.property.value
                    }
                    properties={p.property}
                    showIcon={false}
                    translate={false}
                    properties={p.categoryGroup.properties}
                    iconName={p.categoryGroup.icon}
                  />
                ))}
                {!validate.isEmpty(multiItems) && (
                  <Fragment>
                    <Text
                      style={[
                        styles.normalText,
                        {padding: 0, paddingBottom: 10},
                      ]}>
                      {first(multiItems).categoryGroup.name}
                    </Text>
                    <View style={{flexDirection: 'row', flex: 1}}>
                      {map(multiItems, (p, i) => (
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 3,
                            marginLeft: 3,
                            backgroundColor: '#f7f7f7',
                            borderWidth: 0.5,
                            borderColor: 'lightgrey',
                            width: '20%',
                            padding: 8,
                            borderRadius: 5,
                          }}>
                          <Text
                            style={{
                              fontSize: text.small,
                              fontFamily: text.font,
                            }}>
                            {p.property.name}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </Fragment>
                )}
              </Fragment>
            )}
            {classified.category && (
              <ClassifiedInfoWidgetElement
                elementName="categories"
                name={classified.category.name}
                link={() =>
                  dispatch(
                    getSearchClassifieds({
                      name: classified.name,
                      searchParams: {
                        classified_category_id: classified.category.id,
                      },
                      redirect: true,
                    }),
                  )
                }
              />
            )}
            {classified.only_whatsapp ? (
              <ClassifiedInfoWidgetElement
                elementName="whatsapp"
                name={classified.mobile}
                link={() => Linking.openURL(getWhatsappLink(classified.mobile))}
              />
            ) : (
              <Fragment>
                {classified.user ? (
                  <ClassifiedInfoWidgetElement
                    elementName="mobile"
                    name={classified.mobile}
                    link={() =>
                      Linking.openURL(`tel:${classified.user.mobile}`)
                    }
                  />
                ) : null}
              </Fragment>
            )}
            {classified.address && (
              <ClassifiedInfoWidgetElement
                elementName="address"
                name={classified.address}
                showIcon={false}
              />
            )}
            {classified.country && (
              <ClassifiedInfoWidgetElement
                elementName="country"
                name={classified.country.slug}
                showIcon={false}
              />
            )}
            {classified.area && (
              <ClassifiedInfoWidgetElement
                elementName="area"
                name={classified.area}
                showIcon={false}
              />
            )}
            {classified.has_map && (
              <MapViewWidget
                element={classified}
                latitude={classified.latitude}
                longitude={classified.longitude}
                image={classified.large}
                title={classified.name}
                showTitle={true}
                height={350}
                description={classified.description}
                price={round(
                  getProductConvertedFinalPrice(
                    classified.price,
                    exchange_rate,
                  ),
                  2,
                )}
              />
            )}
          </View>
        </View>
        {/*{validate.isObject(classified.videoGroup) &&*/}
        {/*  !validate.isEmpty(classified.videoGroup) && (*/}
        {/*    <VideosHorizontalWidget videos={classified.videoGroup} />*/}
        {/*  )}*/}
        {/*{!validate.isEmpty(classifieds) ? (*/}
        {/*  <ClassifiedListHorizontal*/}
        {/*    classifieds={classifieds}*/}
        {/*    showName={true}*/}
        {/*    title={I18n.t('related_classifieds')}*/}
        {/*    searchElements={{classified_category_id: classified.category_id}}*/}
        {/*  />*/}
        {/*) : null}*/}
      </ScrollView>
      <QuickCallActionBtnWidget mobile={classified.mobile} />
      <CommentScreenModal
        commentModal={commentModal}
        elements={classified.comments}
        model="classified"
        id={classified.id}
      />
    </BgContainer>
  );
};

// NormalClassifiedShowScreen.navigationOptions = ({navigation}) => ({
// headerTransparent: navigation.state.params.headerBg,
// headerStyle: {
//   backgroundColor: navigation.state.params.headerBgColor
// }
// });

export default NormalClassifiedShowScreen;

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
    lineHeight: iconSizes.small,
  },
});
