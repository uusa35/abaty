import I18n, {isRTL} from '../../I18n';
import {iconSizes, text} from '../../constants/sizes';
import {Icon, Input} from 'react-native-elements';
import React from 'react';

const TopSearchInput = ({search, setSearch}) => {
  return (
    <Input
      placeholder={I18n.t('search')}
      inputStyle={{
        fontFamily: text.font,
        fontSize: text.small,
        textAlign: isRTL ? 'right' : 'left',
      }}
      rightIcon={() => (
        <Icon
          onPress={() => setSearch('')}
          hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}
          type="ionicon"
          name={search.length > 0 ? 'ios-close' : 'ios-search'}
          color="#c4c4c4"
          size={iconSizes.smaller}
        />
      )}
      containerStyle={{marginTop: 5, marginBottom: 5, alignSelf: 'center'}}
      inputContainerStyle={{
        backgroundColor: '#E4E4E5',
        borderRadius: 5,
        paddingRight: 15,
        paddingLeft: 15,
        borderColor: '#E4E4E5',
      }}
      onChangeText={(e) => setSearch(e)}
      value={search}
    />
  );
};

export default TopSearchInput;
