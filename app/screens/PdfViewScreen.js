import React from 'react';
import {StyleSheet, View, Progress} from 'react-native';
import {width, height} from '../constants';
import Pdf from 'react-native-pdf';

const PdfViewScreen = ({route}) => {
  return (
    <View style={styles.container}>
      <Pdf
        source={{uri: route.params.pdfLink, cache: true}}
        // onLoadComplete={(numberOfPages, filePath) => {
        //   console.log(`number of pages: ${numberOfPages}`);
        // }}
        // onPageChanged={(page, numberOfPages) => {
        //   console.log(`current page: ${page}`);
        // }}
        // onError={error => {
        //   console.log(error);
        // }}
        // onPressLink={uri => {
        //   console.log(`Link presse: ${uri}`);
        // }}
        style={styles.pdf}
      />
    </View>
  );
};
export default PdfViewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: width,
    height: height,
  },
});
