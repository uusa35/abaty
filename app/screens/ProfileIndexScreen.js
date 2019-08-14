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
import UserProfileInformationWidget from '../components/widgets/user/UserProfileInformationWidget';
import UserProfileBtns from '../components/widgets/user/UserProfileBtns';

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
              <UserProfileInformationWidget auth={auth} />
              <UserProfileBtns />
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
