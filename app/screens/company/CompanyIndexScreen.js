import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import BgContainer from '../../components/containers/BgContainer';
import ElementsHorizontalList from '../../components/Lists/ElementsHorizontalList';

const CompanyIndexScreen = () => {
  const {companies, searchParams} = useSelector((state) => state);

  return (
    <BgContainer showImage={false}>
      <ElementsHorizontalList
        type="company"
        elements={companies}
        searchParams={searchParams}
        showRefresh={true}
        showFooter={true}
        showSearch={true}
        showTitleIcons={true}
        showMore={true}
      />
    </BgContainer>
  );
};

export default CompanyIndexScreen;

const styles = StyleSheet.create({});
