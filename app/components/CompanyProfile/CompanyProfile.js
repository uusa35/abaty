import React, {PureComponent} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {View} from 'react-native-animatable';
import {height} from './../../constants';
import PropTypes from 'prop-types';
import I18n from './../../I18n';
import CompanyProfileHeaderWidget from './CompanyProfileHeaderWidget';
import PanelWidget from './../PanelWidget';
import ContactDetailsWidget from './ContactDetailsWidget';
import LocationWidget from './LocationWidget';

export default class CompanyProfile extends PureComponent {
  render() {
    const {settings, navigation} = this.props;
    return (
      <ScrollView
        style={{backgroundColor: 'white'}}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30, backgroundColor: 'white'}}
        endFillColor="white"
        showsVerticalScrollIndicator={false}>
        <View animation="bounceInDown" style={styles.scrollViewContainer}>
          <View>
            <CompanyProfileHeaderWidget
              settings={settings}
              navigation={navigation}
            />
            <PanelWidget
              title={I18n.t('about') + ' ' + settings.name}
              content={settings.description}
            />
            <ContactDetailsWidget settings={settings} />
            <LocationWidget settings={settings} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

CompanyProfile.propTypes = {
  settings: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    backgroundColor: 'white',
    minHeight: height
  }
});
