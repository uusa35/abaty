import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getSearchClassifieds} from '../../redux/actions/classified';
import ClassifiedList from '../../components/widgets/classified/ClassifiedList';

const ProfileClassifiedIndexScreen = ({dispatch, classifieds, user_id}) => {
  useEffect(() => {
    dispatch(getSearchClassifieds({searchParams: {user_id}}));
  }, []);

  return (
    <ClassifiedList
      classifieds={classifieds}
      showName={true}
      searchElements={{user_id}}
    />
  );
};

function mapStateToProps(state) {
  return {
    classifieds: state.searchClassifieds,
    searchParams: state.searchParams,
    colors: state.settings.colors,
    user_id: state.auth.id,
  };
}

export default connect(mapStateToProps)(ProfileClassifiedIndexScreen);

ProfileClassifiedIndexScreen.propTypes = {
  classifieds: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({});
