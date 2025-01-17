'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var dayjs = require('dayjs');
var duration = require('dayjs/plugin/duration');
var isBetween = require('dayjs/plugin/isBetween');
var mergeAnything = require('merge-anything');
var React = require('react');
var calendarize = require('calendarize');
var reactNative = require('react-native');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () {
                        return e[k];
                    }
                });
            }
        });
    }
    n['default'] = e;
    return Object.freeze(n);
}

var dayjs__default = /*#__PURE__*/_interopDefaultLegacy(dayjs);
var duration__default = /*#__PURE__*/_interopDefaultLegacy(duration);
var isBetween__default = /*#__PURE__*/_interopDefaultLegacy(isBetween);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var React__namespace = /*#__PURE__*/_interopNamespace(React);
var calendarize__default = /*#__PURE__*/_interopDefaultLegacy(calendarize);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __spreadArray(to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
}

var defaultTheme = {
    isRTL: false,
    palette: {
        primary: {
            main: 'rgb(66, 133, 244)',
            contrastText: '#fff',
        },
        cellBg: '#EAE9ED',
        nowIndicator: 'red',
        borderColor: '#D1D1D1',
        headingColor: 'black',
        backgroundColor: '#EAE9ED',
        cellBackgroundColor: "#FFFFFF",
        gray: {
            // 50: '#fafafa',
            100: '#f5f5f5',
            200: '#D1D1D1',
            300: '#e0e0e0',
            400: '#CCCCCC',
            500: '#9e9e9e',
            // 600: '#757575',
            // 700: '#616161',
            800: '#424242',
            // 900: '#212121',
        },
    },
    eventCellOverlappings: [
        { main: '#E26245', contrastText: '#fff' },
        { main: '#4AC001', contrastText: '#fff' },
        { main: '#5934C7', contrastText: '#fff' }, // purple
    ],
    typography: {
        xs: {
            fontSize: 10,
        },
        sm: {
            fontSize: 12,
        },
        xl: {
            fontSize: 22,
        },
    },
};

var ThemeContext = React.createContext(defaultTheme);
var useTheme = function () {
    var customTheme = React.useContext(ThemeContext);
    if (!customTheme) {
        return defaultTheme;
    }
    return customTheme;
};

var MIN_HEIGHT = 1200;
var HOUR_GUIDE_WIDTH = 50;
var OVERLAP_OFFSET = reactNative.Platform.OS === 'web' ? 20 : 8;
var OVERLAP_PADDING = reactNative.Platform.OS === 'web' ? 3 : 0;
var eventCellCss = reactNative.StyleSheet.create({
    style: {
        zIndex: 100,
        borderRadius: 3,
        padding: 4,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 2,
        minWidth: '33%',
    },
});
/*
 * Utility-first CSS.
 */
var u = reactNative.StyleSheet.create({
    /*
     * Flex
     */
    flex: {
        flexDirection: 'row',
    },
    'flex-row': {
        flexDirection: 'row',
    },
    'flex-row-reverse': {
        flexDirection: 'row-reverse',
    },
    'flex-column': {
        flexDirection: 'column',
    },
    'flex-1': {
        flex: 1,
    },
    'justify-between': {
        justifyContent: 'space-between',
    },
    'justify-center': {
        justifyContent: 'center',
    },
    'items-center': {
        alignItems: 'center',
    },
    'self-center': {
        alignSelf: 'center',
    },
    /*
     * Border
     */
    'border-l': {
        borderLeftWidth: 1,
    },
    'border-t': {
        borderTopWidth: 1,
    },
    'border-b': {
        borderBottomWidth: 1,
    },
    'border-b-2': {
        borderBottomWidth: 2,
    },
    'border-r': {
        borderRightWidth: 1,
    },
    /*
     * Spacing
     */
    'mt-2': {
        marginTop: 2,
    },
    'mt-4': {
        marginTop: 4,
    },
    'mt-6': {
        marginTop: 6,
    },
    'mb-6': {
        marginBottom: 6,
    },
    'mx-3': {
        marginLeft: 3,
        marginRight: 3,
    },
    'p-2': {
        padding: 2,
    },
    'p-8': {
        padding: 8,
    },
    'pt-2': {
        paddingTop: 2,
    },
    'py-2': {
        paddingVertical: 2,
    },
    'px-6': {
        paddingHorizontal: 6,
    },
    'pb-6': {
        paddingBottom: 6,
    },
    /*
     * Text
     */
    'text-center': {
        textAlign: 'center',
    },
    /*
     * Radius
     */
    rounded: {
        borderRadius: 3,
    },
    'rounded-full': {
        borderRadius: 9999,
    },
    /*
     * Z Index
     */
    'z-0': {
        zIndex: 0,
    },
    'z-10': {
        zIndex: 10,
    },
    'z-20': {
        zIndex: 20,
    },
    /*
     * Width
     */
    'w-36': {
        width: 36,
    },
    'w-50': {
        width: 50,
    },
    'w-70': {
        width: 70,
    },
    'h-36': {
        height: 36,
    },
    /*
     * Misc
     */
    'overflow-hidden': {
        overflow: 'hidden',
    },
    absolute: {
        position: 'absolute',
    },
    truncate: reactNative.Platform.OS === 'web'
        ? {
            overflow: 'hidden',
            // textOverflow: 'ellipsis',
            // whiteSpace: 'nowrap',
        }
        : {},
});

var typedMemo = React__default['default'].memo;
var DAY_MINUTES = 1440;
function getDatesInMonth(date, locale) {
    if (date === void 0) { date = new Date(); }
    if (locale === void 0) { locale = 'en'; }
    var subject = dayjs__default['default'](date);
    var days = Array(subject.daysInMonth() - 1)
        .fill(0)
        .map(function (_, i) {
        return subject.date(i + 1).locale(locale);
    });
    return days;
}
function getDatesInWeek(date, weekStartsOn, locale) {
    if (date === void 0) { date = new Date(); }
    if (weekStartsOn === void 0) { weekStartsOn = 0; }
    if (locale === void 0) { locale = 'en'; }
    var subject = dayjs__default['default'](date);
    var subjectDOW = subject.day();
    var days = Array(7)
        .fill(0)
        .map(function (_, i) {
        return subject
            .add(i - (subjectDOW < weekStartsOn ? 7 + subjectDOW : subjectDOW) + weekStartsOn, 'day')
            .locale(locale);
    });
    return days;
}
function getDatesInNextThreeDays(date, locale) {
    if (date === void 0) { date = new Date(); }
    if (locale === void 0) { locale = 'en'; }
    var subject = dayjs__default['default'](date).locale(locale);
    var days = Array(3)
        .fill(0)
        .map(function (_, i) {
        return subject.add(i, 'day');
    });
    return days;
}
function getDatesInNextOneDay(date, locale) {
    if (date === void 0) { date = new Date(); }
    if (locale === void 0) { locale = 'en'; }
    var subject = dayjs__default['default'](date).locale(locale);
    var days = Array(1)
        .fill(0)
        .map(function (_, i) {
        return subject.add(i, 'day');
    });
    return days;
}
var hours = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
];
function prestoHourRange(range, interval, currentDate) {
    if (currentDate === void 0) { currentDate = dayjs__default['default']().startOf('d').toISOString(); }
    var result = [];
    var rangeArray = range.split('-');
    var diff = rangeArray[1] - rangeArray[0];
    var timeIntervalInSeconds = 60000 * interval;
    var startTime = dayjs__default['default'](currentDate).hour(rangeArray[0]).startOf('h').valueOf();
    for (var i = 0; i < Number(diff * (60 / interval)); i++) {
        var endTime = startTime + timeIntervalInSeconds;
        if (i == 0) {
            result.push({
                startTime: dayjs__default['default'](startTime),
                endTime: dayjs__default['default'](endTime)
            });
            startTime += timeIntervalInSeconds;
        }
        else {
            result.push({
                startTime: dayjs__default['default'](startTime),
                endTime: dayjs__default['default'](endTime)
            });
            startTime += timeIntervalInSeconds;
        }
    }
    return result;
}
function hoursRange(range) {
    var rangeArray = range.split('-');
    var result = [];
    for (var i = Number(rangeArray[0]); i <= Number(rangeArray[1]); i++) {
        result.push(i);
    }
    return result;
}
function formatEventData(data, hoursRange, interval) {
    var result = hoursRange.map(function (timeObj) {
        var values = [];
        data.map(function (item) {
            var startMinute = dayjs__default['default'](item.startDate).get('minute');
            var endMinute = dayjs__default['default'](item.endDate).get('minute');
            if (startMinute >= 0 && startMinute <= interval) {
                startMinute = 0;
            }
            else {
                startMinute = interval + 1;
            }
            var itemStartDate = dayjs__default['default'](item.startDate).minute(startMinute).startOf('minute');
            var itemEndDate;
            if (endMinute >= 0 && endMinute <= interval) {
                endMinute = interval;
                itemEndDate = dayjs__default['default'](item.endDate).minute(endMinute).startOf('minute');
            }
            else {
                endMinute = 0;
                itemEndDate = dayjs__default['default'](item.endDate).minute(0).add(1, 'hour').startOf('hour');
            }
            if (dayjs__default['default'](timeObj.startTime).valueOf() >= itemStartDate.valueOf() &&
                dayjs__default['default'](timeObj.endTime).valueOf() <= itemEndDate.valueOf()) {
                values.push(item);
            }
        });
        return __assign(__assign({}, timeObj), { data: values });
    });
    return result;
}
function formatHour(hour, ampm) {
    if (ampm === void 0) { ampm = false; }
    if (ampm) {
        if (hour === 0) {
            return '';
        }
        if (hour === 12) {
            return "12:00 PM";
        }
        if (hour > 12) {
            return "".concat(hour - 12, ":00 PM");
        }
        return "".concat(hour, ":00 AM");
    }
    return "".concat(hour, ":00");
}
function isToday(date) {
    var today = dayjs__default['default']();
    return today.isSame(date, 'day');
}
function getRelativeTopInDay(date) {
    return (100 * (date.hour() * 60 + date.minute())) / DAY_MINUTES;
}
function todayInMinutes() {
    var today = dayjs__default['default']();
    return today.diff(dayjs__default['default']().startOf('day'), 'minute');
}
function modeToNum(mode, current) {
    if (mode === 'month') {
        if (!current) {
            throw new Error('You must specify current date if mode is month');
        }
        if (current instanceof Date) {
            current = dayjs__default['default'](current);
        }
        return current.daysInMonth() - current.date() + 1;
    }
    switch (mode) {
        case 'day':
            return 1;
        case '3days':
            return 3;
        case 'week':
        case 'custom':
            return 7;
        default:
            throw new Error('undefined mode');
    }
}
function formatStartEnd(start, end, format) {
    return "".concat(dayjs__default['default'](start).format(format), " - ").concat(dayjs__default['default'](end).format(format));
}
function isAllDayEvent(start, end) {
    var _start = dayjs__default['default'](start);
    var _end = dayjs__default['default'](end);
    return _start.hour() === 0 && _start.minute() === 0 && _end.hour() === 0 && _end.minute() === 0;
}
function getCountOfEventsAtEvent(event, eventList) {
    return eventList.filter(function (e) {
        return dayjs__default['default'](event.start).isBetween(e.start, e.end, 'minute', '[)') ||
            dayjs__default['default'](e.start).isBetween(event.start, event.end, 'minute', '[)');
    }).length;
}
function getOrderOfEvent(event, eventList) {
    var events = eventList
        .filter(function (e) {
        return dayjs__default['default'](event.start).isBetween(e.start, e.end, 'minute', '[)') ||
            dayjs__default['default'](e.start).isBetween(event.start, event.end, 'minute', '[)');
    })
        .sort(function (a, b) {
        if (dayjs__default['default'](a.start).isSame(b.start)) {
            return dayjs__default['default'](a.start).diff(a.end) < dayjs__default['default'](b.start).diff(b.end) ? -1 : 1;
        }
        else {
            return dayjs__default['default'](a.start).isBefore(b.start) ? -1 : 1;
        }
    });
    var index = events.indexOf(event);
    return index === -1 ? 0 : index;
}
function getStyleForOverlappingEvent(eventPosition, overlapOffset, palettes) {
    var overlapStyle = {};
    var offset = overlapOffset;
    var start = eventPosition * offset;
    var zIndex = 100 + eventPosition;
    var bgColors = palettes.map(function (p) { return p.main; });
    overlapStyle = {
        start: start + OVERLAP_PADDING,
        end: OVERLAP_PADDING,
        backgroundColor: bgColors[eventPosition % bgColors.length] || bgColors[0],
        zIndex: zIndex,
    };
    return overlapStyle;
}
function getDatesInNextCustomDays(date, weekStartsOn, weekEndsOn, locale) {
    if (date === void 0) { date = new Date(); }
    if (weekStartsOn === void 0) { weekStartsOn = 0; }
    if (weekEndsOn === void 0) { weekEndsOn = 6; }
    if (locale === void 0) { locale = 'en'; }
    var subject = dayjs__default['default'](date);
    var subjectDOW = subject.day();
    var days = Array(weekDaysCount(weekStartsOn, weekEndsOn))
        .fill(0)
        .map(function (_, i) {
        return subject.add(i - subjectDOW + weekStartsOn, 'day').locale(locale);
    });
    return days;
}
// TODO: This method should be unit-tested
function weekDaysCount(weekStartsOn, weekEndsOn) {
    // handle reverse week
    if (weekEndsOn < weekStartsOn) {
        var daysCount = 1;
        var i = weekStartsOn;
        while (i !== weekEndsOn) {
            ++i;
            ++daysCount;
            if (i > 6) {
                i = 0;
            }
            // fallback for infinite
            if (daysCount > 7) {
                break;
            }
        }
        return daysCount;
    }
    // normal week
    if (weekEndsOn > weekStartsOn) {
        return weekEndsOn - weekStartsOn + 1;
    }
    // default
    return 1;
}
function getEventSpanningInfo(event, date, dayOfTheWeek, calendarWidth, showAdjacentMonths) {
    var dayWidth = calendarWidth / 7;
    // adding + 1 because durations start at 0
    var eventDuration = Math.floor(dayjs__default['default'].duration(dayjs__default['default'](event.end).diff(dayjs__default['default'](event.start))).asDays()) + 1;
    var eventDaysLeft = Math.floor(dayjs__default['default'].duration(dayjs__default['default'](event.end).diff(date)).asDays()) + 1;
    var weekDaysLeft = 7 - dayOfTheWeek;
    var monthDaysLeft = date.endOf('month').date() - date.date();
    // console.log(dayOfTheWeek === 0 && !showAdjacentMonths && monthDaysLeft < 7)
    var isMultipleDays = eventDuration > 1;
    // This is to determine how many days from the event to show during a week
    var eventWeekDuration = !showAdjacentMonths && monthDaysLeft < 7 && monthDaysLeft < eventDuration
        ? monthDaysLeft + 1
        : eventDuration > weekDaysLeft
            ? weekDaysLeft
            : eventDaysLeft < eventDuration
                ? eventDaysLeft
                : eventDuration;
    var isMultipleDaysStart = isMultipleDays &&
        (date.isSame(event.start, 'day') ||
            (dayOfTheWeek === 0 && date.isAfter(event.start)) ||
            (!showAdjacentMonths && date.get('date') === 1));
    // - 6 to take in account the padding
    var eventWidth = dayWidth * eventWeekDuration - 6;
    return { eventWidth: eventWidth, isMultipleDays: isMultipleDays, isMultipleDaysStart: isMultipleDaysStart, eventWeekDuration: eventWeekDuration };
}
function objHasContent(obj) {
    return !!Object.keys(obj).length;
}
function stringHasContent(string) {
    return !!string.length;
}
function getWeeksWithAdjacentMonths(targetDate, weekStartsOn) {
    var weeks = calendarize__default['default'](targetDate.toDate(), weekStartsOn);
    var firstDayIndex = weeks[0].findIndex(function (d) { return d === 1; });
    var lastDay = targetDate.endOf('month').date();
    var lastDayIndex = weeks[weeks.length - 1].findIndex(function (d) { return d === lastDay; });
    weeks = weeks.map(function (week, iw) {
        return week.map(function (d, id) {
            if (d !== 0) {
                return d;
            }
            else if (iw === 0) {
                return d - (firstDayIndex - id - 1);
            }
            else {
                return lastDay + (id - lastDayIndex);
            }
        });
    });
    return weeks;
}

function useNow(enabled) {
    var _a = React__default['default'].useState(dayjs__default['default']()), now = _a[0], setNow = _a[1];
    React__default['default'].useEffect(function () {
        if (!enabled) {
            return function () { };
        }
        var pid = setInterval(function () { return setNow(dayjs__default['default']()); }, 60 * 1000);
        return function () { return clearInterval(pid); };
    }, [enabled]);
    return {
        now: now,
    };
}

var SWIPE_THRESHOLD = 50;
function usePanResponder(_a) {
    var onSwipeHorizontal = _a.onSwipeHorizontal;
    var _b = React__default['default'].useState(false), panHandled = _b[0], setPanHandled = _b[1];
    var panResponder = React__default['default'].useMemo(function () {
        return reactNative.PanResponder.create({
            // see https://stackoverflow.com/questions/47568850/touchableopacity-with-parent-panresponder
            onMoveShouldSetPanResponder: function (_, _a) {
                var dx = _a.dx, dy = _a.dy;
                return dx > 2 || dx < -2 || dy > 2 || dy < -2;
            },
            onPanResponderMove: function (_, _a) {
                var dy = _a.dy, dx = _a.dx;
                if (dy < -1 * SWIPE_THRESHOLD || SWIPE_THRESHOLD < dy || panHandled) {
                    return;
                }
                if (dx < -1 * SWIPE_THRESHOLD) {
                    onSwipeHorizontal && onSwipeHorizontal('LEFT');
                    setPanHandled(true);
                    return;
                }
                if (dx > SWIPE_THRESHOLD) {
                    onSwipeHorizontal && onSwipeHorizontal('RIGHT');
                    setPanHandled(true);
                    return;
                }
            },
            onPanResponderEnd: function () {
                setPanHandled(false);
            },
        });
    }, [panHandled, onSwipeHorizontal]);
    return panResponder;
}

function useCalendarTouchableOpacityProps(_a) {
    var event = _a.event, eventCellStyle = _a.eventCellStyle, _b = _a.injectedStyles, injectedStyles = _b === void 0 ? [] : _b, onPressEvent = _a.onPressEvent;
    var getEventStyle = React__default['default'].useMemo(function () { return (typeof eventCellStyle === 'function' ? eventCellStyle : function () { return eventCellStyle; }); }, [eventCellStyle]);
    var plainJsEvent = React__default['default'].useMemo(function () { return (__assign(__assign({}, event), { start: dayjs__default['default'](event.start).toDate(), end: dayjs__default['default'](event.end).toDate() })); }, [event]);
    var _onPress = React__default['default'].useCallback(function () {
        onPressEvent && onPressEvent(plainJsEvent);
    }, [onPressEvent, plainJsEvent]);
    var touchableOpacityProps = {
        delayPressIn: 20,
        key: event.start.toString(),
        style: __spreadArray(__spreadArray([eventCellCss.style], injectedStyles, true), [getEventStyle(plainJsEvent)]),
        onPress: _onPress,
        disabled: !onPressEvent,
    };
    return touchableOpacityProps;
}

function DefaultCalendarEventRenderer(_a) {
    var touchableOpacityProps = _a.touchableOpacityProps, event = _a.event, _b = _a.showTime, showTime = _b === void 0 ? true : _b, textColor = _a.textColor, ampm = _a.ampm;
    var theme = useTheme();
    var eventTimeStyle = { fontSize: theme.typography.xs.fontSize, color: textColor };
    var eventTitleStyle = { fontSize: theme.typography.sm.fontSize, color: textColor };
    return (React__namespace.createElement(reactNative.TouchableOpacity, __assign({}, touchableOpacityProps), dayjs__default['default'](event.end).diff(event.start, 'minute') < 32 && showTime ? (React__namespace.createElement(reactNative.Text, { style: eventTitleStyle },
        event.title,
        ",",
        React__namespace.createElement(reactNative.Text, { style: eventTimeStyle }, dayjs__default['default'](event.start).format(ampm ? 'hh:mm a' : 'HH:mm')))) : (React__namespace.createElement(React__namespace.Fragment, null,
        React__namespace.createElement(reactNative.Text, { style: eventTitleStyle }, event.title),
        showTime && (React__namespace.createElement(reactNative.Text, { style: eventTimeStyle }, formatStartEnd(event.start, event.end, ampm ? 'h:mm a' : 'HH:mm'))),
        event.children && event.children))));
}

var getEventCellPositionStyle = function (start, end) {
    var relativeHeight = 100 * (1 / DAY_MINUTES) * dayjs__default['default'](end).diff(start, 'minute');
    var relativeTop = getRelativeTopInDay(dayjs__default['default'](start));
    return {
        height: "".concat(relativeHeight, "%"),
        top: "".concat(relativeTop, "%"),
    };
};
function _CalendarEvent(_a) {
    var event = _a.event, onPressEvent = _a.onPressEvent, eventCellStyle = _a.eventCellStyle, showTime = _a.showTime, _b = _a.eventCount, eventCount = _b === void 0 ? 1 : _b, _c = _a.eventOrder, eventOrder = _c === void 0 ? 0 : _c, _d = _a.overlapOffset, overlapOffset = _d === void 0 ? OVERLAP_OFFSET : _d, renderEvent = _a.renderEvent, ampm = _a.ampm;
    var theme = useTheme();
    var palettes = React__namespace.useMemo(function () { return __spreadArray([theme.palette.primary], theme.eventCellOverlappings); }, [theme]);
    var touchableOpacityProps = useCalendarTouchableOpacityProps({
        event: event,
        eventCellStyle: eventCellStyle,
        onPressEvent: onPressEvent,
        injectedStyles: [
            getEventCellPositionStyle(event.start, event.end),
            getStyleForOverlappingEvent(eventOrder, overlapOffset, palettes),
            u['absolute'],
            u['mt-2'],
            u['mx-3'],
        ],
    });
    var textColor = React__namespace.useMemo(function () {
        var fgColors = palettes.map(function (p) { return p.contrastText; });
        return fgColors[eventCount % fgColors.length] || fgColors[0];
    }, [eventCount, palettes]);
    if (renderEvent) {
        return renderEvent(event, touchableOpacityProps);
    }
    return (React__namespace.createElement(DefaultCalendarEventRenderer, { event: event, showTime: showTime, ampm: ampm, touchableOpacityProps: touchableOpacityProps, textColor: textColor }));
}
var CalendarEvent = typedMemo(_CalendarEvent);

var HourGuideCell = function (_a) {
    var cellHeight = _a.cellHeight, onPress = _a.onPress, date = _a.date, hour = _a.hour, index = _a.index, calendarCellStyle = _a.calendarCellStyle;
    var theme = useTheme();
    var getCalendarCellStyle = React__namespace.useMemo(function () { return (typeof calendarCellStyle === 'function' ? calendarCellStyle : function () { return calendarCellStyle; }); }, [calendarCellStyle]);
    return (React__namespace.createElement(reactNative.TouchableWithoutFeedback, { onPress: function () { return onPress(date.hour(hour).minute(0)); } },
        React__namespace.createElement(reactNative.View, { style: [
                u['border-l'],
                u['border-b'],
                { borderColor: theme.palette.gray['200'], backgroundColor: theme.palette.cellBackgroundColor },
                { height: cellHeight },
                __assign({}, getCalendarCellStyle(date.toDate(), index)),
            ] },
            React__namespace.createElement(reactNative.View, { style: { height: cellHeight / 4, width: '100%', borderBottomColor: '#F1F1F1', borderBottomWidth: 1 } }),
            React__namespace.createElement(reactNative.View, { style: { height: cellHeight / 4, width: '100%', borderBottomColor: '#F1F1F1', borderBottomWidth: 1 } }),
            React__namespace.createElement(reactNative.View, { style: { height: cellHeight / 4, width: '100%', borderBottomColor: '#F1F1F1', borderBottomWidth: 1 } }),
            React__namespace.createElement(reactNative.View, { style: { height: cellHeight / 4, width: '100%', } }))));
};

var _HourGuideColumn$1 = function (_a) {
    var cellHeight = _a.cellHeight, hour = _a.hour, ampm = _a.ampm, _b = _a.hourStyle, hourStyle = _b === void 0 ? {} : _b;
    var theme = useTheme();
    var textStyle = React__namespace.useMemo(function () { return ({ color: theme.palette.gray[500], fontSize: theme.typography.xs.fontSize }); }, [theme]);
    return (React__namespace.createElement(reactNative.View, { style: { height: cellHeight, backgroundColor: theme.palette.cellBg, width: 70, borderTopWidth: 1, borderColor: theme.palette.gray[200] } },
        React__namespace.createElement(reactNative.Text, { style: [objHasContent(hourStyle) ? hourStyle : textStyle, u['text-center']] }, formatHour(hour, ampm))));
};
var HourGuideColumn$1 = React__namespace.memo(_HourGuideColumn$1, function () { return true; });

var styles$1 = reactNative.StyleSheet.create({
    nowIndicator: {
        position: 'absolute',
        zIndex: 10000,
        height: 2,
        width: '100%',
    },
});
function _CalendarBody(_a) {
    var containerHeight = _a.containerHeight, cellHeight = _a.cellHeight, dateRange = _a.dateRange, style = _a.style, onPressCell = _a.onPressCell, events = _a.events, onPressEvent = _a.onPressEvent, eventCellStyle = _a.eventCellStyle, calendarCellStyle = _a.calendarCellStyle, ampm = _a.ampm, showTime = _a.showTime, scrollOffsetMinutes = _a.scrollOffsetMinutes, onSwipeHorizontal = _a.onSwipeHorizontal, hideNowIndicator = _a.hideNowIndicator, overlapOffset = _a.overlapOffset, renderEvent = _a.renderEvent, _b = _a.headerComponent, headerComponent = _b === void 0 ? null : _b, _c = _a.headerComponentStyle, headerComponentStyle = _c === void 0 ? {} : _c, _d = _a.hourStyle, hourStyle = _d === void 0 ? {} : _d, _e = _a.showHourGuide, showHourGuide = _e === void 0 ? true : _e, _f = _a.hourRange, hourRange = _f === void 0 ? '0-23' : _f, multipleColumnData = _a.multipleColumnData, numberOfColumn = _a.numberOfColumn;
    var scrollView = React__namespace.useRef(null);
    var now = useNow(!hideNowIndicator).now;
    var _g = React__namespace.useState(0), page = _g[0], setPage = _g[1];
    React__namespace.useEffect(function () {
        if (scrollView.current && scrollOffsetMinutes && reactNative.Platform.OS !== 'ios') {
            // We add delay here to work correct on React Native
            // see: https://stackoverflow.com/questions/33208477/react-native-android-scrollview-scrollto-not-working
            setTimeout(function () {
                if (scrollView && scrollView.current) {
                    scrollView.current.scrollTo({
                        y: (cellHeight * scrollOffsetMinutes) / 60,
                        animated: false,
                    });
                }
            }, reactNative.Platform.OS === 'web' ? 0 : 10);
        }
    }, [scrollView, scrollOffsetMinutes, cellHeight]);
    var panResponder = usePanResponder({
        onSwipeHorizontal: onSwipeHorizontal,
    });
    var _onPressCell = React__namespace.useCallback(function (date) {
        onPressCell && onPressCell(date.toDate());
    }, [onPressCell]);
    var _renderMappedEvent = function (event) { return (React__namespace.createElement(CalendarEvent, { key: "".concat(event.start).concat(event.title).concat(event.end), event: event, onPressEvent: onPressEvent, eventCellStyle: eventCellStyle, showTime: showTime, eventCount: getCountOfEventsAtEvent(event, events), eventOrder: getOrderOfEvent(event, events), overlapOffset: overlapOffset, renderEvent: renderEvent, ampm: ampm })); };
    var theme = useTheme();
    var multipleData = [];
    var defaultNoOfColumns = numberOfColumn || 3;
    if (multipleColumnData && multipleColumnData.length > 0) {
        if (multipleColumnData.length >= defaultNoOfColumns) {
            for (var i = 0; i < multipleColumnData.length; i += defaultNoOfColumns) {
                multipleData.push(multipleColumnData.slice(i, i + defaultNoOfColumns));
            }
        }
        else {
            multipleData.push(multipleColumnData);
        }
    }
    return (React__namespace.createElement(React__namespace.Fragment, null,
        headerComponent != null ? React__namespace.createElement(reactNative.View, { style: headerComponentStyle }, headerComponent) : null,
        React__namespace.createElement(reactNative.ScrollView, __assign({ style: [
                {
                    height: containerHeight - cellHeight * 3,
                    backgroundColor: theme.palette.backgroundColor,
                    borderWidth: 1,
                    borderColor: theme.palette.borderColor,
                },
                style,
            ], ref: scrollView, scrollEventThrottle: 32 }, (reactNative.Platform.OS !== 'web' ? panResponder.panHandlers : {}), { showsVerticalScrollIndicator: false, nestedScrollEnabled: true, contentOffset: reactNative.Platform.OS === 'ios' ? { x: 0, y: scrollOffsetMinutes } : { x: 0, y: 0 }, stickyHeaderIndices: [0] }),
            multipleColumnData && multipleColumnData.length > 0 ?
                React__namespace.createElement(reactNative.View, { style: { flexDirection: 'row' } },
                    React__namespace.createElement(reactNative.View, { style: [u['z-20'], u['w-70'], { height: 100, backgroundColor: theme.palette.cellBg, }] }),
                    multipleData[page].map(function (column) {
                        return (React__namespace.createElement(reactNative.View, { style: {
                                backgroundColor: theme.palette.cellBg,
                                borderLeftWidth: 1,
                                borderBottomWidth: 1,
                                borderColor: theme.palette.borderColor,
                                height: 100,
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingVertical: 10,
                                width: 150,
                                flex: 1
                            } },
                            column.image_url && (React__namespace.createElement(reactNative.View, null,
                                React__namespace.createElement(reactNative.Image, { source: { uri: column.image_url }, style: { width: 50, height: 50, borderRadius: 50 } }))),
                            React__namespace.createElement(reactNative.View, { style: [
                                    { width: 150, paddingVertical: 10 },
                                ] },
                                React__namespace.createElement(reactNative.Text, { style: { color: theme.palette.headingColor, textAlign: 'center' } }, column.title))));
                    }))
                : React__namespace.createElement(reactNative.View, null),
            React__namespace.createElement(reactNative.View, __assign({ style: [
                    u['flex-1'],
                    theme.isRTL ? u['flex-row-reverse'] : u['flex-row'],
                    multipleColumnData && multipleColumnData.length > 0
                        ? { overflow: 'scroll', }
                        : {},
                ] }, (reactNative.Platform.OS === 'web' ? panResponder.panHandlers : {})),
                showHourGuide ? (React__namespace.createElement(reactNative.View, { style: [u['z-20'], u['w-70'], { marginTop: -1 }] }, hoursRange(hourRange).map(function (hour) { return (React__namespace.createElement(HourGuideColumn$1, { key: hour, cellHeight: cellHeight, hour: hour, ampm: ampm, hourStyle: hourStyle })); }))) : null,
                multipleColumnData && multipleColumnData.length > 0
                    ? multipleData[page].map(function (column) {
                        return dateRange.map(function (date) { return (React__namespace.createElement(reactNative.View, { style: [
                                u['flex-1'],
                                u['overflow-hidden'],
                                {
                                    width: 150,
                                    position: 'relative',
                                    overflow: 'visible',
                                },
                            ], key: date.toString() },
                            hoursRange(hourRange).map(function (hour, index) { return (React__namespace.createElement(HourGuideCell, { key: hour, cellHeight: cellHeight, date: date, hour: hour, onPress: _onPressCell, index: index, calendarCellStyle: calendarCellStyle })); }),
                            column.data
                                .filter(function (data) {
                                return dayjs__default['default'](data.start).isBetween(date.startOf('day'), date.endOf('day'), null, '[)');
                            })
                                .map(function (event) {
                                return __assign(__assign({}, event), { end: dayjs__default['default'](event.end).isAfter(dayjs__default['default'](event.start).endOf('day'))
                                        ? dayjs__default['default'](event.start).endOf('day')
                                        : event.end });
                            })
                                .map(_renderMappedEvent),
                            column.data
                                .filter(function (data) {
                                return (dayjs__default['default'](data.start).isBefore(date.startOf('day')) &&
                                    dayjs__default['default'](data.end).isBetween(date.startOf('day'), date.endOf('day'), null, '[)'));
                            })
                                .map(function (event) { return (__assign(__assign({}, event), { start: dayjs__default['default'](event.end).startOf('day') })); })
                                .map(_renderMappedEvent),
                            column.data
                                .filter(function (data) {
                                return (dayjs__default['default'](data.start).isBefore(date.startOf('day')) &&
                                    dayjs__default['default'](data.end).isAfter(date.endOf('day')));
                            })
                                .map(function (event) { return (__assign(__assign({}, event), { start: dayjs__default['default'](event.end).startOf('day'), end: dayjs__default['default'](event.end).endOf('day') })); })
                                .map(_renderMappedEvent),
                            isToday(date) && !hideNowIndicator && (React__namespace.createElement(reactNative.View, { style: [
                                    styles$1.nowIndicator,
                                    { backgroundColor: theme.palette.nowIndicator },
                                    { top: "".concat(getRelativeTopInDay(now), "%") },
                                ] })))); });
                    })
                    : dateRange.map(function (date) { return (React__namespace.createElement(reactNative.View, { style: [u['flex-1'], u['overflow-hidden']], key: date.toString() },
                        hoursRange(hourRange).map(function (hour, index) { return (React__namespace.createElement(HourGuideCell, { key: hour, cellHeight: cellHeight, date: date, hour: hour, onPress: _onPressCell, index: index, calendarCellStyle: calendarCellStyle })); }),
                        events
                            .filter(function (_a) {
                            var start = _a.start;
                            return dayjs__default['default'](start).isBetween(date.startOf('day'), date.endOf('day'), null, '[)');
                        })
                            .map(_renderMappedEvent),
                        events
                            .filter(function (_a) {
                            var start = _a.start, end = _a.end;
                            return dayjs__default['default'](start).isBefore(date.startOf('day')) &&
                                dayjs__default['default'](end).isBetween(date.startOf('day'), date.endOf('day'), null, '[)');
                        })
                            .map(function (event) { return (__assign(__assign({}, event), { start: dayjs__default['default'](event.end).startOf('day') })); })
                            .map(_renderMappedEvent),
                        events
                            .filter(function (_a) {
                            var start = _a.start, end = _a.end;
                            return dayjs__default['default'](start).isBefore(date.startOf('day')) &&
                                dayjs__default['default'](end).isAfter(date.endOf('day'));
                        })
                            .map(function (event) { return (__assign(__assign({}, event), { start: dayjs__default['default'](event.end).startOf('day'), end: dayjs__default['default'](event.end).endOf('day') })); })
                            .map(_renderMappedEvent),
                        isToday(date) && !hideNowIndicator && (React__namespace.createElement(reactNative.View, { style: [
                                styles$1.nowIndicator,
                                { backgroundColor: theme.palette.nowIndicator },
                                { top: "".concat(getRelativeTopInDay(now), "%") },
                            ] })))); }))),
        multipleData.length > 1 ?
            React__namespace.createElement(reactNative.View, { style: { flexDirection: "row", alignItems: 'center', justifyContent: 'flex-end', paddingTop: 20 } },
                React__namespace.createElement(reactNative.Pressable, { onPress: function () {
                        if (page - 1 >= 0) {
                            setPage(page - 1);
                        }
                    } },
                    React__namespace.createElement(reactNative.View, null,
                        React__namespace.createElement(reactNative.Text, { style: { color: theme.palette.headingColor } }, "< PREV"))),
                React__namespace.createElement(reactNative.View, { style: { width: 20 } }),
                React__namespace.createElement(reactNative.Pressable, { onPress: function () {
                        if (multipleData[page + 1])
                            setPage(page + 1);
                    } },
                    React__namespace.createElement(reactNative.View, null,
                        React__namespace.createElement(reactNative.Text, null, "NEXT >"))))
            : null));
}
var CalendarBody = typedMemo(_CalendarBody);

function _CalendarEventForMonthView(_a) {
    var event = _a.event, onPressEvent = _a.onPressEvent, eventCellStyle = _a.eventCellStyle, renderEvent = _a.renderEvent, date = _a.date, dayOfTheWeek = _a.dayOfTheWeek, calendarWidth = _a.calendarWidth, isRTL = _a.isRTL, eventMinHeightForMonthView = _a.eventMinHeightForMonthView, showAdjacentMonths = _a.showAdjacentMonths;
    var theme = useTheme();
    var _b = React__namespace.useMemo(function () { return getEventSpanningInfo(event, date, dayOfTheWeek, calendarWidth, showAdjacentMonths); }, [date, dayOfTheWeek, event, calendarWidth, showAdjacentMonths]), eventWidth = _b.eventWidth, isMultipleDays = _b.isMultipleDays, isMultipleDaysStart = _b.isMultipleDaysStart, eventWeekDuration = _b.eventWeekDuration;
    var touchableOpacityProps = useCalendarTouchableOpacityProps({
        event: event,
        eventCellStyle: eventCellStyle,
        onPressEvent: onPressEvent,
        injectedStyles: [
            { backgroundColor: theme.palette.primary.main },
            isMultipleDaysStart && eventWeekDuration > 1
                ? {
                    position: 'absolute',
                    width: eventWidth,
                    zIndex: 10000,
                }
                : {},
            isRTL ? { right: 0 } : { left: 0 },
            u['mt-2'],
        ],
    });
    return (React__namespace.createElement(reactNative.TouchableOpacity, { style: { minHeight: eventMinHeightForMonthView }, onPress: function () { return onPressEvent === null || onPressEvent === void 0 ? void 0 : onPressEvent(event); } }, (!isMultipleDays && date.isSame(event.start, 'day')) ||
        (isMultipleDays && isMultipleDaysStart) ? (renderEvent ? (renderEvent(event, touchableOpacityProps)) : (React__namespace.createElement(reactNative.View, __assign({}, touchableOpacityProps),
        React__namespace.createElement(reactNative.Text, { style: [
                { color: theme.palette.primary.contrastText },
                theme.typography.xs,
                u['truncate'],
                isRTL && { textAlign: 'right' },
            ], numberOfLines: 1 }, event.title)))) : null));
}
var CalendarEventForMonthView = typedMemo(_CalendarEventForMonthView);

function _CalendarBodyForMonthView(_a) {
    var containerHeight = _a.containerHeight, targetDate = _a.targetDate, style = _a.style, onPressCell = _a.onPressCell, onPressDateHeader = _a.onPressDateHeader, events = _a.events, onPressEvent = _a.onPressEvent, eventCellStyle = _a.eventCellStyle, calendarCellStyle = _a.calendarCellStyle, calendarCellTextStyle = _a.calendarCellTextStyle, onSwipeHorizontal = _a.onSwipeHorizontal, hideNowIndicator = _a.hideNowIndicator, showAdjacentMonths = _a.showAdjacentMonths, renderEvent = _a.renderEvent, maxVisibleEventCount = _a.maxVisibleEventCount, weekStartsOn = _a.weekStartsOn, eventMinHeightForMonthView = _a.eventMinHeightForMonthView;
    var now = useNow(!hideNowIndicator).now;
    var _b = React__namespace.useState(0), calendarWidth = _b[0], setCalendarWidth = _b[1];
    var panResponder = usePanResponder({
        onSwipeHorizontal: onSwipeHorizontal,
    });
    var weeks = showAdjacentMonths
        ? getWeeksWithAdjacentMonths(targetDate, weekStartsOn)
        : calendarize__default['default'](targetDate.toDate(), weekStartsOn);
    var minCellHeight = containerHeight / 5 - 30;
    var theme = useTheme();
    var getCalendarCellStyle = React__namespace.useMemo(function () { return (typeof calendarCellStyle === 'function' ? calendarCellStyle : function () { return calendarCellStyle; }); }, [calendarCellStyle]);
    var getCalendarCellTextStyle = React__namespace.useMemo(function () {
        return typeof calendarCellTextStyle === 'function'
            ? calendarCellTextStyle
            : function () { return calendarCellTextStyle; };
    }, [calendarCellTextStyle]);
    return (React__namespace.createElement(reactNative.View, __assign({ style: [
            {
                height: containerHeight,
            },
            u['flex-column'],
            u['flex-1'],
            u['border-b'],
            u['border-l'],
            u['border-r'],
            u['rounded'],
            { borderColor: theme.palette.gray['200'] },
            style,
        ], onLayout: function (_a) {
            var layout = _a.nativeEvent.layout;
            return setCalendarWidth(layout.width);
        } }, panResponder.panHandlers), weeks.map(function (week, i) { return (React__namespace.createElement(reactNative.View, { key: i, style: [
            u['flex-1'],
            theme.isRTL ? u['flex-row-reverse'] : u['flex-row'],
            reactNative.Platform.OS === 'android' && style,
            {
                minHeight: minCellHeight,
            },
        ] }, week
        .map(function (d) {
        return showAdjacentMonths ? targetDate.date(d) : d > 0 ? targetDate.date(d) : null;
    })
        .map(function (date, ii) { return (React__namespace.createElement(reactNative.TouchableOpacity, { onPress: function () { return date && onPressCell && onPressCell(date.toDate()); }, style: [
            i > 0 && u['border-t'],
            theme.isRTL && ii > 0 && u['border-r'],
            !theme.isRTL && ii > 0 && u['border-l'],
            { borderColor: theme.palette.gray['200'] },
            u['p-2'],
            u['flex-1'],
            u['flex-column'],
            {
                minHeight: minCellHeight,
            },
            __assign({}, getCalendarCellStyle(date === null || date === void 0 ? void 0 : date.toDate(), i)),
        ], key: ii },
        React__namespace.createElement(reactNative.TouchableOpacity, { onPress: function () {
                return date &&
                    (onPressDateHeader
                        ? onPressDateHeader(date.toDate())
                        : onPressCell && onPressCell(date.toDate()));
            } },
            React__namespace.createElement(reactNative.Text, { style: [
                    { textAlign: 'center' },
                    theme.typography.sm,
                    {
                        color: (date === null || date === void 0 ? void 0 : date.format('YYYY-MM-DD')) === now.format('YYYY-MM-DD')
                            ? theme.palette.primary.main
                            : (date === null || date === void 0 ? void 0 : date.month()) !== targetDate.month()
                                ? theme.palette.gray['500']
                                : theme.palette.gray['800'],
                    },
                    __assign({}, getCalendarCellTextStyle(date === null || date === void 0 ? void 0 : date.toDate(), i)),
                ] }, date && date.format('D'))),
        date &&
            events
                .sort(function (a, b) {
                if (dayjs__default['default'](a.start).isSame(b.start, 'day')) {
                    var aDuration = dayjs__default['default'].duration(dayjs__default['default'](a.end).diff(dayjs__default['default'](a.start))).days();
                    var bDuration = dayjs__default['default'].duration(dayjs__default['default'](b.end).diff(dayjs__default['default'](b.start))).days();
                    return bDuration - aDuration;
                }
                return a.start.getTime() - b.start.getTime();
            })
                .filter(function (_a) {
                var start = _a.start, end = _a.end;
                return date.isBetween(dayjs__default['default'](start).startOf('day'), dayjs__default['default'](end).endOf('day'), null, '[)');
            })
                .reduce(function (elements, event, index, events) { return __spreadArray(__spreadArray([], elements, true), [
                index > maxVisibleEventCount ? null : index === maxVisibleEventCount ? (React__namespace.createElement(reactNative.Text, { key: index, style: { fontSize: 11, marginTop: 2, fontWeight: 'bold' } },
                    events.length - maxVisibleEventCount,
                    " More")) : (React__namespace.createElement(CalendarEventForMonthView, { key: index, event: event, eventCellStyle: eventCellStyle, onPressEvent: onPressEvent, renderEvent: renderEvent, date: date, dayOfTheWeek: ii, calendarWidth: calendarWidth, isRTL: theme.isRTL, eventMinHeightForMonthView: eventMinHeightForMonthView, showAdjacentMonths: showAdjacentMonths })),
            ]); }, []))); }))); })));
}
var CalendarBodyForMonthView = typedMemo(_CalendarBodyForMonthView);

// import { GestureHandlerRootView } from 'react-native-gesture-handler';
var styles = reactNative.StyleSheet.create({
    nowIndicator: {
        position: 'absolute',
        zIndex: 10000,
        height: 2,
        width: '100%',
    },
    container: {
        flex: 1,
        padding: 12,
        paddingTop: 40,
        justifyContent: 'space-evenly',
    },
    centeredContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    receivingZone: {
        height: 200,
        borderRadius: 10,
    },
    receiving: {
        borderColor: 'red',
        borderWidth: 2,
    },
    incomingPayload: {
        marginTop: 10,
        fontSize: 24,
    },
    received: {
        marginTop: 10,
        fontSize: 18,
    },
    palette: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    draggableBox: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    green: {
        backgroundColor: '#aaffaa',
    },
    blue: {
        backgroundColor: '#aaaaff',
    },
    red: {
        backgroundColor: '#ffaaaa',
    },
    yellow: {
        backgroundColor: '#ffffaa',
    },
    cyan: {
        backgroundColor: '#aaffff',
    },
    magenta: {
        backgroundColor: '#ffaaff',
    },
    dragging: {
        opacity: 0.2,
    },
    hoverDragging: {
        borderColor: 'magenta',
        borderWidth: 2,
    },
    stagedCount: {
        fontSize: 18,
    },
});
function _CalendarBodyForMultiUser(_a) {
    var containerHeight = _a.containerHeight, cellHeight = _a.cellHeight, dateRange = _a.dateRange, style = _a.style, onPressCell = _a.onPressCell, events = _a.events, onPressEvent = _a.onPressEvent, eventCellStyle = _a.eventCellStyle, calendarCellStyle = _a.calendarCellStyle, ampm = _a.ampm, showTime = _a.showTime, scrollOffsetMinutes = _a.scrollOffsetMinutes, onSwipeHorizontal = _a.onSwipeHorizontal, hideNowIndicator = _a.hideNowIndicator, overlapOffset = _a.overlapOffset, renderEvent = _a.renderEvent, _b = _a.headerComponent, headerComponent = _b === void 0 ? null : _b, _c = _a.headerComponentStyle, headerComponentStyle = _c === void 0 ? {} : _c, _d = _a.hourStyle, hourStyle = _d === void 0 ? {} : _d, _e = _a.showHourGuide, showHourGuide = _e === void 0 ? true : _e, _f = _a.hourRange, hourRange = _f === void 0 ? '0-23' : _f, multipleColumnData = _a.multipleColumnData, numberOfColumn = _a.numberOfColumn;
    var scrollView = React__namespace.useRef(null);
    var now = useNow(!hideNowIndicator).now;
    React__namespace.useEffect(function () {
        if (scrollView.current && scrollOffsetMinutes && reactNative.Platform.OS !== 'ios') {
            // We add delay here to work correct on React Native
            // see: https://stackoverflow.com/questions/33208477/react-native-android-scrollview-scrollto-not-working
            setTimeout(function () {
                if (scrollView && scrollView.current) {
                    scrollView.current.scrollTo({
                        y: (cellHeight * scrollOffsetMinutes) / 60,
                        animated: false,
                    });
                }
            }, reactNative.Platform.OS === 'web' ? 0 : 10);
        }
    }, [scrollView, scrollOffsetMinutes, cellHeight]);
    var panResponder = usePanResponder({
        onSwipeHorizontal: onSwipeHorizontal,
    });
    var _onPressCell = React__namespace.useCallback(function (date) {
        onPressCell && onPressCell(date.toDate());
    }, [onPressCell]);
    var _renderMappedEvent = function (event) { return (React__namespace.createElement(CalendarEvent, { key: "".concat(event.start).concat(event.title).concat(event.end), event: event, onPressEvent: onPressEvent, eventCellStyle: eventCellStyle, showTime: showTime, eventCount: getCountOfEventsAtEvent(event, events), eventOrder: getOrderOfEvent(event, events), overlapOffset: overlapOffset, renderEvent: renderEvent, ampm: ampm })); };
    var theme = useTheme();
    var multipleData = [];
    var defaultNoOfColumns = numberOfColumn || 3;
    if (multipleColumnData && multipleColumnData.length > 0) {
        if (multipleColumnData.length >= defaultNoOfColumns) {
            for (var i = 0; i < multipleColumnData.length; i += defaultNoOfColumns) {
                multipleData.push(multipleColumnData.slice(i, i + defaultNoOfColumns));
            }
        }
        else {
            multipleData.push(multipleColumnData);
        }
    }
    return (React__namespace.createElement(React__namespace.Fragment, null,
        headerComponent != null ? React__namespace.createElement(reactNative.View, { style: headerComponentStyle }, headerComponent) : null,
        React__namespace.createElement(reactNative.ScrollView, __assign({ style: [
                {
                    height: containerHeight - cellHeight * 3,
                    backgroundColor: theme.palette.backgroundColor,
                    borderWidth: 1,
                    borderColor: theme.palette.borderColor,
                },
                style,
            ], ref: scrollView, scrollEventThrottle: 32 }, (reactNative.Platform.OS !== 'web' ? panResponder.panHandlers : {}), { showsVerticalScrollIndicator: false, nestedScrollEnabled: true, contentOffset: reactNative.Platform.OS === 'ios' ? { x: 0, y: scrollOffsetMinutes } : { x: 0, y: 0 }, stickyHeaderIndices: [0] }),
            React__namespace.createElement(reactNative.View, __assign({ style: [
                    u['flex-1'],
                    theme.isRTL ? u['flex-row-reverse'] : u['flex-row'],
                    multipleColumnData && multipleColumnData.length > 0
                        ? { overflow: 'scroll', }
                        : {},
                ] }, (reactNative.Platform.OS === 'web' ? panResponder.panHandlers : {})),
                showHourGuide ? (React__namespace.createElement(reactNative.View, { style: [u['z-20'], u['w-70'], { marginTop: -1 }] }, hoursRange(hourRange).map(function (hour) { return (React__namespace.createElement(HourGuideColumn$1, { key: hour, cellHeight: cellHeight, hour: hour, ampm: ampm, hourStyle: hourStyle })); }))) : null,
                dateRange.map(function (date) { return (React__namespace.createElement(reactNative.View, { style: [u['flex-1'], u['overflow-hidden']], key: date.toString() },
                    hoursRange(hourRange).map(function (hour, index) { return (React__namespace.createElement(HourGuideCell, { key: hour, cellHeight: cellHeight, date: date, hour: hour, onPress: _onPressCell, index: index, calendarCellStyle: calendarCellStyle })); }),
                    events
                        .filter(function (_a) {
                        var start = _a.start;
                        return dayjs__default['default'](start).isBetween(date.startOf('day'), date.endOf('day'), null, '[)');
                    })
                        .map(_renderMappedEvent),
                    events
                        .filter(function (_a) {
                        var start = _a.start, end = _a.end;
                        return dayjs__default['default'](start).isBefore(date.startOf('day')) &&
                            dayjs__default['default'](end).isBetween(date.startOf('day'), date.endOf('day'), null, '[)');
                    })
                        .map(function (event) { return (__assign(__assign({}, event), { start: dayjs__default['default'](event.end).startOf('day') })); })
                        .map(_renderMappedEvent),
                    events
                        .filter(function (_a) {
                        var start = _a.start, end = _a.end;
                        return dayjs__default['default'](start).isBefore(date.startOf('day')) &&
                            dayjs__default['default'](end).isAfter(date.endOf('day'));
                    })
                        .map(function (event) { return (__assign(__assign({}, event), { start: dayjs__default['default'](event.end).startOf('day'), end: dayjs__default['default'](event.end).endOf('day') })); })
                        .map(_renderMappedEvent),
                    isToday(date) && !hideNowIndicator && (React__namespace.createElement(reactNative.View, { style: [
                            styles.nowIndicator,
                            { backgroundColor: theme.palette.nowIndicator },
                            { top: "".concat(getRelativeTopInDay(now), "%") },
                        ] })))); })))));
}
var CalendarBodyForMultiUser = typedMemo(_CalendarBodyForMultiUser);

function _CalendarHeader(_a) {
    var dateRange = _a.dateRange, cellHeight = _a.cellHeight, style = _a.style, allDayEvents = _a.allDayEvents, onPressDateHeader = _a.onPressDateHeader, onPressEvent = _a.onPressEvent, activeDate = _a.activeDate, _b = _a.headerContentStyle, headerContentStyle = _b === void 0 ? {} : _b, _c = _a.dayHeaderStyle, dayHeaderStyle = _c === void 0 ? {} : _c, _d = _a.dayHeaderHighlightColor, dayHeaderHighlightColor = _d === void 0 ? '' : _d, _e = _a.weekDayHeaderHighlightColor, weekDayHeaderHighlightColor = _e === void 0 ? '' : _e, _f = _a.showAllDayEventCell, showAllDayEventCell = _f === void 0 ? true : _f;
    var _onPressHeader = React__namespace.useCallback(function (date) {
        onPressDateHeader && onPressDateHeader(date);
    }, [onPressDateHeader]);
    var _onPressEvent = React__namespace.useCallback(function (event) {
        onPressEvent && onPressEvent(event);
    }, [onPressEvent]);
    var theme = useTheme();
    var borderColor = { borderColor: theme.palette.gray['200'] };
    var primaryBg = { backgroundColor: theme.palette.primary.main };
    return (React__namespace.createElement(reactNative.View, { style: [
            showAllDayEventCell ? u['border-b-2'] : {},
            showAllDayEventCell ? borderColor : {},
            theme.isRTL ? u['flex-row-reverse'] : u['flex-row'],
            style,
        ] },
        React__namespace.createElement(reactNative.View, { style: [u['z-10'], u['w-50'], borderColor] }),
        dateRange.map(function (date) {
            var shouldHighlight = activeDate ? date.isSame(activeDate, 'date') : isToday(date);
            return (React__namespace.createElement(reactNative.TouchableOpacity, { style: [u['flex-1'], u['pt-2']], onPress: function () { return _onPressHeader(date.toDate()); }, disabled: onPressDateHeader === undefined, key: date.toString() },
                React__namespace.createElement(reactNative.View, { style: [
                        { minHeight: cellHeight, paddingVertical: 10 },
                        objHasContent(headerContentStyle) ? headerContentStyle : u['justify-between'],
                    ] },
                    React__namespace.createElement(reactNative.Text, { style: [
                            theme.typography.xs,
                            u['text-center'],
                            {
                                color: shouldHighlight
                                    ? stringHasContent(weekDayHeaderHighlightColor)
                                        ? weekDayHeaderHighlightColor
                                        : theme.palette.primary.main
                                    : theme.palette.gray['500'],
                            },
                        ] }, date.format('ddd')),
                    React__namespace.createElement(reactNative.View, { style: objHasContent(dayHeaderStyle)
                            ? dayHeaderStyle
                            : shouldHighlight
                                ? [
                                    primaryBg,
                                    u['h-36'],
                                    u['w-36'],
                                    u['pb-6'],
                                    u['rounded-full'],
                                    u['items-center'],
                                    u['justify-center'],
                                    u['self-center'],
                                    u['z-20'],
                                ]
                                : [u['mb-6']] },
                        React__namespace.createElement(reactNative.Text, { style: [
                                {
                                    color: shouldHighlight
                                        ? stringHasContent(dayHeaderHighlightColor)
                                            ? dayHeaderHighlightColor
                                            : theme.palette.primary.contrastText
                                        : theme.palette.gray['800'],
                                },
                                theme.typography.xl,
                                u['text-center'],
                                reactNative.Platform.OS === 'web' &&
                                    shouldHighlight &&
                                    !stringHasContent(dayHeaderHighlightColor) &&
                                    u['mt-6'],
                            ] }, date.format('D')))),
                showAllDayEventCell ? (React__namespace.createElement(reactNative.View, { style: [
                        u['border-l'],
                        { borderColor: theme.palette.gray['200'] },
                        { height: allDayEvents && allDayEvents.length > 0 ? cellHeight : 0 },
                    ] }, allDayEvents.map(function (event) {
                    if (!dayjs__default['default'](date).isBetween(event.start, event.end, 'day', '[]')) {
                        return null;
                    }
                    return (React__namespace.createElement(reactNative.TouchableOpacity, { style: [eventCellCss.style, primaryBg, u['mt-2']], key: "".concat(event.start).concat(event.title), onPress: function () { return _onPressEvent(event); } },
                        React__namespace.createElement(reactNative.Text, { style: {
                                fontSize: theme.typography.sm.fontSize,
                                color: theme.palette.primary.contrastText,
                            } }, event.title)));
                }))) : null));
        })));
}
var CalendarHeader = typedMemo(_CalendarHeader);

function _CalendarHeaderForMonthView(_a) {
    var locale = _a.locale, weekStartsOn = _a.weekStartsOn, style = _a.style;
    var dates = getDatesInWeek(new Date(), weekStartsOn, locale);
    var todayWeekNum = dayjs__default['default']().day();
    var theme = useTheme();
    return (React__namespace.createElement(reactNative.View, { style: [
            u['border-b'],
            { borderColor: theme.palette.gray['100'] },
            theme.isRTL ? u['flex-row-reverse'] : u['flex-row'],
            style,
        ] }, dates.map(function (date) { return (React__namespace.createElement(reactNative.View, { style: { flex: 1, paddingTop: 2 }, key: date.toISOString() },
        React__namespace.createElement(reactNative.View, { style: { height: 30 } },
            React__namespace.createElement(reactNative.Text, { style: [
                    u['text-center'],
                    {
                        color: todayWeekNum === date.day()
                            ? theme.palette.primary.main
                            : theme.palette.gray['800'],
                    },
                ] }, date.format('ddd'))))); })));
}
var CalendarHeaderForMonthView = typedMemo(_CalendarHeaderForMonthView);

function _CalendarContainer(_a) {
    var _b = _a.events, events = _b === void 0 ? [] : _b, height = _a.height, hourRowHeight = _a.hourRowHeight, _c = _a.ampm, ampm = _c === void 0 ? false : _c, date = _a.date, eventCellStyle = _a.eventCellStyle, calendarCellStyle = _a.calendarCellStyle, calendarCellTextStyle = _a.calendarCellTextStyle, _d = _a.locale, locale = _d === void 0 ? 'en' : _d, _e = _a.hideNowIndicator, hideNowIndicator = _e === void 0 ? false : _e, _f = _a.showAdjacentMonths, showAdjacentMonths = _f === void 0 ? false : _f, _g = _a.mode, mode = _g === void 0 ? 'week' : _g, overlapOffset = _a.overlapOffset, _h = _a.scrollOffsetMinutes, scrollOffsetMinutes = _h === void 0 ? 0 : _h, _j = _a.showTime, showTime = _j === void 0 ? true : _j, _k = _a.headerContainerStyle, headerContainerStyle = _k === void 0 ? {} : _k, _l = _a.headerContentStyle, headerContentStyle = _l === void 0 ? {} : _l, _m = _a.dayHeaderStyle, dayHeaderStyle = _m === void 0 ? {} : _m, _o = _a.dayHeaderHighlightColor, dayHeaderHighlightColor = _o === void 0 ? '' : _o, _p = _a.weekDayHeaderHighlightColor, weekDayHeaderHighlightColor = _p === void 0 ? '' : _p, _q = _a.bodyContainerStyle, bodyContainerStyle = _q === void 0 ? {} : _q, _r = _a.swipeEnabled, swipeEnabled = _r === void 0 ? true : _r, _s = _a.weekStartsOn, weekStartsOn = _s === void 0 ? 0 : _s, onChangeDate = _a.onChangeDate, onPressCell = _a.onPressCell, onPressDateHeader = _a.onPressDateHeader, onPressEvent = _a.onPressEvent, renderEvent = _a.renderEvent, _t = _a.renderHeader, HeaderComponent = _t === void 0 ? CalendarHeader : _t, _u = _a.renderHeaderForMonthView, HeaderComponentForMonthView = _u === void 0 ? CalendarHeaderForMonthView : _u, _v = _a.weekEndsOn, weekEndsOn = _v === void 0 ? 6 : _v, _w = _a.maxVisibleEventCount, maxVisibleEventCount = _w === void 0 ? 3 : _w, _x = _a.eventMinHeightForMonthView, eventMinHeightForMonthView = _x === void 0 ? 22 : _x, activeDate = _a.activeDate, _y = _a.headerComponent, headerComponent = _y === void 0 ? null : _y, _z = _a.headerComponentStyle, headerComponentStyle = _z === void 0 ? {} : _z, _0 = _a.hourStyle, hourStyle = _0 === void 0 ? {} : _0, _1 = _a.showAllDayEventCell, showAllDayEventCell = _1 === void 0 ? true : _1, _2 = _a.showHourGuide, showHourGuide = _2 === void 0 ? true : _2, hourRange = _a.hourRange, multipleColumnData = _a.multipleColumnData, numberOfColumn = _a.numberOfColumn;
    var _3 = React__default['default'].useState(dayjs__default['default'](date)), targetDate = _3[0], setTargetDate = _3[1];
    React__default['default'].useEffect(function () {
        if (date) {
            setTargetDate(dayjs__default['default'](date));
        }
    }, [date]);
    var allDayEvents = React__default['default'].useMemo(function () { return events.filter(function (event) { return isAllDayEvent(event.start, event.end); }); }, [events]);
    var daytimeEvents = React__default['default'].useMemo(function () { return events.filter(function (event) { return !isAllDayEvent(event.start, event.end); }); }, [events]);
    var dateRange = React__default['default'].useMemo(function () {
        switch (mode) {
            case 'month':
                return getDatesInMonth(targetDate, locale);
            case 'week':
                return getDatesInWeek(targetDate, weekStartsOn, locale);
            case '3days':
                return getDatesInNextThreeDays(targetDate, locale);
            case 'day':
                return getDatesInNextOneDay(targetDate, locale);
            case 'custom':
                return getDatesInNextCustomDays(targetDate, weekStartsOn, weekEndsOn, locale);
            default:
                throw new Error("[react-native-big-calendar] The mode which you specified \"".concat(mode, "\" is not supported."));
        }
    }, [mode, targetDate, locale, weekEndsOn, weekStartsOn]);
    React__default['default'].useEffect(function () {
        if (onChangeDate) {
            onChangeDate([dateRange[0].toDate(), dateRange.slice(-1)[0].toDate()]);
        }
    }, [dateRange, onChangeDate]);
    var cellHeight = React__default['default'].useMemo(function () { return hourRowHeight || Math.max(height - 30, MIN_HEIGHT) / 24; }, [height, hourRowHeight]);
    var theme = useTheme();
    var onSwipeHorizontal = React__default['default'].useCallback(function (direction) {
        if (!swipeEnabled) {
            return;
        }
        if ((direction === 'LEFT' && !theme.isRTL) || (direction === 'RIGHT' && theme.isRTL)) {
            setTargetDate(targetDate.add(modeToNum(mode, targetDate), 'day'));
        }
        else {
            if (mode === 'month') {
                setTargetDate(targetDate.add(targetDate.date() * -1, 'day'));
            }
            else {
                setTargetDate(targetDate.add(modeToNum(mode, targetDate) * -1, 'day'));
            }
        }
    }, [swipeEnabled, targetDate, mode, theme.isRTL]);
    var commonProps = {
        cellHeight: cellHeight,
        dateRange: dateRange,
        mode: mode,
        onPressEvent: onPressEvent,
    };
    if (mode === 'month') {
        var headerProps_1 = {
            style: headerContainerStyle,
            locale: locale,
            weekStartsOn: weekStartsOn,
            headerContentStyle: headerContentStyle,
            dayHeaderStyle: dayHeaderStyle,
            dayHeaderHighlightColor: dayHeaderHighlightColor,
            weekDayHeaderHighlightColor: weekDayHeaderHighlightColor,
            showAllDayEventCell: showAllDayEventCell,
        };
        return (React__default['default'].createElement(React__default['default'].Fragment, null,
            React__default['default'].createElement(HeaderComponentForMonthView, __assign({}, headerProps_1)),
            React__default['default'].createElement(CalendarBodyForMonthView, __assign({}, commonProps, { style: bodyContainerStyle, containerHeight: height, events: __spreadArray(__spreadArray([], daytimeEvents, true), allDayEvents), eventCellStyle: eventCellStyle, calendarCellStyle: calendarCellStyle, calendarCellTextStyle: calendarCellTextStyle, weekStartsOn: weekStartsOn, hideNowIndicator: hideNowIndicator, showAdjacentMonths: showAdjacentMonths, onPressCell: onPressCell, onPressDateHeader: onPressDateHeader, onPressEvent: onPressEvent, onSwipeHorizontal: onSwipeHorizontal, renderEvent: renderEvent, targetDate: targetDate, maxVisibleEventCount: maxVisibleEventCount, eventMinHeightForMonthView: eventMinHeightForMonthView }))));
    }
    var headerProps = __assign(__assign({}, commonProps), { style: headerContainerStyle, allDayEvents: allDayEvents, onPressDateHeader: onPressDateHeader, activeDate: activeDate, headerContentStyle: headerContentStyle, dayHeaderStyle: dayHeaderStyle, dayHeaderHighlightColor: dayHeaderHighlightColor, weekDayHeaderHighlightColor: weekDayHeaderHighlightColor, showAllDayEventCell: showAllDayEventCell, multipleColumnData: multipleColumnData });
    return (React__default['default'].createElement(React__default['default'].Fragment, null,
        !multipleColumnData && React__default['default'].createElement(HeaderComponent, __assign({}, headerProps)),
        mode === 'week' ?
            React__default['default'].createElement(CalendarBodyForMultiUser, __assign({}, commonProps, { style: bodyContainerStyle, containerHeight: height, events: daytimeEvents, eventCellStyle: eventCellStyle, calendarCellStyle: calendarCellStyle, hideNowIndicator: hideNowIndicator, overlapOffset: overlapOffset, scrollOffsetMinutes: scrollOffsetMinutes, ampm: ampm, showTime: showTime, onPressCell: onPressCell, onPressEvent: onPressEvent, onSwipeHorizontal: onSwipeHorizontal, renderEvent: renderEvent, headerComponent: headerComponent, headerComponentStyle: headerComponentStyle, hourStyle: hourStyle, showHourGuide: showHourGuide, hourRange: hourRange, multipleColumnData: multipleColumnData, numberOfColumn: numberOfColumn }))
            :
                React__default['default'].createElement(CalendarBody, __assign({}, commonProps, { style: bodyContainerStyle, containerHeight: height, events: daytimeEvents, eventCellStyle: eventCellStyle, calendarCellStyle: calendarCellStyle, hideNowIndicator: hideNowIndicator, overlapOffset: overlapOffset, scrollOffsetMinutes: scrollOffsetMinutes, ampm: ampm, showTime: showTime, onPressCell: onPressCell, onPressEvent: onPressEvent, onSwipeHorizontal: onSwipeHorizontal, renderEvent: renderEvent, headerComponent: headerComponent, headerComponentStyle: headerComponentStyle, hourStyle: hourStyle, showHourGuide: showHourGuide, hourRange: hourRange, multipleColumnData: multipleColumnData, numberOfColumn: numberOfColumn }))));
}
var CalendarContainer = typedMemo(_CalendarContainer);

dayjs__default['default'].extend(isBetween__default['default']);
function _Calendar(_a) {
    var _b = _a.theme, theme = _b === void 0 ? defaultTheme : _b, isRTL = _a.isRTL, showHourGuide = _a.showHourGuide, hourRange = _a.hourRange, props = __rest(_a, ["theme", "isRTL", "showHourGuide", "hourRange"]);
    var _theme = mergeAnything.merge(defaultTheme, theme, { isRTL: isRTL });
    return (React__default['default'].createElement(ThemeContext.Provider, { value: _theme },
        React__default['default'].createElement(CalendarContainer, __assign({}, props, { showHourGuide: showHourGuide, hourRange: hourRange }))));
}
var Calendar = typedMemo(_Calendar);

function getRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}
function DefaultEventRenderer(_a) {
    var touchableOpacityProps = _a.touchableOpacityProps, event = _a.event, cellHeight = _a.cellHeight;
    var theme = useTheme();
    return (React__namespace.createElement(reactNative.TouchableOpacity, __assign({}, touchableOpacityProps),
        React__namespace.createElement(reactNative.View, { style: { height: cellHeight, backgroundColor: theme.palette.cellBg, borderTopWidth: 1, borderColor: theme.palette.gray[200],
                flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5 } }, event.data && event.data.length > 0 ?
            event.data.map(function (event, index) {
                var name = event.name && event.name.length > 2 ? event.name.substring(0, 1) : event.name;
                if (name) {
                    return React__namespace.createElement(reactNative.View, { key: index, style: { marginRight: 5, backgroundColor: getRandomColor(), width: 40, height: 40, borderRadius: 50, alignItems: 'center', justifyContent: 'center' } },
                        React__namespace.createElement(reactNative.Text, { style: { textTransform: 'uppercase', color: theme.palette.primary.contrastText } }, name));
                }
                else {
                    return null;
                }
            })
            : null)));
}

function DefaultEmptySlotRenderer(_a) {
    var touchableOpacityProps = _a.touchableOpacityProps, event = _a.event, cellHeight = _a.cellHeight;
    var theme = useTheme();
    return (React__namespace.createElement(reactNative.TouchableOpacity, __assign({}, touchableOpacityProps),
        React__namespace.createElement(reactNative.View, { style: {
                height: cellHeight, backgroundColor: theme.palette.cellBg, borderTopWidth: 1, borderColor: theme.palette.gray[200],
                flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
                width: '100%'
            } }, event.data && event.data.length === 0 ?
            React__namespace.createElement(reactNative.Text, null, "Available for booking")
            : null)));
}

var _HourGuideColumn = function (_a) {
    var cellHeight = _a.cellHeight, hour = _a.hour, _b = _a.hourStyle, hourStyle = _b === void 0 ? {} : _b, _c = _a.hourContainerStyle, hourContainerStyle = _c === void 0 ? {} : _c;
    var theme = useTheme();
    var textStyle = React__namespace.useMemo(function () { return ({ color: theme.palette.gray[500], fontSize: theme.typography.xs.fontSize }); }, [theme]);
    return (React__namespace.createElement(reactNative.View, { style: [{ height: cellHeight, backgroundColor: theme.palette.gray[400], width: 100, borderTopWidth: 1, borderRightWidth: 1, borderColor: theme.palette.gray[200], justifyContent: 'center' }, objHasContent(hourContainerStyle) ? hourContainerStyle : {}] },
        React__namespace.createElement(reactNative.Text, { style: [objHasContent(hourStyle) ? hourStyle : textStyle, u['text-center']] }, hour)));
};
var HourGuideColumn = React__namespace.memo(_HourGuideColumn, function () { return true; });

function PrestoCalendar$1(_a) {
    var headerComponent = _a.headerComponent, hourRange = _a.hourRange, headerComponentStyle = _a.headerComponentStyle, hourStyle = _a.hourStyle, _b = _a.interval, interval = _b === void 0 ? 30 : _b, eventData = _a.eventData, _c = _a.currentDate, currentDate = _c === void 0 ? dayjs__default['default']().startOf('d').toISOString() : _c, _d = _a.renderCell, renderCell = _d === void 0 ? null : _d, _e = _a.cellHeight, cellHeight = _e === void 0 ? 90 : _e, hourContainerStyle = _a.hourContainerStyle, calendarStyle = _a.calendarStyle, scrollOffsetMinutes = _a.scrollOffsetMinutes, style = _a.style, _f = _a.containerHeight, containerHeight = _f === void 0 ? 700 : _f, mode = _a.mode, onPressEvent = _a.onPressEvent, renderEvent = _a.renderEvent, renderEmptySlots = _a.renderEmptySlots, _g = _a.showEmptySlots, showEmptySlots = _g === void 0 ? false : _g, onPressEmptySlot = _a.onPressEmptySlot;
    var theme = useTheme();
    var hoursRangeArr = prestoHourRange(hourRange, interval, currentDate);
    var scrollView = React__default['default'].useRef(null);
    React__default['default'].useEffect(function () {
        if (scrollView.current && scrollOffsetMinutes && reactNative.Platform.OS !== 'ios') {
            // We add delay here to work correct on React Native      
            // see: https://stackoverflow.com/questions/33208477/react-native-android-scrollview-scrollto-not-working
            setTimeout(function () {
                if (scrollView && scrollView.current) {
                    scrollView.current.scrollTo({
                        y: (cellHeight * scrollOffsetMinutes) / 60,
                        animated: false,
                    });
                }
            }, reactNative.Platform.OS === 'web' ? 0 : 10);
        }
    }, [scrollView, scrollOffsetMinutes, cellHeight]);
    var date = dayjs__default['default'](currentDate).startOf('d');
    var data = formatEventData(eventData, hoursRangeArr, interval);
    var getEventCellPositionStyle = function (start, end) {
        var relativeHeight = dayjs__default['default'](end).diff(start, 'minute') * cellHeight / interval;
        var relativeTop = dayjs__default['default'](start).diff(hoursRangeArr[0].startTime, 'minute') * cellHeight / interval;
        return {
            height: relativeHeight - 1,
            top: relativeTop,
        };
    };
    var eventTimeStyle = { fontSize: 14, color: '#ffffff' };
    var renderPrestoEvent = function (event) { return (React__default['default'].createElement(reactNative.TouchableOpacity, { style: __assign({ width: '99%', left: 3, right: 3, borderRadius: 3, position: 'absolute', zIndex: 1, backgroundColor: '#4285f4' }, getEventCellPositionStyle(event.startDate, event.endDate)), onPress: function () {
            if (onPressEvent) {
                onPressEvent(event);
            }
        } }, renderEvent ? renderEvent(event) :
        React__default['default'].createElement(reactNative.View, { style: { padding: 5 } },
            React__default['default'].createElement(reactNative.Text, { style: eventTimeStyle }, event.name),
            React__default['default'].createElement(reactNative.Text, { style: __assign(__assign({}, eventTimeStyle), { marginTop: 5 }) }, formatStartEnd(event.startDate, event.endDate, 'h:mm a'))))); };
    // console.log('data',data);
    return (React__default['default'].createElement(React__default['default'].Fragment, null,
        headerComponent != null ? React__default['default'].createElement(reactNative.View, { style: headerComponentStyle }, headerComponent) : null,
        React__default['default'].createElement(reactNative.ScrollView, { contentContainerStyle: __assign(__assign({}, calendarStyle), { overflow: 'hidden' }), style: [
                {
                    height: containerHeight - cellHeight * 3,
                }, style
            ], ref: scrollView, scrollEventThrottle: 32, showsVerticalScrollIndicator: false, nestedScrollEnabled: true, contentOffset: reactNative.Platform.OS === 'ios' ? { x: 0, y: scrollOffsetMinutes } : { x: 0, y: 0 } },
            React__default['default'].createElement(reactNative.View, { style: { flex: 1, flexDirection: "row", backgroundColor: theme.palette.cellBackgroundColor, borderBottomWidth: 1, borderColor: theme.palette.gray[200] } },
                React__default['default'].createElement(reactNative.View, { style: { backgroundColor: theme.palette.cellBg, borderRightWidth: 1, borderColor: theme.palette.gray[200] } }, hoursRangeArr.map(function (item) { return (React__default['default'].createElement(HourGuideColumn, { key: item.startTime, cellHeight: cellHeight, hour: dayjs__default['default'](item.startTime).format('hh:mm A'), ampm: true, hourStyle: hourStyle, hourContainerStyle: hourContainerStyle })); })),
                React__default['default'].createElement(reactNative.View, { style: { flex: 1, position: 'relative' } },
                    mode === 'detailed' ?
                        eventData.filter(function (data) {
                            return dayjs__default['default'](data.startDate).isBetween(date.startOf('day'), date.endOf('day'), null, '[)');
                        }).map(function (event) {
                            return renderPrestoEvent(event);
                        })
                        :
                            data.map(function (event, index) {
                                return React__default['default'].createElement(reactNative.View, { key: index, style: { flex: 1 } }, renderCell ? renderCell(event) :
                                    React__default['default'].createElement(DefaultEventRenderer, { event: event, cellHeight: cellHeight }));
                            }),
                    showEmptySlots ?
                        data.map(function (event, index) {
                            return React__default['default'].createElement(reactNative.View, { key: index, style: {} }, renderEmptySlots ? renderEmptySlots(event) :
                                React__default['default'].createElement(DefaultEmptySlotRenderer, { event: event, cellHeight: cellHeight, touchableOpacityProps: {
                                        onPressEmptySlot: onPressEmptySlot
                                    } }));
                        })
                        : null)))));
}

dayjs__default['default'].extend(duration__default['default']);
dayjs__default['default'].extend(isBetween__default['default']);
var PrestoCalendar = PrestoCalendar$1;

exports.Calendar = Calendar;
exports.CalendarBody = CalendarBody;
exports.CalendarBodyForMonthView = CalendarBodyForMonthView;
exports.CalendarEvent = CalendarEvent;
exports.CalendarEventForMonthView = CalendarEventForMonthView;
exports.CalendarHeader = CalendarHeader;
exports.CalendarHeaderForMonthView = CalendarHeaderForMonthView;
exports.DAY_MINUTES = DAY_MINUTES;
exports.DefaultCalendarEventRenderer = DefaultCalendarEventRenderer;
exports.HOUR_GUIDE_WIDTH = HOUR_GUIDE_WIDTH;
exports.MIN_HEIGHT = MIN_HEIGHT;
exports.OVERLAP_OFFSET = OVERLAP_OFFSET;
exports.OVERLAP_PADDING = OVERLAP_PADDING;
exports.PrestoCalendar = PrestoCalendar;
exports.ThemeContext = ThemeContext;
exports['default'] = Calendar;
exports.defaultTheme = defaultTheme;
exports.eventCellCss = eventCellCss;
exports.formatEventData = formatEventData;
exports.formatHour = formatHour;
exports.formatStartEnd = formatStartEnd;
exports.getCountOfEventsAtEvent = getCountOfEventsAtEvent;
exports.getDatesInMonth = getDatesInMonth;
exports.getDatesInNextCustomDays = getDatesInNextCustomDays;
exports.getDatesInNextOneDay = getDatesInNextOneDay;
exports.getDatesInNextThreeDays = getDatesInNextThreeDays;
exports.getDatesInWeek = getDatesInWeek;
exports.getEventSpanningInfo = getEventSpanningInfo;
exports.getOrderOfEvent = getOrderOfEvent;
exports.getRelativeTopInDay = getRelativeTopInDay;
exports.getStyleForOverlappingEvent = getStyleForOverlappingEvent;
exports.getWeeksWithAdjacentMonths = getWeeksWithAdjacentMonths;
exports.hours = hours;
exports.hoursRange = hoursRange;
exports.isAllDayEvent = isAllDayEvent;
exports.isToday = isToday;
exports.modeToNum = modeToNum;
exports.objHasContent = objHasContent;
exports.prestoHourRange = prestoHourRange;
exports.stringHasContent = stringHasContent;
exports.todayInMinutes = todayInMinutes;
exports.typedMemo = typedMemo;
exports.u = u;
exports.useTheme = useTheme;
//# sourceMappingURL=index.js.map
