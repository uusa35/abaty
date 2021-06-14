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
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  bottomContentInset,
  iconSizes,
  text,
  touchOpacity,
} from '../../constants/sizes';
import {images} from '../../constants/images';
import TagWidget from './TagWidget';
import I18n from '../../I18n';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import ImageLoaderContainer from './ImageLoaderContainer';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

const ImagesGridWidget = ({
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
  navigation,
}) => {
  const {colors} = useContext(GlobalValuesContext);
  const {navigate} = useNavigation();
  const [imageLoading, setImageLoading] = useState(true);

  const handleClick = item => {
    navigate('ImageZoom', {
      images: elements,
      name,
      index: item.index,
    });
  };
  return (
    <View
      style={{
        borderWidth: 0.5,
        borderColor: 'lightgrey',
        padding: 10,
        borderRadius: 5,
        marginBottom: '2%',
        marginTop: '2%',
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View>
        {showTitle ? (
          <Text
            style={{
              fontFamily: text.font,
              fontSize: text.large,
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
        horizontal={false}
        alwaysBounceVertical={false}
        alwaysBounceHorizontal={false}
        showsHorizontalScrollIndicator={false}
        snapToInterval={width + 10}
        bounces={true}
        disableIntervalMomentum={true}
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        contentInset={{bottom: bottomContentInset}}
        style={{paddingBottom: bottomContentInset}}
        numColumns={3}
        scrollEnabled={false}
        data={elements}
        renderItem={item => (
          <TouchableOpacity
            activeOpacity={touchOpacity}
            key={item.index}
            onPress={() => handleClick(item)}>
            <ImageBackground
              source={images.loading}
              style={{width, height, margin: 3}}
              resizeMode={'center'}>
              <Fragment>
                <ImageLoaderContainer
                  img={item.item.large}
                  style={{
                    width,
                    height,
                    marginRight: 3,
                    marginLeft: 3,
                    alignSelf: 'center',
                  }}
                  resizeMode={resizeMode}
                />
                {showLabels && item.index === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      padding: 20,
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                    }}>
                    {qr ? (
                      <FastImage
                        source={qr}
                        style={{
                          width: 80,
                          height: 80,
                          marginTop: 10,
                          marginBottom: 10,
                        }}
                      />
                    ) : null}
                    {isFeatured ? <TagWidget tagName="featured" /> : null}
                    {exclusive ? <TagWidget tagName="exclusive" /> : null}
                    {isOnSale ? (
                      <TagWidget tagName="under_sale" bgColor="red" />
                    ) : null}
                    {isReallyHot ? <TagWidget tagName="hot_deal" /> : null}
                    {sku ? (
                      <TagWidget tagName={sku} sku={sku} bgColor="black" />
                    ) : null}
                    {!hasStock ? (
                      <TagWidget tagName="out_of_stock" bgColor="red" />
                    ) : null}
                  </View>
                ) : null}
              </Fragment>
            </ImageBackground>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ImagesGridWidget;

ImagesGridWidget.propTypes = {
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
