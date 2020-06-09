import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import CompaniesList from '../../components/Lists/CompaniesList';
import BgContainer from '../../components/containers/BgContainer';
import {reAuthenticate} from '../../redux/actions/user';
import ElementsVerticalList from '../../components/Lists/ElementsVerticalList';
import I18n from './../../I18n';

const FavoriteCompanyIndexScreen = () => {
  const {auth, guest} = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!guest) {
      dispatch(reAuthenticate());
    }
  }, []);

  return (
    <BgContainer showImage={false}>
      <ElementsVerticalList
        elements={auth.myFannedList}
        searchParams={{}}
        showMore={true}
        type="favoriteCompanies"
        noElementsTitle={I18n.t('no_companies_favorites')}
      />
    </BgContainer>
  );
};

export default FavoriteCompanyIndexScreen;

FavoriteCompanyIndexScreen.propTypes = {
  companies: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({});
