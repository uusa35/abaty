import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {productWidget} from '../../constants/sizes';
import ProductCreateCollectionWidget from '../../components/widgets/product/ProductCreateCollectionWidget';
import {Button, Icon} from 'react-native-elements';

const MallrCollectionCreateScreen = ({products}) => {
  console.log('products', products);
  const {productWidth, productHeight} = productWidget.smallest;

  return (
    <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 3,
          width: '100%',
        }}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          snapToInterval={productWidth}
          bounces={true}
          disableIntervalMomentum={true}
          data={products}
          numColumns={1}
          scrollEnabled={true}
          style={{maxWidth: productWidget.x4Small.productWidth, margin: 5}}
          renderItem={({item}) => (
            <ProductCreateCollectionWidget
              element={item}
              key={item.id}
              width={productWidget.x4Small.productWidth}
              height={productWidget.x4Small.productHeight}
            />
          )}
        />
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          snapToInterval={productWidth}
          bounces={true}
          disableIntervalMomentum={true}
          data={products}
          numColumns={1}
          scrollEnabled={true}
          style={{maxWidth: productWidth, margin: 5}}
          renderItem={({item}) => (
            <ProductCreateCollectionWidget
              element={item}
              key={item.id}
              width={productWidth}
              height={productHeight}
            />
          )}
        />
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          snapToInterval={productWidth}
          bounces={true}
          disableIntervalMomentum={true}
          data={products}
          numColumns={1}
          scrollEnabled={true}
          style={{maxWidth: productWidget.x4Small.productWidth, margin: 5}}
          renderItem={({item}) => (
            <ProductCreateCollectionWidget
              element={item}
              key={item.id}
              width={productWidget.x4Small.productWidth}
              height={productWidget.x4Small.productHeight}
            />
          )}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 3,
          width: '100%',
        }}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          snapToInterval={productWidth}
          bounces={true}
          disableIntervalMomentum={true}
          data={products}
          numColumns={1}
          scrollEnabled={true}
          style={{maxWidth: productWidget.x4Small.productWidth, margin: 5}}
          renderItem={({item}) => (
            <ProductCreateCollectionWidget
              element={item}
              key={item.id}
              width={productWidget.x4Small.productWidth}
              height={productWidget.x4Small.productHeight}
            />
          )}
        />
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          snapToInterval={productWidth}
          bounces={true}
          disableIntervalMomentum={true}
          data={products}
          numColumns={1}
          scrollEnabled={true}
          style={{maxWidth: productWidth, margin: 5}}
          renderItem={({item}) => (
            <ProductCreateCollectionWidget
              element={item}
              key={item.id}
              width={productWidth}
              height={productHeight}
            />
          )}
        />
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          snapToInterval={productWidth}
          bounces={true}
          disableIntervalMomentum={true}
          data={products}
          numColumns={1}
          scrollEnabled={true}
          style={{maxWidth: productWidget.x4Small.productWidth, margin: 5}}
          renderItem={({item}) => (
            <ProductCreateCollectionWidget
              element={item}
              key={item.id}
              width={productWidget.x4Small.productWidth}
              height={productWidget.x4Small.productHeight}
            />
          )}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          margin: 3,
          width: '100%',
        }}>
        <Button title="save" color="black" />
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          snapToInterval={productWidth}
          bounces={true}
          disableIntervalMomentum={true}
          data={products}
          numColumns={1}
          scrollEnabled={true}
          style={{maxWidth: productWidth, margin: 5}}
          contentContainerStyle={{width: productWidth, height: productHeight}}
          renderItem={({item}) => (
            <ProductCreateCollectionWidget
              element={item}
              key={item.id}
              width={productWidth}
              height={productHeight}
            />
          )}
        />
        <Button title="save" />
      </View>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    products: state.products,
  };
}

export default connect(mapStateToProps)(MallrCollectionCreateScreen);

MallrCollectionCreateScreen.propTypes = {
  products: PropTypes.array,
};

const styles = StyleSheet.create({});
