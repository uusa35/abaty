import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {productWidget} from '../../constants/sizes';
import ProductCreateCollectionWidget from '../../components/widgets/product/ProductCreateCollectionWidget';
import {Button, Icon} from 'react-native-elements';
import I18n from './../../I18n';

const MallrCollectionCreateScreen = ({products}) => {
  const {width, height} = productWidget.smallest;

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
          snapToInterval={width}
          bounces={true}
          disableIntervalMomentum={true}
          data={products}
          numColumns={1}
          scrollEnabled={true}
          style={{maxWidth: productWidget.x4Small.width, margin: 5}}
          renderItem={({item}) => (
            <ProductCreateCollectionWidget
              element={item}
              key={item.id}
              width={productWidget.x4Small.width}
              height={productWidget.x4Small.height}
            />
          )}
        />
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          snapToInterval={width}
          bounces={true}
          disableIntervalMomentum={true}
          data={products}
          numColumns={1}
          scrollEnabled={true}
          style={{maxWidth: width, margin: 5}}
          renderItem={({item}) => (
            <ProductCreateCollectionWidget
              element={item}
              key={item.id}
              width={width}
              height={height}
            />
          )}
        />
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          snapToInterval={width}
          bounces={true}
          disableIntervalMomentum={true}
          data={products}
          numColumns={1}
          scrollEnabled={true}
          style={{maxWidth: productWidget.x4Small.width, margin: 5}}
          renderItem={({item}) => (
            <ProductCreateCollectionWidget
              element={item}
              key={item.id}
              width={productWidget.x4Small.width}
              height={productWidget.x4Small.height}
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
          snapToInterval={width}
          bounces={true}
          disableIntervalMomentum={true}
          data={products}
          numColumns={1}
          scrollEnabled={true}
          style={{maxWidth: productWidget.x4Small.width, margin: 5}}
          renderItem={({item}) => (
            <ProductCreateCollectionWidget
              element={item}
              key={item.id}
              width={productWidget.x4Small.width}
              height={productWidget.x4Small.height}
            />
          )}
        />
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          snapToInterval={width}
          bounces={true}
          disableIntervalMomentum={true}
          data={products}
          numColumns={1}
          scrollEnabled={true}
          style={{maxWidth: width, margin: 5}}
          renderItem={({item}) => (
            <ProductCreateCollectionWidget
              element={item}
              key={item.id}
              width={width}
              height={height}
            />
          )}
        />
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          snapToInterval={width}
          bounces={true}
          disableIntervalMomentum={true}
          data={products}
          numColumns={1}
          scrollEnabled={true}
          style={{maxWidth: productWidget.x4Small.width, margin: 5}}
          renderItem={({item}) => (
            <ProductCreateCollectionWidget
              element={item}
              key={item.id}
              width={productWidget.x4Small.width}
              height={productWidget.x4Small.height}
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
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          snapToInterval={width}
          bounces={true}
          disableIntervalMomentum={true}
          data={products}
          numColumns={1}
          scrollEnabled={true}
          style={{maxWidth: width, margin: 5}}
          renderItem={({item}) => (
            <ProductCreateCollectionWidget
              element={item}
              key={item.id}
              width={width}
              height={height}
            />
          )}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          width: '100%',
        }}>
        <Button
          titleStyle={{color: 'white', fontSize: 13}}
          buttonStyle={{backgroundColor: 'grey'}}
          raised
          title={I18n.t('upload_cover')}
          type="outline"
          icon={<Icon type="antdesign" name="save" size={13} color="white" />}
        />
        <Button
          titleStyle={{color: 'white', fontSize: 13}}
          buttonStyle={{backgroundColor: 'black'}}
          raised
          title={I18n.t('save_collection')}
          type="outline"
          icon={<Icon type="antdesign" name="save" size={13} color="white" />}
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
