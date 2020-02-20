import React, {
  Fragment,
  useState,
  useMemo,
  useCallback,
  useContext,
} from 'react';
import {StyleSheet, Text, Linking, RefreshControl, View} from 'react-native';
import {connect} from 'react-redux';
import ImagesWidget from '../../components/widgets/ImagesWidget';
import {width, text, height} from './../../constants';
import I18n from './../../I18n';
import {getClassified} from '../../redux/actions/classified';
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
import {getProductConvertedFinalPrice} from '../../helpers';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import VideosHorizontalWidget from '../../components/widgets/video/VideosHorizontalWidget';

const ClassifiedShowScreen = ({
  element,
  classifieds,
  commentModal,
  dispatch,
  token,
  navigation,
  auth,
  isLoadingContent,
}) => {
  const {exchange_rate} = useContext(GlobalValuesContext);
  const [refresh, setRefresh] = useState(false);
  const [headerBg, setHeaderBg] = useState(true);
  const [headerBgColor, setHeaderBgColor] = useState('transparent');

  const handleRefresh = useCallback(() => {
    return dispatch(
      getClassified({
        id: element.id,
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
            elements={element.images
              .concat({id: element.id, large: element.large})
              .reverse()}
            width={width}
            height={height / 1.5}
            name={element.name}
            isFeatured={element.is_featured}
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
          {element.user ? (
              <ClassifiedInfoWidgetMainTitle
                  element={element}
                  editMode={auth && auth.id === element.user_id && token}
              />
          ) : null}
          {!validate.isEmpty(element.items) ? (
            <PropertiesWidget elements={element.items} />
          ) : null}
          <View
            animation="bounceInLeft"
            easing="ease-out"
            style={{marginTop: 15}}>
            {element.description ? (
              <View>
                <Text style={styles.title}>{I18n.t('description')}</Text>
                <Text style={styles.normalText}>{element.description}</Text>
              </View>
            ) : null}
            <ClassifiedInfoWidgetElement
              elementName="user_name"
              name={element.user.slug}
              showIcon={false}
              // link={() =>
              //   dispatch(
              //     getDesigner({
              //       id: element.user.id,
              //       searchElements: {user_id: element.user.id}
              //     })
              //   )
              // }
            />
            {element.has_items ? (
              <Fragment>
                {map(element.items, (p, i) => (
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
            {element.address ? (
              <ClassifiedInfoWidgetElement
                elementName="address"
                name={element.address}
                showIcon={false}
              />
            ) : null}
            <ClassifiedInfoWidgetElement
              elementName="categories"
              name={element.category.name}
              link={
                () => console.log('here')
                // dispatch(
                //   getClassifieds({searchParams : {classified_category_id: element.id}, redirect : true , name : element.category.name})
                // )
              }
            />
            {element.only_whatsapp ? (
              <ClassifiedInfoWidgetElement
                elementName="whatsapp"
                name={element.mobile}
                link={() =>
                  Linking.openURL(
                    `https://api.whatsapp.com/send?phone=${element.mobile}&text=`,
                  )
                }
              />
            ) : (
              <ClassifiedInfoWidgetElement
                elementName="mobile"
                name={element.mobile}
                link={() => Linking.openURL(`tel:${element.user.mobile}`)}
              />
            )}
            {element.has_map ? (
              <MapViewWidget
                element={element}
                latitude={element.latitude}
                longitude={element.longitude}
                image={element.large}
                title={element.name}
                showTitle={true}
                height={350}
                description={element.description}
                price={round(
                  getProductConvertedFinalPrice(element.price, exchange_rate),
                  2,
                )}
              />
            ) : null}
          </View>
        </View>
        {validate.isObject(element.videoGroup) &&
        !validate.isEmpty(element.videoGroup) ? (
          <VideosHorizontalWidget videos={element.videoGroup} />
        ) : null}
        {/*{!validate.isEmpty(classifieds) ? (*/}
        {/*  <ClassifiedListHorizontal*/}
        {/*    classifieds={classifieds}*/}
        {/*    showName={true}*/}
        {/*    title={I18n.t('related_classifieds')}*/}
        {/*    searchElements={{classified_category_id: element.category_id}}*/}
        {/*  />*/}
        {/*) : null}*/}
      </HeaderImageScrollView>
      <QuickCallActionBtnWidget mobile={element.mobile} />
      <CommentScreenModal
        commentModal={commentModal}
        elements={element.comments}
        model="classified"
        id={element.id}
      />
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    element: state.classified,
    classifieds: state.classifieds,
    commentModal: state.commentModal,
    token: state.token,
    auth: state.auth,
    cart: state.cart,
    searchParams: state.searchParams,
    isLoadingContent: state.isLoadingContent,
  };
}

ClassifiedShowScreen.navigationOptions = ({navigation}) => ({
  headerTransparent: navigation.state.params.headerBg,
  headerStyle: {
    backgroundColor: navigation.state.params.headerBgColor,
  },
});

export default connect(mapStateToProps)(ClassifiedShowScreen);

ClassifiedShowScreen.propTypes = {
  element: PropTypes.object.isRequired,
  classifieds: PropTypes.array.isRequired,
  token: PropTypes.string,
};

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
