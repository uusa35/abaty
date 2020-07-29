import React, {useState} from 'react';
import {isIOS} from '../../constants';
import {bottomContentInset, iconSizes} from '../../constants/sizes';
import {KeyboardAvoidingView, RefreshControl, ScrollView} from 'react-native';

const KeyBoardContainer = ({
  children,
  handleRefresh = null,
  behavior = 'padding',
}) => {
  const [refresh, setRefresh] = useState(false);
  return (
    <KeyboardAvoidingView
      behavior={isIOS ? behavior : 'height'}
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
        contentInset={{bottom: bottomContentInset}}
        horizontal={false}
        scrollEnabled={true}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{
          paddingBottom: bottomContentInset,
          backgroundColor: 'transparent',
        }}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyBoardContainer;
