import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {getSearchClassifieds} from '../../redux/actions/classified';
import ClassifiedList from '../../components/widgets/classified/ClassifiedList';
import BgContainer from '../../components/containers/BgContainer';

const ProfileClassifiedIndexScreen = () => {
  const {searchClassifieds, auth} = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSearchClassifieds({searchParams: {user_id: auth.id}}));
  }, []);

  return (
    <BgContainer>
      <ClassifiedList
        classifieds={searchClassifieds}
        showName={true}
        searchElements={{user_id: auth.id}}
      />
    </BgContainer>
  );
};

export default ProfileClassifiedIndexScreen;

const styles = StyleSheet.create({});
