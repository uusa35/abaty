import React from 'react';
import {connect} from 'react-redux';
import CategoriesList from '../../components/Lists/CategoriesList';
import CommercialSliderWidget from '../../components/widgets/CommercialSliderWidget';
import PropTypes from 'prop-types';
import {View} from 'react-native-animatable';
import SimpleSpinner from '../../components/SimpleSpinner';

const CategoryIndexScreen = ({
  homeCategories,
  commercials,
  show_commercials,
}) => {
  return (
    <View style={{flex: 1}}>
      <View
        animation="bounceIn"
        easing="ease-out"
        style={{flex: show_commercials ? 0.8 : 1}}>
        <CategoriesList elements={homeCategories} columns={2} type="product" />
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
  };
}

export default connect(mapStateToProps)(CategoryIndexScreen);

CategoryIndexScreen.propTypes = {
  categories: PropTypes.array,
  commercials: PropTypes.array,
  show_commercials: PropTypes.bool,
};
