var app = require('../../server/server');

module.exports = function (Device) {
  Device.registerMeasure = function(measure, cb) {
    // create or update the device measure
    Device.findOne({where: {"serlnum" : measure.serlnum,
                            "ptid" : measure.ptid}},  function(err, device) {
      if (err) cb(err);

      // create or update the last measurement of the device
      if (device === null) {
        device = {"serlnum" : measure.serlnum,
                  "ptname" : measure.ptname,
                  "ptid" : measure.ptid,
                  "date": measure.date};
      }
      else
        device.date = measure.date;

      // persist the device and the measures collection
      Device.upsert(device, function(err, device) {
        if (err) cb(err);

        // insert all measures from device
        device.measures.create(measure.measures, function (err, measures) {
          if (err) cb(err);

          // send push event to client side
          app.io.emit('events', measure.ptname);

          cb(null, device);
        });
      });
    });
  };

  Device.getMeasures = function(cb) {
    Device.find({include: {relation: 'measures', scope: {where: {value: {gt: 0}}}}}, function (err, devices) {
        if(err) cb(err);

        cb(null, devices);
    });
  };

  Device.remoteMethod (
    'registerMeasure',
    {
      description : "Register Measures",
      accepts: {arg: 'measure', description: 'Device captured', type: 'object', required: true, http: {source: 'body'}},
      returns: {arg: 'result', type: 'object', root: true},
      http: {verb: 'post', path: '/measures'}
    }
  );

  Device.remoteMethod (
    'getMeasures',
    {
      description : "Get device measures",
      returns: {arg: 'result', type: 'array', root: true},
      http: {verb: 'get', path: '/measures'}
    }
  );
}
