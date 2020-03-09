import React, {useContext} from 'react';
import {
  I18nManager,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {map} from 'lodash';
import PropTypes from 'prop-types';
import {text, touchOpacity} from '../../constants/sizes';
import {images} from '../../constants/images';
import TagWidget from './TagWidget';
import I18n from '../../I18n';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import {useNavigation} from 'react-navigation-hooks';

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
}) => {
  const {colors} = useContext(GlobalValuesContext);
  const {navigate} = useNavigation();
  return (
    <View style={{flex: 1}}>
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
      <ScrollView
        horizontal={true}
        alwaysBounceVertical={false}
        alwaysBounceHorizontal={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{height: height}}
        style={{flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row'}}>
        {map(elements, (c, i) => (
          <TouchableOpacity
            activeOpacity={touchOpacity}
            key={i}
            onPress={() =>
              navigate('ImageZoom', {
                images: elements,
                name,
                index: i,
              })
            }>
            <ImageBackground
              source={{
                uri: c.large,
              }}
              loadingIndicatorSource={images.logo}
              style={{width, height}}
              resizeMode={resizeMode}>
              {showLabels && i === 0 ? (
                <View
                  style={{
                    flex: 1,
                    padding: 20,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  }}>
                  {isFeatured ? <TagWidget tagName="featured" /> : null}
                  {exclusive ? <TagWidget tagName="exclusive" /> : null}
                  {isOnSale ? (
                    <TagWidget tagName="under_sale" bgColor="red" />
                  ) : null}
                  {isReallyHot ? <TagWidget tagName="hot_deal" /> : null}
                </View>
              ) : null}
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
