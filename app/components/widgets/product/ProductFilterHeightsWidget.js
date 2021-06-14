import React, {useState, useCallback, useEffect, useContext} from 'react';
import {TouchableOpacity, FlatList, Text, View, StyleSheet} from 'react-native';
import NoMoreElements from '../NoMoreElements';
import {rightHorizontalContentInset, text} from '../../../constants/sizes';
import I18n from './../../../I18n';
import PropTypes from 'prop-types';
import {setColor, setSize} from '../../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import EmptyListWidget from '../../Lists/EmptyListWidget';

const ProductFilterHeightsWidget = ({elements, type, color}) => {
  const [currentElement, setCurrentElement] = useState({});
  const {colors} = useSelector(state => state.settings);
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
          {I18n.t(`heights`)}
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
        ListEmptyComponent={
          <EmptyListWidget title={`${I18n.t('no_available')}`} />
        }
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
            <Text style={styles.btnTitle}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ProductFilterHeightsWidget;

ProductFilterHeightsWidget.propTypes = {
  elements: PropTypes.array.isRequired,
  color: PropTypes.object,
};

export const styles = StyleSheet.create({
  btnStyle: {
    height: 40,
    borderWidth: 0.5,
    borderRadius: 10,
    minWidth: 65,
    alignItems: 'center',
    justifyContent: 'flex-end',
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
  btnTitle: {
    fontSize: text.medium,
    fontFamily: text.font,
    color: 'black',
    marginBottom: 6,
  },
});
