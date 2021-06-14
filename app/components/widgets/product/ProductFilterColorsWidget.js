import React, {useContext, useState, useCallback, useEffect} from 'react';
import {TouchableOpacity, FlatList, Text, View} from 'react-native';
import NoMoreElements from '../NoMoreElements';
import {
  iconSizes,
  rightHorizontalContentInset,
  touchOpacity,
  text,
} from '../../../constants/sizes';
import I18n from './../../../I18n';
import PropTypes from 'prop-types';
import {setColor, setSize} from '../../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';

const ProductFilterColorsWidget = ({elements, type, colors, color}) => {
  const [currentElement, setCurrentElement] = useState(color);
  const dispatch = useDispatch();

  const handleSetElement = useCallback(item => {
    setCurrentElement(item);
    dispatch(setColor(item));
  });

  useEffect(() => {
    setCurrentElement(color);
  }, [color]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderWidth: 0.5,
        borderRadius: 10,
        padding: 10,
        borderColor: 'lightgrey',
        marginBottom: 10,
        width: '100%',
      }}>
      <View style={{paddingTop: 5, paddingBottom: 5}}>
        <Text style={{fontFamily: text.font, fontSize: text.medium}}>
          {I18n.t(`colors`)}
        </Text>
      </View>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentInset={{right: rightHorizontalContentInset}}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
        disableVirtualization={false}
        // ListHeaderComponent={
        // }
        ListEmptyComponent={() => (
          <NoMoreElements title={`${I18n.t('no_available')}`} />
        )}
        style={{
          flexDirection: 'row',
          width: '100%',
          minHeight: 60,
        }}
        data={elements}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              height: 40,
              width: 40,
              borderRadius: 40 / 2,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 3,
              marginLeft: 3,
              borderWidth:
                currentElement && item.id === currentElement.id ? 0.8 : 0,
              borderColor: item.code,
            }}
            onPress={() => handleSetElement(item)}>
            <View
              style={{
                width: 25,
                height: 25,
                borderRadius: 25 / 2,
                backgroundColor: item.code,
              }}></View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ProductFilterColorsWidget;

ProductFilterColorsWidget.propTypes = {
  elements: PropTypes.array.isRequired,
  color: PropTypes.object,
};
