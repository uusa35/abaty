import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import DesignersList from '../../components/Lists/DeisgnersList';
import BgContainer from '../../components/containers/BgContainer';

const DesignerIndexScreen = ({designers, searchParams}) => {
  useEffect(() => {}, [designers]);

  return (
    <BgContainer showImage={false}>
      <DesignersList
        elements={designers}
        searchElements={searchParams}
        showMore={true}
        showSearch={true}
      />
    </BgContainer>
  );
};

function mapStateToProps(state) {
  return {
    designers: state.designers,
    searchParams: state.searchParams,
  };
}

export default connect(mapStateToProps)(DesignerIndexScreen);

DesignerIndexScreen.propTypes = {
  users: PropTypes.array,
};

const styles = StyleSheet.create({});
