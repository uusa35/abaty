import React from 'react';
import {StyleSheet, View, Text, ScrollView, FlatList} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {productWidget, height, width} from '../../constants';
import ProductCreateCollectionWidget from '../../components/widgets/product/ProductCreateCollectionWidget';

const MallrCollectionCreateScreen = ({products}) => {
  console.log('products', products);
  const {productWidth, productHeight} = productWidget.smallest;
  const viewHeight = '32%';
  return (
    <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
      <View style={{height: viewHeight}}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          snapToInterval={productWidth}
          bounces={true}
          disableIntervalMomentum={true}
          data={products}
          numColumns={1}
          scrollEnabled={true}
          style={{margin: 10, width: productWidth, height: productHeight}}
          contentContainerStyle={{height: productHeight}}
          renderItem={({item}) => (
            <ProductCreateCollectionWidget element={item} key={item.id} />
          )}
        />
      </View>
      <View style={{height: viewHeight, flexDirection: 'row', width: '80%'}}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          snapToInterval={productWidth}
          bounces={true}
          disableIntervalMomentum={true}
          data={products}
          numColumns={1}
          scrollEnabled={true}
          style={{margin: 10, width: productWidth, height: productHeight}}
          contentContainerStyle={{height: productHeight}}
          renderItem={({item}) => (
            <ProductCreateCollectionWidget element={item} key={item.id} />
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
          style={{margin: 10, width: productWidth, height: productHeight}}
          contentContainerStyle={{height: productHeight}}
          renderItem={({item}) => (
            <ProductCreateCollectionWidget element={item} key={item.id} />
          )}
        />
      </View>
      <View style={{height: viewHeight}}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          snapToInterval={productWidth}
          bounces={true}
          disableIntervalMomentum={true}
          data={products}
          numColumns={1}
          scrollEnabled={true}
          style={{margin: 10, width: productWidth, height: productHeight}}
          contentContainerStyle={{height: productHeight}}
          renderItem={({item}) => (
            <ProductCreateCollectionWidget element={item} key={item.id} />
          )}
        />
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
