import React from 'react';
import {Button} from 'react-native-elements';
import I18n from '../../I18n';
import {text, width} from '../../constants/sizes';
import {View} from 'react-native';

const NoMoreElements = ({
  title = I18n.t('no_more_elements'),
  isLoading = false,
}) => {
  return (
    <View
      style={{
        alignSelf: 'center',
        marginRight: 10,
        marginLeft: 10,
      }}>
      <Button
        loading={isLoading}
        raised
        title={title}
        type="outline"
        containerStyle={{minWidth: width / 1.5}}
        titleStyle={{fontFamily: text.font}}
      />
    </View>
  );
};

export default NoMoreElements;
