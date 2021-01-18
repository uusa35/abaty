import React, {useContext, useEffect, useMemo, useState} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import moment from 'moment';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import {Icon, Button} from 'react-native-elements';
import I18n, {isRTL} from '../../I18n';
import BgContainer from '../../components/containers/BgContainer';
import ElementsVerticalList from '../../components/Lists/ElementsVerticalList';
import {useDispatch, useSelector} from 'react-redux';
import {getSearchServices} from '../../redux/actions/service';
import {iconSizes, text} from '../../constants/sizes';
import {isNull, map, filter, keys, isEmpty} from 'lodash';
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
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Augest',
    'Sept',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Augest',
    'Sept',
    'October',
    'November',
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
  const {services, searchParams, country} = useSelector((state) => state);
  const dispatch = useDispatch();
  const [currentSearchParams, setCurrentSearchParams] = useState({});
  const [currentElements, setCurrentElements] = useState([]);
  const [currentDate, setCurrentDate] = useState(null);
  const [marked, setMarked] = useState({});
  const [currentServices, setCurrentServices] = useState(services);

  useMemo(() => {
    if (!isEmpty(services)) {
      const ranges = map(currentServices, (s) => s.range);
      // console.log('currentDate', moment(currentDate.dateString).format('DD/MM/YYYY'))
      if (!isNull(currentDate)) {
        const filteredServices = filter(
          services,
          (s) => s.range[moment(currentDate.dateString).format('DD/MM/YYYY')],
        );
        setCurrentElements(filteredServices);
      } else {
        setCurrentElements(currentServices);
      }
      const mark = {};
      const dateRanges = map(ranges, (r) => {
        const currentDates = keys(r);
        if (!isEmpty(currentDates)) {
          currentDates.forEach((day) => {
            mark[moment(day, 'DD/MM/YYYY').format('YYYY-MM-DD')] = {
              selected:
                moment(day, 'DD/MM/YYYY').format('YYYY-MM-DD') >
                moment().format('YYYY-MM-DD'),
              marked: true,
              dotColor: 'red',
              selectedColor:
                currentDate &&
                moment(day, 'DD/MM/YYYY').format('YYYY-MM-DD') ===
                  currentDate.dateString
                  ? 'red'
                  : colors.btn_bg_theme_color,
            };
          });
        }
      });
      if (!isEmpty(mark)) {
        setMarked({...mark});
      }
    } else {
      setCurrentElements(currentServices);
      setCurrentDate(null);
    }
  }, [currentDate]);

  useEffect(() => {
    dispatch(getSearchServices({searchParams: {country_id: country.id}}));
    setCurrentServices(services);
    setCurrentElements(services);
  }, []);

  useMemo(() => {
    setCurrentSearchParams(searchParams);
  }, [services]);

  const resetServices = () => {
    dispatch(getSearchServices({searchParams: {country_id: country.id}}));
    setCurrentDate(null);
  };

  return (
    <BgContainer>
      <ScrollView
        style={{alignSelf: 'center', width: '100%'}}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}>
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
            dispatch(
              getSearchServices({
                searchParams: {date_range: day.dateString},
                // searchParams: {exact_date: day.dateString},
                redirect: false,
              }),
            );
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
          // markingType={'custom'}
          // markedDates={{
          //   '2020-09-16': {
          //     selected: true,
          //     marked: true,
          //     selectedColor: 'green',
          //   },
          //   '2020-09-17': {marked: true, selected : true },
          //   '2020-09-18': {marked: true, dotColor: 'red', activeOpacity: 0},
          //   '2020-09-19': {disabled: true, disableTouchEvent: true},
          // }}
          markedDates={marked}
          selectedDate={
            currentDate ? currentDate.dateString : moment().format('YYYY-MM-DD')
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
            selectedDayCircleBackgroundColor: 'blue',
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
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: 10,
          }}>
          {currentDate && (
            <View
              style={{
                flex: 1,
                height: 40,
                borderColor: 'lightgrey',
                borderWidth: 0.5,
                borderRadius: 3,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                marginTop: 1,
                marginBottom: 10,
                marginLeft: 10,
                marginRight: 10,
              }}>
              <Text
                style={{
                  fontFamily: text.font,
                  fontSize: text.small,
                  padding: 5,
                }}>
                {I18n.t('day_selected')}{' '}
                {moment(currentDate.dateString, 'YYYY-MM-DD').format(
                  'DD-MM-YYYY',
                )}
              </Text>
            </View>
          )}
          <Button
            raised
            containerStyle={{marginBottom: 10, width: '45%'}}
            buttonStyle={{
              backgroundColor: colors.btn_bg_theme_color,
              borderRadius: 0,
            }}
            title={I18n.t('reset_services')}
            titleStyle={{
              fontFamily: text.font,
              color: colors.btn_text_theme_color,
            }}
            disabled={isNull(currentDate)}
            onPress={() => resetServices()}
          />
        </View>

        <ElementsVerticalList
          elements={currentElements}
          type="service"
          searchElements={currentSearchParams}
          showRefresh={true}
          showFooter={true}
          showSearch={false}
          showSortSearch={true}
          showProductsFilter={false}
          showTitleIcons={true}
          showMore={false}
          showName={true}
          customHeight={150}
          scrollEnabled={false}
        />
      </ScrollView>
    </BgContainer>
  );
};
export default CalendarIndexScreen;
