import React, {useState, useContext} from 'react';
import I18n, {isRTL} from '../../../I18n';
import {Icon, Input} from 'react-native-elements';
import {text} from '../../../constants/sizes';
import {getSearchProducts} from '../../../redux/actions/product';
import {useDispatch} from 'react-redux';

const DesignerSearchForm = () => {
  const dispatch = useDispatch();
  [search, setSearch] = useState('');
  return (
    <Input
      placeholder={I18n.t('search')}
      rightIcon={
        <Icon
          type="font-awesome"
          name="search"
          size={18}
          color="#c4c4c4"
          hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
          onPress={() =>
            dispatch(
              getSearchProducts({searchParams: {search}, redirect: true}),
            )
          }
        />
      }
      containerStyle={{marginTop: 5, marginBottom: 5}}
      inputContainerStyle={{
        backgroundColor: '#E4E4E5',
        borderRadius: 30,
        paddingRight: 15,
        paddingLeft: 15,
        borderColor: '#E4E4E5',
      }}
      inputStyle={{fontFamily: text.font, textAlign: isRTL ? 'right' : 'left'}}
      onChangeText={text => setSearch(text)}
    />
  );
};

export default DesignerSearchForm;
