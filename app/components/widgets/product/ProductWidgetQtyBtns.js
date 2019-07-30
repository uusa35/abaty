import React, {useState, useMemo} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import {text} from '../../../constants';
import PropTypes from 'prop-types';

const ProductWidgetQtyBtns = ({qty, requestQty = 0, setRequestQty}) => {
  useMemo(() => {});
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Button
        onPress={() =>
          requestQty >= 0 && requestQty < qty
            ? setRequestQty(requestQty + 1)
            : null
        }
        icon={<Icon name="plus" type="font-awesome" size={15} color="black" />}
        containerStyle={{width: '15%', margin: 5}}
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
          width: '20%',
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
        icon={<Icon name="minus" type="font-awesome" size={15} color="black" />}
        containerStyle={{width: '15%', margin: 5}}
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

export default React.memo(ProductWidgetQtyBtns);

ProductWidgetQtyBtns.propTypes = {
  qty: PropTypes.number.isRequired,
  requestQty: PropTypes.number.isRequired,
  setRequestQty: PropTypes.func.isRequired
};

const styles = StyleSheet.create({});
