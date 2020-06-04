import React, {Fragment, useEffect} from 'react';
import {ImageBackground} from 'react-native';
import {height, width} from '../../constants/sizes';
import AndroidBackHandlerComponent from './AndroidBackHandlerComponent';
import AppHomeConfigComponent from './AppHomeConfigComponent';
import AppGlobalConfig from './AppGlobalConfig';
import {useSelector} from 'react-redux';
import LoadingView from '../Loading/LoadingView';
import LoadingOfflineView from '../Loading/LoadingOfflineView';

const BgContainer = ({children, showImage = true}) => {
  const {
    settings,
    isLoading,
    isConnected,
    isLoadingContent,
    isLoadingProfile,
    isLoadingBoxedList,
  } = useSelector((state) => state);

  if (__DEV__) {
    console.log('BgContainer rendered');
  }
  useEffect(() => {}, []);

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
      {isConnected ? (
        isLoading ||
        isLoadingProfile ||
        isLoadingContent ||
        isLoadingBoxedList ? (
          <LoadingView />
        ) : (
          <Fragment>{children}</Fragment>
        )
      ) : (
        <LoadingOfflineView />
      )}
      <AndroidBackHandlerComponent />
      <AppHomeConfigComponent />
      <AppGlobalConfig />
    </ImageBackground>
  );
};

export default BgContainer;
