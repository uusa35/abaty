import React, {Fragment, useState} from 'react';
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
import ClassifiedInfoWidgetElement from '../components/widgets/classified/ClassifiedInfoWidgetElement';
import ClassifiedListHorizontal from '../components/widgets/classified/ClassifiedListHorizontal';
import MapViewWidget from '../components/widgets/MapViewWidget';
import PropertiesWidget from '../components/widgets/classified/PropertiesWidget';
import QuickCallActionBtnWidget from '../components/widgets/QuickCallActionBtnWidget';

const ClassifiedShowScreen = ({
  classified,
  classifieds,
  dispatch,
  token,
  colors
}) => {
  const [refresh, setRefresh] = useState(false);
  return (
    <Fragment>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
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
        <ImagesWidget
          colors={colors}
          elements={classified.images
            .concat({id: classified.id, large: classified.large})
            .reverse()}
          width={width}
          height={550}
          name={classified.name}
          isFeatured={classified.is_featured}
        />
        <View style={{width: '90%'}}>
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
              name={classified.user.slug}
              showArrow={false}
              link={() =>
                dispatch(
                  getDesigner({
                    id: classified.user.id,
                    searchElements: {user_id: classified.user.id}
                  })
                )
              }
            />
            <ClassifiedInfoWidgetElement
              elementName="categories"
              name={classified.category.name}
              link={() =>
                dispatch(
                  getClassifieds({classified_category_id: classified.id})
                )
              }
            />
            <ClassifiedInfoWidgetElement
              elementName="address"
              name={classified.address}
              showArrow={false}
            />
            {classified.only_whatsapp ? (
              <ClassifiedInfoWidgetElement
                elementName="whatsapp"
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
                name={classified.mobile}
                link={() => Linking.openURL(`tel:${classified.user.mobile}`)}
              />
            )}
            {!validate.isEmpty(classified.longitude || classified.latitude) ? (
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
      </ScrollView>
      <QuickCallActionBtnWidget colors={colors} mobile={classified.mobile} />
    </Fragment>
  );
};

function mapStateToProps(state) {
  return {
    classified: state.classified,
    classifieds: state.classifieds,
    token: state.token,
    cart: state.cart,
    colors: state.settings.colors,
    searchParams: state.searchParams
  };
}

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
