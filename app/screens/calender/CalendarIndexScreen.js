import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Linking, ScrollView} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import moment from 'moment';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import {Icon, Button} from 'react-native-elements';
import I18n, {isRTL} from '../../I18n';
import BgContainer from '../../components/containers/BgContainer';
import ElementsVerticalList from '../../components/Lists/ElementsVerticalList';
import {useDispatch, useSelector} from 'react-redux';
import {getSearchServices} from '../../redux/actions/service';
import ElementsHorizontalList from '../../components/Lists/ElementsHorizontalList';
import {iconSizes, text} from '../../constants/sizes';
import {appUrlIos} from '../../env';
import {isNull} from 'lodash';
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
  const {lang, colors} = useContext(GlobalValuesContext);
  LocaleConfig.defaultLocale = lang;
  const {services, searchParams} = useSelector((state) => state);
  const dispatch = useDispatch();
  const [currentSearchParams, setCurrentSearchParams] = useState({});
  const [currentElements, setCurrentElements] = useState([]);
  const [currentDate, setCurrentDate] = useState(null);

  useEffect(() => {
    dispatch(getSearchServices({searchParams: {}}));
  }, []);

  useMemo(() => {
    setCurrentSearchParams(searchParams);
    setCurrentElements(services);
  }, [services]);

  return (
    <BgContainer>
      <ScrollView
        style={{alignSelf: 'center', minHeight: '45%', width: '100%'}}>
        <Calendar
          // style={{flex : 1 , borderWidth : 5 }}
          // Initially visible month. Default = Date()
          current={moment().format('YYYY-MM-DD')}
          // current={currentDate ? currentDate.dateString : moment().format('YYYY-MM-DD')}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={moment().format('YYYY-MM-DD')}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          // maxDate={moment().add(1,'year').format('YYYY-MM-DD').toString()}
          maxDate={moment().add(1, 'year').format('YYYY-MM-DD').toString()}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(day) => {
            setCurrentDate(day);
          }}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={(day) => {
            // console.log('selected day', day);
          }}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          // monthFormat={'yyyy MM'}
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
                  size={iconSizes.smallest}
                />
              );
            } else {
              return (
                <Icon
                  type="entypo"
                  name={isRTL ? 'chevron-thin-left' : 'chevron-thin-right'}
                  size={iconSizes.smallest}
                />
              );
            }
          }}
          // Do not show days of other months in month page. Default = false
          hideExtraDays={true}
          // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
          // day from another month that is visible in calendar page. Default = false
          disableMonthChange={false}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          firstDay={0}
          // Hide day names. Default = false
          hideDayNames={false}
          // Show week numbers to the left. Default = false
          showWeekNumbers={false}
          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
          onPressArrowLeft={(substractMonth) => substractMonth()}
          // Handler which gets executed when press arrow icon right. It receive a callback can go next month
          onPressArrowRight={(addMonth) => addMonth()}
          // Disable left arrow. Default = false
          disableArrowLeft={false}
          // Disable right arrow. Default = false
          disableArrowRight={false}
          markingType={'custom'}
          markedDates={{
            '2012-07-16': {
              selected: true,
              marked: true,
              selectedColor: 'green',
            },
            '2012-07-17': {marked: true},
            '2012-07-18': {marked: true, dotColor: 'red', activeOpacity: 0},
            '2012-07-19': {disabled: true, disableTouchEvent: true},
          }}
          style={
            {
              // borderWidth: 1,
            }
          }
          // Specify theme properties to override specific styles for calendar parts. Default = {}
          theme={{
            backgroundColor: 'transparent',
            calendarBackground: 'white',
            textSectionTitleColor: colors.btn_bg_theme_color,
            textSectionTitleDisabledColor: colors.btn_bg_theme_color,
            selectedDayBackgroundColor: colors.btn_bg_theme_color,
            selectedDayBorderWidth: 5,
            selectedDayTextColor: 'white',
            todayTextColor: colors.btn_bg_theme_color,
            dayTextColor: 'black',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: colors.btn_bg_theme_color,
            arrowColor: colors.btn_bg_theme_color,
            disabledArrowColor: '#d9e1e8',
            monthTextColor: colors.btn_bg_theme_color,
            indicatorColor: colors.btn_bg_theme_color,
            textDayFontFamily: text.font,
            textMonthFontFamily: text.font,
            textDayHeaderFontFamily: text.font,
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: text.medium,
            textMonthFontSize: text.small,
            textDayHeaderFontSize: text.small,
          }}
        />
        <Button
          raised
          containerStyle={{marginBottom: 10, width: '100%'}}
          buttonStyle={{
            backgroundColor: colors.btn_bg_theme_color,
            borderRadius: 0,
          }}
          title={I18n.t('search_services')}
          titleStyle={{
            fontFamily: text.font,
            color: colors.btn_text_theme_color,
          }}
          disabled={isNull(currentDate)}
          onPress={() =>
            dispatch(
              getSearchServices({
                searchParams: {date_range: currentDate.dateString},
                redirect: false,
              }),
            )
          }
        />
      </ScrollView>
      <ElementsVerticalList
        elements={currentElements}
        type="service"
        searchElements={currentSearchParams}
        showRefresh={true}
        showFooter={true}
        showSearch={true}
        showSortSearch={true}
        showProductsFilter={false}
        showTitleIcons={true}
        showMore={true}
        showName={true}
        customHeight={150}
      />
    </BgContainer>
  );
};
export default CalendarIndexScreen;
