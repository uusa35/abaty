import React, {useContext} from 'react';
import {
  I18nManager,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';
import {map} from 'lodash';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import {NavContext} from '../../redux/NavContext';
import {Icon} from 'react-native-elements';
import {images} from '../../constants';
import TagWidget from './product/TagWidget';

const ImagesWidget = ({
  main,
  elements,
  name,
  exclusive,
  isOnSale,
  isReallyHot,
  showLabels = true,
  height = 200,
  width = 200
}) => {
  const {navigation} = useContext(NavContext);
  console.log('main', main);
  return (
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
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  }
});
