/**
 * Created by usamaahmed on 9/28/17.
 */
import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Badge} from 'react-native-elements';
import {SafeAreaView} from 'react-navigation';
import {GlobalValuesContext} from '../redux/GlobalValuesContext';

export const HeaderLeft = ({openDrawer, navigate}) => {
  const {cartLength} = useContext(GlobalValuesContext);
  return (
    <SafeAreaView style={styles.container}>
      <Icon
        name="ios-menu"
        type="ionicon"
        size={32}
        onPress={() => openDrawer()}
        underlayColor="transparent"
        hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
        color="black"
      />
      <View>
        <Icon
          onPress={() => navigate('CartIndex')}
          name="ios-cart"
          type="ionicon"
          size={32}
          underlayColor="transparent"
          hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
          color="black"
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
    padding: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 80
  }
});
