import React, {useEffect, useState, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import I18n from '../I18n';
import {iconSizes, text} from '../constants/sizes';
import ElementsVerticalList from '../components/Lists/ElementsVerticalList';
import BgContainer from '../components/containers/BgContainer';
import {getSearchCompanies} from '../redux/actions/user';

const PageThreeScreen = () => {
  const {companies, country} = useSelector(state => state);
  const dispatch = useDispatch();
  const [currentElements, setCurrentElements] = useState([]);

  useEffect(() => {
    dispatch(
      getSearchCompanies({
        searchParams: {country_id: country.id, is_company: 1},
      }),
    );
  }, []);

  useMemo(() => {
    setCurrentElements(companies);
  }, [companies]);

  return (
    <BgContainer showImage={true}>
      <ElementsVerticalList
        elements={currentElements}
        showMore={true}
        showRefresh={true}
        showFooter={true}
        scrollEnabled={true}
        searchParams={{is_company: 1}}
        iconSize={iconSizes.large}
        textSize={text.medium}
        type="company"
        groupName={'companies'}
      />
    </BgContainer>
  );
};

export default PageThreeScreen;

const styles = StyleSheet.create({});
