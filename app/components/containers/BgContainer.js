import React, {Fragment, useState, useMemo, useContext, useEffect} from 'react';
import {ImageBackground, SafeAreaView, View} from 'react-native';
import {height, width} from '../../constants/sizes';
import {images} from '../../constants/images';
import AndroidBackHandlerComponent from './AndroidBackHandlerComponent';
import AppGlobalConfig from './AppGlobalConfig';
import {useSelector} from 'react-redux';
import LoadingView from '../Loading/LoadingView';
import LoadingOfflineView from '../Loading/LoadingOfflineView';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import {useNavigation} from 'react-navigation-hooks';
import AppHomeConfigComponent from './AppHomeConfigComponent';

const BgContainer = ({
  children,
  showImage = true,
  img = images.whiteBgUrl,
  enableMargin = false,
  marginVal = height / 30,
}) => {
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
    !showImage ? images.whiteBg : mainBg.includes('.') ? mainBg : img,
  );

  useMemo(() => {
    setCurrentLoading(
      isLoading || isLoadingProfile || isLoadingContent || isLoadingBoxedList,
    );
  }, [isLoading, isLoadingBoxedList, isLoadingProfile, isLoadingContent]);

  return (
    <ImageBackground
      source={!showImage ? images.whiteBg : {uri: bg}}
      style={{height, width, backgroundColor: 'white', flexGrow: 1, flex: 1}}
      resizeMode="cover">
      {isConnected ? (
        currentLoading ? (
          <LoadingView />
        ) : (
          <View style={{flex: 1, paddingTop: enableMargin ? marginVal : 0}}>
            {children}
          </View>
        )
      ) : (
        <LoadingOfflineView />
      )}
      <AndroidBackHandlerComponent />
      <AppGlobalConfig />
      <AppHomeConfigComponent />
    </ImageBackground>
  );
};

export default BgContainer;
