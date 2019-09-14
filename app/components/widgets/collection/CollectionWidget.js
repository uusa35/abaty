import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native';
import widgetStyles from '../widgetStyles';
import {getSearchProducts} from '../../../redux/actions';
import PropTypes from 'prop-types';
import {images, text} from '../../../constants';

const CollectionWidget = ({element, showName = false, dispatch, colors}) => {
  return (
    <TouchableOpacity
      key={element.id}
      style={[
        widgetStyles.btnStyle,
        {
          width: '48%',
          maxWidth: 175,
          margin: 5,
          borderWidth: 0.5,
          borderColor: 'lightgrey',
          marginTop: 5,
          marginBottom: 5,
          height: 285,
          justifyContent: 'space-between'
        }
      ]}
      onPress={() => {
        dispatch({type: 'SET_COLLECTION', payload: element});
        dispatch(
          getSearchProducts({
            name: element.slug,
            searchParams: {collection_id: element.id},
            redirect: true
          })
        );
      }}>
      <ImageBackground
        source={{
          uri: element.thumb
        }}
        loadingIndicatorSource={images.logo}
        style={styles.image}
        resizeMode="stretch"></ImageBackground>
      {showName ? (
        <View>
          <Text
            style={[
              widgetStyles.elementName,
              {
                textAlign: 'center',
                fontSize: text.medium,
                paddingBottom: 20,
                color: colors.header_tow_theme_color
              }
            ]}>
            {element.slug.substring(0, 20)}
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default CollectionWidget;

CollectionWidget.propTypes = {
  element: PropTypes.object.isRequired,
  colors: PropTypes.object,
  showName: PropTypes.bool,
  dispatch: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  image: {
    width: 175,
    height: 230
  }
});
