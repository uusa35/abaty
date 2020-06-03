import React, {useContext, useCallback} from 'react';
import {ListItem} from 'react-native-elements';
import {iconSizes, text} from './../../constants/sizes';
import {isRTL} from '../../I18n';
import {DispatchContext} from '../../redux/DispatchContext';
import {getDesigner, getUser} from './../../redux/actions/user';
import PropTypes from 'prop-types';
import {getSearchProducts} from '../../redux/actions/product';

const ElementWidgetVertical = ({
  title,
  type = 'designer',
  iconSize = iconSizes.medium,
  textSize = text.large,
  element,
  user_id = null,
  thumb,
}) => {
  const {dispatch} = useContext(DispatchContext);

  const handleClick = useCallback(() => {
    switch (type) {
      case 'designer':
        return dispatch(
          getDesigner({
            id: element.id,
            searchParams: {user_id: element.id},
            redirect: true,
          }),
        );
      case 'category':
        return dispatch(
          getSearchProducts({
            name: element.name,
            searchParams: {product_category_id: element.id, user_id},
            redirect: true,
          }),
        );
      default:
        null;
    }
  });
  return (
    <ListItem
      onPress={() => handleClick()}
      leftAvatar={{size: iconSize, rounded: false, source: {uri: thumb}}}
      // rightAvatar={{source: {uri: user.thumb}}}
      title={title}
      chevronColor="white"
      chevron={{
        type: 'entypo',
        name: isRTL ? 'chevron-thin-left' : 'chevron-thin-right',
        size: 20,
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

export default ElementWidgetVertical;

ElementWidgetVertical.propTypes = {
  user: PropTypes.object,
};
