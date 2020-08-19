import React, {useState, useCallback, useContext, useMemo} from 'react';
import {Text, StyleSheet, TouchableOpacity, Image, Linking} from 'react-native';
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
import {images} from '../../../constants/images';
import {getWhatsappLink} from '../../../helpers';
import {links} from '../../../constants/links';
import {useDispatch} from 'react-redux';
import ImageLoaderContainer from '../ImageLoaderContainer';
import {isIOS} from '../../../constants';

const UserImageProfileRounded = ({
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
  commentsCount,
  whatsapp = null,
  mobile = null,
  email = null,
  twitter = null,
  facebook = null,
  description = null,
  latitude = null,
  longitude = null,
  website = null,
  youtube = null,
  instagram = null,
}) => {
  const [rating, setRating] = useState(currentRating);
  const [fanMe, setFanMe] = useState(isFanned);
  const [fans, setFans] = useState(totalFans);
  const [imageLoading, setImageLoading] = useState(true);
  const dispatch = useDispatch();
  const {colors} = useContext(GlobalValuesContext);

  const handleRating = useCallback(
    (rating) => {
      if (rating !== currentRating) {
        return dispatch(rateUser({value: rating, member_id}));
      }
    },
    [rating],
  );

  const handleFan = useCallback(
    (fanMe) => {
      fanMe ? setFans(fans + 1) : setFans(fans - 1);
      setFanMe(fanMe);
      return dispatch(becomeFan({id: member_id, fanMe}));
    },
    [fanMe],
  );

  useMemo(() => {
    setFanMe(isFanned);
  }, [isFanned]);

  return (
    <View
      animation="bounceInLeft"
      easing="ease-out"
      style={styles.elementRow}
      useNativeDriver={true}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          width: '100%',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ImageLoaderContainer
            img={medium}
            resizeMode={isIOS ? 'stretch' : 'cover'}
            style={styles.logo}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              width: '100%',
            }}>
            <TouchableOpacity>
              <Icon
                onPress={() => dispatch(showCommentModal())}
                name="comment"
                type="material"
                raised
                reverse
                size={iconSizes.smallest}
                color={colors.icon_theme_bg}
                hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
              />
              <Badge
                status="warning"
                value={commentsCount}
                containerStyle={{position: 'absolute', top: 1, right: 1}}
              />
            </TouchableOpacity>
            <Icon
              name={!fanMe ? 'thumbsup' : 'thumb-up'}
              type={!fanMe ? 'octicon' : 'material'}
              onPress={() => handleFan(!fanMe)}
              raised
              reverse
              size={iconSizes.smallest}
              color={colors.icon_theme_bg}
            />
            {latitude && longitude ? (
              <Icon
                onPress={() =>
                  Linking.openURL(
                    `${links.googleMapUrl}${latitude},${longitude}`,
                  )
                }
                name="marker"
                type="foundation"
                raised
                reverse
                iconStyle={{fontSize: iconSizes.smaller}}
                size={iconSizes.smallest}
                color={colors.icon_theme_bg}
              />
            ) : null}
            {whatsapp ? (
              <Icon
                onPress={() => Linking.openURL(getWhatsappLink(whatsapp, slug))}
                name="whatsapp"
                type="font-awesome"
                raised
                reverse
                iconStyle={{fontSize: iconSizes.smaller}}
                size={iconSizes.smallest}
                color={colors.icon_theme_bg}
              />
            ) : null}
            {mobile ? (
              <Icon
                onPress={() => Linking.openURL(`tel:${mobile}`)}
                name="mobile"
                type="font-awesome"
                raised
                reverse
                iconStyle={{fontSize: iconSizes.smaller}}
                size={iconSizes.smallest}
                color={colors.icon_theme_bg}
              />
            ) : null}
            {email ? (
              <Icon
                onPress={() => Linking.openURL(`mailto:${email}`)}
                name="inbox"
                type="font-awesome"
                raised
                reverse
                iconStyle={{fontSize: iconSizes.smaller}}
                size={iconSizes.smallest}
                color={colors.icon_theme_bg}
              />
            ) : null}
            {facebook ? (
              <Icon
                onPress={() => Linking.openURL(facebook)}
                name="facebook"
                type="font-awesome"
                raised
                reverse
                iconStyle={{fontSize: iconSizes.smaller}}
                size={iconSizes.smallest}
                color={colors.icon_theme_bg}
              />
            ) : null}
            {twitter ? (
              <Icon
                onPress={() => Linking.openURL(twitter)}
                name="twitter"
                type="font-awesome"
                raised
                reverse
                iconStyle={{fontSize: iconSizes.smaller}}
                size={iconSizes.smallest}
                color={colors.icon_theme_bg}
              />
            ) : null}
            {instagram ? (
              <Icon
                onPress={() => Linking.openURL(instagram)}
                name="instagram"
                type="font-awesome"
                raised
                reverse
                iconStyle={{fontSize: iconSizes.smaller}}
                size={iconSizes.smallest}
                color={colors.icon_theme_bg}
              />
            ) : null}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%',
            }}>
            <Text
              style={[
                styles.mainTitle,
                {
                  color: colors.header_tow_theme_color,
                  fontSize: 20,
                  // marginTop: 8,
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
          <View style={{marginTop: 5}}>
            {showRating ? (
              <Rating
                readonly={guest}
                showRating={false}
                startingValue={currentRating}
                count={10}
                ratingCount={5}
                style={{paddingVertical: 0}}
                onFinishRating={(rating) => handleRating(rating)}
                imageSize={20}
              />
            ) : null}
          </View>
          <View style={{width: '100%', paddingRight: 5, paddingLeft: 5}}>
            <Text
              style={{
                fontFamily: text.font,
                textAlign: 'center',
                fontSize: text.smaller,
              }}>
              {description}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UserImageProfileRounded;

UserImageProfileRounded.propTypes = {
  medium: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  showFans: PropTypes.bool.isRequired,
  showRating: PropTypes.bool.isRequired,
  guest: PropTypes.bool.isRequired,
  showComments: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  logo: {
    width: 80,
    height: 80,
    position: 'relative',
    borderRadius: 80 / 2,
    marginTop: !isIOS ? 30 : 0,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.18,
    // shadowRadius: 1.0,
    // elevation: 1,
    borderWidth: 0.5,
    borderColor: 'lightgrey',
  },
  mainTitle: {
    fontFamily: text.font,
    textAlign: 'center',
    fontSize: 25,
    lineHeight: 20,
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
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: -30,
  },
});
