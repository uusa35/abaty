import React from 'react';
import {StyleSheet, FlatList, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {text} from '../../constants/sizes';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {themeColors} from '../../constants/colors';
import widgetStyles from '../../components/widgets/widgetStyles';

const FaqIndexCollapseScreen = () => {
  const {faqs} = useSelector(state => state);

  return (
    <FlatList
      style={{
        flex: 1,
        margin: 20,
        backgroundColor: themeColors.desinerat.lightGray,
      }}
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      data={faqs}
      renderItem={({item, index}) => (
        <View
          key={index}
          style={{
            flex: 1,
            width: '100%',
            backgroundColor: themeColors.main,
            padding: 10,
            marginTop: 10,
          }}>
          <Collapse isExpanded={index === 0}>
            <CollapseHeader
              style={{
                paddingTop: 10,
                paddingBottom: 10,
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <View>
                <Text style={widgetStyles.headerThree}>{item.title}</Text>
              </View>
            </CollapseHeader>
            <CollapseBody
              style={{
                paddingTop: 20,
                paddingBottom: 20,
                justifyContent: 'center',
                alignItems: 'flex-start',
                borderTopWidth: 0.5,
                borderTopColor: themeColors.desinerat.darkGray,
              }}>
              <Text style={widgetStyles.headerFour}>{item.content}</Text>
            </CollapseBody>
          </Collapse>
        </View>
      )}
      contentInset={{bottom: 200}}
    />
  );
};

export default FaqIndexCollapseScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    paddingTop: '5%',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    backgroundColor: 'white',
    padding: 15,
    height: 50,
  },
  phoneNo: {
    fontFamily: text.font,
    fontSize: text.large,
    paddingLeft: 20,
    margin: 0,
    padding: 0,
    textAlign: 'left',
  },
  areaFlag: {
    width: 45,
    height: 25,
    marginLeft: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    padding: 15,
  },
});
