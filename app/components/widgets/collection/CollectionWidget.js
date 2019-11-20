import React, {useContext} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import widgetStyles from '../widgetStyles';
import {getSearchProducts} from '../../../redux/actions/product';
import PropTypes from 'prop-types';
import {images, text} from '../../../constants';
import {DispatchContext} from '../../../redux/DispatchContext';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';

const CollectionWidget = ({element, showName = false}) => {
  const {dispatch} = useContext(DispatchContext);
  const {colors} = useContext(GlobalValuesContext);
  return (
    <TouchableOpacity
      key={element.id}
      style={[
        widgetStyles.btnStyle,
        {
          width: 190,
          margin: 5,
          borderWidth: 0.25,
          borderColor: 'lightgrey',
          marginTop: 5,
          marginBottom: 5,
          height: 300,
          justifyContent: 'flex-start',
        },
      ]}
      onPress={() => {
        dispatch({type: 'SET_COLLECTION', payload: element});
        dispatch(
          getSearchProducts({
            name: element.slug,
            searchParams: {collection_id: element.id},
            redirect: true,
          }),
        );
      }}>
      <ImageBackground
        source={{
          uri: element.thumb,
        }}
        loadingIndicatorSource={images.logo}
        style={styles.image}
        resizeMode="stretch"></ImageBackground>
      {showName ? (
        <View
          style={{
            flex: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={[
              widgetStyles.elementName,
              {
                textAlign: 'center',
                fontSize: text.medium,
                paddingBottom: 20,
                color: colors.header_tow_theme_color,
              },
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
  showName: PropTypes.bool,
};

const styles = StyleSheet.create({
  image: {
    width: 190,
    height: 240,
  },
});
