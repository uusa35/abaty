import React, {useContext, useState, useMemo} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {View} from 'react-native-animatable';
import {text} from '../../../constants';
import PropTypes from 'prop-types';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import validate from 'validate.js';
import {Rating} from 'react-native-ratings';
import {becomeFan, rateUser, showCommentModal} from '../../../redux/actions';
import {DispatchContext} from '../../../redux/DispatchContext';
import I18n from './../../../I18n';
import {Badge, Icon} from 'react-native-elements';

const UserImageProfile = ({
  medium,
  logo,
  member_id,
  slug,
  type = null,
  totalFans,
  currentRating = 2,
  isFanned,
  showFans,
  showRating,
  guest,
  views,
  showComments = false,
  commentsCount
}) => {
  const {colors} = useContext(GlobalValuesContext);
  const {dispatch} = useContext(DispatchContext);
  const [rating, setRating] = useState(currentRating);
  const [fanMe, setFanMe] = useState(isFanned);
  const [fans, setFans] = useState(totalFans);

  useMemo(() => {
    if (rating !== currentRating) {
      console.log('fired Rating');
      return dispatch(rateUser({value: rating, member_id}));
    }
  }, [rating]);

  useMemo(() => {
    if (fanMe !== isFanned) {
      return dispatch(becomeFan({id: member_id}));
    }
  }, [fanMe]);

  return (
    <View animation="bounceInLeft" easing="ease-out" style={styles.elementRow}>
      <FastImage source={{uri: medium ? medium : logo}} style={styles.logo} />
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          paddingRight: 10,
          paddingLeft: 10,
          marginTop: 10,
          width: '72%'
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%'
          }}>
          <Text
            style={[
              styles.mainTitle,
              {color: colors.header_tow_theme_color, fontSize: 20, marginTop: 8}
            ]}>
            {slug.substring(0, 25)}
          </Text>
          {!guest ? (
            <Icon
              name={fanMe ? 'thumb-up' : 'thumb-up-outline'}
              type="material-community"
              color={colors.header_tow_theme_color}
              onPress={() => setFanMe(!fanMe)}
            />
          ) : null}
        </View>
        {!validate.isEmpty(type) ? (
          <Text
            style={[
              styles.mainTitle,
              {fontSize: text.small, color: colors.header_tow_theme_color}
            ]}>
            {type}
          </Text>
        ) : null}
        {totalFans && showFans ? (
          <Text
            style={[
              styles.mainTitle,
              {fontSize: text.small, color: colors.header_tow_theme_color}
            ]}>
            {fans} {I18n.t('fans')}
          </Text>
        ) : null}
        {views ? (
          <Text
            style={[
              styles.mainTitle,
              {fontSize: text.small, color: colors.header_tow_theme_color}
            ]}>
            {views} {I18n.t('views')}
          </Text>
        ) : null}
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
          {showRating ? (
            <Rating
              readonly={guest}
              showRating={false}
              startingValue={currentRating}
              count={10}
              ratingCount={5}
              style={{paddingVertical: 0}}
              onFinishRating={rating => setRating(rating)}
              imageSize={20}
            />
          ) : null}
          <TouchableOpacity onPress={() => dispatch(showCommentModal())}>
            <Icon
              name="comment-account-outline"
              type="material-community"
              color={colors.header_tow_theme_color}
              size={25}
              hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
            />
            <Badge
              status="warning"
              value={commentsCount}
              containerStyle={{position: 'absolute', top: -10, right: -4}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default React.memo(UserImageProfile);

UserImageProfile.propTypes = {
  medium: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  showFans: PropTypes.bool.isRequired,
  showRating: PropTypes.bool.isRequired,
  guest: PropTypes.bool.isRequired,
  showComments: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    marginRight: 5,
    marginLeft: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    borderWidth: 0.5,
    borderColor: 'lightgrey'
  },
  mainTitle: {
    fontFamily: text.font,
    textAlign: 'left',
    fontSize: 25,
    paddingBottom: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1
  },
  elementRow: {
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 5
  }
});
