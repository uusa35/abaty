import React from 'react';
import {StyleSheet, View} from 'react-native';
import Pdf from 'react-native-pdf';
import {width} from './../constants/sizes';

const AppPDFViewerScreen = ({navigation}) => {
  const {pdfLink} = navigation.state.params;
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
};

export default AppPDFViewerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  pdf: {
    flex: 1,
    width: width,
    backgroundColor: 'white',
  },
});
