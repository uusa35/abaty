import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {connect} from 'react-redux';
import CategoriesList from '../components/Lists/CategoriesList';
import {NavContext} from '../redux/NavContext';
import CommercialSliderWidget from '../components/widgets/CommercialSliderWidget';
import PropTypes from 'prop-types';
import {View} from 'react-native-animatable';

class CategoryIndexScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {columns} = this.props.navigation.state.params;
    const {navigation, commercials, categories, show_commercials} = this.props;
    return (
      <NavContext.Provider value={{navigation}}>
        <ScrollView style={{flex: 0.8}}>
          <View animation="bounceIn" easing="ease-out">
            <CategoriesList elements={categories} columns={columns} />
          </View>
        </ScrollView>
        {show_commercials ? (
          <View style={{flex: 0.2}}>
            <CommercialSliderWidget commercials={commercials} />
          </View>
        ) : null}
      </NavContext.Provider>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
    commercials: state.commercials,
    show_commercials: state.settings.show_commercials
  };
}

export default connect(mapStateToProps)(CategoryIndexScreen);

CategoryIndexScreen.propTypes = {
  categories: PropTypes.array,
  commercials: PropTypes.array,
  show_commercials: PropTypes.bool
};
