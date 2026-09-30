(function (RC) {
  "use strict";

  RC.data = RC.data || {};

  var START = { year: 1659, month: 9, day: 30 };
  var TOTAL_MONTHS = 327;

  function absMonth(y, m) {
    return (y - START.year) * 12 + (m - START.month);
  }

  var seasons = [
    { id: "wet-main", name: "大雨季", from: 5, to: 8, weather: "rain", intensity: 2, note: "连日大雨，外出有害" },
    { id: "wet-minor", name: "小雨季", from: 11, to: 1, weather: "rain", intensity: 1, note: "间歇降雨，偶有风暴" },
    { id: "dry", name: "旱季", from: 2, to: 4, weather: "clear", intensity: 0, note: "晴朗少雨" },
    { id: "dry-heat", name: "旱季酷热", from: 9, to: 10, weather: "heat", intensity: 2, note: "正午毒日，不宜外出" }
  ];

  var events = [
    { id: "w-001", stage: 1, chapter: 3, month: absMonth(1659, 9), durationDays: 2, weather: "clear", intensity: 1, trigger: "flag", note: "登岛当夜风暴余波，次日风平浪静" },
    { id: "w-002", stage: 1, chapter: 4, month: absMonth(1659, 10), durationDays: 1, weather: "storm", intensity: 3, trigger: "flag", note: "地震后连夜狂风暴雨" },
    { id: "w-003", stage: 2, chapter: 4, month: absMonth(1659, 11), durationDays: 30, weather: "rain", intensity: 2, trigger: "season", note: "进入雨季" },
    { id: "w-004", stage: 3, chapter: 6, month: absMonth(1660, 11), durationDays: 20, weather: "rain", intensity: 3, trigger: "season", note: "雨季暴雨，鲁滨逊患病" },
    { id: "w-005", stage: 3, chapter: 6, month: absMonth(1661, 1), durationDays: 1, weather: "thunderstorm", intensity: 4, trigger: "event", note: "连夜狂风雷电，健康最有损" },
    { id: "w-006", stage: 4, chapter: 5, month: absMonth(1661, 8), durationDays: 1, weather: "typhoon", intensity: 5, trigger: "event", note: "不到半小时刮起最可怕台风，震落巨石" },
    { id: "w-007", stage: 5, chapter: 9, month: absMonth(1665, 11), durationDays: 2, weather: "clear", intensity: 1, trigger: "event", note: "独木舟遇急流当天天晴" },
    { id: "w-008", stage: 7, chapter: 12, month: absMonth(1682, 12), durationDays: 30, weather: "rain", intensity: 2, trigger: "season", note: "第23年12月，收割季/雨季交替" },
    { id: "w-009", stage: 8, chapter: 13, month: absMonth(1683, 5), durationDays: 1, weather: "thunderstorm", intensity: 5, trigger: "event", note: "5月16日大风暴、雷电，西班牙船触礁之夜" },
    { id: "w-010", stage: 8, chapter: 13, month: absMonth(1683, 5), durationDays: 1, weather: "fog", intensity: 1, trigger: "event", note: "次日海面雾蒙蒙，远望沉船不清" },
    { id: "w-011", stage: 9, chapter: 14, month: absMonth(1685, 3), durationDays: 2, weather: "storm", intensity: 4, trigger: "event", note: "逆向西北风暴，野人独木舟被吹散" },
    { id: "w-012", stage: 9, chapter: 16, month: absMonth(1685, 11), durationDays: 30, weather: "rain", intensity: 2, trigger: "season", note: "雨季将至，藏船船坞" },
    { id: "w-013", stage: 10, chapter: 17, month: absMonth(1686, 10), durationDays: 5, weather: "windy", intensity: 2, trigger: "event", note: "派西班牙人出海时顺风、月圆" },
    { id: "w-014", stage: 11, chapter: 17, month: absMonth(1686, 11), durationDays: 3, weather: "clear", intensity: 1, trigger: "event", note: "英国大船与小艇登岸时晴，注意潮汐" }
  ];

  function weatherAt(month) {
    var active = null;
    var i;
    for (i = 0; i < events.length; i++) {
      if (events[i].month === month) { active = events[i]; }
    }
    var monthOfYear = ((month % 12) + 12) % 12;
    var season = null;
    for (i = 0; i < seasons.length; i++) {
      var s = seasons[i];
      var hit = s.from <= s.to
        ? (monthOfYear >= s.from && monthOfYear <= s.to)
        : (monthOfYear >= s.from || monthOfYear <= s.to);
      if (hit && (!season || s.intensity > season.intensity)) { season = s; }
    }
    return { month: month, event: active, season: season };
  }

  RC.data.weather = {
    meta: {
      startDate: "1659-09-30",
      endDate: "1686-12-19",
      totalMonths: TOTAL_MONTHS,
      unit: "month",
      source: "原著的雨季/旱季与风暴线索；月份为设计值【设】，待确认"
    },
    enums: ["clear", "cloudy", "overcast", "rain", "storm", "typhoon", "thunderstorm", "fog", "heat", "windy"],
    seasons: seasons,
    events: events,
    weatherAt: weatherAt
  };
})(window.RC = window.RC || {});
