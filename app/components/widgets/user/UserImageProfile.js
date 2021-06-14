import React, {useState, useContext, Fragment} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {View} from 'react-native-animatable';
import {iconSizes, text} from '../../../constants/sizes';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import {Rating} from 'react-native-ratings';
import {showCommentModal} from '../../../redux/actions';
import {becomeFan, rateUser} from '../../../redux/actions/user';
import I18n from './../../../I18n';
import {Badge, Icon} from 'react-native-elements';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {ABATI, MALLR} from './../../../../app';
import {useDispatch, useSelector} from 'react-redux';
import ImageLoaderContainer from '../ImageLoaderContainer';

const UserImageProfile = ({
  medium,
  member_id,
  slug,
  type = null,
  totalFans,
  currentRating = 2,
  isFanned,
  showFans,
  showRating,
  views,
  showComments = false,
  commentsCount,
}) => {
  const {guest} = useSelector(state => state);
  const [rating, setRating] = useState(currentRating);
  const [fanMe, setFanMe] = useState(isFanned);
  const [fans, setFans] = useState(totalFans);
  const dispatch = useDispatch();
  const {colors, logo} = useContext(GlobalValuesContext);

  const handleRating = rating => {
    if (rating !== currentRating) {
      return dispatch(rateUser({value: rating, member_id}));
    }
  };

  const handleFan = fanMe => {
    if (!guest) {
      fanMe ? setFans(fans + 1) : setFans(fans - 1);
      setFanMe(fanMe);
      dispatch(becomeFan({id: member_id, fanMe}));
    }
  };

  return (
    <View
      useNativeDriver={true}
      animation="bounceInLeft"
      easing="ease-out"
      style={styles.elementRow}>
      {medium && <ImageLoaderContainer img={medium} style={styles.logo} />}
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          paddingRight: 10,
          paddingLeft: 10,
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <Text
            style={[
              styles.mainTitle,
              {
                color: colors.header_tow_theme_color,
                fontSize: 20,
                marginTop: 8,
              },
            ]}>
            {slug.substring(0, 25)}
          </Text>
        </View>
        {!validate.isEmpty(type) ? (
          <Text
            style={[
              styles.mainTitle,
              {fontSize: text.small, color: colors.header_tow_theme_color},
            ]}>
            {type}
          </Text>
        ) : null}
        {totalFans && showFans ? (
          <Text
            style={[
              styles.mainTitle,
              {fontSize: text.small, color: colors.header_tow_theme_color},
            ]}>
            {fans} {I18n.t('followers')}
          </Text>
        ) : null}
        {views ? (
          <Text
            style={[
              styles.mainTitle,
              {fontSize: text.small, color: colors.header_tow_theme_color},
            ]}>
            {views} {I18n.t('views')}
          </Text>
        ) : null}
        <View
          style={{
            marginTop: 5,
          }}>
          {showRating ? (
            <Rating
              readonly={guest}
              showRating={false}
              startingValue={currentRating}
              count={10}
              ratingCount={5}
              style={{paddingVertical: 0}}
              onFinishRating={rating => handleRating(rating)}
              imageSize={20}
            />
          ) : null}
        </View>
      </View>
      <View style={{margin: 10}}>
        {!guest ? (
          !ABATI ? (
            <Icon
              name={fanMe && !ABATI ? 'star' : 'star-border'}
              type="material"
              color={colors.header_tow_theme_color}
              onPress={() => handleFan(!fanMe)}
              disabled={guest}
            />
          ) : (
            <Fragment>
              {showFans ? (
                <Icon
                  name={fanMe ? 'thumb-up' : 'thumb-up-outline'}
                  type="material-community"
                  color={colors.header_tow_theme_color}
                  onPress={() => handleFan(!fanMe)}
                  disabled={guest}
                />
              ) : null}
            </Fragment>
          )
        ) : null}
        <TouchableOpacity
          onPress={() => dispatch(showCommentModal())}
          style={{marginTop: 15}}>
          <Icon
            name="comment"
            type="font-awesome"
            color={colors.header_tow_theme_color}
            size={iconSizes.smaller}
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
  );
};

export default UserImageProfile;

UserImageProfile.propTypes = {
  medium: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  showFans: PropTypes.bool.isRequired,
  showRating: PropTypes.bool.isRequired,
  showComments: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  logo: {
    width: 110,
    height: 110,
    marginRight: 5,
    marginLeft: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    borderWidth: 0.5,
    borderColor: 'lightgrey',
  },
  mainTitle: {
    fontFamily: text.font,
    textAlign: 'left',
    fontSize: 25,
    paddingBottom: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  elementRow: {
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
