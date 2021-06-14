import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import widgetStyles from '../widgetStyles';
import {getSearchProducts, setCollection} from '../../../redux/actions/product';
import PropTypes from 'prop-types';
import {images} from '../../../constants/images';
import {text} from '../../../constants/sizes';
import {useDispatch, useSelector} from 'react-redux';

const CollectionWidget = ({element, showName = false}) => {
  const dispatch = useDispatch();
  const {settings, country} = useSelector(state => state);
  const {colors} = settings;
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
        dispatch(setCollection(element));
        dispatch(
          getSearchProducts({
            name: element.slug,
            searchParams: {collection_id: element.id, country_id: country.id},
            redirect: true,
          }),
        );
        // dispatch(getCollection(element.id));
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
            {element.slug ? element.slug.substring(0, 20) : null}
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
