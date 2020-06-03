import React from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ClassifiedList from '../../components/widgets/classified/ClassifiedList';
import BgContainer from '../../components/containers/BgContainer';

const FavoriteClassifiedIndexScreen = ({classifieds}) => {
  return (
    <BgContainer showImage={false}>
      <ClassifiedList
        classifieds={classifieds}
        showName={true}
        showMore={false}
        searchElements={{}}
      />
    </BgContainer>
  );
};

function mapStateToProps(state) {
  return {
    classifieds: state.classifiedFavorites,
    searchParams: state.searchParams,
    colors: state.settings.colors,
  };
}

export default connect(mapStateToProps)(FavoriteClassifiedIndexScreen);

FavoriteClassifiedIndexScreen.propTypes = {
  classifieds: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({});
