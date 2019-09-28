import React, {Fragment, useState, useCallback} from 'react';
import {TouchableOpacity, Text, Modal, View, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import I18n from '../../../I18n';
import {images, text} from '../../../constants';

const SearchSort = ({
  sort,
  setSort,
  showPrice = true,
  showAlpha = true,
  sortModal,
  setSortModal
}) => {
  const handleClick = useCallback(e => {
    setSort(e);
  });

  return (
    <Fragment>
      <TouchableOpacity
        style={{
          borderRightWidth: 0.5,
          width: '50%',
          minHeight: 50,
          borderColor: 'lightgrey',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={() => setSortModal(true)}>
        <Icon typ="material-icon" name="sort" size={30} />
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={sortModal}
        animationType={'slide'}
        onRequestClose={() => setSortModal(false)}>
        <View style={styles.container}>
          <TouchableOpacity
            activeOpacity={1}
            hitSlop={{left: 15, right: 15}}
            onPress={() => handleClick(1)}
            style={styles.wrapper}>
            <Text style={styles.phoneNo}>{I18n.t('latest')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            hitSlop={{left: 15, right: 15}}
            onPress={() => handleClick(2)}
            style={styles.wrapper}>
            <Text style={styles.phoneNo}>{I18n.t('oldest')}</Text>
          </TouchableOpacity>
          {showPrice ? (
            <Fragment>
              <TouchableOpacity
                activeOpacity={1}
                hitSlop={{left: 15, right: 15}}
                onPress={() => handleClick(3)}
                style={styles.wrapper}>
                <Text style={styles.phoneNo}>{I18n.t('low_high')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                hitSlop={{left: 15, right: 15}}
                onPress={() => handleClick(4)}
                style={styles.wrapper}>
                <Text style={styles.phoneNo}>{I18n.t('high_low')}</Text>
              </TouchableOpacity>
            </Fragment>
          ) : null}
          {showAlpha ? (
            <Fragment>
              <TouchableOpacity
                activeOpacity={1}
                hitSlop={{left: 15, right: 15}}
                onPress={() => handleClick(5)}
                style={styles.wrapper}>
                <Text style={styles.phoneNo}>{I18n.t('by_alpha_asc')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                hitSlop={{left: 15, right: 15}}
                onPress={() => handleClick(6)}
                style={styles.wrapper}>
                <Text style={styles.phoneNo}>{I18n.t('by_alpha_desc')}</Text>
              </TouchableOpacity>
            </Fragment>
          ) : null}
          <TouchableOpacity
            activeOpacity={1}
            hitSlop={{left: 15, right: 15}}
            onPress={() => setSortModal(false)}
            style={styles.wrapper}>
            <Text style={styles.phoneNo}>{I18n.t('cancel')}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </Fragment>
  );
};

export default SearchSort;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '25%',
    right: '15%',
    width: '70%',
    backgroundColor: 'white',
    padding: 10,
    paddingTop: 15
  },
  wrapper: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    backgroundColor: 'white',
    paddingTop: 15,
    height: 50
  },
  phoneNo: {
    fontFamily: text.font,
    fontSize: text.large,
    paddingLeft: 20,
    margin: 0,
    padding: 0,
    textAlign: 'center'
  },
  countryFlag: {
    width: 45,
    height: 25,
    marginLeft: 10
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    padding: 15
  }
});
