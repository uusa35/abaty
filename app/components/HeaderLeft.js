/**
 * Created by usamaahmed on 9/28/17.
 */
import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Badge} from 'react-native-elements';
import {SafeAreaView} from 'react-navigation';
import {GlobalValuesContext} from '../redux/GlobalValuesContext';

export const HeaderLeft = ({openDrawer, navigate}) => {
  const {cartLength, colors} = useContext(GlobalValuesContext);
  return (
    <SafeAreaView style={styles.container}>
      <Icon
        name="ios-menu"
        type="ionicon"
        size={32}
        onPress={() => openDrawer()}
        underlayColor="transparent"
        hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 3,
    paddingLeft: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 80
  }
});
