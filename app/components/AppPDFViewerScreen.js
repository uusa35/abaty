import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Pdf from 'react-native-pdf';
import PropTypes from 'prop-types';
import {width} from './../constants';
import connect from 'react-redux/es/connect/connect';

class AppPDFViewerScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {pdfLink} = this.props.navigation.state.params;
    const source = {uri: pdfLink};
    return (
      <View style={styles.container}>
        <Pdf
          source={source}
          style={styles.pdf}
          fitWidth={true}
          enableAntialiasing={true}
          enableRTL={true}
        />
      </View>
    );
  }
}

AppPDFViewerScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(AppPDFViewerScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  pdf: {
    flex: 1,
    width: width,
    backgroundColor: 'white'
  }
});
