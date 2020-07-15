import React, {Fragment, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {iconSizes, text, width} from '../../../constants/sizes';
import I18n from '../../../I18n';
import {Icon} from 'react-native-elements';
import PropTypes from 'prop-types';

const SortByModal = ({
  setSortModal,
  setSort,
  sortModal = false,
  showSortPrice = true,
  showSortAlpha = true,
  type,
}) => {
  const [currentType, setCurrentType] = useState(type);

  return (
    <Modal
      transparent={true}
      isVisible={sortModal}
      useNativeDriver={true}
      animationIn="slideInUp">
      <View style={styles.sortModalContainer}>
        <ScrollView
          contentContainerStyle={{backgroundColor: 'white'}}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentInset={{bottom: 150}}>
          <View style={styles.titleContainer}>
            <Text style={[styles.phoneNo, {fontSize: text.medium}]}>
              {I18n.t('sort')}
            </Text>
            <Icon
              name="close"
              type="evilicon"
              size={iconSizes.smaller}
              containerStyle={{position: 'absolute', top: 5, right: 5}}
              onPress={() => setSortModal(false)}
              hitSlop={{
                top: iconSizes.large,
                bottom: iconSizes.large,
                left: iconSizes.large,
                right: iconSizes.large,
              }}
            />
          </View>
          <TouchableOpacity
            activeOpacity={1}
            hitSlop={{left: 15, right: 15}}
            onPress={() => setSort(5)}
            style={styles.wrapper}>
            <Text style={styles.phoneNo}>{I18n.t('latest')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            hitSlop={{left: 15, right: 15}}
            onPress={() => setSort(6)}
            style={styles.wrapper}>
            <Text style={styles.phoneNo}>{I18n.t('oldest')}</Text>
          </TouchableOpacity>
          {showSortPrice && currentType === 'product' && (
            <Fragment>
              <TouchableOpacity
                activeOpacity={1}
                hitSlop={{left: 15, right: 15}}
                onPress={() => setSort(3)}
                style={styles.wrapper}>
                <Text style={styles.phoneNo}>{I18n.t('high_low')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                hitSlop={{left: 15, right: 15}}
                onPress={() => setSort(4)}
                style={styles.wrapper}>
                <Text style={styles.phoneNo}>{I18n.t('low_high')}</Text>
              </TouchableOpacity>
            </Fragment>
          )}
          {showSortPrice && currentType === 'classified' && (
            <Fragment>
              <TouchableOpacity
                activeOpacity={1}
                hitSlop={{left: 15, right: 15}}
                onPress={() => setSort(7)}
                style={styles.wrapper}>
                <Text style={styles.phoneNo}>{I18n.t('high_low')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                hitSlop={{left: 15, right: 15}}
                onPress={() => setSort(8)}
                style={styles.wrapper}>
                <Text style={styles.phoneNo}>{I18n.t('low_high')}</Text>
              </TouchableOpacity>
            </Fragment>
          )}
          {showSortAlpha ? (
            <Fragment>
              <TouchableOpacity
                activeOpacity={1}
                hitSlop={{left: 15, right: 15}}
                onPress={() => setSort(1)}
                style={styles.wrapper}>
                <Text style={styles.phoneNo}>{I18n.t('by_alpha_asc')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                hitSlop={{left: 15, right: 15}}
                onPress={() => setSort(2)}
                style={styles.wrapper}>
                <Text style={styles.phoneNo}>{I18n.t('by_alpha_desc')}</Text>
              </TouchableOpacity>
            </Fragment>
          ) : null}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default SortByModal;

SortByModal.propTypes = {
  sortModal: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  setSortModal: PropTypes.func.isRequired,
  setSort: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    alignSelf: 'center',
    // minHeight: height,
    minWidth: '100%',
    flexGrow: 1,
  },
  mainTitle: {
    fontFamily: text.font,
    fontSize: text.large,
    paddingLeft: 20,
    paddingRight: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  emptyCaseBtn: {
    paddingTop: '20%',
    minHeight: '100%',
    // borderWidth : 10,
    width: width - 50,
    alignSelf: 'center',
    // justifyContent: 'center',
  },
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
});
