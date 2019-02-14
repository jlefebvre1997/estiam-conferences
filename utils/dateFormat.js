var moment = require('moment');

module.exports = {
  formatDate: function (date, starta, enda) {
    console.log(date);

    var startDate = moment(date);
    var endDate = moment(date);

    console.log(startDate.format('DD/MM/YYYY'));

    var start = starta.split(' ')[0];
    var end = enda.split(' ')[0];

    var startHour = parseInt(start.split(':')[0]);
    var endHour = parseInt(end.split(':')[0]);
    var startMinute = parseInt(start.split(':')[1]);
    var endMinute = parseInt(end.split(':')[1]);

    return {
      start: startDate.add(startHour, 'hours').add(startMinute, 'minutes').toDate(),
      end: endDate.add(endHour, 'hours').add(endMinute, 'minutes').toDate()
    }
  }
};
