import React, {useState, useMemo} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import {text} from '../../../constants';
import PropTypes from 'prop-types';

const CategoryGroupWidgetQtyBtns = ({qty, requestQty = 0, setRequestQty}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1
      }}>
      <Button
        onPress={() =>
          requestQty >= 0 && requestQty < qty
            ? setRequestQty(requestQty + 1)
            : null
        }
        icon={<Icon name="plus" type="antdesign" size={15} color="black" />}
        containerStyle={{width: '20%', margin: 5}}
        buttonStyle={{
          backgroundColor: 'white',
          borderRadius: 10,
          borderWidth: 0.5,
          borderColor: 'black',
          justifyContent: 'space-around',
          height: 40
        }}
      />
      <View
        style={{
          width: '30%',
          borderWidth: 0.5,
          borderRadius: 10,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Text style={{fontSize: 17}}>{requestQty}</Text>
      </View>
      <Button
        onPress={() => (requestQty > 0 ? setRequestQty(requestQty - 1) : null)}
        icon={<Icon name="minus" type="antdesign" size={15} color="black" />}
        containerStyle={{width: '20%', margin: 5}}
        buttonStyle={{
          backgroundColor: 'white',
          borderRadius: 10,
          borderWidth: 0.5,
          borderColor: 'black',
          justifyContent: 'space-around',
          height: 40
        }}
      />
    </View>
  );
};

export default CategoryGroupWidgetQtyBtns;

CategoryGroupWidgetQtyBtns.propTypes = {
  qty: PropTypes.number.isRequired,
  requestQty: PropTypes.number.isRequired,
  setRequestQty: PropTypes.func.isRequired
};

const styles = StyleSheet.create({});
