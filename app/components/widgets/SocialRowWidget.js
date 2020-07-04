import React from 'react';
import {Linking, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {View} from 'react-native-animatable';
import {APP_CASE} from './../../../app';
import {iconSizes} from '../../constants/sizes';
import {useSelector} from 'react-redux';
import {getWhatsappLink} from '../../helpers';
import I18n from './../../I18n';

const SocialRowWidget = () => {
  const {settings} = useSelector((state) => state);
  return (
    <View
      animation="bounceIn"
      easing="ease-out"
      style={styles.container}
      useNativeDriver={true}>
      {settings.facebook ? (
        <Icon
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          reverse
          raised
          size={iconSizes.smaller}
          containerStyle={{margin: '5%'}}
          name="facebook"
          type="font-awesome"
          color="#3b5998"
          onPress={() => Linking.openURL(settings.facebook)}
        />
      ) : null}
      {settings.twitter ? (
        <Icon
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          reverse
          raised
          size={iconSizes.smaller}
          containerStyle={{margin: '5%'}}
          name="twitter"
          type="font-awesome"
          color="#1da1f2"
          onPress={() => Linking.openURL(settings.twitter)}
        />
      ) : null}
      {settings.instagram ? (
        <Icon
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          reverse
          raised
          size={iconSizes.smaller}
          containerStyle={{margin: '5%'}}
          name="instagram"
          type="font-awesome"
          color="#c32aa3"
          onPress={() => Linking.openURL(settings.instagram)}
        />
      ) : null}
      {settings.snapchat ? (
        <Icon
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          reverse
          raised
          size={iconSizes.smaller}
          containerStyle={{margin: '5%'}}
          name="snapchat"
          type="font-awesome"
          color="#FFFC00"
          reverseColor="black"
          onPress={() => Linking.openURL(settings.snapchat)}
        />
      ) : null}
      {settings.whatsapp ? (
        <Icon
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          reverse
          raised
          size={iconSizes.smaller}
          containerStyle={{margin: '5%'}}
          name="whatsapp"
          type="font-awesome"
          color="#25d366"
          onPress={() =>
            Linking.openURL(
              getWhatsappLink(settings.whatsapp, I18n.t(APP_CASE)),
            )
          }
        />
      ) : null}
      {settings.phone ? (
        <Icon
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          reverse
          raised
          size={iconSizes.smaller}
          containerStyle={{margin: '5%'}}
          name="phone"
          type="font-awesome"
          color="black"
          onPress={() => Linking.openURL(`tel:${settings.mobile}`)}
        />
      ) : null}
      {settings.youtube ? (
        <Icon
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          reverse
          raised
          size={iconSizes.smaller}
          containerStyle={{margin: '5%'}}
          name="youtube"
          type="font-awesome"
          color="#ff0000"
          onPress={() => Linking.openURL(settings.youtube)}
        />
      ) : null}
    </View>
  );
};

export default SocialRowWidget;

const styles = StyleSheet.create({
  container: {
    marginTop: '5%',
    alignSelf: 'center',
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  rowWrapper: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    width: '100%',
    borderWidth: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    margin: 5,
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
});
