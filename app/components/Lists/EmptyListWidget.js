import React, {useContext, Fragment} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {text, width} from '../../constants/sizes';
import {Button} from 'react-native-elements';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import LottieView from 'lottie-react-native';
import {adjustColor} from '../../helpers';
import {images} from '../../constants/images';

const EmptyListWidget = ({emptyImage = null, emptyAnimation = null, title}) => {
  const {colors} = useContext(GlobalValuesContext);
  return (
    <View style={styles.emptyCaseBtn}>
      {emptyImage ? (
        <Image
          source={images[`${emptyImage}`]}
          style={{width, height: width}}
          resizeMode="cover"
        />
      ) : (
        <Fragment>
          {emptyAnimation && (
            <LottieView
              source={emptyAnimation}
              autoPlay
              loop
              resizeMode="contain"
              style={{
                alignSelf: 'center',
                width: width / 1.5,
                height: width / 1.5,
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
          {title && (
            <Button
              raised
              title={title}
              type="outline"
              buttonStyle={{
                width: width - 50,
                borderColor: adjustColor(colors.btn_bg_theme_color, 50),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: adjustColor(colors.icon_theme_color, 50),
              }}
              titleStyle={{
                fontFamily: text.font,
                color: adjustColor(colors.btn_bg_theme_color, 80),
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          )}
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
    width,
    marginTop: '10%',
    alignSelf: 'center',
  },
});
