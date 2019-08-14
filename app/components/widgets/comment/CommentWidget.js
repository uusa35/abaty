import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Text, Divider} from 'react-native-elements';
import {images, text, width} from '../../../constants';
import PropTypes from 'prop-types';

const CommentWidget = ({element}) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'lightgrey',
        margin: 5,
        width: width - 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 10
      }}>
      <FastImage
        style={{width: 80, height: 80, marginLeft: 10, marginRight: 10}}
        resizeMode="cover"
        source={{uri: element.owner ? element.owner.thumb : null}}
        loadingIndicatorSource={images.logo}
      />
      <View style={{flex: 1, padding: 5}}>
        <View>
          <Text style={styles.elementName}>
            {element.owner ? element.owner.slug : null}
          </Text>
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
