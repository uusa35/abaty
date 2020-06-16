import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import CompaniesList from '../../components/Lists/CompaniesList';
import BgContainer from '../../components/containers/BgContainer';
import {shuffle} from 'lodash';
import {ESCRAP} from './../../../app.json';

const CompanyIndexScreen = () => {
  const {companies, searchParams} = useSelector((state) => state);
  return (
    <BgContainer showImage={false}>
      <CompaniesList
        elements={ESCRAP ? shuffle(companies) : companies}
        searchParams={searchParams}
        showMore={true}
      />
    </BgContainer>
  );
};

export default CompanyIndexScreen;

const styles = StyleSheet.create({});
