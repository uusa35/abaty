import React from 'react';
import {connect} from 'react-redux';
import CategoriesList from '../components/Lists/CategoriesList';
import CommercialSliderWidget from '../components/widgets/CommercialSliderWidget';
import PropTypes from 'prop-types';
import {View} from 'react-native-animatable';
import {
  categoriesSelector,
  commercialsSelector
} from '../redux/selectors/collections';

const CategoryIndexScreen = ({
  categories,
  commercials,
  show_commercials,
  dispatch
}) => {
  return (
    <View style={{flex: 1}}>
      <View
        animation="bounceIn"
        easing="ease-out"
        style={{flex: show_commercials ? 0.8 : 1}}>
        <CategoriesList elements={categories} columns={1} dispatch={dispatch} />
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
    categories: categoriesSelector(state),
    commercials: commercialsSelector(state),
    show_commercials: state.settings.show_commercials
  };
}

export default connect(mapStateToProps)(CategoryIndexScreen);

CategoryIndexScreen.propTypes = {
  categories: PropTypes.array,
  commercials: PropTypes.array,
  show_commercials: PropTypes.bool
};
