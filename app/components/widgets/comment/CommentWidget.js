import React, {useContext} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ListItem} from 'react-native-elements';
import {text} from '../../../constants/sizes';
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
        padding: 2,
      }}>
      <ListItem
        key={element.id}
        leftAvatar={{source: {uri: element.owner ? element.owner.thumb : logo}}}
        title={element.title}
        subtitle={
          <View style={{width: '100%'}}>
            {element.owner ? (
              <View
                style={{
                  paddingTop: 3,
                  paddingBottom: 3,
                  marginBottom: 10,
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flex: 1,
                  borderBottomWidth: 0.5,
                  borderColor: 'lightgrey',
                }}>
                <Text
                  style={{
                    fontFamily: text.font,
                    fontSize: text.small,
                    textAlign: 'left',
                    borderColor: 'lightgrey',
                  }}>
                  {element.owner.slug}
                </Text>
                <Text
                  style={{
                    fontFamily: text.font,
                    fontSize: text.smaller,
                    textAlign: 'right',
                  }}>
                  {element.created_at}
                </Text>
              </View>
            ) : null}
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.medium,
                textAlign: 'left',
                width: '100%',
              }}>
              {element.content}
            </Text>
          </View>
        }
        titleStyle={{
          fontWeight: 'bold',
          fontFamily: text.font,
          textAlign: 'left',
        }}
        style={{width: '100%'}}
      />
    </View>
  );
};

export default CommentWidget;

CommentWidget.propTypes = {
  element: PropTypes.object,
  columns: PropTypes.number,
};

const styles = StyleSheet.create({
  categoriesContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  elementName: {
    fontFamily: text.font,
    fontSize: text.small,
    textAlign: 'left',
    paddingTop: 10,
  },
});
