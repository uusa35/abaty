import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import widgetStyles from '../widgetStyles';
import {Icon} from 'react-native-elements';
import {iconSizes, text} from '../../../constants/sizes';
import I18n from '../../../I18n';
import {themeColors} from '../../../constants/colors';
import {useSelector} from 'react-redux';
import {View as Animating} from 'react-native-animatable';
import {EXPO} from './../../../../app';
import {useNavigation} from '@react-navigation/native';

const ExpoHomeScreenBtns = () => {
  const {guest} = useSelector(state => state);
  const {navigate} = useNavigation();
  return (
    <Animating animation="bounceIn" easing="ease-out" useNativeDriver={true}>
      <TouchableOpacity
        onPress={() => navigate('CalendarIndex')}
        style={[
          widgetStyles.mediumShadow,
          {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: 'white',
            width: '91%',
            borderWidth: 1,
            borderRadius: 5,
            borderColor: 'lightgrey',
            paddingRight: 10,
            paddingLeft: 10,
            paddingTop: 5,
            paddingBottom: 5,
            margin: 3,
          },
        ]}>
        <Icon
          name="calendar"
          type="feather"
          raised
          reverse
          iconStyle={{fontSize: iconSizes.smaller}}
          size={iconSizes.smaller}
          color="black"
        />
        <Text
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            fontFamily: text.font,
            fontSize: text.small,
            color: 'black',
          }}>
          {EXPO ? I18n.t('expo_calender') : I18n.t('calendar')}
        </Text>
      </TouchableOpacity>
      {guest && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => navigate('Login')}
            style={[
              widgetStyles.mediumShadow,
              {
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                backgroundColor: 'white',
                width: '45%',
                borderWidth: 1,
                borderRadius: 5,
                borderColor: 'lightgrey',
                paddingRight: 10,
                paddingLeft: 10,
                paddingTop: 5,
                paddingBottom: 5,
                margin: 3,
              },
            ]}>
            <Icon
              raised
              reverse
              name="user"
              type="antdesign"
              iconStyle={{fontSize: iconSizes.smaller}}
              size={iconSizes.smaller}
              color={themeColors.expo.main}
            />
            <Text
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                fontFamily: text.font,
                fontSize: text.small,
                color: 'black',
              }}>
              {I18n.t('login')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate('RoleIndex')}
            style={[
              widgetStyles.mediumShadow,
              {
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                backgroundColor: 'white',
                width: '45%',
                borderWidth: 1,
                borderRadius: 5,
                borderColor: 'lightgrey',
                paddingRight: 10,
                paddingLeft: 10,
                paddingTop: 5,
                paddingBottom: 5,
                margin: 3,
              },
            ]}>
            <Icon
              raised
              reverse
              name="login"
              type="antdesign"
              iconStyle={{fontSize: iconSizes.smaller}}
              size={iconSizes.smaller}
              color={themeColors.expo.main}
            />
            <Text
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                fontFamily: text.font,
                fontSize: text.small,
                color: 'black',
              }}>
              {I18n.t('joinus')}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Animating>
  );
};

export default ExpoHomeScreenBtns;
