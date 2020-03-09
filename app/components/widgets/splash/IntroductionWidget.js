import React, {useState, useContext, useCallback} from 'react';
import {StyleSheet, Modal} from 'react-native';
import PropTypes from 'prop-types';
import AppIntroSlider from 'react-native-app-intro-slider';
import SplashWidget from './SplashWidget';
import {height, text} from './../../../constants/sizes';
import I18n from './../../../I18n';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {DispatchContext} from '../../../redux/DispatchContext';

const IntroductionWidget = ({elements, showIntroduction}) => {
  [visible, setVisible] = useState(showIntroduction);
  const {dispatch} = useContext(DispatchContext);
  const {colors} = useContext(GlobalValuesContext);

  const handleClick = useCallback(() => {
    setVisible(false);
    dispatch({type: 'HIDE_INTRODUCTION'});
  }, [visible]);

  return (
    <Modal
      transparent={false}
      visible={visible}
      animationType="slide"
      onRequestClose={() => setVisible(false)}>
      <AppIntroSlider
        buttonStyle={{
          backgroundColor: colors.btn_bg_theme_color,
          borderRadius: 10,
          alignContent: 'center',
          justifyContent: 'center',
        }}
        keyExtractor={(elements, index) => index.toString()}
        showSkipButton={true}
        showPrevButton={true}
        showDoneButton={true}
        skipLabel={I18n.t('skip')}
        doneLabel={I18n.t('done')}
        nextLabel={I18n.t('next')}
        prevLabel={I18n.t('back')}
        buttonTextStyle={{
          fontFamily: text.font,
          color: colors.btn_text_theme_color,
        }}
        renderItem={() => (
          <SplashWidget elements={elements} handleClick={handleClick} />
        )}
        slides={elements}
        onDone={() => handleClick()}
      />
    </Modal>
  );
};

export default IntroductionWidget;

IntroductionWidget.propTypes = {
  elements: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
  },
});
