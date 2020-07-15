import React, {useState} from 'react';
import {isIOS} from '../../constants';
import {bottomContentInset, iconSizes} from '../../constants/sizes';
import {KeyboardAvoidingView, RefreshControl, ScrollView} from 'react-native';

const KeyBoardContainer = ({children, handleRefresh = null}) => {
  const [refresh, setRefresh] = useState(false);
  return (
    <KeyboardAvoidingView
      behavior={isIOS ? 'padding' : 'height'}
      keyboardVerticalOffset={iconSizes.largest}
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
      }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => (handleRefresh ? handleRefresh() : null)}
          />
        }
        horizontal={false}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentInset={{bottom: bottomContentInset}}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyBoardContainer;
