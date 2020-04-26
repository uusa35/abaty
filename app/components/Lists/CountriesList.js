import React, {useState, useContext, useCallback} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
// import Modal from 'react-native-modal';
import {map, first} from 'lodash';
import {hideCountryModal, setArea, setCountry} from '../../redux/actions';
import {DispatchContext} from '../../redux/DispatchContext';
import {text, width} from '../../constants/sizes';
import {images} from '../../constants/images';
import FastImage from 'react-native-fast-image';
import {Icon} from 'react-native-elements';
import I18n from './../../I18n';
import PropTypes from 'prop-types';

const CountriesList = ({country, countries, countryModal}) => {
  const {dispatch} = useContext(DispatchContext);
  [visible, setVisible] = useState(countryModal);
  [currentCountry, setCurrentCountry] = useState(country);
  [currentCurrency, setCurrentCurrency] = useState(country.currency.symbol);

  const handleClick = useCallback(country => {
    dispatch(setCountry(country));
  });

  return (
    <Modal
      transparent={true}
      visible={countryModal}
      animationType={'slide'}
      // presentationStyle="formSheet"
      onRequestClose={() => setVisible(false)}>
      <View style={styles.container}>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.titleContainer}>
            <Text style={[styles.phoneNo, {fontSize: text.medium}]}>
              {I18n.t('choose_country')}
            </Text>
            <Icon
              name="close"
              type="evil-icons"
              // type="ionicon"
              size={20}
              containerStyle={{position: 'absolute', top: 5, right: 5}}
              onPress={() => dispatch(hideCountryModal())}
              hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
            {map(countries, (country, i) => {
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  key={country.id}
                  hitSlop={{left: 15, right: 15}}
                  onPress={() => handleClick(country)}
                  style={styles.wrapper}>
                  <FastImage
                    source={{uri: country.thumb}}
                    style={styles.countryFlag}
                    resizeMode="cover"
                    loadingIndicatorSource={images.logo}
                  />
                  <Text style={styles.phoneNo}>{country.slug}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </Modal>
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
    bottom: 0,
    width,
    backgroundColor: '#ffffff',
    padding: 5,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#cdcdcd',
    paddingBottom: 50,
  },
  wrapper: {
    borderWidth: 0.5,
    borderColor: '#cdcdcd',
    borderRadius: 10,
    width: '30%',
    height: 100,
    justifyContent: 'space-evenly',
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
