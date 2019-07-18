import React, {useContext} from 'react';
import {
  I18nManager,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
  Text
} from 'react-native';
import {map} from 'lodash';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import {NavContext} from '../../redux/NavContext';
import {Icon} from 'react-native-elements';
import {images, text} from '../../constants';
import TagWidget from './product/TagWidget';
import I18n from '../../I18n';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';

const ImagesWidget = ({
  elements,
  name,
  exclusive,
  isOnSale,
  isReallyHot,
  showLabels = true,
  showTitle = false,
  height = 200,
  width = 200
}) => {
  const {navigation} = useContext(NavContext);
  const {colors} = useContext(GlobalValuesContext);
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
                height: 1
              },
              shadowOpacity: 0.18,
              shadowRadius: 1.0,
              elevation: 1
            }}>
            {I18n.t('user_gallery')}
          </Text>
        ) : null}
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row'}}>
        {map(elements, (c, i) => (
          <TouchableOpacity
            key={i}
            style={{margin: 1}}
            onPress={() =>
              navigation.navigate('ImageZoom', {
                images: elements,
                name,
                index: i
              })
            }>
            <ImageBackground
              source={{
                uri: c.large
              }}
              imageStyle={styles.imageStyling}
              loadingIndicatorSource={images.logo}
              style={{width, height}}
              resizeMode="cover">
              {showLabels && i === 0 ? (
                <View style={{flex: 1, padding: 20}}>
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

export default React.memo(ImagesWidget);

ImagesWidget.propTypes = {
  elements: PropTypes.array.isRequired
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 180
  },
  imageStyling: {
    // borderTopRightRadius: 10,
    // borderTopLeftRadius: 10
  }
});
