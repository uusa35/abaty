import React, {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import BrandList from '../components/widgets/brand/BrandList';
import {SafeAreaView} from 'react-navigation';
import CategoriesList from '../components/Lists/CategoriesList';
import CommercialSliderWidget from '../components/widgets/CommercialSliderWidget';
import I18n from './../I18n';
const PageOneScreen = ({
  homeCategories,
  commercials,
  show_commercials,
  dispatch,
  colors
}) => {
  useEffect(() => {
    navigation.setParams({title: I18n.t('home_categories')});
  });

  return (
    <View style={{flex: 1}}>
      <View
        animation="bounceIn"
        easing="ease-out"
        style={{flex: show_commercials ? 0.8 : 1}}>
        <CategoriesList
          elements={homeCategories}
          columns={1}
          dispatch={dispatch}
          colors={colors}
        />
      </View>
      {show_commercials ? (
        <View style={{flex: 0.2}}>
          <CommercialSliderWidget commercials={commercials} />
        </View>
      ) : null}
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

PageOneScreen.navigationOptions = ({navigation}) => ({
  headerTitle: navigation.state.params.title
});

export default connect(mapStateToProps)(PageOneScreen);

PageOneScreen.propTypes = {
  categories: PropTypes.array,
  commercials: PropTypes.array,
  show_commercials: PropTypes.bool
};
