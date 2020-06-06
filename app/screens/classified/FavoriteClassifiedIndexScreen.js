import React from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ClassifiedList from '../../components/widgets/classified/ClassifiedList';
import BgContainer from '../../components/containers/BgContainer';
import I18n from './../../I18n';

const FavoriteClassifiedIndexScreen = ({classifieds}) => {
  return (
    <BgContainer showImage={false}>
      <ClassifiedList
        classifieds={classifieds}
        showName={true}
        showMore={false}
        searchElements={{}}
        noElementsTitle={I18n.t('no_classifieds_favorites')}
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
