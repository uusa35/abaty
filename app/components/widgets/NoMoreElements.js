import React, {useContext} from 'react';
import {Button} from 'react-native-elements';
import I18n from '../../I18n';
import {text, width} from '../../constants/sizes';
import {View} from 'react-native';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';

const NoMoreElements = ({
  title = I18n.t('no_more_elements'),
  isLoading = false,
}) => {
  const {colors} = useContext(GlobalValuesContext);
  return (
    <View
      style={{
        alignSelf: 'center',
        marginRight: 10,
        marginLeft: 10,
        width: '98%',
      }}>
      <Button
        loading={isLoading}
        raised
        title={title}
        type="outline"
        buttonStyle={{borderColor: colors.btn_bg_theme_color, borderWidth: 0.3}}
        containerStyle={{minWidth: width / 1.5}}
        titleStyle={{fontFamily: text.font, color: colors.btn_bg_theme_color}}
      />
    </View>
  );
};

export default NoMoreElements;
