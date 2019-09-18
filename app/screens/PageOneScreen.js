import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import CategoriesList from '../components/Lists/CategoriesList';
import CommercialSliderWidget from '../components/widgets/CommercialSliderWidget';
import I18n from './../I18n';
import {first, has} from 'lodash';
import UserCategoriesInfoWidget from '../components/widgets/user/UserCategoriesInforWidget';

const PageOneScreen = ({
  homeCategories,
  commercials,
  show_commercials,
  dispatch,
  colors,
  navigation
}) => {
  [title, setTitle] = useState('');

  useEffect(() => {
    navigation.setParams({title: I18n.t('categories')});
  }, [title]);

  return (
    <View style={{flex: 1}}>
      <View
        animation="bounceIn"
        easing="ease-out"
        style={{flex: show_commercials ? 0.8 : 1}}>
        <UserCategoriesInfoWidget
          elements={homeCategories}
          colors={colors}
          title={I18n.t('categories')}
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
  // headerTitle: navigation.state.params.title
  // title : has(navigation.state,'params') ? navigation.state.params.title : I18n.t('categories')
  title: I18n.t('categories')
});

export default connect(mapStateToProps)(PageOneScreen);

PageOneScreen.propTypes = {
  categories: PropTypes.array,
  commercials: PropTypes.array,
  show_commercials: PropTypes.bool
};
