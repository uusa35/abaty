import React, {useContext} from 'react';
import ActionButton from 'react-native-action-button';
import {Icon} from 'react-native-elements';
import {StyleSheet, View} from 'react-native';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import {useNavigation} from 'react-navigation-hooks';
import I18n from './../../I18n';
import {text} from './../../constants';

const ActionBtnWidget = () => {
  const {navigate} = useNavigation();
  const {colors} = useContext(GlobalValuesContext);
  return (
    <View
      style={{
        position: 'absolute',
        left: '1%',
        backgroundColor: 'transparent',
        height: 100,
        zIndex: 99
      }}>
      <ActionButton
        style={{opacity: 0.6}}
        size={50}
        spacing={20}
        position="left"
        verticalOrientation="down"
        buttonColor={colors.btn_bg_theme_color}>
        <ActionButton.Item
          buttonColor={colors.btn_bg_theme_color}
          title={I18n.t('home')}
          onPress={() => navigate('Home')}
          textStyle={styles.title}>
          <Icon
            name="home"
            style={styles.actionButtonIcon}
            color={colors.btn_text_theme_color}
          />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor={colors.btn_bg_theme_color}
          title={I18n.t('cart')}
          onPress={() => navigate('CartIndex')}
          textStyle={styles.title}>
          <Icon
            name="ios-cart"
            type="ionicon"
            style={styles.actionButtonIcon}
            color={colors.btn_text_theme_color}
          />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
};

export default React.memo(ActionBtnWidget);

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22
  },
  title: {
    fontFamily: text.font,
    fontSize: text.medium
  }
});
