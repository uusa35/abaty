import React from 'react';
import {View} from 'react-native';
import Spinner from 'react-native-spinkit';

const SimpleSpinner = ({color = 'black'}) => {
  return (
    <View
      style={{
        minHeight: 200,
        width: '100%',
        borderWidth: 10,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <Spinner type="Circle" color={color} size={40} />
    </View>
  );
};

export default SimpleSpinner;
