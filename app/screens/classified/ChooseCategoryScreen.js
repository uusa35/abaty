import React, {useState, useMemo} from 'react';
import {StyleSheet, FlatList, View, ScrollView} from 'react-native';
import {connect, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {text} from '../../constants/sizes';
import ChooseCategoryItem from '../../components/widgets/category/ChooseCategoryItem';
import {filter} from 'lodash';

const ChooseCategoryScreen = () => {
  const {categories} = useSelector((state) => state);
  const [classifiedCategories, setClassifiedCategories] = useState([]);

  useMemo(() => {
    setClassifiedCategories(filter(categories, (c) => c.is_classified));
  }, [categories]);

  return (
    <FlatList
      contentContainerStyle={{backgroundColor: 'white'}}
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      data={classifiedCategories}
      renderItem={({item}) => (
        <ChooseCategoryItem category={item} key={item.id} />
      )}
      contentInset={{bottom: 200}}
    />
  );
};

export default ChooseCategoryScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
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
