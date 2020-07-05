import React, {
  Fragment,
  useState,
  useMemo,
  useCallback,
  useContext,
} from 'react';
import {StyleSheet, Text, Linking, RefreshControl, View} from 'react-native';
import {connect, useSelector} from 'react-redux';
import ImagesWidget from '../../components/widgets/ImagesWidget';
import {width, text, height} from './../../constants/sizes';
import I18n from './../../I18n';
import {
  getClassified,
  getSearchClassifieds,
} from '../../redux/actions/classified';
import validate from 'validate.js';
import PropTypes from 'prop-types';
import {map, round} from 'lodash';
import ClassifiedInfoWidgetElement from '../../components/widgets/classified/ClassifiedInfoWidgetElement';
import ClassifiedListHorizontal from '../../components/widgets/classified/ClassifiedListHorizontal';
import MapViewWidget from '../../components/widgets/MapViewWidget';
import PropertiesWidget from '../../components/widgets/classified/PropertiesWidget';
import QuickCallActionBtnWidget from '../../components/widgets/QuickCallActionBtnWidget';
import ClassifiedInfoWidgetMainTitle from '../../components/widgets/classified/ClassifiedInfoWidgetMainTitle';
import CommentScreenModal from './../CommentScreenModal';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import {getProductConvertedFinalPrice, getWhatsappLink} from '../../helpers';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import VideosHorizontalWidget from '../../components/widgets/video/VideosHorizontalWidget';

const ClassifiedShowScreen = () => {
  const {classified, commentModal, token, auth} = useSelector((state) => state);
  const {exchange_rate} = useContext(GlobalValuesContext);
  const [refresh, setRefresh] = useState(false);
  const [headerBg, setHeaderBg] = useState(true);
  const [headerBgColor, setHeaderBgColor] = useState('transparent');

  const handleRefresh = useCallback(() => {
    return dispatch(
      getClassified({
        id: classified.id,
        api_token: token ? token : null,
        redirect: true,
      }),
    );
  }, [refresh]);

  useMemo(() => {
    navigation.setParams({headerBg, headerBgColor});
  }, [headerBg]);

  return (
    <Fragment>
      <HeaderImageScrollView
        horizontal={false}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        maxHeight={height / 1.5}
        minHeight={90}
        style={{width}}
        scrollViewBackgroundColor="transparent"
        overlayColor="white"
        renderForeground={() => (
          <ImagesWidget
            resizeMode="stretch"
            elements={classified.images
              .concat({id: classified.id, large: classified.large})
              .reverse()}
            width={width}
            height={height / 1.5}
            name={classified.name}
            isFeatured={classified.is_featured}
          />
        )}
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
        <View style={{flex: 1, padding: '5%'}}>
          {classified.user ? (
            <ClassifiedInfoWidgetMainTitle
              element={classified}
              editMode={auth && auth.id === classified.user_id && token}
            />
          ) : null}
          {!validate.isEmpty(classified.items) ? (
            <PropertiesWidget elements={classified.items} />
          ) : null}
          <View style={{marginTop: 15}}>
            {classified.description ? (
              <View>
                <Text style={styles.title}>{I18n.t('description')}</Text>
                <Text style={styles.normalText}>{classified.description}</Text>
              </View>
            ) : null}
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
            {classified.has_items ? (
              <Fragment>
                {map(classified.items, (p, i) => (
                  <ClassifiedInfoWidgetElement
                    key={i}
                    elementName={p.categoryGroup.name}
                    name={p.property.value}
                    showIcon={false}
                    translate={false}
                    iconName={p.categoryGroup.icon}
                  />
                ))}
              </Fragment>
            ) : null}
            {classified.address ? (
              <ClassifiedInfoWidgetElement
                elementName="address"
                name={classified.address}
                showIcon={false}
              />
            ) : null}
            <ClassifiedInfoWidgetElement
              elementName="categories"
              name={classified.category.name}
              link={() =>
                dispatch(
                  getSearchClassifieds({
                    searchParams: {classified_category_id: classified.id},
                    redirect: true,
                    name: classified.category.name,
                  }),
                )
              }
            />
            {classified.only_whatsapp ? (
              <ClassifiedInfoWidgetElement
                elementName="whatsapp"
                name={classified.mobile}
                link={() =>
                  Linking.openURL(
                    getWhatsappLink(
                      classified.user.country.calling_code.classified.mobile,
                    ),
                  )
                }
              />
            ) : (
              <ClassifiedInfoWidgetElement
                elementName="mobile"
                name={classified.mobile}
                link={() => Linking.openURL(`tel:${classified.user.mobile}`)}
              />
            )}
            {classified.has_map ? (
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
            ) : null}
          </View>
        </View>
        {validate.isObject(classified.videoGroup) &&
        !validate.isEmpty(classified.videoGroup) ? (
          <VideosHorizontalWidget videos={classified.videoGroup} />
        ) : null}
        {/*{!validate.isEmpty(classifieds) ? (*/}
        {/*  <ClassifiedListHorizontal*/}
        {/*    classifieds={classifieds}*/}
        {/*    showName={true}*/}
        {/*    title={I18n.t('related_classifieds')}*/}
        {/*    searchElements={{classified_category_id: classified.category_id}}*/}
        {/*  />*/}
        {/*) : null}*/}
      </HeaderImageScrollView>
      <QuickCallActionBtnWidget mobile={classified.mobile} />
      <CommentScreenModal
        commentModal={commentModal}
        elements={classified.comments}
        model="classified"
        id={classified.id}
      />
    </Fragment>
  );
};

ClassifiedShowScreen.navigationOptions = ({navigation}) => ({
  headerTransparent: navigation.state.params.headerBg,
  headerStyle: {
    backgroundColor: navigation.state.params.headerBgColor,
  },
});

export default ClassifiedShowScreen;
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
