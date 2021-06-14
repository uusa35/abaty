import React, {useState, useContext, Fragment} from 'react';
import {ImageBackground} from 'react-native';
import {View} from 'react-native-animatable';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {width} from '../../../constants/sizes';
import CompanySearchForm from './CompanySearchForm';
import {useSelector} from 'react-redux';

const EscrapSearchTab = () => {
  const {companySearchTextInputModal} = useSelector(state => state);
  const [search, setSearch] = useState('');

  return (
    <View
      style={{
        height: 80,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {companySearchTextInputModal && (
        <View
          animation="bounceInLeft"
          easing="ease-in"
          useNativeDriver={true}
          style={{
            width: '90%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CompanySearchForm search={search} setSearch={setSearch} />
        </View>
      )}
    </View>
  );
};

export default EscrapSearchTab;
