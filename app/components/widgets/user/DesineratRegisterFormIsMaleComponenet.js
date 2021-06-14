import {Text, TouchableOpacity, View} from 'react-native';
import I18n from '../../../I18n';
import KeyBoardContainer from '../../containers/KeyBoardContainer';
import React, {useContext} from 'react';
import {Icon} from 'react-native-elements';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {iconSizes} from '../../../constants/sizes';
import widgetStyles from '../widgetStyles';

const DesineratRegisterFormIsMaleComponent = ({isMale, setIsMale}) => {
  const {colors} = useContext(GlobalValuesContext);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        height: 50,
        marginRight: 10,
        marginLeft: 10,
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: 'lightgrey',
        borderRadius: 5,
      }}>
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: 'row',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          borderLeftColor: 'lightgrey',
          borderLeftWidth: 1,
        }}
        onPress={() => setIsMale(true)}>
        <Icon
          name="check"
          type="antdesign"
          color={isMale ? colors.btn_bg_theme_color : 'white'}
          size={iconSizes.smaller}
        />
        <Text style={[widgetStyles.headerThree, {padding: 5, paddingTop: 10}]}>
          {I18n.t('male')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: 'row',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          borderLeftColor: 'lightgrey',
          borderLeftWidth: 1,
        }}
        onPress={() => setIsMale(false)}>
        <Icon
          name="check"
          type="antdesign"
          color={isMale === false ? colors.btn_bg_theme_color : 'white'}
          size={iconSizes.smaller}
        />
        <Text style={[widgetStyles.headerThree, {padding: 5, paddingTop: 10}]}>
          {I18n.t('female')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: 'row',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          borderLeftColor: 'lightgrey',
          borderLeftWidth: 1,
        }}
        onPress={() => setIsMale(null)}>
        <Icon
          name="check"
          type="antdesign"
          color={isMale == null ? colors.btn_bg_theme_color : 'white'}
          size={iconSizes.smaller}
        />
        <Text style={[widgetStyles.headerThree, {padding: 5, paddingTop: 10}]}>
          {I18n.t('later')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DesineratRegisterFormIsMaleComponent;
