import React, {useContext, Fragment} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {text, width} from '../../constants/sizes';
import {Button} from 'react-native-elements';
import I18n from '../../I18n';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import ImageLoaderContainer from '../widgets/ImageLoaderContainer';
import {EXPO} from '../../../app';
import {animations} from '../../constants/animations';
import LottieView from 'lottie-react-native';
import {adjustColor} from '../../helpers';

const EmptyListWidget = ({emptyImage = null, emptyAnimation = null, title}) => {
  const {colors} = useContext(GlobalValuesContext);
  return (
    <View style={styles.emptyCaseBtn}>
      {emptyImage ? (
        <ImageLoaderContainer
          img={emptyImage}
          style={{width, height: width}}
          resizeMode="contain"
        />
      ) : (
        <Fragment>
          {emptyAnimation && (
            <LottieView
              source={emptyAnimation}
              autoPlay
              loop
              resizeMode="cover"
              style={{
                alignSelf: 'center',
                width: width / 3,
                height: width / 3,
              }}
              colorFilters={[
                {
                  keypath: 'Folder Front 3',
                  color: adjustColor(colors.btn_bg_theme_color, 250),
                },
                {
                  keypath: 'Folder back 2',
                  color: adjustColor(colors.btn_bg_theme_color, 250),
                },
              ]}
              enableMergePathsAndroidForKitKatAndAbove
            />
          )}
          <Button
            raised
            title={title}
            type="outline"
            buttonStyle={{
              width: width - 50,
              borderColor: adjustColor(colors.btn_bg_theme_color, 100),
              justifyContent: 'center',
              alignItems: 'center',
            }}
            titleStyle={{
              fontFamily: text.font,
              color: adjustColor(colors.btn_bg_theme_color, 100),
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </Fragment>
      )}
    </View>
  );
};

export default EmptyListWidget;

const styles = StyleSheet.create({
  emptyCaseBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: '50%',
    alignSelf: 'center',
  },
});
