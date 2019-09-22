import React, {Fragment, useState, useMemo, useEffect} from 'react';
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
import I18n from './../I18n';
import {getClassified, getClassifieds, getDesigner} from '../redux/actions';
import validate from 'validate.js';
import VideosWidget from '../components/widgets/VideosWidget';
import PropTypes from 'prop-types';
import {map} from 'lodash';
import ClassifiedInfoWidgetElement from '../components/widgets/classified/ClassifiedInfoWidgetElement';
import ClassifiedListHorizontal from '../components/widgets/classified/ClassifiedListHorizontal';
import MapViewWidget from '../components/widgets/MapViewWidget';
import PropertiesWidget from '../components/widgets/classified/PropertiesWidget';
import QuickCallActionBtnWidget from '../components/widgets/QuickCallActionBtnWidget';
import ClassifiedInfoWidgetMainTitle from '../components/widgets/classified/ClassifiedInfoWidgetMainTitle';
import CommentScreenModal from './CommentScreenModal';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';

const ClassifiedShowScreen = ({
  classified,
  classifieds,
  commentModal,
  dispatch,
  token,
  colors,
  navigation
}) => {
  const [refresh, setRefresh] = useState(false);
  const [headerBg, setHeaderBg] = useState(true);
  const [headerBgColor, setHeaderBgColor] = useState('transparent');

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
        maxHeight={550}
        minHeight={90}
        style={{width}}
        scrollViewBackgroundColor="transparent"
        overlayColor="white"
        renderForeground={() => (
          <ImagesWidget
            colors={colors}
            resizeMode="cover"
            elements={classified.images
              .concat({id: classified.id, large: classified.large})
              .reverse()}
            width={width}
            height={550}
            name={classified.name}
            isFeatured={classified.is_featured}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => {
              setRefresh(false);
              dispatch(
                getClassified({
                  id: classified.id,
                  api_token: token ? token : null
                })
              );
            }}
          />
        }
        automaticallyAdjustContentInsets={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentInset={{bottom: 50}}>
        <View style={{alignSelf: 'center', width: '95%'}}>
          <ClassifiedInfoWidgetMainTitle element={classified} />
          {!validate.isEmpty(classified.properties) ? (
            <PropertiesWidget
              elements={classified.properties}
              colors={colors}
            />
          ) : null}
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
            <ClassifiedInfoWidgetElement
              elementName="user_name"
              colors={colors}
              name={classified.user.slug}
              showIcon={false}
              link={() =>
                dispatch(
                  getDesigner({
                    id: classified.user.id,
                    searchElements: {user_id: classified.user.id}
                  })
                )
              }
            />
            {classified.has_properties ? (
              <Fragment>
                {map(classified.properties, (p, i) => (
                  <ClassifiedInfoWidgetElement
                    key={i}
                    elementName={p.name}
                    name={p.value}
                    showIcon={true}
                    translate={false}
                    iconName={p.icon}
                    colors={colors}
                  />
                ))}
              </Fragment>
            ) : null}
            {classified.address ? (
              <ClassifiedInfoWidgetElement
                elementName="address"
                name={classified.address}
                showIcon={false}
                colors={colors}
              />
            ) : null}
            <ClassifiedInfoWidgetElement
              elementName="categories"
              colors={colors}
              name={classified.category.name}
              link={
                () => console.log('here')
                // dispatch(
                //   getClassifieds({searchParams : {classified_category_id: classified.id}, redirect : true , name : classified.category.name})
                // )
              }
            />
            {classified.only_whatsapp ? (
              <ClassifiedInfoWidgetElement
                elementName="whatsapp"
                colors={colors}
                name={classified.mobile}
                link={() =>
                  Linking.openURL(
                    `https://api.whatsapp.com/send?phone=${classified.mobile}&text=`
                  )
                }
              />
            ) : (
              <ClassifiedInfoWidgetElement
                elementName="mobile"
                colors={colors}
                name={classified.mobile}
                link={() => Linking.openURL(`tel:${classified.user.mobile}`)}
              />
            )}
            {classified.has_map ? (
              <MapViewWidget
                latitude={classified.latitude}
                longitude={classified.longitude}
                logo={classified.image}
                title={classified.name}
                showTitle={true}
                height={250}
              />
            ) : null}
          </View>
        </View>
        {validate.isObject(classified.videoGroup) &&
        !validate.isEmpty(classified.videoGroup) ? (
          <VideosWidget videos={classified.videoGroup} colors={colors} />
        ) : null}
        {!validate.isEmpty(classifieds) ? (
          <ClassifiedListHorizontal
            classifieds={classifieds}
            showName={true}
            title="related_classifieds"
            colors={colors}
            dispatch={dispatch}
            searchElements={{classified_category_id: classified.category_id}}
          />
        ) : null}
      </HeaderImageScrollView>
      <QuickCallActionBtnWidget colors={colors} mobile={classified.mobile} />
      <CommentScreenModal
        commentModal={commentModal}
        elements={classified.comments}
        model="classified"
        id={classified.id}
      />
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    classified: state.classified,
    classifieds: state.classifieds,
    commentModal: state.commentModal,
    token: state.token,
    cart: state.cart,
    colors: state.settings.colors,
    searchParams: state.searchParams
  };
}

ClassifiedShowScreen.navigationOptions = ({navigation}) => ({
  headerTransparent: navigation.state.params.headerBg,
  headerStyle: {
    backgroundColor: navigation.state.params.headerBgColor
  }
});

export default connect(mapStateToProps)(ClassifiedShowScreen);

ClassifiedShowScreen.propTypes = {
  classified: PropTypes.object.isRequired,
  classifieds: PropTypes.array.isRequired,
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
