import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import widgetStyles from '../widgetStyles';
import {getCompany} from '../../../redux/actions';
import FastImage from 'react-native-fast-image';
import {images} from '../../../constants';
import {DispatchContext} from '../../../redux/DispatchContext';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';

const CompanyWidget = ({element, showName = true}) => {
  const {dispatch} = useContext(DispatchContext);
  const {colors} = useContext(GlobalValuesContext);

  return (
    <View animation="pulse" easing="ease-out" key={element.id}>
      <TouchableOpacity
        style={widgetStyles.btnStyle}
        onPress={() =>
          dispatch(
            getCompany({
              id: element.id,
              searchParams: {user_id: element.id},
              redirect: true,
            }),
          )
        }>
        <FastImage
          source={{
            uri: element.thumb,
            priority: FastImage.priority.normal,
          }}
          loadingIndicatorSource={images.logo}
          style={styles.image}
          resizeMode="contain"
        />
        {showName ? (
          <Text
            style={[
              widgetStyles.elementName,
              {color: colors.header_tow_theme_color},
            ]}>
            {element.slug}
          </Text>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

export default CompanyWidget;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 200 / 2,
  },
});
