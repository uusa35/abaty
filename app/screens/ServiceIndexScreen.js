import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {NavContext} from './../redux/NavContext';
import {View} from 'react-native-animatable';
import ProductList from '../components/widgets/product/ProductList';
import PropTypes from 'prop-types';
import {has} from 'lodash';
import {getAllProducts, getSearchProducts} from '../redux/actions';
import ServiceList from '../components/widgets/service/ServiceList';

class ServiceIndexScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {services, navigation} = this.props;
    return (
      <NavContext.Provider value={{navigation}}>
        <ServiceList elements={services} searchElements={{}} showName={true} />
      </NavContext.Provider>
    );
  }
}

function mapStateToProps(state) {
  return {
    services: state.services
  };
}

export default connect(mapStateToProps)(ServiceIndexScreen);

ServiceIndexScreen.propTypes = {
  services: PropTypes.array.isRequired
};

const styles = StyleSheet.create({});
