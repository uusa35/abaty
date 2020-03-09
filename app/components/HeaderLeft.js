/**
 * Created by usamaahmed on 9/28/17.
 */
import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Badge} from 'react-native-elements';
import {GlobalValuesContext} from '../redux/GlobalValuesContext';
import widgetStyles from './widgets/widgetStyles';
import {useNavigation} from 'react-navigation-hooks';
import {iconSizes} from '../constatns/sizes';

export const HeaderLeft = ({
  showCart = true,
  showSideMenu = true,
  showAccount = false,
}) => {
  const {navigate, openDrawer} = useNavigation();
  const {cartLength, colors} = useContext(GlobalValuesContext);
  return (
    <View style={widgetStyles.safeContainer}>
      {showSideMenu ? (
        <Icon
          name="ios-menu"
          type="ionicon"
          size={iconSizes.large}
          onPress={() => openDrawer()}
          underlayColor="transparent"
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          color="black"
        />
      ) : null}
      {showCart ? (
        <View>
          <Icon
            onPress={() => navigate('CartIndex')}
            name="ios-cart"
            type="ionicon"
            size={iconSizes.small}
            underlayColor="transparent"
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            color={colors.icon_theme_color}
          />
          {cartLength > 0 ? (
            <Badge
              status="error"
              value={cartLength}
              containerStyle={{position: 'absolute', top: -10, right: -4}}
            />
          ) : null}
        </View>
      ) : showAccount ? (
        <View>
          <Icon
            onPress={() => navigate('Account')}
            name="user-circle"
            type="font-awesome"
            size={iconSizes.small}
            underlayColor="transparent"
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            color={colors.icon_theme_color}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 5,
    paddingLeft: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 80,
  },
});
