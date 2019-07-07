import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import SocialRowWidget from '../components/widgets/SocialRowWidget';
import ContactInformationWidget from '../components/widgets/ContactInformationWidget';
import {isIOS} from '../constants';
import PropTypes from 'prop-types';
import validate from 'validate.js';

class ContactusScreen extends Component {
  static propTypes = {
    settings: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {settings} = this.props;
    return (
      <ScrollView
        contentContainerStyle={{minHeight: !isIOS ? '120%' : null}}
        horizontal={false}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentInset={{bottom: 100}}>
        {!validate.isEmpty(settings) ? (
          <View>
            <SocialRowWidget settings={settings} />
            <ContactInformationWidget settings={settings} />
          </View>
        ) : null}
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings
  };
}

export default connect(mapStateToProps)(ContactusScreen);
