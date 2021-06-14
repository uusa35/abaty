import React, {useContext, useState, useCallback, useEffect} from 'react';
import {TouchableOpacity, FlatList, Text, View, StyleSheet} from 'react-native';
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
import {useDispatch} from 'react-redux';

const ProductFilterSizesWidget = ({elements, type, colors, size}) => {
  const [currentElement, setCurrentElement] = useState({});
  const dispatch = useDispatch();

  const handleSetElement = useCallback(item => {
    setCurrentElement(item);
    dispatch(setSize(item));
  });

  useEffect(() => {
    setCurrentElement(size);
  }, [size]);

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
          {I18n.t(`sizes`)}
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
            style={[
              styles.btnStyle,
              {
                borderColor:
                  currentElement && item.id === currentElement.id
                    ? colors.btn_bg_theme_color
                    : 'lightgrey',
              },
            ]}
            onPress={() => handleSetElement(item)}>
            <Text
              style={{
                fontSize: text.small,
                fontFamily: text.font,
                color: 'black',
                textAlign: 'center',
              }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ProductFilterSizesWidget;

ProductFilterSizesWidget.propTypes = {
  elements: PropTypes.array.isRequired,
  size: PropTypes.object,
};

export const styles = StyleSheet.create({
  btnStyle: {
    height: 50,
    borderWidth: 0.5,
    borderRadius: 3,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 3,
    marginLeft: 3,
    shadowColor: 'black',
    shadowOffset: {
      width: 0.1,
      height: 0.2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.0,
    elevation: 1,
  },
});
