import React, {useContext, useState, useMemo} from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import CategoryWidget from '../widgets/CategoryWidget';
import {refetchHomeCategories} from '../../redux/actions';
import {DispatchContext} from '../../redux/DispatchContext';

export const ____CategoriesList = props => {
  console.log('Render CategorieslIst', props);
  // const {categories} = useContext(HomeCategoriesContext);
  const {categories} = props;
  const [refresh, setRefresh] = useState(false);
  const {dispatch} = useContext(DispatchContext);

  useMemo(() => {
    if (refresh) {
      dispatch(refetchHomeCategories());
      return setRefresh(false);
    }
  }, [refresh]);

  return (
    <FlatList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={categories}
      keyExtractor={item => String(item.id)}
      renderItem={({item}) => <CategoryWidget category={item} key={item.id} />}
      ListFooterComponent={() => <View style={{marginTop: 120}} />}
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={() => setRefresh(true)}
        />
      }
    />
  );
};
