import React from 'react';
import {connect} from 'react-redux';
import CategoriesList from '../../components/Lists/CategoriesList';
import CommercialSliderWidget from '../../components/widgets/CommercialSliderWidget';
import PropTypes from 'prop-types';
import {View} from 'react-native-animatable';
import {HOMEKEY, ABATI, MALLR, ESCRAP} from './../../../app';

const CategoryClassifiedIndexScreen = ({
  homeClassifiedCategories,
  commercials,
  show_commercials,
}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        animation="bounceIn"
        easing="ease-out"
        useNativeDriver={true}
        style={{flex: show_commercials ? 0.8 : 1, backgroundColor: 'white'}}>
        <CategoriesList
          elements={homeClassifiedCategories}
          columns={2}
          showBtn={true}
          type="classified"
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
    homeClassifiedCategories: state.homeClassifiedCategories,
    commercials: state.commercials,
    show_commercials: state.settings.show_commercials,
  };
}

export default connect(mapStateToProps)(CategoryClassifiedIndexScreen);

CategoryClassifiedIndexScreen.propTypes = {
  categories: PropTypes.array,
  commercials: PropTypes.array,
  show_commercials: PropTypes.bool,
};
