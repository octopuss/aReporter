// Generated by CoffeeScript 1.4.0

suite('este.date.courseDate', function() {
  var arrangeDate, courseDate, date;
  courseDate = este.date.courseDate;
  date = null;
  arrangeDate = function(day, month) {
    date = new goog.date.Date;
    date.setMonth(month);
    date.setDate(day);
    return courseDate.compute(2, 3, date);
  };
  return suite('compute', function() {
    return suite('march', function() {
      test('1. 3. should set this month curse', function() {
        var message;
        message = arrangeDate(1, 2);
        return assert.equal(message, '14. až 15. března');
      });
      test('13. 3. should set this month curse', function() {
        var message;
        message = arrangeDate(13, 2);
        return assert.equal(message, '14. až 15. března');
      });
      test('14. 3. should set next month curse', function() {
        var message;
        message = arrangeDate(14, 2);
        return assert.equal(message, '11. až 12. dubna');
      });
      return test('26. 3. should set next month curse', function() {
        var message;
        message = arrangeDate(26, 2);
        return assert.equal(message, '11. až 12. dubna');
      });
    });
  });
});