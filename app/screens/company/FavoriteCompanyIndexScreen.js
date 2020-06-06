import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import CompaniesList from '../../components/Lists/CompaniesList';
import BgContainer from '../../components/containers/BgContainer';
import {reAuthenticate} from '../../redux/actions/user';

const FavoriteCompanyIndexScreen = () => {
  const {auth} = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.id) {
      dispatch(reAuthenticate());
    }
  }, []);

  return (
    <BgContainer showImage={false}>
      <CompaniesList
        elements={auth.myFannedList}
        searchParams={{}}
        showMore={false}
      />
    </BgContainer>
  );
};

export default FavoriteCompanyIndexScreen;

FavoriteCompanyIndexScreen.propTypes = {
  companies: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({});
