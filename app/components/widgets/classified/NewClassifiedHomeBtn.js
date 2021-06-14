import React, {useContext, useEffect} from 'react';
import widgetStyles from '../widgetStyles';
import {Text, TouchableOpacity, View} from 'react-native';
import I18n from '../../../I18n';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {touchOpacity} from '../../../constants/sizes';
import ImageLoaderContainer from '../ImageLoaderContainer';
import {useSelector} from 'react-redux';

const NewClassifiedHomeBtn = ({navigation}) => {
  const {colors, logo} = useContext(GlobalValuesContext);
  const {guest} = useSelector(state => state);
  const {navigate} = navigation;

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
        <ImageLoaderContainer
          img={logo}
          style={{width: 100, height: 100, opacity: 0.5, borderRadius: 20}}
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
