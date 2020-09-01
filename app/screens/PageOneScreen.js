import React, {useState, useCallback} from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import I18n from './../I18n';
import {ESCRAP, HOMEKEY} from './../../app';
import ProductCategoryVerticalWidget from '../components/widgets/category/ProductCategoryVerticalWidget';
import ClassifiedCategoryVerticalWidget from '../components/widgets/category/ClassifiedCategoryVerticalWidget';
import {refetchHomeElements} from '../redux/actions';
import BgContainer from '../components/containers/BgContainer';
import {bottomVerticalContentInset} from '../constants/sizes';

const PageOneScreen = () => {
  const {categories} = useSelector((state) => state);
  const dispatch = useDispatch();
  [title, setTitle] = useState('');
  [refresh, setRefresh] = useState(false);

  const handleRefresh = useCallback(() => {
    dispatch(refetchHomeElements());
  }, [refresh]);

  // useMemo(() => {
  //   navigation.setParams({title: I18n.t('categories')});
  // }, [navigation.state.params]);

  return (
    <BgContainer showImage={false}>
      <ScrollView
        refreshing={refresh}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => handleRefresh()}
          />
        }
        horizontal={false}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentInset={{bottom: bottomVerticalContentInset}}>
        <ProductCategoryVerticalWidget
          elements={categories}
          showImage={true}
          title={I18n.t('product_categories')}
        />
        {ESCRAP || HOMEKEY ? (
          <ClassifiedCategoryVerticalWidget
            elements={categories}
            title={I18n.t('classified_categories')}
          />
        ) : null}
      </ScrollView>
    </BgContainer>
  );
};

PageOneScreen.navigationOptions = ({navigation}) => ({
  // headerTitle: navigation.state.params.title
  // title : has(navigation.state,'params') ? navigation.state.params.title : I18n.t('categories')
  title: I18n.t('categories'),
});

export default PageOneScreen;
