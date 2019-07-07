import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Button, Text} from 'react-native-elements';
import {images, text, width} from '../../constants';
import {getCategoryElements} from '../../redux/actions';
import {DispatchContext} from '../../redux/DispatchContext';
import PropTypes from 'prop-types';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';

const CategoryWidget = ({category, columns}) => {
  const {dispatch} = useContext(DispatchContext);
  const {colors} = useContext(GlobalValuesContext);
  return (
    <View style={{marginTop: '5%'}}>
      <TouchableOpacity
        key={category.id}
        style={[
          styles.categoriesContainer,
          // {width: columns ? 120 : width - 40, height: columns ? 250 : 300}
          {width: width - 40, height: 250}
        ]}
        onPress={() => dispatch(getCategoryElements(category))}>
        <FastImage
          style={styles.mainCategoryBg}
          resizeMode={columns ? 'stretch' : 'cover'}
          source={{uri: category.thumb}}
          loadingIndicatorSource={images.logo}
        />
        <Button
          onPress={() => dispatch(getCategoryElements(category))}
          raised
          containerStyle={{width: '70%', marginBottom: 10, marginTop: 10}}
          buttonStyle={{backgroundColor: colors.btn_bg_theme_color}}
          title={category.name}
          titleStyle={{
            fontFamily: text.font,
            color: colors.btn_text_theme_color
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(CategoryWidget);

CategoryWidget.propTypes = {
  category: PropTypes.object,
  columns: PropTypes.number
};

const styles = StyleSheet.create({
  categoriesContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 20
  },
  mainCategoryBg: {
    width: '100%',
    height: '90%'
  },
  categoryName: {
    fontFamily: text.font,
    fontSize: text.small,
    textAlign: 'center',
    marginTop: '2%'
  }
});
