import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import CompaniesList from '../../components/Lists/CompaniesList';
import BgContainer from '../../components/containers/BgContainer';

const CompanyIndexScreen = () => {
  const {companies, searchParams} = useSelector((state) => state);
  return (
    <BgContainer showImage={false}>
      <CompaniesList
        elements={companies}
        searchParams={searchParams}
        showMore={true}
      />
    </BgContainer>
  );
};

export default CompanyIndexScreen;

const styles = StyleSheet.create({});
