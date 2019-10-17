import React, {
  Fragment,
  useState,
  useMemo,
  useEffect,
  useCallback,
  useContext
} from 'react';
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
import {width, text, images} from './../constants';
import I18n from './../I18n';
import {getClassified, getClassifieds} from '../redux/actions';
import validate from 'validate.js';
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
import {getProductConvertedFinalPrice} from '../helpers';
import {round} from 'lodash';
import {GlobalValuesContext} from '../redux/GlobalValuesContext';
import VideosHorizontalWidget from '../components/widgets/video/VideosHorizontalWidget';

const ClassifiedShowScreen = ({
  element,
  classifieds,
  commentModal,
  dispatch,
  token,
  colors,
  navigation
}) => {
  const {exchange_rate} = useContext(GlobalValuesContext);
  const [refresh, setRefresh] = useState(false);
  const [headerBg, setHeaderBg] = useState(true);
  const [headerBgColor, setHeaderBgColor] = useState('transparent');

  const handleRefresh = useCallback(() => {
    return dispatch(
      getClassified({
        id: element.id,
        api_token: token ? token : null
      })
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
        maxHeight={550}
        minHeight={90}
        style={{width}}
        scrollViewBackgroundColor="transparent"
        overlayColor="white"
        renderForeground={() => (
          <ImagesWidget
            colors={colors}
            resizeMode="cover"
            elements={element.images
              .concat({id: element.id, large: element.large})
              .reverse()}
            width={width}
            height={550}
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
        <View style={{alignSelf: 'center', width: '95%'}}>
          <ClassifiedInfoWidgetMainTitle element={element} />
          {!validate.isEmpty(element.properties) ? (
            <PropertiesWidget elements={element.items} colors={colors} />
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
              colors={colors}
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
            {element.has_properties ? (
              <Fragment>
                {map(element.properties, (p, i) => (
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
            {element.address ? (
              <ClassifiedInfoWidgetElement
                elementName="address"
                name={element.address}
                showIcon={false}
                colors={colors}
              />
            ) : null}
            <ClassifiedInfoWidgetElement
              elementName="categories"
              colors={colors}
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
                colors={colors}
                name={element.mobile}
                link={() =>
                  Linking.openURL(
                    `https://api.whatsapp.com/send?phone=${element.mobile}&text=`
                  )
                }
              />
            ) : (
              <ClassifiedInfoWidgetElement
                elementName="mobile"
                colors={colors}
                name={element.mobile}
                link={() => Linking.openURL(`tel:${element.user.mobile}`)}
              />
            )}
            {element.has_map ? (
              <MapViewWidget
                latitude={element.latitude}
                longitude={element.longitude}
                image={element.large}
                title={element.name}
                showTitle={true}
                height={350}
                description={element.description}
                price={round(
                  getProductConvertedFinalPrice(element.price, exchange_rate),
                  2
                )}
              />
            ) : null}
          </View>
        </View>
        {validate.isObject(element.videoGroup) &&
        !validate.isEmpty(element.videoGroup) ? (
          <VideosHorizontalWidget videos={element.videoGroup} colors={colors} />
        ) : null}
        {!validate.isEmpty(classifieds) ? (
          <ClassifiedListHorizontal
            classifieds={classifieds}
            showName={true}
            title="related_classifieds"
            colors={colors}
            dispatch={dispatch}
            searchElements={{classified_category_id: element.category_id}}
          />
        ) : null}
      </HeaderImageScrollView>
      <QuickCallActionBtnWidget colors={colors} mobile={element.mobile} />
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
    cart: state.cart,
    colors: state.settings.colors,
    searchParams: state.searchParams
  };
}

ClassifiedShowScreen.navigationOptions = ({navigation}) => ({
  // headerTransparent: navigation.state.params.headerBg,
  // headerStyle: {
  //   backgroundColor: navigation.state.params.headerBgColor
  // }
});

export default connect(mapStateToProps)(ClassifiedShowScreen);

ClassifiedShowScreen.propTypes = {
  element: PropTypes.object.isRequired,
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
