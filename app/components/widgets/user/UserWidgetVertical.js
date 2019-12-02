import React, {useContext} from 'react';
import {ListItem} from 'react-native-elements';
import {text} from './../../../constants';
import {isRTL} from '../../../I18n';
import {DispatchContext} from '../../../redux/DispatchContext';
import {getUser} from './../../../redux/actions/user';
import PropTypes from 'prop-types';

const UserWidgetVertical = ({user}) => {
  const {dispatch} = useContext(DispatchContext);
  return (
    <ListItem
      key={user.id}
      onPress={() => dispatch(getUser(user.id))}
      leftAvatar={{source: {uri: user.thumb}}}
      // rightAvatar={{source: {uri: user.thumb}}}
      title={user.slug}
      chevronColor="white"
      chevron={{
        type: 'octicon',
        name: isRTL ? 'chevron-left' : 'chevron-right',
      }}
      contentContainerStyle={{alignItems: 'baseline'}}
      titleStyle={{fontFamily: text.font}}
      // subtitleStyle={{ fontFamily : text.font }}
    />
  );
};

export default UserWidgetVertical;

UserWidgetVertical.propTypes = {
  user: PropTypes.object,
};
