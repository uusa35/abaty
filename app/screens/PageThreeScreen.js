import React, {useEffect, useState, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import I18n from '../I18n';
import {iconSizes, text} from '../constants/sizes';
import ElementsVerticalList from '../components/Lists/ElementsVerticalList';
import BgContainer from '../components/containers/BgContainer';

const PageThreeScreen = ({homeCompanies}) => {
  return (
    <BgContainer>
      <ElementsVerticalList
        elements={homeCompanies}
        showMore={true}
        showFooter={true}
        searchParams={{is_company: 1}}
        iconSize={iconSizes.large}
        textSize={text.medium}
        type="designer"
      />
    </BgContainer>
  );
};

function mapStateToProps(state) {
  return {
    homeCompanies: state.homeCompanies,
  };
}

PageThreeScreen.navigationOptions = ({navigation}) => ({
  // headerTitle: navigation.state.params.title
  // title : has(navigation.state,'params') ? navigation.state.params.title : I18n.t('categories')
  title: I18n.t('companies'),
});

export default connect(mapStateToProps)(PageThreeScreen);

PageThreeScreen.propTypes = {
  companies: PropTypes.array.isRequired,
};
const styles = StyleSheet.create({});
