import React, {useContext, useCallback, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, FlatList} from 'react-native';
import Modal from 'react-native-modal';
import {hideCountryModal, chooseCountry} from '../../redux/actions';
import {text, width, height, iconSizes} from '../../constants/sizes';
import {Icon} from 'react-native-elements';
import I18n from './../../I18n';
import PropTypes from 'prop-types';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import ImageLoaderContainer from '../widgets/ImageLoaderContainer';
import {useDispatch, useSelector} from 'react-redux';
import {isIOS} from '../../constants';
import {animations} from '../../constants/animations';
import {EXPO} from './../../../app';
import {View as Animated} from 'react-native-animatable';
import {shuffle, first} from 'lodash';
import {themeColors} from '../../constants/colors';

const CountriesList = () => {
  const {countryModal, country, countries} = useSelector(state => state);
  const dispatch = useDispatch();

  const handleClick = c => {
    // if (c.id !== country.id) {
    dispatch(chooseCountry({country: c, redirect: false}));
    // }
  };

  const hide = () => dispatch(hideCountryModal());

  // useEffect(() => {}, [countryModal]);

  const renderItem = ({item, index}) => {
    return (
      <Animated
        animation={animations.pulse}
        easing="ease-out"
        useNativeDriver={true}>
        <TouchableOpacity
          activeOpacity={1}
          key={index}
          hitSlop={{left: 15, right: 15}}
          onPress={() => handleClick(item)}
          style={[styles.wrapper]}>
          <ImageLoaderContainer
            img={item.thumb}
            style={styles.countryFlag}
            resizeMode={isIOS ? 'cover' : 'stretch'}
          />
          <Text style={styles.phoneNo}>{item.slug}</Text>
        </TouchableOpacity>
      </Animated>
    );
  };

  return (
    <View>
      <Modal
        isVisible={countryModal}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        animationIn="slideInUp"
        style={{margin: 0}}
        deviceWidth={width}
        deviceHeight={height}>
        <View style={[styles.container, {backgroundColor: 'white'}]}>
          <View
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentInset={{bottom: 150}}
            contentContainerStyle={{
              backgroundColor: 'green',
              alignSelf: 'center',
              margin: 0,
              padding: 0,
            }}>
            <View style={styles.titleContainer}>
              <Text style={[styles.phoneNo, {fontSize: text.medium}]}>
                {I18n.t('choose_country')}
              </Text>
              <Icon
                name="close"
                type="evilicon"
                size={iconSizes.smaller}
                containerStyle={{
                  position: 'absolute',
                  top: 5,
                  padding: 10,
                  right: 35,
                  backgroundColor: 'white',
                }}
                onPress={() => hide()}
                hitSlop={{
                  top: iconSizes.large,
                  bottom: iconSizes.large,
                  left: iconSizes.large,
                  right: iconSizes.large,
                }}
              />
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              numColumns={3}
              columnWrapperStyle={{alignSelf: 'center'}}
              contentContainerStyle={{
                minHeight: height / 2.2,
                width: '100%',
                alignSelf: 'center',
                backgroundColor: 'white',
              }}
              data={countries}
              renderItem={renderItem}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CountriesList;

CountriesList.propTypes = {};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: height / 2,
    bottom: 0,
    width,
    padding: 5,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#cdcdcd',
    paddingBottom: 50,
  },
  wrapper: {
    borderWidth: 0.5,
    borderColor: themeColors.desinerat.darkGray,
    borderRadius: 10,
    width: '30%',
    minWidth: 100,
    height: 100,
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    alignItems: 'center',
    alignSelf: 'center',
    margin: 5,
  },
  phoneNo: {
    fontFamily: text.font,
    fontSize: text.smaller,
    textAlign: 'center',
  },
  countryFlag: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
  },
});
