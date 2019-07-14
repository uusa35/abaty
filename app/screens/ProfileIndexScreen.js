import React, {Component} from 'react';
import {Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {NavContext} from './../redux/NavContext';
import {View} from 'react-native-animatable';
import PropTypes from 'prop-types';
import {isIOS, text, width} from '../constants';
import validate from 'validate.js';
import {getCategoryElements} from '../redux/actions';
import {Button, Icon} from 'react-native-elements';
import {isRTL} from '../I18n';
import I18n from './../I18n';

class ProfileIndexScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {auth, colors, navigation} = this.props;
    return (
      <NavContext.Provider value={{navigation}}>
        <ScrollView
          contentContainerStyle={{minHeight: !isIOS ? '120%' : null}}
          horizontal={false}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentInset={{bottom: 100}}>
          {!validate.isEmpty(auth) ? (
            <View style={{marginTop: '10%'}}>
              <TouchableOpacity
                onPress={() => console.log('user')}
                hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
                style={styles.itemRow}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'baseline'
                  }}>
                  <Icon
                    type="entypo"
                    name="user"
                    size={20}
                    color={colors.header_one_theme_color}
                    iconStyle={{
                      paddingRight: 10,
                      paddingLeft: 10
                    }}
                  />
                  <Text style={styles.subTitle}>{I18n.t('name')} : </Text>
                  <Text style={styles.subTitle}>{auth.name}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => console.log('user')}
                hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
                style={styles.itemRow}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'baseline'
                  }}>
                  <Icon
                    type="entypo"
                    name="inbox"
                    size={20}
                    color={colors.header_one_theme_color}
                    iconStyle={{
                      paddingRight: 10,
                      paddingLeft: 10
                    }}
                  />
                  <Text style={styles.subTitle}>{I18n.t('email')} : </Text>
                  <Text style={styles.subTitle}>{auth.email}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => console.log('user')}
                hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
                style={styles.itemRow}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'baseline'
                  }}>
                  <Icon
                    type="entypo"
                    name="mobile"
                    size={20}
                    color={colors.header_one_theme_color}
                    iconStyle={{
                      paddingRight: 10,
                      paddingLeft: 10
                    }}
                  />
                  <Text style={styles.subTitle}>{I18n.t('mobile')} : </Text>
                  <Text style={styles.subTitle}>{auth.mobile}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => console.log('user')}
                hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
                style={styles.itemRow}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'baseline'
                  }}>
                  <Icon
                    type="entypo"
                    name="language"
                    size={20}
                    color={colors.header_one_theme_color}
                    iconStyle={{
                      paddingRight: 10,
                      paddingLeft: 10
                    }}
                  />
                  <Text style={styles.subTitle}>{I18n.t('country')} : </Text>
                  <Text style={styles.subTitle}>{auth.countryName}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => console.log('user')}
                hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
                style={styles.itemRow}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'baseline'
                  }}>
                  <Icon
                    type="entypo"
                    name="address"
                    size={20}
                    color={colors.header_one_theme_color}
                    iconStyle={{
                      paddingRight: 10,
                      paddingLeft: 10
                    }}
                  />
                  <Text style={styles.subTitle}>{I18n.t('address')} : </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => console.log('user')}
                hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
                style={styles.itemRow}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'baseline',
                    paddingRight: 20,
                    paddingLeft: 20
                  }}>
                  <Text style={styles.subTitle}>{auth.address}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => console.log('user')}
                hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
                style={styles.itemRow}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'baseline'
                  }}>
                  <Icon
                    type="entypo"
                    name="text"
                    size={20}
                    color={colors.header_one_theme_color}
                    iconStyle={{
                      paddingRight: 10,
                      paddingLeft: 10
                    }}
                  />
                  <Text style={styles.subTitle}>
                    {I18n.t('description')} :{' '}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => console.log('user')}
                hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
                style={styles.itemRow}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'baseline',
                    paddingRight: 20,
                    paddingLeft: 20
                  }}>
                  <Text style={styles.subTitle}>{auth.description}</Text>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  marginTop: 50,
                  width: width - 50,
                  alignSelf: 'center'
                }}>
                <Button
                  raised
                  title={I18n.t('edit_profile')}
                  type="outline"
                  containerStyle={{marginBottom: 20}}
                  titleStyle={{fontFamily: text.font}}
                />
                <Button
                  onPress={() => navigation.navigate('Home')}
                  raised
                  title={I18n.t('shop_now')}
                  type="outline"
                  containerStyle={{marginBottom: 20}}
                  titleStyle={{
                    fontFamily: text.font,
                    color: colors.main_text_theme_color
                  }}
                />
              </View>
            </View>
          ) : null}
        </ScrollView>
      </NavContext.Provider>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    colors: state.settings.colors
  };
}

export default connect(mapStateToProps)(ProfileIndexScreen);

ProfileIndexScreen.propTypes = {
  products: PropTypes.array.isRequired,
  searchParams: PropTypes.object.isRequired
};

ProfileIndexScreen.propTypes = {
  auth: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  mainTitle: {
    fontFamily: text.font,
    fontSize: text.large,
    textAlign: 'left'
  },
  subTitle: {
    color: 'black',
    fontFamily: text.font,
    fontSize: text.medium,
    textAlign: 'left'
  },
  description: {
    fontFamily: text.font,
    fontSize: text.medium,
    textAlign: isIOS ? 'left' : isRTL ? 'right' : 'left'
  },
  elementRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 10
  },
  wrapper: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    borderTopWidth: 1,
    borderColor: 'lightgrey'
  },
  logo: {
    width: 80,
    height: 80,
    marginRight: 5,
    marginLeft: 5
  },
  itemRow: {
    borderTopWidth: 0.5,
    borderColor: 'lightgrey',
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline'
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
