import React, {useState, useMemo, useContext} from 'react';
import {View, Picker} from 'react-native';
import {text} from './../../../constants/sizes';
import _ from 'lodash';
import {Button, Input} from 'react-native-elements';
import {addToCart} from '../../../redux/actions/cart';
import I18n, {isRTL} from '../../../I18n';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {useDispatch} from 'react-redux';
import {isIOS} from '../../../constants';

const ServiceInfoWidgetBtns = ({element}) => {
  const {range} = element;
  const {colors} = useContext(GlobalValuesContext);
  const dispatch = useDispatch();
  const [days, setDays] = useState(_.keys(range));
  const [day, setDay] = useState(_.first(_.keys(range)));
  const [selectedDay, setSelectedDay] = useState([]);
  const [selectedTiming, setSelectedTiming] = useState(null);
  const [timeData, setTimeData] = useState({});
  const [notes, setNotes] = useState('');

  useMemo(() => {
    setSelectedDay(range[day]);
    setSelectedTiming(null);
    setTimeData(null);
  }, [day]);

  useMemo(() => {
    if (selectedTiming) {
    } else {
    }
  }, [selectedTiming]);

  return (
    <View style={{width: '100%'}}>
      <View style={{flexDirection: 'row'}}>
        <Picker
          mode="dropdown"
          selectedValue={day}
          style={{
            height: isIOS ? 150 : 100,
            width: '50%',
            marginTop: -30,
            marginBottom: -10,
            padding: 0,
          }}
          itemStyle={{fontFamily: text.font, fontSize: text.medium}}
          onValueChange={(itemValue, itemIndex) => setDay(itemValue)}>
          <Picker.Item key={0} label={I18n.t('choose_day')} value={null} />
          {_.map(days, (d, i) => {
            const dayAndTime = _.filter(range, (v, k) => {
              if (v[0].date === d) {
                return v[0];
              }
            });
            return (
              <Picker.Item
                key={i}
                label={dayAndTime[0][0].title + ' ' + dayAndTime[0][0].date}
                value={d}
              />
            );
          })}
        </Picker>
        <Picker
          selectedValue={selectedTiming}
          style={{
            height: isIOS ? 200 : 100,
            width: '50%',
            marginTop: -30,
            marginBottom: -10,
            padding: 0,
          }}
          itemStyle={{fontFamily: text.font, fontSize: text.medium}}
          onValueChange={(itemValue, itemIndex) => {
            const time = _.filter(selectedDay, d => d.id === itemValue);
            setSelectedTiming(itemValue);
            setTimeData(time[0]);
          }}>
          <Picker.Item key={0} label={I18n.t('choose_time')} value={null} />
          {_.map(selectedDay, (time, i) => {
            return <Picker.Item key={i} label={time.start} value={time.id} />;
          })}
        </Picker>
      </View>
      <Input
        spellCheck={true}
        placeholder={notes ? notes : I18n.t('add_notes_to_your_service')}
        value={notes ? notes : null}
        inputContainerStyle={{
          borderWidth: 1,
          borderColor: 'lightgrey',
          borderRadius: 5,
          paddingLeft: 15,
          paddingRight: 15,
          marginTop: 5,
          height: 80,
        }}
        inputStyle={{
          fontFamily: text.font,
          textAlign: isRTL ? 'right' : 'left',
        }}
        editable={selectedTiming ? true : false}
        shake={true}
        keyboardType="default"
        multiline={true}
        numberOfLines={3}
        onChangeText={notes => setNotes(notes)}
      />
      {element.is_available ? (
        <Button
          onPress={() =>
            dispatch(
              addToCart({
                timing_id: selectedTiming,
                cart_id: `${selectedTiming}${element.id}`,
                service_id: element.id,
                type: 'service',
                qty: 1,
                element,
                timeData,
                notes,
              }),
            )
          }
          disabled={!selectedTiming ? true : false}
          raised
          containerStyle={{width: '100%', marginBottom: 10, marginTop: 10}}
          buttonStyle={{backgroundColor: colors.btn_bg_theme_color}}
          title={I18n.t('add_to_cart')}
          titleStyle={{
            fontFamily: text.font,
            color: colors.btn_text_theme_color,
          }}
        />
      ) : null}
    </View>
  );
};

export default React.memo(ServiceInfoWidgetBtns);
