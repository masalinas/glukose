# Glukose

A light web solution to parse and manage the measures captured by glukose-service using IBM node-red tool to parse the JSON input measures.

![glukose_2](https://cloud.githubusercontent.com/assets/1216181/13421902/9000ee1e-df91-11e5-9011-d8d80994b479.png)

The Node-red flow measure parser

![capture_glukose_02](https://cloud.githubusercontent.com/assets/1216181/13285545/78ecceb8-dafb-11e5-8044-b4c04623b7f4.png)

# Infraestructure Techonologies:

- [NodeJS](https://nodejs.org/): Event-driven I/O server-side JavaScript environment based on V8. Includes API documentation, change-log, examples and announcements.
- [ExpressJS](http://expressjs.com): Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- [MongoDb](https://www.mongodb.org/):MongoDB is the next-generation database that lets you create applications never before possible.
- [Node-Red](http://nodered.org/): A visual tool for wiring the Internet of Things.

# Backend Techonologies:

- [Loopback](https://strongloop.com/): LoopBack is a highly-extensible, open-source Node.js framework. Compare with other frameworks. Quickly create dynamic end-to-end REST APIs.
- [socket.io](http://socket.io/): Socket.IO enables real-time bidirectional event-based communication.
- [MomentJs](http://momentjs.com/): Parse, validate, manipulate, and display dates in JavaScript.

# Frontend Techonologies:

- [RequireJS](http://requirejs.org/): RequireJS is a JavaScript file and module loader.
- [Require DomReady](https://github.com/requirejs/domReady): An AMD loader plugin for detecting DOM ready.
- [JQuery](https://jquery.com): jQuery: The Write Less, Do More, JavaScript Library.
- [JQuery UI](https://jqueryui.com/): jQuery UI is a curated set of user interface interactions, effects, widgets, and themes built on top of the jQuery JavaScript Library.
- [Angular](https://angularjs.org): AngularJS is what HTML would have been, had it been designed for building web-apps.
- [Angular Couch Potato](https://github.com/laurelnaiad/angular-couch-potato): Lazy-Load and Register Components in AngularJS Applications.
- [Angular Resource](https://github.com/angular/bower-angular-resource): A factory which creates a resource object that lets you interact with RESTful server-side data sources.
- [Angular UI Router](https://github.com/angular-ui/ui-router): The de-facto solution to flexible routing with nested views in AngularJS.
- [Angular Animate](https://angularjs.org): AngularJS provides animation hooks for common directives.
- [Angular Bootstrap](https://angular-ui.github.io/bootstrap/): Bootstrap components written in pure AngularJS by the AngularUI Team.
- [angular-socket-io](https://github.com/btford/angular-socket-io): Socket.IO component for AngularJS.
- [angular-toastr](https://github.com/Foxandxss/angular-toastr):Angular port of CodeSeven/toastr.
- [socket.io](http://socket.io/): Socket.IO enables real-time bidirectional event-based communication.
- [Bootstrap](http://getbootstrap.com/): Bootstrap, a sleek, intuitive, and powerful mobile first front-end framework for faster and easier web development.
- [DarkVelvet](http://pixelkit.com/): Free UI Kits built on Bootstrap for any developer that wants to build a cool looking and functional website.
- [MomentJs](http://momentjs.com/): Parse, validate, manipulate, and display dates in JavaScript.
- [Datatable](https://datatables.net/): DataTables is a plug-in for the jQuery Javascript library.

# Installation:

Execute npm to install node packages:
```
  npm install
```

Execute bower to install ui packages:
```
  bower install
```

Access Web Glukose
```
  http://localhost:2000
```

Access Web Glukose JSON API Back-end
```
  http://localhost:2000/export
```

Access Node-Red Web designer
```
  http://localhost:2000/red
```

Copy and import this flow from node-red import clipboard
```
[{"id":"ec5acfb2.13a53","type":"watch","z":"f54faa1e.0ab058","name":"in-box","files":"/opt/glukose/export/","x":70,"y":60,"wires":[["3e6ad746.c19528"]]},{"id":"c87faff8.37805","type":"function","z":"f54faa1e.0ab058","name":"historic 01","func":"console.log('Start historic 01 node');\n\nvar fs = context.global.fs;\n\nif (fs === undefined)\n    node.error(\"fs module is not accessible\", msg);\n\n// move sensor file to historic folder\nfs.rename('/opt/glukose/export/' + msg.file, '/opt/glukose/export/.historic/' + msg.file, function (err) {\n    if (err) node.error(\"Historic error\", msg);\n    \n    node.log('Historic complete');\n    \n    node.send(msg);\n});\n\nreturn;","outputs":1,"noerr":0,"x":638,"y":60,"wires":[["730521e1.8cfae"]]},{"id":"730521e1.8cfae","type":"debug","z":"f54faa1e.0ab058","name":"out debug","active":true,"console":"false","complete":"payload","x":854,"y":60,"wires":[]},{"id":"2fccd88d.d03328","type":"catch","z":"f54faa1e.0ab058","name":"","scope":null,"x":190,"y":222,"wires":[["d05e34f1.2fa1c8"]]},{"id":"d05e34f1.2fa1c8","type":"function","z":"f54faa1e.0ab058","name":"historic 02","func":"console.log('Start historic 02 node');\n\nvar fs = context.global.fs;\n\nif (fs === undefined)\n    node.error(\"fs module is not accessible\", msg);\n\nif (msg.file === undefined)\n    return msg;\n    \n// move sensor file to historic folder\nfs.rename('/opt/glukose/export/' + msg.file, '/opt/glukose/export/.historic/' + msg.file, function (err) {\n    if (err) node.error(\"Historic error\", msg);\n\n    node.log('Historic complete');\n    \n    node.send(msg);\n});\n\nreturn;","outputs":1,"noerr":0,"x":391,"y":222,"wires":[["12f1c101.ed0e3f"]]},{"id":"12f1c101.ed0e3f","type":"debug","z":"f54faa1e.0ab058","name":"error","active":true,"console":"false","complete":"payload","x":610,"y":222,"wires":[]},{"id":"3e6ad746.c19528","type":"function","z":"f54faa1e.0ab058","name":"parse","func":"console.log('Start parse node');\n\nvar fs = context.global.fs;\nvar moment = context.global.moment;\n\nif (fs === undefined)\n    node.error(\"fs module is not accessible\", msg);\n\n// preveent when remove files. The watch fire with a none file\nif (msg.type == 'none')   \n    return;\n        \n// recover sensor file from folder\nfs.readFile('/opt/glukose/export/' + msg.file, function(err, data) {\n    if (err) \n        node.error(\"Reading file error\", msg);\n\n    // convert from string to JSON\n    msg.payload = JSON.parse(data);\n\n    node.send(msg);\n});\n\nreturn;","outputs":1,"noerr":0,"x":252,"y":60,"wires":[["11721895.ee8de7"]]},{"id":"11721895.ee8de7","type":"function","z":"f54faa1e.0ab058","name":"persist","func":"console.log('Start persist node');\n\nvar loopback = context.global.loopback;\nvar Device = loopback.models.Device;\n\n// recover measure\nvar mes = msg.payload;\n\n// create or update the device measure\nDevice.findOne({\"serlnum\" : mes.serlnum, \n                \"ptname\" : mes.ptname,\n                \"ptid\" : mes.ptid},  function(err, device) {\n        if (err) node.error(\"findOne device error\", msg);\n\n        if (device === null) {\n            device = {\"serlnum\" : mes.serlnum,\n                      \"ptname\" : mes.ptname,\n                      \"ptid\" : mes.ptid,\n                      \"date\": mes.date};\n        }\n        else\n            device.date = mes.date;\n            \n        Device.upsert(device, function(err, device) {\n            if (err) node.error(\"upsert device error\", msg);\n        \n            // insert all measures from device\n            device.measures.create(mes.measures, function (err, device) {\n                if (err) node.error(\"create measures error\", msg);\n\n                // persist all the new measures\n                /*mes.measures.forEach(function(measure) {\n                    console.log('Measure: ' + measure.value);\n                    \n                });*/\n                \n                msg.payload = device;\n                \n                node.send(msg);\n            });\n        });           \n    });\n    \n\nreturn;","outputs":1,"noerr":0,"x":430,"y":60,"wires":[["c87faff8.37805"]]}]
```

# Licenses
The source code is released under Apache 2.0.
