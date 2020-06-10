import React, {useState, useEffect} from 'react';
import {FlatList, View, Text} from 'react-native';
import validate from 'validate.js';
import {apiUrl} from './../../../../app.json';
import {axiosInstance} from '../../../redux/actions/api';

const UsersWidget = (props) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    let isSubscribed = true;
    axiosInstance
      .get(`${apiUrl}user`)
      .then((r) => setUsers(r.data))
      .catch((e) => e);
  }, []);

  return !validate.isEmpty(users) && validate.isArray(users) ? (
    <FlatList
      data={users}
      renderItem={({item}) => {
        return (
          <View key={item.id}>
            <Text>{item.slug}</Text>
          </View>
        );
      }}
    />
  ) : null;
};
export default UsersWidget;
