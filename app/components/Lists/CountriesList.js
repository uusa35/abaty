import React, {useState, useContext, useMemo, useCallback, A} from 'react';
import {
  View,
  ScrollView,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {map} from 'lodash';
import {
  hideCountryModal,
  setArea,
  setCountry,
  showAreaModal,
} from '../../redux/actions';
import {DispatchContext} from '../../redux/DispatchContext';
import {images, text} from '../../constants';
import FastImage from 'react-native-fast-image';
import {Icon} from 'react-native-elements';
import I18n from './../../I18n';
import PropTypes from 'prop-types';
import validate from 'validate.js';

const CountriesList = ({country, countries, countryModal}) => {
  const {dispatch} = useContext(DispatchContext);
  [visible, setVisible] = useState(countryModal);
  [currentCountry, setCurrentCountry] = useState(country);
  [currentCurrency, setCurrentCurrency] = useState(country.currency.symbol);

  const handleClick = useCallback(country => {
    dispatch(setCountry(country));
    if (!validate.isEmpty(country.areas)) {
      dispatch(showAreaModal());
    } else {
      dispatch(setArea({}));
    }
  });

  return (
    <Modal
      transparent={true}
      visible={countryModal}
      animationType={'slide'}
      onRequestClose={() => setVisible(false)}>
      <View style={styles.container}>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.titleContainer}>
            <Text style={styles.phoneNo}>{I18n.t('choose_country')}</Text>
            <Icon
              name="close"
              type="evil-icons"
              size={30}
              onPress={() => dispatch(hideCountryModal())}
              hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
            />
          </View>
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
                  loadingIndicatorSource={images.logo}
                />
                <Text style={styles.phoneNo}>{country.slug}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default React.memo(CountriesList);

CountriesList.propTypes = {
  country: PropTypes.object.isRequired,
  countries: PropTypes.array.isRequired,
  countryModal: PropTypes.bool.isRequired,
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '25%',
    right: '15%',
    width: '70%',
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
    textAlign: 'left',
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
});
