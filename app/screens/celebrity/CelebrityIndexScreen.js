import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import CelebritiesList from '../../components/Lists/CelebritiesList';

const CelebrityIndexScreen = () => {
  const {celebrities, searchParams} = useSelector((state) => state);
  return (
    <CelebritiesList
      elements={celebrities}
      searchElements={searchParams}
      showMore={true}
    />
  );
};

export default CelebrityIndexScreen;

const styles = StyleSheet.create({});
