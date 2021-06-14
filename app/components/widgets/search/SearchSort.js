import React, {Fragment, useCallback, useContext} from 'react';
import {TouchableOpacity, Text, Modal, View, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import I18n from '../../../I18n';
import {iconSizes, text} from '../../../constants/sizes';
import {showClassifiedFilter, showProductFilter} from '../../../redux/actions';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {themeColors} from '../../../constants/colors';
import FastImage from 'react-native-fast-image';
import {icons} from '../../../constants/images';
import widgetStyles from '../widgetStyles';
const SearchSort = ({
  showProductsFilter = false,
  showClassifiedsFilter = false,
  setSortModal,
}) => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        flex: 1,
        borderWidth: 1,
        borderColor: themeColors.desinerat.darkGray,
        height: 60,
      }}>
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          borderLeftWidth: 1,
          borderLeftColor: themeColors.desinerat.darkGray,
        }}
        onPress={() => setSortModal(true)}>
        <Icon type="entypo" name="select-arrows" size={iconSizes.smaller} />
        <Text style={widgetStyles.headerFour}>{I18n.t('sort')}</Text>
      </TouchableOpacity>
      {showProductsFilter && (
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            borderLeftWidth: 1,
            borderLeftColor: themeColors.desinerat.darkGray,
          }}
          onPress={() =>
            dispatch(
              showProductFilter({
                showModal: true,
                showColor: false,
                showSize: true,
              }),
            )
          }>
          <FastImage
            source={icons.categoryFilter}
            style={{width: iconSizes.smaller, height: iconSizes.smaller}}
          />
          <Text style={widgetStyles.headerFour}>
            {I18n.t('category_filter')}
          </Text>
        </TouchableOpacity>
      )}
      {showProductsFilter && (
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            borderLeftWidth: 1,
            borderLeftColor: themeColors.desinerat.darkGray,
          }}
          onPress={() =>
            dispatch(
              showProductFilter({
                showModal: true,
                showColor: true,
                showSize: false,
              }),
            )
          }>
          <FastImage
            source={icons.colorFilter}
            style={{width: iconSizes.smaller, height: iconSizes.smaller}}
          />
          <Text style={widgetStyles.headerFour}>{I18n.t('color_filter')}</Text>
        </TouchableOpacity>
      )}
      {showClassifiedsFilter && (
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => navigate('ClassifiedFilterModal')}>
          <Icon type="antdesign" name="filter" size={iconSizes.smaller} />
          <Text style={styles.btnTitle}>{I18n.t('filter')}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchSort;

const styles = StyleSheet.create({
  sortModalContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    padding: 10,
    paddingTop: 15,
  },
  wrapper: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    backgroundColor: 'white',
    paddingTop: 15,
    height: 50,
  },
  phoneNo: {
    fontFamily: text.font,
    fontSize: text.large,
    paddingLeft: 20,
    margin: 0,
    padding: 0,
    textAlign: 'center',
  },
  countryFlag: {
    width: 45,
    height: 25,
    marginLeft: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    padding: 15,
  },
  btnTitle: {
    fontFamily: text.font,
    fontSize: text.small,
    paddingLeft: 15,
    paddingRight: 15,
  },
  btnStyle: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderRadius: 4,
    flex: 1,
    minHeight: 40,
    borderColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 4,
    marginRight: 4,
    shadowColor: 'black',
    shadowOffset: {
      width: 0.1,
      height: 0.2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.0,
    elevation: 1,
  },
});
