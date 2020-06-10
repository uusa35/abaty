import React, {useState, useContext} from 'react';
import I18n, {isRTL} from '../../../I18n';
import {Icon, Input} from 'react-native-elements';
import {iconSizes, text} from '../../../constants/sizes';
import {getSearchCompanies} from '../../../redux/actions/user';
import {useDispatch} from 'react-redux';

const CompanySearchForm = ({title = 'search'}) => {
  const dispatch = useDispatch();
  [search, setSearch] = useState('');
  return (
    <Input
      placeholder={I18n.t(title)}
      rightIcon={
        <Icon
          type="ionicon"
          name={search.length > 0 ? 'ios-funnel' : 'ios-search'}
          size={iconSizes.smaller}
          color="#c4c4c4"
          hitSlop={{
            top: iconSizes.largest,
            bottom: iconSizes.largest,
            left: iconSizes.largest,
            right: iconSizes.largest,
          }}
          onPress={() =>
            dispatch(
              getSearchCompanies({
                searchParams: {slug: search},
                name: I18n.t('search'),
                redirect: true,
              }),
            )
          }
        />
      }
      containerStyle={{marginTop: 5, marginBottom: 5}}
      inputContainerStyle={{
        backgroundColor: '#E4E4E5',
        paddingRight: 15,
        paddingLeft: 15,
        borderColor: '#E4E4E5',
      }}
      inputStyle={{fontFamily: text.font, textAlign: isRTL ? 'right' : 'left'}}
      onChangeText={(text) => setSearch(text)}
    />
  );
};

export default CompanySearchForm;
