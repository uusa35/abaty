import React, {useState, useContext, useCallback, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {map} from 'lodash';
import {hideCountryModal, chooseCountry} from '../../redux/actions';
import {text, width, height, iconSizes} from '../../constants/sizes';
import {Icon} from 'react-native-elements';
import I18n from './../../I18n';
import PropTypes from 'prop-types';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import ImageLoaderContainer from '../widgets/ImageLoaderContainer';
import {useDispatch, useSelector} from 'react-redux';
import {isIOS} from '../../constants';
import {EXPO} from './../../../app';

const CountriesList = ({country, countries}) => {
  const {countryModal} = useSelector((state) => state);
  const dispatch = useDispatch();
  const {colors} = useContext(GlobalValuesContext);

  const handleClick = useCallback((c) => {
    if (c.id !== country.id) {
      dispatch(chooseCountry({country: c, redirect: EXPO}));
    }
  });

  const hide = () => dispatch(hideCountryModal());

  useEffect(() => {}, [countryModal]);

  return (
    <View>
      <Modal
        isVisible={countryModal}
        useNativeDriver={isIOS}
        hideModalContentWhileAnimating={true}
        animationIn="slideInUp"
        style={{margin: 0}}
        deviceWidth={width}
        deviceHeight={height}>
        <View style={[styles.container, {backgroundColor: 'white'}]}>
          <ScrollView
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentInset={{bottom: 150}}
            contentContainerStyle={{
              backgroundColor: 'white',
              width,
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
                containerStyle={{position: 'absolute', top: 5, right: 35}}
                onPress={() => hide()}
                hitSlop={{
                  top: iconSizes.large,
                  bottom: iconSizes.large,
                  left: iconSizes.large,
                  right: iconSizes.large,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                // backgroundColor: 'white',
              }}>
              {map(countries, (c, i) => {
                return (
                  <TouchableOpacity
                    activeOpacity={1}
                    key={c.id}
                    hitSlop={{left: 15, right: 15}}
                    onPress={() => handleClick(c)}
                    style={[
                      styles.wrapper,
                      {
                        borderColor:
                          c.id === country.id
                            ? colors.btn_bg_theme_color
                            : '#cdcdcd',
                      },
                    ]}>
                    <ImageLoaderContainer
                      img={c.thumb}
                      style={styles.countryFlag}
                      resizeMode={isIOS ? 'stretch' : 'cover'}
                    />
                    <Text style={styles.phoneNo}>{c.slug}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default CountriesList;

CountriesList.propTypes = {
  country: PropTypes.object.isRequired,
  countries: PropTypes.array.isRequired,
  countryModal: PropTypes.bool.isRequired,
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: height / 2.5,
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
    borderRadius: 10,
    width: '30%',
    height: 100,
    justifyContent: 'space-evenly',
    // backgroundColor: 'white',
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
    padding: 15,
  },
});
