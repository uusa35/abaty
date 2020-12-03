import React, {useContext} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  Linking,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {isRTL} from '../../../I18n';
import {isIOS} from '../../../constants';
import {bottomContentInset, text} from '../../../constants/sizes';
import {map, isNull} from 'lodash';
import validate from 'validate.js';
import {useSelector} from 'react-redux';

const PagesList = ({showTitle = true, showArrow = true, title}) => {
  const {pages, colors} = useSelector((state) => state.settings);
  return (
    <ScrollView
      horizontal={false}
      style={{width: '100%', marginTop: 15}}
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentInset={{bottom: bottomContentInset}}>
      {!validate.isEmpty(pages) && (
        <View
          key={elements.length}
          style={{width: '100%', alignSelf: 'center'}}>
          {showTitle ? (
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.large,
                marginBottom: 10,
                textAlign: 'left',
                color: colors.header_one_theme_color,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.18,
                shadowRadius: 1.0,
                elevation: 1,
              }}>
              {title}
            </Text>
          ) : null}
          {map(elements, (c, i) => {
            if (!isNull(c)) {
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => Linking.openURL(c.url)}
                  hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
                  style={styles.itemRow}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'baseline',
                    }}>
                    <Icon
                      type="entypo"
                      name={isRTL ? 'triangle-left' : 'triangle-right'}
                      color="grey"
                      size={20}
                      iconStyle={{
                        paddingRight: 10,
                        paddingLeft: 10,
                      }}
                    />
                    <Text style={styles.subTitle}>{c.title}</Text>
                  </View>
                  {showArrow ? (
                    <Icon
                      type="entypo"
                      name={isRTL ? 'chevron-thin-left' : 'chevron-thin-right'}
                      color="lightgrey"
                      size={15}
                      iconStyle={{
                        paddingRight: isIOS ? 10 : 0,
                        paddingLeft: isIOS ? 0 : 10,
                      }}
                    />
                  ) : null}
                </TouchableOpacity>
              );
            }
          })}
        </View>
      )}
    </ScrollView>
  );
};

export default PagesList;

const styles = StyleSheet.create({
  mainTitle: {
    fontFamily: text.font,
    fontSize: text.large,
    textAlign: 'left',
  },
  subTitle: {
    color: 'black',
    fontFamily: text.font,
    fontSize: text.medium,
    textAlign: 'left',
  },
  description: {
    fontFamily: text.font,
    fontSize: text.medium,
    textAlign: isIOS ? 'left' : isRTL ? 'right' : 'left',
  },
  elementRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 10,
  },
  wrapper: {
    // flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    borderTopWidth: 1,
    borderColor: 'lightgrey',
  },
  logo: {
    width: 80,
    height: 80,
    marginRight: 5,
    marginLeft: 5,
  },
  itemRow: {
    borderTopWidth: 0.5,
    borderColor: 'lightgrey',
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
