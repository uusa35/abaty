import React, {useState, useMemo, useContext} from 'react';
import {View, Text, Picker} from 'react-native';
import {text} from './../../../constants';
import _ from 'lodash';
import {Button, Input} from 'react-native-elements';
import {addToCart} from '../../../redux/actions';
import I18n, {isRTL} from '../../../I18n';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';

const ServiceInfoWidgetBtns = ({element}) => {
  const {timings} = element;
  const {colors} = useContext(GlobalValuesContext);
  console.log('timings', timings);
  const [days, setDays] = useState(_.keys(timings));
  const [day, setDay] = useState(_.first(_.keys(timings)));
  const [selectedDay, setSelectedDay] = useState([]);
  const [selectedTiming, setSelectedTiming] = useState('');
  const [notes, setNotes] = useState('');

  useMemo(() => {
    console.log('here');
    setSelectedDay(timings[day]);
  }, [day]);

  console.log('selectedTiming', selectedTiming);

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
            height: 150,
            width: '50%',
            marginTop: -30,
            marginBottom: -10,
            padding: 0
          }}
          itemStyle={{fontFamily: text.font}}
          onValueChange={(itemValue, itemIndex) => setDay(itemValue)}>
          {_.map(days, (d, i) => (
            <Picker.Item key={i} label={d} value={d} />
          ))}
        </Picker>
        <Picker
          selectedValue={selectedTiming}
          style={{
            height: 200,
            width: '50%',
            marginTop: -30,
            marginBottom: -10,
            padding: 0
          }}
          itemStyle={{fontFamily: text.font}}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedTiming(itemValue)
          }>
          {_.map(selectedDay, (time, i) => {
            return <Picker.Item key={i} label={time.start} value={time.id} />;
          })}
        </Picker>
      </View>
      <Input
        spellCheck={true}
        placeholder={
          notes ? notes : I18n.t('add_notes_shoulders_height_and_other_notes')
        }
        value={notes ? notes : null}
        inputContainerStyle={{
          borderWidth: 1,
          borderColor: 'lightgrey',
          borderRadius: 5,
          paddingLeft: 15,
          paddingRight: 15,
          marginTop: 5,
          height: 80
        }}
        inputStyle={{
          fontFamily: text.font,
          textAlign: isRTL ? 'right' : 'left'
        }}
        editable={true}
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
                timing_id: selectedTiming.id,
                cart_id: selectedTiming.cart_id,
                service_id: element.id,
                qty: 1,
                element,
                notes
              })
            )
          }
          disabled={!selectedTiming ? true : false}
          raised
          containerStyle={{width: '100%', marginBottom: 10, marginTop: 10}}
          buttonStyle={{backgroundColor: colors.btn_bg_theme_color}}
          title={I18n.t('add_to_cart')}
          titleStyle={{
            fontFamily: text.font,
            color: colors.btn_text_theme_color
          }}
        />
      ) : null}
    </View>
  );
};

export default React.memo(ServiceInfoWidgetBtns);
