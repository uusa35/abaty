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
    fontSize: text.large,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1
  },
  elementName: {
    textAlign: 'center',
    paddingTop: 5,
    fontSize: text.small,
    fontFamily: text.font
  },
  btnStyle: {
    marginLeft: 3,
    marginRight: 3,
    alignItems: 'center',
    shadowColor: '#000'
  }
});

export default widgetStyles;
