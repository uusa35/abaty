import React, {useEffect} from 'react';
import {Modal, View} from 'react-native';
import Spinner from 'react-native-spinkit';
import {whitesmoke} from 'color-name';
import {useSelector} from 'react-redux';
import {height, iconSizes} from './../../constants/sizes';

const LoadingContainer = () => {
  const {settings, isLoading, bootStrapped} = useSelector((state) => state);

  useEffect(() => {}, [isLoading]);

  return (
    <View
      style={{
        // opacity: 0.3,
        // borderWidth : 10 ,
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'whitesmoke',
        height,
      }}>
      <Modal visible={isLoading && bootStrapped} transparent={true}>
        <View style={{backgroundColor: 'rgba(255,255,255,0.5', flex: 1}}>
          <Spinner
            type="FadingCircle"
            size={40}
            style={{position: 'absolute', top: height / 2, alignSelf: 'center'}}
            color={settings.colors.main_theme_color}
          />
        </View>
      </Modal>
    </View>
  );
};

export default LoadingContainer;
