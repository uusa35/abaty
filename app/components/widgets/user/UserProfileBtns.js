import {text, width} from '../../../constants/sizes';
import {Button} from 'react-native-elements';
import I18n from '../../../I18n';
import React, {useContext} from 'react';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {View} from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';

const UserProfileBtns = () => {
  const {colors} = useContext(GlobalValuesContext);
  const {navigate} = useNavigation();
  return (
    <View
      animation="fadeInUpBig"
      easing="ease-out"
      useNativeDriver={true}
      style={{
        marginTop: 50,
        width: width - 50,
        alignSelf: 'center',
      }}>
      <Button
        onPress={() => navigate('UserEdit')}
        title={I18n.t('edit_profile')}
        raised
        containerStyle={{marginBottom: 10, width: '100%'}}
        buttonStyle={{
          backgroundColor: colors.btn_bg_theme_color,
          borderRadius: 0,
        }}
        titleStyle={{
          fontFamily: text.font,
          color: colors.btn_text_theme_color,
        }}
      />
    </View>
  );
};

export default UserProfileBtns;
