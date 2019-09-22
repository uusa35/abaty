import React from 'react';
import {View, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import I18n from './../I18n';
import SearchForm from '../components/SearchForm';
import TagsList from '../components/widgets/tag/TagsList';
import {ABATI, ESCRAP, MALLR} from '../../app';
import ProductCategoryVerticalWidget from '../components/widgets/category/ProductCategoryVerticalWidget';
import ClassifiedCategoryVerticalWidget from '../components/widgets/category/ClassifiedCategoryVerticalWidget';

const SearchScreen = ({homeCategories, tags, dispatch, colors, navigation}) => {
  return (
    <ScrollView style={{flex: 1}}>
      <SearchForm />
      <TagsList
        title={I18n.t('tags')}
        elements={tags}
        dispatch={dispatch}
        colors={colors}
      />
      <View>
        {ABATI || MALLR ? (
          <ProductCategoryVerticalWidget
            elements={homeCategories}
            dispatch={dispatch}
            title={I18n.t('categories')}
            colors={colors}
          />
        ) : null}
        {ESCRAP || MALLR ? (
          <ClassifiedCategoryVerticalWidget
            elements={homeCategories}
            dispatch={dispatch}
            title={I18n.t('categories')}
            colors={colors}
          />
        ) : null}
      </View>
    </ScrollView>
  );
};

function mapStateToProps(state) {
  return {
    homeCategories: state.homeCategories,
    tags: state.tags,
    colors: state.settings.colors
  };
}

SearchScreen.navigationOptions = ({navigation}) => ({
  // headerTitle: navigation.state.params.title
  // title : navigation.state.params.title
  title: I18n.t('search')
});

export default connect(mapStateToProps)(SearchScreen);

SearchScreen.propTypes = {
  categories: PropTypes.array,
  commercials: PropTypes.array,
  show_commercials: PropTypes.bool
};
