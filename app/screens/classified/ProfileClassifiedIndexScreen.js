import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {getSearchClassifieds} from '../../redux/actions/classified';
import BgContainer from '../../components/containers/BgContainer';
import ElementsHorizontalList from '../../components/Lists/ElementsHorizontalList';

const ProfileClassifiedIndexScreen = () => {
  const {auth, guest} = useSelector((state) => state);
  const [currentElements, setCurrentElements] = useState(auth.classifieds);
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentElements(auth.classifieds);
  }, [auth]);

  return (
    <BgContainer showImage={false}>
      <ElementsHorizontalList
        elements={currentElements}
        showName={true}
        searchElements={{}}
        showSearch={!guest}
        showClassifiedsFilter={!guest}
        showSortSearch={!guest}
        showFooter={true}
        type="classified"
      />
    </BgContainer>
  );
};

export default ProfileClassifiedIndexScreen;

const styles = StyleSheet.create({});
