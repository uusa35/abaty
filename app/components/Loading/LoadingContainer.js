import React, {useEffect} from 'react';
import {Modal, View} from 'react-native';
import Spinner from 'react-native-spinkit';
import {whitesmoke} from 'color-name';
import {useSelector} from 'react-redux';
import {height, iconSizes} from './../../constants/sizes';
import ImageLoaderContainer from '../widgets/ImageLoaderContainer';

const LoadingContainer = () => {
  const {settings, isLoading, bootStrapped} = useSelector(state => state);

  useEffect(() => {}, [isLoading]);

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'whitesmoke',
        height,
      }}>
      <Modal visible={isLoading && bootStrapped} transparent={true}>
        <View style={{backgroundColor: 'rgba(255,255,255,0.5', flex: 1}}>
          <ImageLoaderContainer
            img={settings.logo}
            style={{width: 100, height: 100, margin: 20}}
            resizeMode="contain"
          />
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
