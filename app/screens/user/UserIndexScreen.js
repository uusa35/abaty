import React from 'react';
import {useSelector} from 'react-redux';
import UsersList from '../../components/Lists/UsersList';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';

const UserIndexScreen = () => {
  const {users, searchParams} = useSelector((state) => state);
  return (
    <UsersList users={users} searchElements={searchParams} showMore={true} />
  );
};
export default UserIndexScreen;

const styles = StyleSheet.create({});
