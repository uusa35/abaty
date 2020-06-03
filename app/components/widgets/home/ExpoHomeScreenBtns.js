import React, {Fragment} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import widgetStyles from '../widgetStyles';
import {Icon} from 'react-native-elements';
import {iconSizes, text} from '../../../constants/sizes';
import I18n from '../../../I18n';
import {colors as col} from '../../../constants/colors';
import {useNavigation} from 'react-navigation-hooks';

const ExpoHomeScreenBtns = () => {
  const {navigate} = useNavigation();
  return (
    <Fragment>
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
            fontSize: text.medium,
          }}>
          {I18n.t('calendar')}
        </Text>
      </TouchableOpacity>
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
            color={col.expo.main}
          />
          <Text
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              fontFamily: text.font,
              fontSize: text.medium,
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
            color={col.expo.main}
          />
          <Text
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              fontFamily: text.font,
              fontSize: text.medium,
            }}>
            {I18n.t('joinus')}
          </Text>
        </TouchableOpacity>
      </View>
    </Fragment>
  );
};

export default ExpoHomeScreenBtns;
