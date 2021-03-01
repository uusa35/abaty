import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import CelebritiesList from '../../components/Lists/CelebritiesList';
import BgContainer from '../../components/containers/BgContainer';

const CelebrityIndexScreen = () => {
  const {celebrities, searchParams} = useSelector((state) => state);
  return (
    <BgContainer showImage={false}>
      <CelebritiesList
        elements={celebrities}
        searchElements={searchParams}
        showMore={true}
      />
    </BgContainer>
  );
};

export default CelebrityIndexScreen;

const styles = StyleSheet.create({});
