import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import I18n, {isRTL} from '../../../I18n';
import {Button, Icon, Input} from 'react-native-elements';
import {iconSizes, text} from '../../../constants/sizes';
import {getSearchProducts} from '../../../redux/actions/product';
import {useDispatch, useSelector} from 'react-redux';
import DesigneratBtn from '../Button/DesigneratBtn';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';

const ProductSearchForm = ({showBtn = false}) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const handleSubmit = () => {
    dispatch(getSearchProducts({searchParams: {search}, redirect: true}));
  };
  return (
    <View style={{width: '100%'}}>
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
            onPress={() => handleSubmit()}
          />
        }
        containerStyle={{alignSelf: 'center', marginBottom: 0}}
        inputContainerStyle={{
          backgroundColor: '#E4E4E5',
          borderRadius: 5,
          paddingRight: 15,
          paddingLeft: 15,
          borderColor: '#E4E4E5',
        }}
        onChangeText={text => setSearch(text)}
      />
      {showBtn && (
        <DesigneratBtn
          handleClick={() => handleSubmit()}
          title={I18n.t('search')}
        />
      )}
    </View>
  );
};

export default ProductSearchForm;
