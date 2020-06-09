import React, {Fragment, useState, useMemo} from 'react';
import {ImageBackground, SafeAreaView} from 'react-native';
import {height, width} from '../../constants/sizes';
import {images} from '../../constants/images';
import AndroidBackHandlerComponent from './AndroidBackHandlerComponent';
import AppGlobalConfig from './AppGlobalConfig';
import {useSelector} from 'react-redux';
import LoadingView from '../Loading/LoadingView';
import LoadingOfflineView from '../Loading/LoadingOfflineView';
import {isNull} from 'lodash';

const BgContainer = ({
  children,
  showImage = true,
  img = 'https://via.placeholder.com/100/fffffff/fffffff?text=text',
}) => {
  const {
    settings,
    isLoading,
    isConnected,
    isLoadingContent,
    isLoadingProfile,
    isLoadingBoxedList,
  } = useSelector((state) => state);
  const [currentLoading, setCurrentLoading] = useState(
    isLoading || isLoadingProfile || isLoadingContent || isLoadingBoxedList,
  );

  useMemo(() => {
    setCurrentLoading(
      isLoading || isLoadingProfile || isLoadingContent || isLoadingBoxedList,
    );
  }, [isLoading, isLoadingBoxedList, isLoadingProfile, isLoadingContent]);

  if (__DEV__) {
    console.log('BgContainer rendered');
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={
          !showImage
            ? images.whiteBg
            : {uri: isNull(img) ? settings.menu_bg : img}
        }
        style={{height, width, backgroundColor: 'white', flexGrow: 1, flex: 1}}
        resizeMode="cover">
        {isConnected ? (
          currentLoading ? (
            <LoadingView />
          ) : (
            <Fragment>{children}</Fragment>
          )
        ) : (
          <LoadingOfflineView />
        )}
        <AndroidBackHandlerComponent />
        <AppGlobalConfig />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default BgContainer;
