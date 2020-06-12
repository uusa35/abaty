import React, {Fragment, useState, useMemo, useContext} from 'react';
import {ImageBackground, SafeAreaView} from 'react-native';
import {height, width} from '../../constants/sizes';
import {images} from '../../constants/images';
import AndroidBackHandlerComponent from './AndroidBackHandlerComponent';
import AppGlobalConfig from './AppGlobalConfig';
import {useSelector} from 'react-redux';
import LoadingView from '../Loading/LoadingView';
import LoadingOfflineView from '../Loading/LoadingOfflineView';
import {isNull} from 'lodash';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';

const BgContainer = ({children, showImage = true, img = images.whiteBgUrl}) => {
  const {
    isLoading,
    isConnected,
    isLoadingContent,
    isLoadingProfile,
    isLoadingBoxedList,
  } = useSelector((state) => state);
  const {mainBg} = useContext(GlobalValuesContext);
  const [currentLoading, setCurrentLoading] = useState(
    isLoading || isLoadingProfile || isLoadingContent || isLoadingBoxedList,
  );
  const [bg, setBg] = useState(
    !showImage ? images.whiteBg : !isNull(mainBg) ? mainBg : img,
  );

  useMemo(() => {
    setCurrentLoading(
      isLoading || isLoadingProfile || isLoadingContent || isLoadingBoxedList,
    );
  }, [isLoading, isLoadingBoxedList, isLoadingProfile, isLoadingContent]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={img.includes('http') ? {uri: img} : img}
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
