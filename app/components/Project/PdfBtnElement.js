import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {icons} from '../../constants';
import PropTypes from 'prop-types';
import {Icon} from 'react-native-elements';
import Communications from 'react-native-communications';

export default class PdfBtnElement extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {element, iconName, routeName, handleNav} = this.props;
    return (
      <View style={styles.elementContainer} key={element.id}>
        <View style={styles.iconWrapper}>
          <Icon
            reverse
            name="ios-arrow-down"
            type="ionicon"
            size={10}
            color="black"
            onPress={() => Communications.web(element.path)}
          />
        </View>
        <TouchableOpacity
          key={element.id}
          style={styles.elementWrapper}
          onPress={() =>
            handleNav(routeName, {
              pdfLink: element.path,
              title: element.name,
              element
            })
          }>
          <View>
            <FastImage
              style={styles.elementIcon}
              source={icons[iconName]}
              resizeMode={FastImage.resizeMode.contain}
            />
            <View style={styles.elementTextWrapper}>
              <Text style={styles.elementText}>{element.name}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

PdfBtnElement.propTypes = {
  element: PropTypes.object.isRequired,
  iconName: PropTypes.string.isRequired,
  routeName: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  elementContainer: {
    backgroundColor: 'white',
    width: 100,
    height: 120,
    marginTop: 10,
    marginBottom: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 2,
    shadowOpacity: 0.2
  },
  elementIcon: {
    width: 50,
    height: 60,
    margin: 5,
    alignSelf: 'center'
  },
  elementWrapper: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  elementTextWrapper: {
    width: 100,
    height: 30,
    backgroundColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center'
  },
  elementText: {
    paddingRight: 5,
    paddingLeft: 5,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'cairo',
    textAlign: 'center'
  },
  iconWrapper: {
    width: '120%',
    marginTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30
  }
});
