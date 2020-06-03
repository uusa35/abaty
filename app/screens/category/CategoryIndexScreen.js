import React from 'react';
import {connect} from 'react-redux';
import CategoriesList from '../../components/Lists/CategoriesList';
import CommercialSliderWidget from '../../components/widgets/CommercialSliderWidget';
import PropTypes from 'prop-types';
import {View} from 'react-native-animatable';
import {ABATI, MALLR, EXPO} from './../../../app';
import BgContainer from '../../components/containers/BgContainer';

const CategoryIndexScreen = ({
  homeCategories,
  commercials,
  show_commercials,
}) => {
  return (
    <BgContainer showImage={false}>
      <View style={{flex: 1}}>
        <View
          animation="bounceIn"
          easing="ease-out"
          style={{flex: show_commercials ? 0.8 : 1, backgroundColor: 'white'}}>
          <CategoriesList
            elements={homeCategories}
            columns={2}
            showBtn={true}
            type={ABATI || MALLR || EXPO ? 'product' : 'classified'}
          />
        </View>
        {show_commercials ? (
          <View style={{flex: 0.2}}>
            <CommercialSliderWidget commercials={commercials} />
          </View>
        ) : null}
      </View>
    </BgContainer>
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
