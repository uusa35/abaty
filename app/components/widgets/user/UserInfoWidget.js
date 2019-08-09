import React, {useContext} from 'react';
import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import I18n, {isRTL} from '../../../I18n';
import {text, isIOS, links} from '../../../constants';
import UserInfoWidgetElement from './UserInfoWidgetElement';
import PropTypes from 'prop-types';
import MapViewWidget from '../MapViewWidget';
import validate from 'validate.js';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import ImagesWidget from '../ImagesWidget';

const UserInfoWidget = ({user}) => {
  const {colors} = useContext(GlobalValuesContext);
  return (
    <View style={{width: '90%', alignSelf: 'center', marginTop: 30}}>
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
            height: 1
          },
          shadowOpacity: 0.18,
          shadowRadius: 1.0,

          elevation: 1
        }}>
        {I18n.t('information')}
      </Text>
      {user.longitude && user.latitude ? (
        <TouchableOpacity
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          onPress={() =>
            Linking.openURL(
              `${links.googleMapUrl}${user.latitude},${user.longitude}`
            )
          }
          style={styles.itemRow}>
          <View style={styles.infoRow}>
            <Icon
              name="map"
              color="grey"
              iconStyle={{
                paddingRight: 10,
                paddingLeft: 10
              }}
            />
            <Text style={styles.subTitle}>{I18n.t('location')}</Text>
          </View>
          <Icon
            name={isRTL ? 'chevron-thin-left' : 'chevron-thin-right'}
            type="entypo"
            color="lightgrey"
            size={15}
            iconStyle={{
              paddingRight: isIOS ? 10 : 0,
              paddingLeft: isIOS ? 0 : 10
            }}
          />
        </TouchableOpacity>
      ) : null}
      {user.mobile ? (
        <TouchableOpacity
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          onPress={() => Linking.openURL(`tel:${user.mobile}`)}
          style={styles.itemRow}>
          <View style={styles.infoRow}>
            <Icon
              name="telephone"
              type="foundation"
              color="grey"
              iconStyle={{
                paddingRight: 10,
                paddingLeft: 10
              }}
            />
            <Text style={styles.subTitle}>{I18n.t('mobile')}</Text>
          </View>
          <Text style={styles.subTitle}>{user.mobile}</Text>
        </TouchableOpacity>
      ) : null}
      {user.phone ? (
        <TouchableOpacity
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          onPress={() => Linking.openURL(`tel:${user.phone}`)}
          style={styles.itemRow}>
          <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
            <Icon
              name="mobile"
              type="foundation"
              color="grey"
              iconStyle={{
                paddingRight: 10,
                paddingLeft: 10
              }}
            />
            <Text style={styles.subTitle}>{I18n.t('phone')}</Text>
          </View>
          <Text style={styles.subTitle}>{user.phone}</Text>
        </TouchableOpacity>
      ) : null}
      {user.whatsapp ? (
        <TouchableOpacity
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          onPress={() =>
            Linking.openURL(
              `https://api.whatsapp.com/send?phone=${user.whatsapp}&text=Shared by Escrap App - ${user.slug}`
            )
          }
          style={styles.itemRow}>
          <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
            <Icon
              name="whatsapp"
              type="font-awesome"
              color="grey"
              size={20}
              iconStyle={{
                paddingRight: 10,
                paddingLeft: 10
              }}
            />
            <Text style={styles.subTitle}>{I18n.t('whatsapp')}</Text>
          </View>
          <Text style={styles.subTitle}>{user.whatsapp}</Text>
        </TouchableOpacity>
      ) : null}
      {user.twitter ? (
        <TouchableOpacity
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          onPress={() => Linking.openURL(`${user.twitter}`)}
          style={styles.itemRow}>
          <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
            <Icon
              name="twitter"
              type="font-awesome"
              color="grey"
              size={20}
              iconStyle={{
                paddingRight: 10,
                paddingLeft: 10
              }}
            />
            <Text style={styles.subTitle}>{I18n.t('twitter')}</Text>
          </View>
          <Icon
            name={isRTL ? 'chevron-thin-left' : 'chevron-thin-right'}
            type="entypo"
            color="lightgrey"
            size={15}
            iconStyle={{
              paddingRight: isIOS ? 10 : 0,
              paddingLeft: isIOS ? 0 : 10
            }}
          />
        </TouchableOpacity>
      ) : null}
      {user.facebook ? (
        <TouchableOpacity
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          onPress={() => Linking.openURL(`${user.facebook}`)}
          style={styles.itemRow}>
          <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
            <Icon
              name="facebook"
              type="font-awesome"
              color="grey"
              size={20}
              iconStyle={{
                paddingRight: 10,
                paddingLeft: 10
              }}
            />
            <Text style={styles.subTitle}>{I18n.t('facebook')}</Text>
          </View>
          <Icon
            name={isRTL ? 'chevron-thin-left' : 'chevron-thin-right'}
            type="entypo"
            color="lightgrey"
            size={15}
            iconStyle={{
              paddingRight: isIOS ? 10 : 0,
              paddingLeft: isIOS ? 0 : 10
            }}
          />
        </TouchableOpacity>
      ) : null}
      {user.instagram ? (
        <TouchableOpacity
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          onPress={() => Linking.openURL(`${user.instagram}`)}
          style={styles.itemRow}>
          <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
            <Icon
              name="instagram"
              type="font-awesome"
              color="grey"
              size={20}
              iconStyle={{
                paddingRight: 10,
                paddingLeft: 10
              }}
            />
            <Text style={styles.subTitle}>{I18n.t('instagram')}</Text>
          </View>
          <Icon
            name={isRTL ? 'chevron-thin-left' : 'chevron-thin-right'}
            type="entypo"
            color="lightgrey"
            size={15}
            iconStyle={{
              paddingRight: isIOS ? 10 : 0,
              paddingLeft: isIOS ? 0 : 10
            }}
          />
        </TouchableOpacity>
      ) : null}
      {user.android ? (
        <TouchableOpacity
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          onPress={() => Linking.openURL(`${user.android}`)}
          style={styles.itemRow}>
          <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
            <Icon
              name="android"
              type="font-awesome"
              color="grey"
              size={20}
              iconStyle={{
                paddingRight: 10,
                paddingLeft: 10
              }}
            />
            <Text style={styles.subTitle}>{I18n.t('android')}</Text>
          </View>
          <Icon
            name={isRTL ? 'chevron-thin-left' : 'chevron-thin-right'}
            type="entypo"
            color="lightgrey"
            size={15}
            iconStyle={{
              paddingRight: isIOS ? 10 : 0,
              paddingLeft: isIOS ? 0 : 10
            }}
          />
        </TouchableOpacity>
      ) : null}
      {user.youtube ? (
        <TouchableOpacity
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          onPress={() => Linking.openURL(`${user.youtube}`)}
          style={styles.itemRow}>
          <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
            <Icon
              name="youtube"
              type="font-awesome"
              color="grey"
              size={20}
              iconStyle={{
                paddingRight: 10,
                paddingLeft: 10
              }}
            />
            <Text style={styles.subTitle}>{I18n.t('youtube')}</Text>
          </View>
          <Icon
            name={isRTL ? 'chevron-thin-left' : 'chevron-thin-right'}
            type="entypo"
            color="lightgrey"
            size={15}
            iconStyle={{
              paddingRight: isIOS ? 10 : 0,
              paddingLeft: isIOS ? 0 : 10
            }}
          />
        </TouchableOpacity>
      ) : null}
      {user.website ? (
        <TouchableOpacity
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          onPress={() => Linking.openURL(`${user.website}`)}
          style={styles.itemRow}>
          <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
            <Icon
              name="link"
              type="font-awesome"
              color="grey"
              size={20}
              iconStyle={{
                paddingRight: 10,
                paddingLeft: 10
              }}
            />
            <Text style={styles.subTitle}>{I18n.t('website')}</Text>
          </View>
          <Icon
            name={isRTL ? 'chevron-thin-left' : 'chevron-thin-right'}
            type="entypo"
            color="lightgrey"
            size={15}
            iconStyle={{
              paddingRight: isIOS ? 10 : 0,
              paddingLeft: isIOS ? 0 : 10
            }}
          />
        </TouchableOpacity>
      ) : null}
      {!validate.isEmpty(user.description) ? (
        <UserInfoWidgetElement
          elementName="description"
          iconName="ios-list-box"
          type="ionicon"
          element={user.description}
        />
      ) : null}
      {!validate.isEmpty(user.service) ? (
        <UserInfoWidgetElement
          elementName="services"
          iconName="customerservice"
          element={user.service}
          type="antdesign"
        />
      ) : null}
      {!validate.isEmpty(user.address) ? (
        <UserInfoWidgetElement
          elementName="address"
          iconName="address"
          element={user.address}
          type="entypo"
        />
      ) : null}
      {!validate.isEmpty(user.images) ? (
        <ImagesWidget
          elements={user.images}
          name={user.slug}
          showLabels={false}
          showTitle={true}
          width={175}
          height={235}
        />
      ) : null}
      {!validate.isEmpty(user.longitude || user.latitude) ? (
        <MapViewWidget
          latitude={user.latitude}
          longitude={user.longitude}
          logo={user.thumb}
          title={user.slug}
          showTitle={true}
          height={250}
        />
      ) : null}
    </View>
  );
};

export default React.memo(UserInfoWidget);

UserInfoWidget.propTypes = {
  user: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  mainTitle: {
    fontFamily: text.font,
    fontSize: text.large,
    textAlign: 'left'
  },
  subTitle: {
    fontFamily: text.font,
    fontSize: text.medium,
    textAlign: 'left'
  },
  description: {
    fontFamily: text.font,
    fontSize: text.medium,
    textAlign: isIOS ? 'left' : isRTL ? 'right' : 'left'
  },
  elementRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 10
  },
  wrapper: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    borderTopWidth: 1,
    borderColor: 'lightgrey'
  },
  logo: {
    width: 80,
    height: 80,
    marginRight: 5,
    marginLeft: 5
  },
  itemRow: {
    borderTopWidth: 0.5,
    borderColor: 'lightgrey',
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline'
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
