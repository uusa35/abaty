import React, {useState, useMemo} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {text} from '../../constants/sizes';
import {filter} from 'lodash';
import CategoryCollapseWidget from '../../components/widgets/category/CategoryCollapseWidget';
import {ISTORES, EXPO, IHOUSES} from './../../../app.json';

const CategoryIndexCollapseScreen = () => {
  const {categories} = useSelector(state => state);

  return (
    <FlatList
      style={styles.container}
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      data={categories}
      renderItem={({item, index}) => (
        <CategoryCollapseWidget
          category={item}
          key={item.id}
          type={IHOUSES ? 'user' : 'product'}
          collapsed={index === 0}
        />
      )}
      contentInset={{bottom: 200}}
    />
  );
};

export default CategoryIndexCollapseScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    paddingTop: '5%',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    backgroundColor: 'white',
    padding: 15,
    height: 50,
  },
  phoneNo: {
    fontFamily: text.font,
    fontSize: text.large,
    paddingLeft: 20,
    margin: 0,
    padding: 0,
    textAlign: 'left',
  },
  areaFlag: {
    width: 45,
    height: 25,
    marginLeft: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    padding: 15,
  },
});
