import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import BgContainer from '../../components/containers/BgContainer';
import {reAuthenticate} from '../../redux/actions/user';
import ElementsVerticalList from '../../components/Lists/ElementsVerticalList';
import I18n from './../../I18n';
import {View} from 'react-native-animatable';

const FavoriteCompanyIndexScreen = () => {
  const {auth, guest} = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!guest) {
      dispatch(reAuthenticate());
    }
  }, []);

  return (
    <BgContainer>
      <View
        animation="bounceIn"
        easing="ease-out"
        useNativeDriver={true}
        style={{flex: 1, marginTop: '5%'}}>
        <ElementsVerticalList
          elements={!guest ? auth.myFannedList : []}
          searchParams={{}}
          showMore={true}
          type="favoriteCompanies"
          noElementsTitle={I18n.t('no_companies_favorites')}
        />
      </View>
    </BgContainer>
  );
};

export default FavoriteCompanyIndexScreen;

FavoriteCompanyIndexScreen.propTypes = {
  // companies: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({});
