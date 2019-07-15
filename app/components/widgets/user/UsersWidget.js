import React, {useState, useEffect} from 'react';
import {FlatList, View, Text} from 'react-native';
import validate from 'validate.js';
import {apiUrl} from './../../../../app.json';
import {axiosInstance} from '../../../redux/actions/api';

const UsersWidget = props => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axiosInstance
      .get(`${apiUrl}user`)
      .then(res => setUsers(res.data))
      .catch(e => console.log(e));
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
export default React.memo(UsersWidget);
