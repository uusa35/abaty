import React, {useState, useCallback} from 'react';
import {FlatList, RefreshControl, ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import I18n from './../I18n';
import {ABATI, MALLR, ESCRAP, HOMEKEY} from './../../app';
import ProductCategoryVerticalWidget from '../components/widgets/category/ProductCategoryVerticalWidget';
import ClassifiedCategoryVerticalWidget from '../components/widgets/category/ClassifiedCategoryVerticalWidget';
import {refetchHomeElements} from '../redux/actions';
import BgContainer from '../components/containers/BgContainer';

const PageOneScreen = ({
  categories,
  commercials,
  show_commercials,
  dispatch,
  colors,
  showRefresh = true,
  navigation,
}) => {
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
        contentInset={{bottom: 200}}
        style={{marginBottom: 150}}>
        <ProductCategoryVerticalWidget
          elements={categories}
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

function mapStateToProps(state) {
  return {
    categories: state.categories,
    commercials: state.commercials,
    show_commercials: state.settings.show_commercials,
    colors: state.settings.colors,
  };
}

PageOneScreen.navigationOptions = ({navigation}) => ({
  // headerTitle: navigation.state.params.title
  // title : has(navigation.state,'params') ? navigation.state.params.title : I18n.t('categories')
  title: I18n.t('categories'),
});

export default connect(mapStateToProps)(PageOneScreen);

PageOneScreen.propTypes = {
  categories: PropTypes.array,
  commercials: PropTypes.array,
  show_commercials: PropTypes.bool,
};
