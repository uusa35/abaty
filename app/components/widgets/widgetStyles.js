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
    width: '100%',
    alignSelf: 'center'
  },
  titleContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleWrapper: {
    justifyContent: 'flex-start',
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
    elevation: 1,
    textAlign: 'left'
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
  },
  safeContainer: {
    paddingRight: 5,
    paddingLeft: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 80,
    height: '100%'
  },
  newClassifiedBtnWrapper: {
    width: '90%',
    borderRadius: 20,
    height: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'flex-start',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.38,
    shadowRadius: 5.0,
    elevation: 1
  },
  newClassifiedWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 5
  },
  newClassifiedTitle: {
    fontFamily: text.font,
    fontSize: text.large,
    paddingRight: 20,
    paddingLeft: 20
  }
});

export default widgetStyles;
