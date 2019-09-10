import React from 'react';
import {TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {width} from '../../../constants';

const CommercialWidget = ({element}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        element.path ? element.path : element.url;
      }}
      key={element.id}>
      <FastImage
        resizeMode="contain"
        source={{uri: element.thumb}}
        style={{width: width, height: 200}}
      />
    </TouchableOpacity>
  );
};

export default CommercialWidget;
