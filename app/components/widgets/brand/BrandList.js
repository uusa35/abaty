import React, {useState, useMemo} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  ScrollView
} from 'react-native';
import ProductWidget from '../product/ProductWidget';
import PropTypes from 'prop-types';
import BrandWidget from './BrandWidget';
import {axiosInstance} from '../../../redux/actions/api';
import {isIOS, width} from '../../../constants';
import {map} from 'lodash';
import {View} from 'react-native-animatable';

const BrandList = ({elements, showName = false}) => {
  [isLoading, setIsLoading] = useState(false);
  [refresh, setRefresh] = useState(false);
  [page, setPage] = useState(2);
  [items, setItems] = useState(elements);

  useMemo(() => {
    if (isLoading === true) {
      // return axiosInstance(`product`, {params: {page}})
      //     .then(r => {
      //         setItems(items.concat(r.data));
      //         setIsLoading(!isLoading);
      //     })
      //     .catch(e => console.log('the e', e));
    }
  }, [page]);

  useMemo(() => {
    isLoading ? setPage(page + 1) : null;
  }, [isLoading]);

  useMemo(() => {
    console.log('refreshing');
    if (refresh === true) {
      // for now i don't know what products to fetch
      setRefresh(false);
    }
  }, [refresh]);

  return (
    <ScrollView
      style={{backgroundColor: 'white'}}
      contentContainerStyle={{paddingBottom: 30, backgroundColor: 'white'}}
      showsHorizontalScrollIndicator={false}
      endFillColor="white"
      showsVerticalScrollIndicator={false}>
      <View animation="bounceInLeft" easing="ease-out" style={styles.wrapper}>
        {map(elements, (b, i) => (
          <BrandWidget
            element={b}
            key={i}
            currentWidth={100}
            currentMarginBottom={20}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default React.memo(BrandList);

BrandList.propTypes = {
  elements: PropTypes.array.isRequired,
  showName: PropTypes.bool
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10
  }
});
