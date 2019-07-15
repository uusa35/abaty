import {text, width} from '../../../constants';
import {Button} from 'react-native-elements';
import I18n from '../../../I18n';
import React, {useContext} from 'react';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {NavContext} from '../../../redux/NavContext';
import {View} from 'react-native-animatable';

const UserProfileBtns = () => {
  const {colors} = useContext(GlobalValuesContext);
  const {navigation} = useContext(NavContext);
  return (
    <View
      animation="fadeInUpBig"
      easing="ease-out"
      style={{
        marginTop: 50,
        width: width - 50,
        alignSelf: 'center'
      }}>
      <Button
        onPress={() => navigation.navigate('UserEdit')}
        title={I18n.t('edit_profile')}
        raised
        containerStyle={{marginBottom: 10, width: '100%'}}
        buttonStyle={{
          backgroundColor: colors.btn_bg_theme_color,
          borderRadius: 0
        }}
        titleStyle={{
          fontFamily: text.font,
          color: colors.btn_text_theme_color
        }}
      />
      <Button
        onPress={() => navigation.navigate('Home')}
        raised
        containerStyle={{marginBottom: 10, width: '100%'}}
        buttonStyle={{
          backgroundColor: colors.btn_bg_theme_color,
          borderRadius: 0
        }}
        titleStyle={{
          fontFamily: text.font,
          color: colors.btn_text_theme_color
        }}
        title={I18n.t('shop_now')}
      />
    </View>
  );
};

export default React.memo(UserProfileBtns);
