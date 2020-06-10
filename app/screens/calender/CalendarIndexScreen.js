import React, {useContext} from 'react';
import {ScrollView} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import moment from 'moment';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import {Icon} from 'react-native-elements';
import {isRTL} from '../../I18n';
import BgContainer from '../../components/containers/BgContainer';
LocaleConfig.locales['ar'] = {
  monthNames: [
    'يناير',
    'فبراير',
    'مارس',
    'ابريل',
    'مايو',
    'يونيو',
    'يوليو',
    'أغسطس',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديمسبر',
  ],
  monthNamesShort: [
    'يناير',
    'فبراير',
    'مارس',
    'ابريل',
    'مايو',
    'يونيو',
    'يوليو',
    'أغسطس',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديمسبر',
  ],
  dayNames: [
    'الأحد',
    'الإثنين',
    'الثلاثاء',
    'الأربعاء',
    'الخميس',
    'الجمعة',
    'السبت',
  ],
  dayNamesShort: [
    'الأحد',
    'الإثنين',
    'الثلاثاء',
    'الأربعاء',
    'الخميس',
    'الجمعة',
    'السبت',
  ],
  today: 0,
};
LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Augest',
    'Sept',
    'November',
    'October',
    'December',
  ],
  monthNamesShort: [
    'January',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Augest',
    'Sept',
    'November',
    'October',
    'December',
  ],
  dayNames: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ],
  dayNamesShort: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ],
  today: 0,
};
const CalendarIndexScreen = () => {
  const {lang} = useContext(GlobalValuesContext);
  LocaleConfig.defaultLocale = lang;
  return (
    <BgContainer>
      <ScrollView>
        <Calendar
          // Initially visible month. Default = Date()
          current={moment().format('YYYY-MM-DD')}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={moment().format('YYYY-MM-DD')}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          // maxDate={moment().add(1,'year').format('YYYY-MM-DD').toString()}
          maxDate={moment().add(1, 'year').format('YYYY-MM-DD').toString()}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(day) => {
            // console.log('selected day', day);
          }}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={(day) => {
            // console.log('selected day', day);
          }}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={'yyyy MM'}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={(month) => {
            // console.log('month changed', month);
          }}
          // Hide month navigation arrows. Default = false
          hideArrows={false}
          // Replace default arrows with custom ones (direction can be 'left' or 'right')
          renderArrow={(direction) => {
            if (direction === 'left') {
              return (
                <Icon
                  type="entypo"
                  name={isRTL ? 'chevron-thin-right' : 'chevron-thin-left'}
                  size={20}
                />
              );
            } else {
              return (
                <Icon
                  type="entypo"
                  name={isRTL ? 'chevron-thin-left' : 'chevron-thin-right'}
                  size={20}
                />
              );
            }
          }}
          // Do not show days of other months in month page. Default = false
          hideExtraDays={false}
          // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
          // day from another month that is visible in calendar page. Default = false
          disableMonthChange={false}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          firstDay={0}
          // Hide day names. Default = false
          hideDayNames={false}
          // Show week numbers to the left. Default = false
          showWeekNumbers={true}
          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
          onPressArrowLeft={(substractMonth) => substractMonth()}
          // Handler which gets executed when press arrow icon right. It receive a callback can go next month
          onPressArrowRight={(addMonth) => addMonth()}
          // Disable left arrow. Default = false
          disableArrowLeft={false}
          // Disable right arrow. Default = false
          disableArrowRight={false}
          markedDates={
            {
              // '2020-05-16': {selected: true, marked: true, selectedColor: 'blue'},
              // '2020-05-17': {marked: true},
              // '2020-05-18': {marked: true, dotColor: 'red', activeOpacity: 0},
              // '2020-05-19': {disabled: true, disableTouchEvent: true},
            }
          }
        />
      </ScrollView>
    </BgContainer>
  );
};
export default CalendarIndexScreen;
