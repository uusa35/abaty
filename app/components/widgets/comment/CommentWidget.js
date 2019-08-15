import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Divider, ListItem} from 'react-native-elements';
import {images, text, width} from '../../../constants';
import PropTypes from 'prop-types';

const CommentWidget = ({element}) => {
  console.log('element title', element.content);
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
      <ListItem
        key={element.id}
        leftAvatar={{source: {uri: element.owner.thumb}}}
        title={element.title}
        subtitle={
          <View style={{}}>
            <FastImage
              source={element.owner.thumb}
              style={{fontFamily: text.font}}
            />
            <Text style={{fontFamily: text.font}}>5 months ago</Text>
          </View>
        }
        titleStyle={{color: 'red', fontWeight: 'bold'}}
        subtitleStyle={{color: 'red'}}
      />
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
