import React, {useContext} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {map} from 'lodash';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import {getCategoryElements, getSearchProducts} from '../../redux/actions';
import {DispatchContext} from '../../redux/DispatchContext';
import I18n, {isRTL} from './../../I18n';
import {Icon} from 'react-native-elements';
import widgetStyles from './widgetStyles';
import {NavContext} from '../../redux/NavContext';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import {images} from '../../constants';

const CategoryHorizontalWidget = ({elements, showName, title}) => {
  const {dispatch} = useContext(DispatchContext);
  const {navigation} = useContext(NavContext);
  const {colors} = useContext(GlobalValuesContext);
  return (
    <View style={[widgetStyles.container, {backgroundColor: '#FAFAFA'}]}>
      <TouchableOpacity
        style={widgetStyles.titleContainer}
        onPress={() => navigation.navigate('CategoryIndex')}>
        <View style={widgetStyles.titleWrapper}>
          <Text
            style={[
              widgetStyles.title,
              {color: colors.header_one_theme_color}
            ]}>
            {I18n.t(title)}
          </Text>
        </View>
        <Icon
          type="entypo"
          name={isRTL ? 'chevron-thin-left' : 'chevron-thin-right'}
          size={20}
          color={colors.header_one_theme_color}
        />
      </TouchableOpacity>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={widgetStyles.wrapper}>
        {map(elements, (c, i) => (
          <TouchableOpacity
            key={i}
            style={widgetStyles.btnStyle}
            onPress={() =>
              dispatch(
                getSearchProducts({
                  element: c,
                  category: c,
                  searchElements: {product_category_id: c.id}
                })
              )
            }>
            <FastImage
              source={{
                uri: c.thumb,
                priority: FastImage.priority.normal
              }}
              loadingIndicatorSource={images.logo}
              style={styles.image}
              resizeMode="cover"
            />
            {showName ? (
              <Text
                style={[
                  widgetStyles.elementName,
                  {color: colors.header_tow_theme_color}
                ]}>
                {c.name}
              </Text>
            ) : null}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default React.memo(CategoryHorizontalWidget);

CategoryHorizontalWidget.propTypes = {
  elements: PropTypes.array.isRequired,
  showName: PropTypes.bool
};

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150
  }
});
