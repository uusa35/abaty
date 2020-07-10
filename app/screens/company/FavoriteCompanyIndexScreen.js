import React, {useEffect, useState, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import BgContainer from '../../components/containers/BgContainer';
import {reAuthenticate} from '../../redux/actions/user';
import ElementsVerticalList from '../../components/Lists/ElementsVerticalList';
import {View} from 'react-native-animatable';

const FavoriteCompanyIndexScreen = () => {
  const {auth, guest} = useSelector((state) => state);
  const dispatch = useDispatch();
  const [currentFannedList, setCurrentFannedList] = useState(auth.myFannedList);

  useEffect(() => {
    if (!guest) {
      dispatch(reAuthenticate());
    }
  }, []);

  useEffect(() => {
    setCurrentFannedList(auth.myFannedList);
  }, [auth]);

  return (
    <BgContainer enableMargin={true} marginVal="21%">
      <View
        animation="bounceIn"
        easing="ease-out"
        useNativeDriver={true}
        style={{flex: 1, marginTop: '5%'}}>
        <ElementsVerticalList
          elements={currentFannedList}
          searchParams={{}}
          showMore={false}
          showRefresh={!guest}
          showSearch={!guest}
          showFooter={true}
          type="company"
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
