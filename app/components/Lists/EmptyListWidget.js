import React, {useContext} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {text, width} from '../../constants/sizes';
import {Button} from 'react-native-elements';
import I18n from '../../I18n';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';

const EmptyListWidget = ({emptyImage = null, title}) => {
  const {colors} = useContext(GlobalValuesContext);
  return (
    <View style={styles.emptyCaseBtn}>
      {emptyImage ? (
        <Image
          source={emptyImage}
          style={{width, height: width}}
          resizeMode="contain"
        />
      ) : (
        <Button
          raised
          title={title}
          type="outline"
          buttonStyle={{width: '100%', borderColor: colors.btn_bg_theme_color}}
          titleStyle={{fontFamily: text.font, color: colors.btn_theme_color}}
        />
      )}
    </View>
  );
};

export default EmptyListWidget;

const styles = StyleSheet.create({
  emptyCaseBtn: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    alignSelf: 'center',
  },
});
