import React, {useContext, useState, Fragment} from 'react';
import {
  I18nManager,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import {text, touchOpacity} from '../../constants/sizes';
import {images} from '../../constants/images';
import TagWidget from './TagWidget';
import I18n from '../../I18n';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import ImageLoaderContainer from './ImageLoaderContainer';
import {HOMEKEY} from './../../../app';
import {adjustColor} from '../../helpers';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

const ImagesWidget = ({
  elements,
  name,
  exclusive,
  isOnSale,
  isReallyHot,
  isFeatured = false,
  showLabels = true,
  showTitle = false,
  height = 200,
  width = 200,
  resizeMode = 'cover',
  sku = null,
  qr = null,
  hasStock = true,
  directPurchase = false,
}) => {
  const {colors} = useContext(GlobalValuesContext);
  const {navigate} = useNavigation();
  const [imageLoading, setImageLoading] = useState(true);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View>
        {showTitle ? (
          <Text
            style={{
              fontFamily: text.font,
              fontSize: text.large,
              marginBottom: 10,
              textAlign: 'left',
              color: colors.header_one_theme_color,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.18,
              shadowRadius: 1.0,
              elevation: 1,
            }}>
            {I18n.t('user_gallery')}
          </Text>
        ) : null}
      </View>
      <FlatList
        horizontal={true}
        alwaysBounceVertical={false}
        alwaysBounceHorizontal={false}
        showsHorizontalScrollIndicator={false}
        snapToInterval={+width + 10}
        bounces={true}
        disableIntervalMomentum={true}
        contentContainerStyle={{height: height}}
        style={{flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row'}}
        numColumns={1}
        scrollEnabled={true}
        data={elements}
        renderItem={({index, item}) => (
          <TouchableOpacity
            activeOpacity={touchOpacity}
            key={index}
            onPress={() =>
              navigate('ImageZoom', {
                images: elements,
                name,
                index: index,
              })
            }>
            <ImageBackground
              source={images.loading}
              onLoadEnd={() => setImageLoading(false)}
              style={{width, height}}
              resizeMode={'cover'}>
              <ImageLoaderContainer
                img={item.large}
                resizeMode="cover"
                style={{width, height, position: 'absolute', top: 0}}
              />
              {showLabels && index === 0 ? (
                <View
                  style={{
                    flex: 1,
                    padding: 20,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  }}>
                  {qr ? (
                    <ImageLoaderContainer
                      img={qr}
                      resizeMode="contain"
                      style={{
                        width: 120,
                        height: 120,
                        marginTop: 10,
                        marginBottom: 10,
                        opacity: HOMEKEY ? 0.5 : 1,
                      }}
                    />
                  ) : null}
                  {isFeatured && <TagWidget tagName="featured" />}
                  {exclusive && <TagWidget tagName="exclusive" />}
                  {isOnSale && <TagWidget tagName="under_sale" bgColor="red" />}
                  {isReallyHot && <TagWidget tagName="hot_deal" />}
                  {sku && <TagWidget tagName={sku} sku={sku} bgColor="black" />}
                  {!hasStock && (
                    <TagWidget tagName="out_of_stock" bgColor="red" />
                  )}
                  {directPurchase && (
                    <TagWidget
                      tagName="direct_purchase"
                      bgColor={adjustColor(colors.btn_bg_theme_color, 1)}
                    />
                  )}
                </View>
              ) : null}
            </ImageBackground>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ImagesWidget;

ImagesWidget.propTypes = {
  elements: PropTypes.array.isRequired,
  height: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 180,
  },
  imageStyling: {
    // borderTopRightRadius: 10,
    // borderTopLeftRadius: 10
  },
});
