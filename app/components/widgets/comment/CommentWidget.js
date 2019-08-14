import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Button, Text, Divider} from 'react-native-elements';
import {images, text, width} from '../../../constants';
import {getCategoryElements, getSearchProducts} from '../../../redux/actions';
import {DispatchContext} from '../../../redux/DispatchContext';
import PropTypes from 'prop-types';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';

const CommentWidget = ({element, columns, showBtn = false}) => {
  const {dispatch} = useContext(DispatchContext);
  const {colors} = useContext(GlobalValuesContext);
  console.log('the element form CommentWidget', element);
  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'lightgrey',
        margin: 5,
        width: '95%',
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
          <Divider />
        </View>
        <Text style={styles.elementName}>{element.title}</Text>
        <Text style={styles.elementName}>{element.content}</Text>
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
  mainCategoryBg: {
    width: '100%',
    height: '100%'
  },
  elementName: {
    fontFamily: text.font,
    fontSize: text.medium,
    textAlign: 'left',
    paddingTop: 10
  }
});
