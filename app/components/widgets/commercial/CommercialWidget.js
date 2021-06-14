import React from 'react';
import {Linking, Pressable, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {iconSizes, touchOpacity, width} from '../../../constants/sizes';
import widgetStyles from '../widgetStyles';
import {Icon} from 'react-native-elements';
import {getWhatsappLink} from '../../../helpers';
import I18n from '../../../I18n';
import {APP_CASE} from '../../../../app.json';
import {themeColors} from '../../../constants/colors';
import {useNavigation} from '@react-navigation/native';

const CommercialWidget = ({element}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: width / 2,
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: themeColors.desinerat.lightGray,
      }}
      activeOpacity={touchOpacity}
      key={element.id}>
      <Pressable
        onPress={() =>
          navigation.navigate('ImageZoom', {
            images: [element],
            name: element.name,
          })
        }>
        <FastImage
          resizeMode="contain"
          source={{uri: element.thumb}}
          style={{width: width / 2, height: width / 1.5}}
        />
      </Pressable>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '80%',
        }}>
        {element.whatsapp && (
          <Icon
            hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
            reverse
            raised
            size={iconSizes.smallest}
            containerStyle={{margin: '5%'}}
            name="whatsapp"
            type="font-awesome"
            color="#25d366"
            onPress={() =>
              Linking.openURL(
                getWhatsappLink(element.whatsapp, I18n.t(APP_CASE)),
              )
            }
          />
        )}
        {element.mobile && (
          <Icon
            hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
            reverse
            raised
            size={iconSizes.smallest}
            containerStyle={{margin: '5%'}}
            name="mobile"
            type="font-awesome"
            color="black"
            onPress={() => Linking.openURL(`tel:${element.mobile}`)}
          />
        )}
        {element.path && (
          <Icon
            hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
            reverse
            raised
            size={iconSizes.smallest}
            containerStyle={{margin: '5%'}}
            name="file-pdf-o"
            type="font-awesome"
            color="black"
            onPress={() => Linking.openURL(`${element.path}`)}
          />
        )}
        {element.url && (
          <Icon
            hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
            reverse
            raised
            size={iconSizes.smallest}
            containerStyle={{margin: '5%'}}
            name="link"
            type="font-awesome"
            color="black"
            onPress={() => Linking.openURL(`${element.url}`)}
          />
        )}
      </View>
    </View>
  );
};

export default CommercialWidget;
