var app = require('../../server/server');

module.exports = function (Device) {
  // find a customer by id
  Device.getMeasures = function(cb) {
    Device.find({include: {relation: 'measures', scope: {where: {value: {gt: 0}}}}}, function (err, devices) {
        if(err) cb(err);

        cb(null, devices);
    });
  };

  Device.remoteMethod (
    'getMeasures',
    {
      description : "Get device measures",
      returns: {arg: 'result', type: 'array', root: true},
      http: {verb: 'get', path: '/measures'}
    }
  );
}
