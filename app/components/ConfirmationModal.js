import React, {useContext, useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import DesigneratBtn from './widgets/Button/DesigneratBtn';
import I18n from './../I18n';
import {iconSizes, text} from '../constants/sizes';
import {icons} from '../constants/images';
import FastImage from 'react-native-fast-image';
import {Icon} from 'react-native-elements';
import {GlobalValuesContext} from '../redux/GlobalValuesContext';
import PropTypes from 'prop-types';
import CelebrityHorizontalWidget from './widgets/user/CelebrityHorizontalWidget';

const ConfirmationModal = ({
  modalVisible = false,
  message = 'Are you sure?',
  setModalVisible,
  handleConfirmClick,
  confirmTitle = 'confirm',
  cancelTitle = 'cancel',
  iconName = 'shopping-bag',
  iconType = 'feather',
}) => {
  const {colors} = useContext(GlobalValuesContext);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Icon
              name="close"
              type="material-community"
              size={iconSizes.small}
              containerStyle={{
                position: 'absolute',
                top: 0,
                right: 0,
                margin: 10,
              }}
              onPress={() => setModalVisible(false)}
            />
            <Icon
              name={iconName}
              type={iconType}
              size={iconSizes.largest}
              color={colors.btn_bg_theme_color}
              resizeMode="contain"
            />
            <View style={{margin: 20, marginBottom: 50}}>
              <Text style={styles.modalText}>{message}</Text>
            </View>
            <View
              style={{
                width: '100%',
                position: 'absolute',
                bottom: 0,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingBottom: 20,
              }}>
              <DesigneratBtn
                handleClick={() => {
                  handleConfirmClick();
                  setModalVisible(!modalVisible);
                }}
                title={confirmTitle}
                width={100}
              />
              <DesigneratBtn
                handleClick={() => setModalVisible(!modalVisible)}
                title={I18n.t('cancel')}
                width={100}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

ConfirmationModal.propTypes = {
  handleConfirmClick: PropTypes.func.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: text.font,
    color: 'black',
  },
});

export default ConfirmationModal;
