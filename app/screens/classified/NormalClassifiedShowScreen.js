import React, {
  Fragment,
  useState,
  useMemo,
  useCallback,
  useContext,
} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  Linking,
  RefreshControl,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import ImagesWidget from '../../components/widgets/ImagesWidget';
import {width, text, height} from './../../constants';
import I18n from './../../I18n';
import {
  getClassified,
  getSearchClassifieds,
} from '../../redux/actions/classified';
import validate from 'validate.js';
import PropTypes from 'prop-types';
import {map} from 'lodash';
import ClassifiedInfoWidgetElement from '../../components/widgets/classified/ClassifiedInfoWidgetElement';
import ClassifiedListHorizontal from '../../components/widgets/classified/ClassifiedListHorizontal';
import MapViewWidget from '../../components/widgets/MapViewWidget';
import PropertiesWidget from '../../components/widgets/classified/PropertiesWidget';
import QuickCallActionBtnWidget from '../../components/widgets/QuickCallActionBtnWidget';
import ClassifiedInfoWidgetMainTitle from '../../components/widgets/classified/ClassifiedInfoWidgetMainTitle';
import CommentScreenModal from './../CommentScreenModal';
import {getProductConvertedFinalPrice} from '../../helpers';
import {round} from 'lodash';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import VideosHorizontalWidget from '../../components/widgets/video/VideosHorizontalWidget';

const NormalClassifiedShowScreen = ({
  element,
  classifieds,
  commentModal,
  dispatch,
  token,
  auth,
  navigation,
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
        redirect: false,
      }),
    );
  }, [refresh]);

  useMemo(() => {
    if (headerBg && headerBgColor) {
      navigation.setParams({headerBg, headerBgColor});
    }
  }, [headerBg]);

  return (
    <Fragment>
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
        {element.images ? (
          <ImagesWidget
            resizeMode="cover"
            elements={element.images
              .concat({id: element.id, large: element.large})
              .reverse()}
            width={width}
            height={height / 1.5}
            name={element.name}
            isFeatured={element.is_featured}
          />
        ) : null}
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
            {element.user ? (
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
            ) : null}
            {element.has_items && element.items ? (
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
            {element.category ? (
              <ClassifiedInfoWidgetElement
                elementName="categories"
                name={element.category.name}
                link={() =>
                  dispatch(
                    getSearchClassifieds({
                      name: element.name,
                      searchParams: {
                        classified_category_id: element.category.id,
                      },
                      redirect: true,
                    }),
                  )
                }
              />
            ) : null}
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
              <Fragment>
                {element.user ? (
                  <ClassifiedInfoWidgetElement
                    elementName="mobile"
                    name={element.mobile}
                    link={() => Linking.openURL(`tel:${element.user.mobile}`)}
                  />
                ) : null}
              </Fragment>
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
        {!validate.isEmpty(classifieds) ? (
          <ClassifiedListHorizontal
            classifieds={classifieds}
            showName={true}
            title={I18n.t('related_classifieds')}
            searchElements={{classified_category_id: element.category_id}}
          />
        ) : null}
      </ScrollView>
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
    cart: state.cart,
    auth: state.auth,
    colors: state.settings.colors,
    searchParams: state.searchParams,
  };
}

NormalClassifiedShowScreen.navigationOptions = ({navigation}) => ({
  // headerTransparent: navigation.state.params.headerBg,
  // headerStyle: {
  //   backgroundColor: navigation.state.params.headerBgColor
  // }
});

export default connect(mapStateToProps)(NormalClassifiedShowScreen);

NormalClassifiedShowScreen.propTypes = {
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
