var app = require('../../server/server');

module.exports = function (Device) {
  // find a customer by id
  Device.getMeasures = function(cb) {
    Device.findOne({where: {serlnum: app.settings.device},
                    include: {relation: 'measures'}}, function (err, measures) {
      if(err) cb(err);

      cb(null, measures);
    });
  };

  Device.remoteMethod (
    'getMeasures',
    {
      description : "Get device measures",
      returns: {arg: 'measures', type: 'object', root: true},
      http: {verb: 'get', path: '/measures'}
    }
  );
}
