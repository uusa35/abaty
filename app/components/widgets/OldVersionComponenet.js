import React from 'react';
import {StyleSheet, Text, View, Linking} from 'react-native';
import I18n from '../../I18n';
import {isIOS, height} from '../../constants';
import {text, width} from '../../constants/sizes';
import {adjustColor} from '../../helpers';
import {Button} from 'react-native-elements';
import {useSelector} from 'react-redux';

const OldVersionComponent = () => {
  const {settings} = useSelector((state) => state);
  const {colors, apple, android} = settings;
  return (
    <View
      style={{
        backgroundColor: 'whitesmoke',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontSize: text.medium,
          fontFamily: text.font,
          marginBottom: 50,
        }}>
        {I18n.t('old_version')}
      </Text>
      <Button
        raised
        title={I18n.t('update')}
        type="outline"
        onPress={() =>
          isIOS ? Linking.openURL(apple) : Linking.openURL(android)
        }
        buttonStyle={{
          width: width - 50,
          borderColor: adjustColor(colors.btn_bg_theme_color, 50),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: adjustColor(colors.icon_theme_color, 50),
        }}
        titleStyle={{
          fontFamily: text.font,
          color: adjustColor(colors.btn_bg_theme_color, 80),
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    </View>
  );
};

export default OldVersionComponent;

OldVersionComponent.propTypes = {};

const styles = StyleSheet.create({});
