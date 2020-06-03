import React from 'react';
import {ImageBackground} from 'react-native';
import {height, width} from '../../constants/sizes';
import LoadingContainer from './../Loading/LoadingContainer';
import AndroidBackHandlerComponent from './AndroidBackHandlerComponent';
import AppHomeConfigComponent from './AppHomeConfigComponent';
import AppGlobalConfig from './AppGlobalConfig';
import {useSelector} from 'react-redux';

const BgContainer = ({children, showImage = true}) => {
  const {settings, isLoading} = useSelector((state) => state);
  return (
    <ImageBackground
      source={{
        uri:
          showImage && settings.menu_bg
            ? settings.menu_bg
            : 'http://placehold.it/10/FFFFFF/FFFFFF',
      }}
      style={{height, width, backgroundColor: 'white', flexGrow: 1, flex: 1}}
      resizeMode="cover">
      <LoadingContainer isLoading={isLoading} />
      <AndroidBackHandlerComponent />
      <AppHomeConfigComponent />
      <AppGlobalConfig />
      {children}
    </ImageBackground>
  );
};

export default BgContainer;
