import React from 'react';
import I18n, {isRTL} from '../../../I18n';
import {Icon, Input} from 'react-native-elements';
import {iconSizes, text} from '../../../constants/sizes';
import {getSearchClassifieds} from '../../../redux/actions/classified';
import {HIDE_SEARCH_MODAL} from '../../../redux/actions/types';
import {useDispatch} from 'react-redux';

const ClassifiedSearchForm = ({search, setSearch}) => {
  const dispatch = useDispatch();

  return (
    <Input
      rightIcon={
        <Icon
          type="antdesign"
          name="search1"
          size={iconSizes.smaller}
          color="#c4c4c4"
          hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
          onPress={() => {
            dispatch({type: HIDE_SEARCH_MODAL});
            dispatch(
              getSearchClassifieds({searchParams: {search}, redirect: true}),
            );
          }}
        />
      }
      containerStyle={{
        backgroundColor: '#E4E4E5',
        height: 50,
        marginBottom: 10,
      }}
      inputContainerStyle={{
        backgroundColor: '#E4E4E5',
        paddingRight: 15,
        paddingLeft: 15,
        borderColor: '#E4E4E5',
        height: 50,
      }}
      placeholder={I18n.t('search')}
      inputStyle={{
        fontFamily: text.font,
        fontSize: text.small,
        textAlign: isRTL ? 'right' : 'left',
      }}
      onChangeText={(text) => setSearch(text)}
    />
  );
};

export default ClassifiedSearchForm;
