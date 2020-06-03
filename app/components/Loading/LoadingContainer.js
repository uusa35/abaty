import React, {useContext} from 'react';
import {Modal, Text, View} from 'react-native';
import Spinner from 'react-native-spinkit';
import {whitesmoke} from 'color-name';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';

const LoadingContainer = ({isLoading}) => {
  const {settings} = useContext(GlobalValuesContext);
  return (
    <Modal visible={isLoading} transparent>
      <View
        style={{
          opacity: 0.3,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'whitesmoke',
        }}>
        <Spinner
          type="FadingCircle"
          size={40}
          color={settings.colors.main_theme_color}
        />
      </View>
    </Modal>
  );
};

export default LoadingContainer;
