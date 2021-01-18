import React, {useContext} from 'react';
import {ListItem} from 'react-native-elements';
import {iconSizes, text} from './../../../constants/sizes';
import {isRTL} from '../../../I18n';
import {getDesigner, getUser} from './../../../redux/actions/user';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import ImageLoaderContainer from '../ImageLoaderContainer';

const UserWidgetVertical = ({user, size = iconSizes.large}) => {
  const dispatch = useDispatch();
  return (
    <ListItem
      key={user.id}
      onPress={() =>
        dispatch(
          getDesigner({
            id: user.id,
            searchParams: {user_id: user.id},
            redirect: true,
          }),
        )
      }
      leftAvatar={() => (
        <ImageLoaderContainer
          img={user.thumb}
          style={{
            width: iconSizes.large,
            height: iconSizes.large,
            marginRight: 5,
            marginLeft: 5,
            alignSelf: 'center',
          }}
        />
      )}
      rightIcon={{
        type: 'entypo',
        name: isRTL ? 'chevron-thin-left' : 'chevron-thin-right',
        size: iconSizes.smallest,
      }}
      // rightAvatar={{source: {uri: user.thumb}}}
      title={user.slug}
      chevronColor="white"
      // chevron={{
      //   type: 'evilIcon',
      //   name: isRTL ? 'chevron-left' : 'chevron-right',
      //   size: iconSizes.smallest,
      // }}
      // style={{backgroundColor: '#ededed'}}
      // containerStyle={{margin: 3, borderRadius: 5}}
      style={{alignItems: 'baseline', justifyContent: 'center'}}
      titleStyle={{fontFamily: text.font, fontSize: text.large}}
      bottomDivider
      // badge={{ value: 3, textStyle: { color: 'orange' }, containerStyle: { marginTop: -20 } }}
      subtitleStyle={{fontFamily: text.font}}
    />
  );
};

export default UserWidgetVertical;

UserWidgetVertical.propTypes = {
  user: PropTypes.object,
};
