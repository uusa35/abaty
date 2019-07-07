import {I18nManager, StyleSheet} from 'react-native';
import {text, width} from '../../constants';

const widgetStyles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: width,
    padding: 5,
    marginTop: 10,
    marginBottom: 10
  },
  wrapper: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    margin: 5,
    width: '100%'
  },
  titleContainer: {
    flexDirection: 'row',
    width: '98%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    margin: 10
  },
  title: {
    fontFamily: text.font,
    fontSize: text.large
  },
  elementName: {
    textAlign: 'center',
    padding: 10,
    fontFamily: text.font
  },
  btnStyle: {
    marginLeft: 3,
    marginRight: 3,
    alignItems: 'center'
  }
});

export default widgetStyles;
