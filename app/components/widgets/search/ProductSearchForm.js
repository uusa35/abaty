import React, {useState, useContext} from 'react';
import I18n, {isRTL} from '../../../I18n';
import {Icon, Input} from 'react-native-elements';
import {iconSizes, text} from '../../../constants/sizes';
import {getSearchProducts} from '../../../redux/actions/product';
import {setSearchParams} from '../../../redux/actions';
import {useDispatch} from 'react-redux';

const ProductSearchForm = () => {
  const dispatch = useDispatch();
  [search, setSearch] = useState('');

  return (
    <Input
      placeholder={I18n.t('search')}
      inputStyle={{
        fontFamily: text.font,
        fontSize: text.small,
        textAlign: isRTL ? 'right' : 'left',
      }}
      rightIcon={
        <Icon
          type="antdesign"
          name="search1"
          size={iconSizes.smaller}
          color="#c4c4c4"
          hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}
          onPress={() =>
            dispatch(
              getSearchProducts({searchParams: {search}, redirect: true}),
            )
          }
        />
      }
      containerStyle={{marginTop: 5, marginBottom: 5, alignSelf: 'center'}}
      inputContainerStyle={{
        backgroundColor: '#E4E4E5',
        borderRadius: 5,
        paddingRight: 15,
        paddingLeft: 15,
        borderColor: '#E4E4E5',
      }}
      onChangeText={(text) => setSearch(text)}
    />
  );
};

export default ProductSearchForm;
