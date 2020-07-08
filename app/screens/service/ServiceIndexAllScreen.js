import React, {useEffect, useState, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {getSearchServices} from '../../redux/actions/service';
import BgContainer from '../../components/containers/BgContainer';
import ElementsHorizontalList from '../../components/Lists/ElementsHorizontalList';

const ServiceIndexAllScreen = () => {
  const {services, searchParams} = useSelector((state) => state);
  const dispatch = useDispatch();
  const [currentSearchParams, setCurrentSearchParams] = useState({});
  const [currentElements, setCurrentElements] = useState([]);

  useEffect(() => {
    dispatch(getSearchServices({searchParams: {}}));
  }, []);

  useMemo(() => {
    setCurrentSearchParams(searchParams);
    setCurrentElements(services);
  }, []);

  return (
    <BgContainer>
      <ElementsHorizontalList
        elements={currentElements}
        type="service"
        searchElements={currentSearchParams}
        columns={2}
        showRefresh={true}
        showFooter={true}
        showSearch={false}
        showSortSearch={false}
        showProductsFilter={true}
        showTitleIcons={true}
        showMore={true}
        showName={true}
      />
    </BgContainer>
  );
};

export default ServiceIndexAllScreen;

const styles = StyleSheet.create({});
