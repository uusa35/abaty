import React from 'react';
import {ListItem} from 'react-native-elements';
import {iconSizes, text} from './../../constants/sizes';
import {isRTL} from '../../I18n';
import PropTypes from 'prop-types';
import {TouchableOpacity, Text, View, Pressable} from 'react-native';
import ImageLoaderContainer from '../widgets/ImageLoaderContainer';
import {themeColors} from '../../constants/colors';
import {truncate} from 'lodash';

const ElementWidgetVertical = ({
  title,
  type,
  iconSize = iconSizes.medium,
  textSize = text.large,
  element,
  user_id = null,
  thumb,
  handleClick,
}) => {
  return (
    <Pressable
      onPress={() => handleClick(element)}
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: themeColors.desinerat.lightGray,
      }}>
      <ImageLoaderContainer
        img={element.thumb}
        style={{width: 100, height: 100, marginRight: 20}}
      />
      <View style={{flex: 1}}>
        <Text
          style={{
            fontFamily: text.font,
            fontSize: textSize,
            marginBottom: 0,
            textAlign: 'left',
          }}>
          {element.slug}
        </Text>
        <Text
          style={{
            fontFamily: text.font,
            fontSize: text.small,
            lineHeight: 25,
            textAlign: 'left',
          }}>
          {element.description}
        </Text>
      </View>
    </Pressable>
  );
};

export default React.memo(ElementWidgetVertical);

ElementWidgetVertical.propTypes = {
  // user: PropTypes.object,
  type: PropTypes.string.isRequired,
  // searchParams: PropTypes.object.isRequired,
};
