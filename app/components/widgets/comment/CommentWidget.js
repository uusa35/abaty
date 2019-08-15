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
        padding: 2
      }}>
      <ListItem
        key={element.id}
        leftAvatar={{source: {uri: element.owner.thumb}}}
        title={element.title}
        subtitle={
          <View>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.small,
                marginBottom: 10
              }}>
              {element.created_at}
            </Text>
            <Text style={{fontFamily: text.font, fontSize: text.medium}}>
              {element.content}
            </Text>
          </View>
        }
        titleStyle={{fontWeight: 'bold', fontFamily: text.font}}
        style={{width: '100%'}}
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
