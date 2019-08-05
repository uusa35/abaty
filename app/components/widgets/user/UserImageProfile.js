import React, {useContext, useState, useMemo} from 'react';
import {Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {View} from 'react-native-animatable';
import {text} from '../../../constants';
import PropTypes from 'prop-types';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import validate from 'validate.js';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {
  becomeFan,
  enableSuccessMessage,
  rateUser
} from '../../../redux/actions';
import {DispatchContext} from '../../../redux/DispatchContext';
import I18n from './../../../I18n';
import {Icon} from 'react-native-elements';

const UserImageProfile = ({
  large,
  logo,
  member_id,
  slug,
  type = null,
  totalFans,
  currentRating = 2,
  isFanned = false,
  showFans,
  showRating,
  guest
}) => {
  const {colors} = useContext(GlobalValuesContext);
  const {dispatch} = useContext(DispatchContext);
  const [rating, setRating] = useState(currentRating);
  const [fanMe, setFanMe] = useState(isFanned);
  const [fans, setFans] = useState(totalFans);
  console.log('the guest', guest);

  useMemo(() => {
    if (rating !== currentRating) {
      console.log('the current rating', rating);
      dispatch(rateUser({value: rating, member_id}));
    }
  }, [rating]);

  useMemo(() => {
    if (fanMe) {
      setFans(fans + 1);
      dispatch(becomeFan({id: member_id}));
    } else {
      setFans(fans - 1);
    }
  }, [fanMe]);
  return (
    <View animation="bounceInLeft" easing="ease-out" style={styles.elementRow}>
      <FastImage source={{uri: large ? large : logo}} style={styles.logo} />
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          paddingRight: 10,
          paddingLeft: 10
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 280
          }}>
          <Text
            style={[styles.mainTitle, {color: colors.header_tow_theme_color}]}>
            {slug.substring(0, 25)}
          </Text>
          <Icon
            name={fanMe ? 'thumb-up' : 'thumb-up-outline'}
            type="material-community"
            color={colors.header_tow_theme_color}
            onPress={() => setFanMe(!fanMe)}
          />
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
        {showRating ? (
          <Rating
            readonly={guest}
            showRating={false}
            startingValue={currentRating}
            count={10}
            ratingCount={5}
            style={{paddingVertical: 0}}
            onFinishRating={rating => setRating(rating)}
            imageSize={25}
          />
        ) : null}
      </View>
    </View>
  );
};

export default React.memo(UserImageProfile);

UserImageProfile.propTypes = {
  large: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  showFans: PropTypes.bool.isRequired,
  showRating: PropTypes.bool.isRequired,
  guest: PropTypes.bool.isRequired
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
