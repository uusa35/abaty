import React, {useContext} from 'react';
import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import I18n, {isRTL} from '../../../I18n';
import {links} from '../../../constants/links';
import {iconSizes, text} from '../../../constants/sizes';
import {isIOS} from '../../../constants';
import UserInfoWidgetElement from './UserInfoWidgetElement';
import MapViewWidget from '../MapViewWidget';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {getWhatsappLink} from '../../../helpers';
import {ESCRAP} from './../../../../app';
import ImagesGridWidget from '../ImagesGridWidget';
import {isEmpty} from 'validate.js';

const UserInfoWidget = ({
  mobile,
  phone,
  slug,
  whatsapp,
  twitter,
  facebook,
  instagram,
  android,
  youtube,
  website,
  description,
  service,
  address,
  images,
  latitude,
  longitude,
  thumb,
  has_map,
  showMainTitle = true,
}) => {
  const {colors} = useContext(GlobalValuesContext);

  return (
    <View style={{width: '90%', alignSelf: 'center', marginTop: 30}}>
      {showMainTitle && (
        <Text
          style={{
            fontFamily: text.font,
            fontSize: text.large,
            marginBottom: 10,
            textAlign: 'left',
            color: colors.header_one_theme_color,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.0,

            elevation: 1,
          }}>
          {I18n.t('information')}
        </Text>
      )}
      {!isEmpty(longitude) && !isEmpty(latitude) && has_map && (
        <TouchableOpacity
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          onPress={() =>
            Linking.openURL(`${links.googleMapUrl}${latitude},${longitude}`)
          }
          style={styles.itemRow}>
          <View style={styles.infoRow}>
            <Icon
              name="map"
              color="grey"
              size={iconSizes.smallest}
              iconStyle={{
                paddingRight: 10,
                paddingLeft: 10,
              }}
            />
            <Text style={styles.subTitle}>{I18n.t('location')}</Text>
          </View>
          <Icon
            name={isRTL ? 'chevron-thin-left' : 'chevron-thin-right'}
            type="entypo"
            color="lightgrey"
            size={iconSizes.smallest}
            iconStyle={{
              paddingRight: isIOS ? 10 : 0,
              paddingLeft: isIOS ? 0 : 10,
            }}
          />
        </TouchableOpacity>
      )}
      {!isEmpty(mobile) && (
        <TouchableOpacity
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          onPress={() => Linking.openURL(`tel:${mobile}`)}
          style={styles.itemRow}>
          <View style={styles.infoRow}>
            <Icon
              name="telephone"
              type="foundation"
              color="grey"
              size={iconSizes.smallest}
              iconStyle={{
                paddingRight: 10,
                paddingLeft: 10,
              }}
            />
            <Text style={styles.subTitle}>{I18n.t('mobile')}</Text>
          </View>
          <Text style={styles.subTitle}>{mobile}</Text>
        </TouchableOpacity>
      )}
      {!isEmpty(phone) && (
        <TouchableOpacity
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          onPress={() => Linking.openURL(`tel:${phone}`)}
          style={styles.itemRow}>
          <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
            <Icon
              name="mobile"
              type="foundation"
              color="grey"
              size={iconSizes.smallest}
              iconStyle={{
                paddingRight: 10,
                paddingLeft: 10,
              }}
            />
            <Text style={styles.subTitle}>{I18n.t('phone')}</Text>
          </View>
          <Text style={styles.subTitle}>{phone}</Text>
        </TouchableOpacity>
      )}
      {!isEmpty(whatsapp) && (
        <TouchableOpacity
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          onPress={() => Linking.openURL(getWhatsappLink(whatsapp))}
          style={styles.itemRow}>
          <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
            <Icon
              name="whatsapp"
              type="font-awesome"
              color="grey"
              size={iconSizes.smallest}
              iconStyle={{
                paddingRight: 10,
                paddingLeft: 10,
              }}
            />
            <Text style={styles.subTitle}>{I18n.t('whatsapp')}</Text>
          </View>
          <Text style={styles.subTitle}>{whatsapp}</Text>
        </TouchableOpacity>
      )}
      {!isEmpty(twitter) && (
        <TouchableOpacity
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          onPress={() => Linking.openURL(`${twitter}`)}
          style={styles.itemRow}>
          <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
            <Icon
              name="twitter"
              type="font-awesome"
              color="grey"
              size={iconSizes.smallest}
              iconStyle={{
                paddingRight: 10,
                paddingLeft: 10,
              }}
            />
            <Text style={styles.subTitle}>{I18n.t('twitter')}</Text>
          </View>
          <Icon
            name={isRTL ? 'chevron-thin-left' : 'chevron-thin-right'}
            type="entypo"
            color="lightgrey"
            size={iconSizes.smallest}
            iconStyle={{
              paddingRight: isIOS ? 10 : 0,
              paddingLeft: isIOS ? 0 : 10,
            }}
          />
        </TouchableOpacity>
      )}
      {!isEmpty(facebook) && (
        <TouchableOpacity
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          onPress={() => Linking.openURL(`${facebook}`)}
          style={styles.itemRow}>
          <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
            <Icon
              name="facebook"
              type="font-awesome"
              color="grey"
              size={iconSizes.smallest}
              iconStyle={{
                paddingRight: 10,
                paddingLeft: 10,
              }}
            />
            <Text style={styles.subTitle}>{I18n.t('facebook')}</Text>
          </View>
          <Icon
            name={isRTL ? 'chevron-thin-left' : 'chevron-thin-right'}
            type="entypo"
            color="lightgrey"
            size={iconSizes.smallest}
            iconStyle={{
              paddingRight: isIOS ? 10 : 0,
              paddingLeft: isIOS ? 0 : 10,
            }}
          />
        </TouchableOpacity>
      )}
      {!isEmpty(instagram) && (
        <TouchableOpacity
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          onPress={() => Linking.openURL(`${instagram}`)}
          style={styles.itemRow}>
          <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
            <Icon
              name="instagram"
              type="font-awesome"
              color="grey"
              size={iconSizes.smallest}
              iconStyle={{
                paddingRight: 10,
                paddingLeft: 10,
              }}
            />
            <Text style={styles.subTitle}>{I18n.t('instagram')}</Text>
          </View>
          <Icon
            name={isRTL ? 'chevron-thin-left' : 'chevron-thin-right'}
            type="entypo"
            color="lightgrey"
            size={iconSizes.smallest}
            iconStyle={{
              paddingRight: isIOS ? 10 : 0,
              paddingLeft: isIOS ? 0 : 10,
            }}
          />
        </TouchableOpacity>
      )}
      {!isEmpty(android) && (
        <TouchableOpacity
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          onPress={() => Linking.openURL(`${android}`)}
          style={styles.itemRow}>
          <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
            <Icon
              name="android"
              type="font-awesome"
              color="grey"
              size={iconSizes.smallest}
              iconStyle={{
                paddingRight: 10,
                paddingLeft: 10,
              }}
            />
            <Text style={styles.subTitle}>{I18n.t('android')}</Text>
          </View>
          <Icon
            name={isRTL ? 'chevron-thin-left' : 'chevron-thin-right'}
            type="entypo"
            color="lightgrey"
            size={iconSizes.smallest}
            iconStyle={{
              paddingRight: isIOS ? 10 : 0,
              paddingLeft: isIOS ? 0 : 10,
            }}
          />
        </TouchableOpacity>
      )}
      {!isEmpty(youtube) && (
        <TouchableOpacity
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          onPress={() => Linking.openURL(`${youtube}`)}
          style={styles.itemRow}>
          <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
            <Icon
              name="youtube"
              type="font-awesome"
              color="grey"
              size={iconSizes.smallest}
              iconStyle={{
                paddingRight: 10,
                paddingLeft: 10,
              }}
            />
            <Text style={styles.subTitle}>{I18n.t('youtube')}</Text>
          </View>
          <Icon
            name={isRTL ? 'chevron-thin-left' : 'chevron-thin-right'}
            type="entypo"
            color="lightgrey"
            size={iconSizes.smallest}
            iconStyle={{
              paddingRight: isIOS ? 10 : 0,
              paddingLeft: isIOS ? 0 : 10,
            }}
          />
        </TouchableOpacity>
      )}
      {!isEmpty(website) && (
        <TouchableOpacity
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          onPress={() => Linking.openURL(`${website}`)}
          style={styles.itemRow}>
          <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
            <Icon
              name="link"
              type="font-awesome"
              color="grey"
              size={iconSizes.smallest}
              iconStyle={{
                paddingRight: 10,
                paddingLeft: 10,
              }}
            />
            <Text style={styles.subTitle}>{I18n.t('website')}</Text>
          </View>
          <Icon
            name={isRTL ? 'chevron-thin-left' : 'chevron-thin-right'}
            type="entypo"
            color="lightgrey"
            size={iconSizes.smallest}
            iconStyle={{
              paddingRight: isIOS ? 10 : 0,
              paddingLeft: isIOS ? 0 : 10,
            }}
          />
        </TouchableOpacity>
      )}
      {!isEmpty(description) && (
        <UserInfoWidgetElement
          elementName="description"
          iconName="description"
          type="material"
          element={description}
        />
      )}
      {!isEmpty(service) && (
        <UserInfoWidgetElement
          elementName="services"
          iconName="customerservice"
          element={service}
          type="antdesign"
        />
      )}
      {!isEmpty(address) && (
        <UserInfoWidgetElement
          elementName="address"
          iconName="address"
          element={address}
          type="entypo"
        />
      )}
      {!isEmpty(longitude || latitude) && has_map && !ESCRAP && (
        <MapViewWidget
          latitude={latitude}
          longitude={longitude}
          logo={thumb}
          title={slug}
          showTitle={false}
          height={250}
        />
      )}
      {!isEmpty(images) && (
        <ImagesGridWidget
          elements={images}
          name={slug}
          showLabels={false}
          showTitle={true}
          width={100}
          height={100}
        />
      )}
    </View>
  );
};

export default UserInfoWidget;

UserInfoWidget.propTypes = {};

const styles = StyleSheet.create({
  mainTitle: {
    fontFamily: text.font,
    fontSize: text.large,
    textAlign: 'left',
  },
  subTitle: {
    fontFamily: text.font,
    fontSize: text.medium,
    textAlign: 'left',
  },
  description: {
    fontFamily: text.font,
    fontSize: text.medium,
    textAlign: isIOS ? 'left' : isRTL ? 'right' : 'left',
  },
  elementRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 10,
  },
  wrapper: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    borderTopWidth: 1,
    borderColor: 'lightgrey',
  },
  logo: {
    width: 80,
    height: 80,
    marginRight: 5,
    marginLeft: 5,
  },
  itemRow: {
    borderTopWidth: 0.5,
    borderColor: 'lightgrey',
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
