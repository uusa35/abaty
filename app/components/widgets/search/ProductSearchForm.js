import React, {useState, useContext} from 'react';
import I18n, {isRTL} from '../../../I18n';
import {Icon, Input} from 'react-native-elements';
import {iconSizes, text, width} from '../../../constants/sizes';
import {DispatchContext} from '../../../redux/DispatchContext';
import {getSearchProducts} from '../../../redux/actions/product';
import {setSearchParams} from '../../../redux/actions';

const ProductSearchForm = () => {
  const {dispatch} = useContext(DispatchContext);
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
          type="ionicon"
          name="ios-search"
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
