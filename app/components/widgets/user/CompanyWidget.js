import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import widgetStyles from '../widgetStyles';
import {getCompany} from '../../../redux/actions/user';
import FastImage from 'react-native-fast-image';
import {touchOpacity} from '../../../constants/sizes';
import {images} from '../../../constants/images';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {useDispatch} from 'react-redux';

const CompanyWidget = ({element, showName = true}) => {
  const dispatch = useDispatch();
  const {colors} = useContext(GlobalValuesContext);

  return (
    <View key={element.id}>
      <TouchableOpacity
        activeOpacity={touchOpacity}
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
