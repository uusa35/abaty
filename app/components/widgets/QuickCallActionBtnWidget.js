import React, {Fragment, useContext} from 'react';
import ActionButton from 'react-native-action-button';
import {Icon} from 'react-native-elements';
import {Linking, StyleSheet, View} from 'react-native';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import I18n from './../../I18n';
import {iconSizes, text} from './../../constants/sizes';
import PropTypes from 'prop-types';

const QuickCallActionBtnWidget = ({
  visible = false,
  mobile,
  whatsapp = '',
  navigation,
}) => {
  const {navigate} = navigation;
  const {colors} = useContext(GlobalValuesContext);
  return (
    <View
      style={{
        position: 'absolute',
        left: '1%',
        bottom: '1%',
        backgroundColor: 'transparent',
        height: 100,
        zIndex: 99,
      }}>
      <ActionButton
        useNativeFeedback={true}
        style={{opacity: 0.6}}
        renderIcon={() => (
          <Icon name="phone-call" type="feather" color="white" />
        )}
        size={iconSizes.large}
        spacing={20}
        position="left"
        verticalOrientation="up"
        buttonColor={colors.btn_bg_theme_color}>
        {mobile && (
          <ActionButton.Item
            useNativeFeedback={true}
            buttonColor={colors.btn_bg_theme_color}
            title={I18n.t('call_user')}
            onPress={() => Linking.openURL(`tel:${mobile}`)}
            textStyle={styles.title}>
            <Icon
              name="phone"
              style={styles.actionButtonIcon}
              color={colors.btn_text_theme_color}
            />
          </ActionButton.Item>
        )}
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
      </ActionButton>
    </View>
  );
};

export default QuickCallActionBtnWidget;

QuickCallActionBtnWidget.propTypes = {};

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
  },
  title: {
    fontFamily: text.font,
    fontSize: text.small,
  },
});
