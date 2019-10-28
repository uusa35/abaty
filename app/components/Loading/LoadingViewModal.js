import {Modal, Text, View} from 'react-native';
import React from 'react';

const LoadingViewModal = () => {
  return (
    <View
      style={{
        marginTop: 200,
        borderWidth: 10,
        flex: 1,
        backgroundColor: 'transparent',
      }}>
      <Modal visible={true} transparent={true}>
        <View style={{marginTop: 200}}>
          <View>
            <Text>Hello World!</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoadingViewModal;
