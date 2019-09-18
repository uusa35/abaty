import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import BrandList from '../components/widgets/brand/BrandList';
import {SafeAreaView} from 'react-navigation';
import CategoriesList from '../components/Lists/CategoriesList';
import CommercialSliderWidget from '../components/widgets/CommercialSliderWidget';
import I18n from './../I18n';
import {first} from 'lodash';
import SearchForm from '../components/SearchForm';

const SearchScreen = ({
  homeCategories,
  commercials,
  show_commercials,
  dispatch,
  colors,
  navigation
}) => {
  return (
    <View style={{flex: 1}}>
      <SearchForm />
    </View>
  );
};

function mapStateToProps(state) {
  return {
    homeCategories: state.homeCategories,
    commercials: state.commercials,
    show_commercials: state.settings.show_commercials,
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
