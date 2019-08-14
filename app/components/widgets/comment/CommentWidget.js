import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Button, Text} from 'react-native-elements';
import {images, text, width} from '../../../constants';
import {getCategoryElements, getSearchProducts} from '../../../redux/actions';
import {DispatchContext} from '../../../redux/DispatchContext';
import PropTypes from 'prop-types';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';

const CommentWidget = ({element, columns, showBtn = false}) => {
  const {dispatch} = useContext(DispatchContext);
  const {colors} = useContext(GlobalValuesContext);
  return (
    <View>
      <TouchableOpacity
        key={element.id}
        style={[
          styles.categoriesContainer,
          // {width: columns ? 120 : width - 40, height: columns ? 250 : 300}
          {width: '100%'}
        ]}
        onPress={() => console.log('pressed')}>
        <FastImage
          style={{width: width, height: 400}}
          resizeMode="cover"
          source={{uri: element.large}}
          loadingIndicatorSource={images.logo}
        />
        {showBtn ? (
          <Button
            onPress={() =>
              dispatch(
                getSearchProducts({
                  element,
                  searchElements: {product_category_id: element.id}
                })
              )
            }
            raised
            containerStyle={{width: '70%', marginBottom: 10, marginTop: 10}}
            buttonStyle={{backgroundColor: colors.btn_bg_theme_color}}
            title={element.name}
            titleStyle={{
              fontFamily: text.font,
              color: colors.btn_text_theme_color
            }}
          />
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(CommentWidget);

CommentWidget.propTypes = {
  element: PropTypes.object,
  columns: PropTypes.number
};

const styles = StyleSheet.create({
  categoriesContainer: {
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  mainCategoryBg: {
    width: '100%',
    height: '100%'
  },
  categoryName: {
    fontFamily: text.font,
    fontSize: text.small,
    textAlign: 'center'
  }
});
