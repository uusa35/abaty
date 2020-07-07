import React, {useContext, useCallback, useMemo, useState} from 'react';
import {ListItem} from 'react-native-elements';
import {iconSizes, text} from './../../constants/sizes';
import {isRTL} from '../../I18n';
import {getDesigner, getUser} from './../../redux/actions/user';
import PropTypes from 'prop-types';
import {getSearchProducts} from '../../redux/actions/product';
import {useDispatch} from 'react-redux';

const ElementWidgetHorizontal = ({
  title,
  type,
  iconSize = iconSizes.medium,
  textSize = text.large,
  element,
  user_id = null,
  thumb,
  handleClick,
}) => {
  const [searchParams, setSearchParams] = useState({});

  useMemo(() => {
    switch (type) {
      case 'designer':
        setSearchParams({user_id: element.id});
        break;
      case 'company':
        setSearchParams({user_id: element.id});
        break;
      case 'category':
        setSearchParams({product_category_id: element.id, user_id});
      default:
        null;
    }
  }, [type]);
  //searchParams: {user_id: element.id},
  // searchParams: {product_category_id: element.id, user_id},

  return (
    <ListItem
      onPress={() => handleClick(type, searchParams, element)}
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

export default React.memo(ElementWidgetHorizontal);

ElementWidgetHorizontal.propTypes = {
  user: PropTypes.object,
  type: PropTypes.string.isRequired,
  searchParams: PropTypes.object.isRequired,
};
