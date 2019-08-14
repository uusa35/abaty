import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Text, Divider} from 'react-native-elements';
import {images, text} from '../../../constants';
import PropTypes from 'prop-types';

const CommentWidget = ({element}) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'lightgrey',
        margin: 5,
        width: '97%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 10
      }}>
      <FastImage
        style={{width: 80, height: 80, marginLeft: 10, marginRight: 10}}
        resizeMode="cover"
        source={{uri: element.owner.thumb}}
        loadingIndicatorSource={images.logo}
      />
      <View style={{flex: 1, padding: 5}}>
        <View>
          <Text style={styles.elementName}>{element.owner.slug}</Text>
          <Text style={styles.elementName}>{element.created_at}</Text>
          <Divider />
        </View>
        <Text style={styles.elementName}>{element.title}</Text>
        <Text style={[styles.elementName, {fontSize: text.medium}]}>
          {element.content}
        </Text>
      </View>
    </View>
  );
};

export default React.memo(CommentWidget);

CommentWidget.propTypes = {
  element: PropTypes.object,
  columns: PropTypes.number
};

const styles = StyleSheet.create({
  categoriesContainer: {
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  elementName: {
    fontFamily: text.font,
    fontSize: text.small,
    textAlign: 'left',
    paddingTop: 10
  }
});
