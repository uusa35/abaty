import React, {useState, useContext} from 'react';
import {ImageBackground} from 'react-native';
import {View} from 'react-native-animatable';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {width} from '../../../constants/sizes';
import CompanySearchForm from './CompanySearchForm';
import {useSelector} from 'react-redux';

const EscrapSearchTab = () => {
  const {mainBg} = useContext(GlobalValuesContext);
  const {companySearchTextInputModal} = useSelector((state) => state);
  const [search, setSearch] = useState('');

  return (
    <ImageBackground
      source={{uri: mainBg}}
      style={{width, alignSelf: 'center', height: 120}}
      resizeMode="cover">
      {companySearchTextInputModal && (
        <View
          animation="bounceInLeft"
          easing="ease-in"
          useNativeDriver={true}
          style={{
            backgroundColor: 'transparent',
            opacity: 1,
            width: '90%',
            alignSelf: 'center',
            paddingTop: '10%',
            // marginTop: '15%',
          }}>
          <CompanySearchForm search={search} setSearch={setSearch} />
        </View>
      )}
    </ImageBackground>
  );
};

export default EscrapSearchTab;
