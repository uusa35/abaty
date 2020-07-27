import React, {Fragment} from 'react';
import {View, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import I18n from './../../I18n';
import TagsList from '../../components/widgets/tag/TagsList';
import {ABATI, ESCRAP, MALLR, HOMEKEY} from '../../../app';
import ProductCategoryVerticalWidget from '../../components/widgets/category/ProductCategoryVerticalWidget';
import ClassifiedCategoryVerticalWidget from '../../components/widgets/category/ClassifiedCategoryVerticalWidget';
import ProductSearchForm from '../../components/widgets/search/ProductSearchForm';

const SearchScreen = ({}) => {
  const {homeCategories, tags} = useSelector((state) => state);
  return (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      <ProductSearchForm />
      <View>
        {ABATI || MALLR ? (
          <Fragment>
            <TagsList title={I18n.t('tags')} elements={tags} type="products" />
            <ProductCategoryVerticalWidget
              elements={homeCategories}
              showChildren={true}
              title={I18n.t('categories')}
            />
          </Fragment>
        ) : null}
        {ESCRAP || HOMEKEY ? (
          <Fragment>
            <TagsList
              title={I18n.t('tags')}
              elements={tags}
              type="classifieds"
            />
            <ClassifiedCategoryVerticalWidget
              elements={homeCategories}
              title={I18n.t('categories')}
            />
          </Fragment>
        ) : null}
      </View>
    </ScrollView>
  );
};

SearchScreen.navigationOptions = ({navigation}) => ({
  // headerTitle: navigation.state.params.title
  // title : navigation.state.params.title
  title: I18n.t('search'),
});

export default SearchScreen;

SearchScreen.propTypes = {
  categories: PropTypes.array,
  commercials: PropTypes.array,
  show_commercials: PropTypes.bool,
};
