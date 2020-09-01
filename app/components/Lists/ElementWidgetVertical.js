import React from 'react';
import {ListItem} from 'react-native-elements';
import {iconSizes, text} from './../../constants/sizes';
import {isRTL} from '../../I18n';
import PropTypes from 'prop-types';

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
    <ListItem
      onPress={() => handleClick(element)}
      leftAvatar={{size: iconSizes.large, rounded: false, source: {uri: thumb}}}
      // rightAvatar={{source: {uri: user.thumb}}}
      title={title}
      chevronColor="white"
      chevron={{
        type: 'material',
        name: isRTL ? 'chevron-thin-left' : 'chevron-thin-right',
        size: iconSize,
      }}
      // style={{backgroundColor: '#ededed'}}
      // containerStyle={{margin: 3, borderRadius: 5}}
      contentContainerStyle={{alignItems: 'baseline', justifyContent: 'center'}}
      titleStyle={{fontFamily: text.font, fontSize: textSize}}
      bottomDivider
      // badge={{ value: 3, textStyle: { color: 'orange' }, containerStyle: { marginTop: -20 } }}
      subtitleStyle={{fontFamily: text.font}}
    />
  );
};

export default React.memo(ElementWidgetVertical);

ElementWidgetVertical.propTypes = {
  // user: PropTypes.object,
  type: PropTypes.string.isRequired,
  // searchParams: PropTypes.object.isRequired,
};
