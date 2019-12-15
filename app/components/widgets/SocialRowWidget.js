import React, {useState} from 'react';
import {Linking, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {View} from 'react-native-animatable';

const SocialRowWidget = ({settings}) => {
  const [size, setSize] = useState(25);
  return (
    <View animation="bounceIn" easing="ease-out" style={styles.container}>
      <View style={styles.rowWrapper}>
        {settings.facebook ? (
          <Icon
            hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
            reverse
            raised
            size={size}
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
            size={size}
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
            size={size}
            name="instagram"
            type="font-awesome"
            color="#c32aa3"
            onPress={() => Linking.openURL(settings.instagram)}
          />
        ) : null}
      </View>
      <View style={styles.rowWrapper}>
        {settings.whatsapp ? (
          <Icon
            hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
            reverse
            raised
            size={size}
            name="whatsapp"
            type="font-awesome"
            color="#25d366"
            onPress={() =>
              Linking.openURL(
                `https://api.whatsapp.com/send?phone=${settings.whatsapp}&text=Shared by Escrap App`,
              )
            }
          />
        ) : null}
        {settings.phone ? (
          <Icon
            hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
            reverse
            raised
            size={size}
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
            size={size}
            name="youtube"
            type="font-awesome"
            color="#ff0000"
            onPress={() => Linking.openURL(settings.youtube)}
          />
        ) : null}
      </View>
    </View>
  );
};

export default SocialRowWidget;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '80%',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 5,
    marginBottom: 20,
  },
});
