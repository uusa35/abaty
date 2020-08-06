import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import I18n, {isRTL} from '../../../I18n';
import {isIOS} from '../../../constants';
import {text, width} from '../../../constants/sizes';
import {images} from '../../../constants/images';
import {View} from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {isNull} from 'lodash';
import ImageLoaderContainer from '../ImageLoaderContainer';

const UserProfileInformationWidget = ({auth}) => {
  const {colors} = useContext(GlobalValuesContext);
  return (
    <View animation="bounceInLeft" easing="ease-out" useNativeDriver={true}>
      <View style={{width: width, marginTop: 0, alignItems: 'center'}}>
        <ImageLoaderContainer
          img={auth.thumb}
          style={{
            width: 120,
            height: 120,
            margin: 20,
            borderRadius: 120 / 2,
            borderWidth: 0.5,
            borderColor: 'lightgrey',
          }}
          resizeMode="cover"
          loadingIndicatorSource={images.logo}
        />
      </View>
      <TouchableOpacity
        // onPress={() => console.log('user')}
        hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
        style={styles.itemRow}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
          }}>
          <Icon
            type="entypo"
            name="user"
            size={20}
            color={colors.header_one_theme_color}
            iconStyle={{
              paddingRight: 10,
              paddingLeft: 10,
            }}
          />
          <Text style={styles.subTitle}>{I18n.t('name')} : </Text>
          <Text style={styles.subTitle}>{auth.name}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        // onPress={() => console.log('user')}
        hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
        style={styles.itemRow}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
          }}>
          <Icon
            type="material"
            name="mail"
            size={20}
            color={colors.header_one_theme_color}
            iconStyle={{
              paddingRight: 10,
              paddingLeft: 10,
            }}
          />
          <Text style={styles.subTitle}>{I18n.t('email')} : </Text>
          <Text style={styles.subTitle}>{auth.email}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        // onPress={() => console.log('user')}
        hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
        style={styles.itemRow}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
          }}>
          <Icon
            type="entypo"
            name="mobile"
            size={20}
            color={colors.header_one_theme_color}
            iconStyle={{
              paddingRight: 10,
              paddingLeft: 10,
            }}
          />
          <Text style={styles.subTitle}>{I18n.t('mobile')} : </Text>
          <Text style={styles.subTitle}>{auth.mobile}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        // onPress={() => console.log('user')}
        hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
        style={styles.itemRow}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
          }}>
          <Icon
            type="entypo"
            name="language"
            size={20}
            color={colors.header_one_theme_color}
            iconStyle={{
              paddingRight: 10,
              paddingLeft: 10,
            }}
          />
          <Text style={styles.subTitle}>{I18n.t('country')} : </Text>
          <Text style={styles.subTitle}>{auth.countryName}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        // onPress={() => console.log('user')}
        hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
        style={styles.itemRow}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
          }}>
          <Icon
            type="entypo"
            name="address"
            size={20}
            color={colors.header_one_theme_color}
            iconStyle={{
              paddingRight: 10,
              paddingLeft: 10,
            }}
          />
          <Text style={styles.subTitle}>{I18n.t('address')} : </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        // onPress={() => console.log('user')}
        hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
        style={styles.itemRow}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            paddingRight: 20,
            paddingLeft: 20,
          }}>
          <Text style={styles.subTitle}>
            {!isNull(auth.address) ? auth.address : ''}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        // onPress={() => console.log('user')}
        hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
        style={styles.itemRow}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
          }}>
          <Icon
            type="entypo"
            name="text"
            size={20}
            color={colors.header_one_theme_color}
            iconStyle={{
              paddingRight: 10,
              paddingLeft: 10,
            }}
          />
          <Text style={styles.subTitle}>{I18n.t('description')} :</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        // onPress={() => console.log('user')}
        hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
        style={styles.itemRow}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            paddingRight: 20,
            paddingLeft: 20,
          }}>
          <Text style={styles.subTitle}>
            {auth.description ? auth.description : ''}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default UserProfileInformationWidget;

UserProfileInformationWidget.propTypes = {};

const styles = StyleSheet.create({
  mainTitle: {
    fontFamily: text.font,
    fontSize: text.large,
    textAlign: 'left',
  },
  subTitle: {
    color: 'black',
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
    alignItems: 'baseline',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
