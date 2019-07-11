import React, {useState, useContext} from 'react';
import {StyleSheet, Modal} from 'react-native';
import PropTypes from 'prop-types';
import AppIntroSlider from 'react-native-app-intro-slider';
import SplashWidget from './SplashWidget';
import {height, text} from './../../../constants';
import I18n from './../../../I18n';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';

const IntroductionWidget = ({elements, visible}) => {
  const {colors} = useContext(GlobalValuesContext);
  [visible, setVisible] = useState(visible);
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={() => setVisible(false)}>
      <AppIntroSlider
        buttonStyle={{
          backgroundColor: colors.btn_bg_theme_color,
          borderRadius: 10,
          alignContent: 'center',
          justifyContent: 'center'
        }}
        showSkipButton={true}
        showPrevButton={true}
        showDoneButton={true}
        skipLabel={I18n.t('skip')}
        doneLabel={I18n.t('done')}
        nextLabel={I18n.t('next')}
        prevLabel={I18n.t('back')}
        buttonTextStyle={{
          fontFamily: text.font,
          color: colors.btn_text_theme_color
        }}
        renderItem={() => <SplashWidget elements={elements} />}
        slides={elements}
        onDone={() => setVisible(false)}
      />
    </Modal>
  );
};

export default React.memo(IntroductionWidget);

IntroductionWidget.propTypes = {
  elements: PropTypes.array.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height
  }
});
