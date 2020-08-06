import React from 'react';
import UserEditFormWidget from '../../components/widgets/user/UserEditFormWidget';
import BgContainer from '../../components/containers/BgContainer';

const UserEditScreen = () => {
  return (
    <BgContainer showImage={false}>
      <UserEditFormWidget showIcon={false} />
    </BgContainer>
  );
};

export default UserEditScreen;
