import React, {useState, useContext, useMemo} from 'react';
import {
  View,
  ScrollView,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {map} from 'lodash';
import {iconSizes, text} from './../../../constants/sizes';
import {Icon} from 'react-native-elements';
import I18n from './../../../I18n';

const SizesModal = ({
  sizes,
  sizeVisible,
  setSizeVisible,
  sizeItem,
  setSizeItem,
}) => {
  return (
    <View style={{backgroundColor: 'white'}}>
      <Modal
        transparent={true}
        visible={sizeVisible}
        animationType={'slide'}
        onRequestClose={() => setSizeVisible(false)}>
        <View style={styles.container}>
          <ScrollView
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                padding: 15,
              }}>
              <Text style={styles.phoneNo}>{I18n.t('choose_size')}</Text>
              <Icon
                name="close"
                type="evilicon"
                size={iconSizes.small}
                onPress={() => setSizeVisible(false)}
                hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
              />
            </View>
            {map(sizes, (a, i) => {
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  key={a.id}
                  hitSlop={{left: 15, right: 15}}
                  onPress={() => {
                    setSizeItem(a);
                    setSizeVisible(false);
                  }}
                  style={styles.wrapper}>
                  <Text style={styles.phoneNo}>{a.name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default SizesModal;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '35%',
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
});
