import React from 'react';
import {connect} from 'react-redux';
import CategoriesList from '../../components/Lists/CategoriesList';
import CommercialSliderWidget from '../../components/widgets/CommercialSliderWidget';
import PropTypes from 'prop-types';
import {View} from 'react-native-animatable';
import {HOMEKEY, ABATI, MALLR, ESCRAP} from './../../../app';

const CategoryUserIndexScreen = ({
  homeUserCategories,
  commercials,
  show_commercials,
}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        animation="bounceIn"
        easing="ease-out"
        style={{flex: show_commercials ? 0.8 : 1, backgroundColor: 'white'}}>
        <CategoriesList
          elements={homeUserCategories}
          columns={2}
          showBtn={true}
          type="company"
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
    homeUserCategories: state.homeUserCategories,
    commercials: state.commercials,
    show_commercials: state.settings.show_commercials,
  };
}

export default connect(mapStateToProps)(CategoryUserIndexScreen);

CategoryUserIndexScreen.propTypes = {
  categories: PropTypes.array,
  commercials: PropTypes.array,
  show_commercials: PropTypes.bool,
};
