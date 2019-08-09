/**
 * Created by usamaahmed on 9/28/17.
 */
import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Badge} from 'react-native-elements';
import {SafeAreaView} from 'react-navigation';
import {GlobalValuesContext} from '../redux/GlobalValuesContext';
import widgetStyles from './widgets/widgetStyles';

export const HeaderLeft = ({openDrawer, navigate}) => {
  const {cartLength, colors} = useContext(GlobalValuesContext);
  return (
    <View style={widgetStyles.safeContainer}>
      <Icon
        name="ios-menu"
        type="ionicon"
        size={32}
        onPress={() => openDrawer()}
        underlayColor="transparent"
        hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
        color="black"
      />
      <View>
        <Icon
          onPress={() => navigate('CartIndex')}
          name="ios-cart"
          type="ionicon"
          size={32}
          underlayColor="transparent"
          hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
          color={colors.icon_theme_color}
        />
        {cartLength > 0 ? (
          <Badge
            status="error"
            value={cartLength}
            containerStyle={{position: 'absolute', top: -4, right: -4}}
          />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingRight: 5,
    paddingLeft: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 80
  }
});
