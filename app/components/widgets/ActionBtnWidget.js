import React, {useContext} from 'react';
import ActionButton from 'react-native-action-button';
import {Icon} from 'react-native-elements';
import {StyleSheet, View} from 'react-native';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import I18n from './../../I18n';
import {iconSizes, text} from './../../constants/sizes';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';

const ActionBtnWidget = ({visible = false}) => {
  const {colors} = useContext(GlobalValuesContext);
  const {navigate} = useNavigation();
  return (
    <View
      style={{
        position: 'absolute',
        left: '1%',
        bottom: '15%',
        backgroundColor: 'transparent',
        height: 100,
        zIndex: 99,
      }}>
      <ActionButton
        style={{opacity: 0.4}}
        renderIcon={() => (
          <Icon
            name="menu"
            type="feather"
            color="white"
            size={iconSizes.small}
          />
        )}
        size={50}
        spacing={20}
        position="left"
        verticalOrientation="up"
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
          onPress={() => navigate('CartTab')}
          textStyle={styles.title}>
          <Icon
            name="cart"
            type="material-community"
            style={styles.actionButtonIcon}
            color={colors.btn_text_theme_color}
          />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
};

export default ActionBtnWidget;

ActionBtnWidget.propTypes = {};

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
  },
  title: {
    fontFamily: text.font,
    fontSize: text.medium,
  },
});
