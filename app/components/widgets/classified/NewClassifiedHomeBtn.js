import React, {useContext} from 'react';
import widgetStyles from '../widgetStyles';
import {Text, TouchableOpacity, View} from 'react-native';
import I18n from '../../../I18n';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {useNavigation} from 'react-navigation-hooks';
import FastImage from 'react-native-fast-image';
import {touchOpacity} from '../../../constants/sizes';

const NewClassifiedHomeBtn = () => {
  const {colors, logo, guest} = useContext(GlobalValuesContext);
  const {navigate} = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={touchOpacity}
      onPress={() => (!guest ? navigate('ChooseCategory') : navigate('Login'))}
      style={[
        widgetStyles.newClassifiedBtnWrapper,
        {backgroundColor: colors.btn_bg_theme_color},
      ]}>
      <View style={[widgetStyles.newClassifiedWrapper]}>
        <Text
          style={[
            widgetStyles.newClassifiedTitle,
            {color: colors.btn_text_theme_color},
          ]}>
          {I18n.t('new_classified')}
        </Text>
        <FastImage
          source={{uri: logo}}
          style={{width: 100, height: 100, opacity: 0.5}}
        />
        {/*<Icon*/}
        {/*  name="home"*/}
        {/*  type="material-icon"*/}
        {/*  size={120}*/}
        {/*  color={colors.btn_text_theme_color}*/}
        {/*  containerStyle={{opacity: 0.8}}*/}
        {/*/>*/}
      </View>
    </TouchableOpacity>
  );
};

export default NewClassifiedHomeBtn;
