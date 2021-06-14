import React, {useState, useContext, useCallback, useMemo} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {
  iconSizes,
  width,
  height,
  text,
  bottomContentInset,
} from '../../constants/sizes';
import {Icon} from 'react-native-elements';
import {isRTL} from '../../I18n';

const ModalBackContainer = ({
  children,
  title = null,
  toggleVisible = false,
  setToggleVisible,
  enableTransparent = false,
}) => {
  return (
    <Modal
      transparent={enableTransparent}
      visible={toggleVisible}
      animationType={'slide'}
      presentationStyle="fullScreen">
      <SafeAreaView style={{backgroundColor: 'white'}}>
        <View style={styles.iconModalWrapper}>
          <Icon
            name={isRTL ? 'chevron-thin-right' : 'chevron-thin-left'}
            type="entypo"
            size={iconSizes.small}
            style={{zIndex: 999}}
            onPress={() => setToggleVisible(false)}
            hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}
          />
          {title ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: text.font,
                  fontSize: text.medium,
                  textAlign: 'center',
                  paddingRight: '10%',
                }}>
                {title}
              </Text>
            </View>
          ) : null}
        </View>
      </SafeAreaView>
      <ScrollView
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="none"
        horizontal={false}
        automaticallyAdjustContentInsets={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        // stickyHeaderIndices={[0]}
        onEndReachedThreshold={1}
        contentInset={{bottom: bottomContentInset}}
        contentContainerStyle={{
          paddingLeft: 10,
          paddingRight: 10,
          flexGrow: 1,
        }}>
        <View
          style={{
            padding: 5,
            margin: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {children}
        </View>
      </ScrollView>
    </Modal>
  );
};

export default ModalBackContainer;

const styles = StyleSheet.create({
  iconModalWrapper: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgrey',
    paddingTop: 15,
    backgroundColor: 'white',
    paddingBottom: 10,
    // marginBottom: 10,
  },
});
