import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import I18n from '../I18n';
import CompaniesList from '../components/Lists/CompaniesList';

const PageThreeScreen = ({companies, dispatch, navigation}) => {
  [title, setTitle] = useState('');

  useEffect(() => {
    navigation.setParams({title: I18n.t('companies')});
  }, [title]);

  return (
    <CompaniesList
      dispatch={dispatch}
      elements={companies}
      showMore={true}
      searchParams={{is_company: 1}}
    />
  );
};

function mapStateToProps(state) {
  return {
    companies: state.companies
  };
}

PageThreeScreen.navigationOptions = ({navigation}) => ({
  // headerTitle: navigation.state.params.title
  // title : has(navigation.state,'params') ? navigation.state.params.title : I18n.t('categories')
  title: I18n.t('companies')
});

export default connect(mapStateToProps)(PageThreeScreen);

PageThreeScreen.propTypes = {
  companies: PropTypes.array.isRequired
};
const styles = StyleSheet.create({});
