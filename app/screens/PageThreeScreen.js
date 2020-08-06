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
  const {companies, country} = useSelector((state) => state);
  const dispatch = useDispatch();
  const [currentElements, setCurrentElements] = useState([]);

  useEffect(() => {
    dispatch(getSearchCompanies({searchParams: {country_id: country.id}}));
  }, []);

  useMemo(() => {
    // if (!validate.isEmpty(companies)) {
    setCurrentElements(companies);
    // }
  }, [companies]);

  return (
    <BgContainer>
      <ElementsVerticalList
        elements={currentElements}
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

PageThreeScreen.navigationOptions = ({navigation}) => ({
  // headerTitle: navigation.state.params.title
  // title : has(navigation.state,'params') ? navigation.state.params.title : I18n.t('categories')
  title: I18n.t('companies'),
});

export default PageThreeScreen;

const styles = StyleSheet.create({});
