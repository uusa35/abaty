import React, {useContext} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ListItem} from 'react-native-elements';
import {text} from '../../../constants';
import PropTypes from 'prop-types';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';

const CommentWidget = ({element}) => {
  const {logo} = useContext(GlobalValuesContext);
  return (
    <View
      style={{
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: 'lightgrey',
        margin: 3,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 2
      }}>
      <ListItem
        key={element.id}
        leftAvatar={{source: {uri: element.owner ? element.owner.thumb : logo}}}
        title={element.title}
        subtitle={
          <View>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.small,
                marginBottom: 10,
                textAlign: 'left'
              }}>
              {element.created_at}
            </Text>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.medium,
                textAlign: 'left'
              }}>
              {element.content}
            </Text>
          </View>
        }
        titleStyle={{
          fontWeight: 'bold',
          fontFamily: text.font,
          textAlign: 'left'
        }}
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
