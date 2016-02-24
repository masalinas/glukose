# Glukose

A light web solution to parse and manage the measures captured by glukose-service using IBM node-red tool to parse the JSON input measures.

![capture_glukose_01](https://cloud.githubusercontent.com/assets/1216181/13285544/78ec2d82-dafb-11e5-859a-20d9731192e3.png)

The Node-red flow measure parser

![capture_glukose_02](https://cloud.githubusercontent.com/assets/1216181/13285545/78ecceb8-dafb-11e5-8044-b4c04623b7f4.png)

# Infraestructure Techonologies:

- [NodeJS](https://nodejs.org/): Event-driven I/O server-side JavaScript environment based on V8. Includes API documentation, change-log, examples and announcements.
- [ExpressJS](http://expressjs.com): Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- [MongoDb](https://www.mongodb.org/):MongoDB is the next-generation database that lets you create applications never before possible.

# Backend Techonologies:

- [Loopback](https://strongloop.com/): LoopBack is a highly-extensible, open-source Node.js framework. Compare with other frameworks. Quickly create dynamic end-to-end REST APIs
- [MomentJs](http://momentjs.com/): Parse, validate, manipulate, and display dates in JavaScript.

# Frontend Techonologies:

- [RequireJS](http://requirejs.org/): RequireJS is a JavaScript file and module loader.
- [Require DomReady](https://github.com/requirejs/domReady): An AMD loader plugin for detecting DOM ready.
- [JQuery](https://jquery.com): jQuery: The Write Less, Do More, JavaScript Library.
- [Angular](https://angularjs.org): AngularJS is what HTML would have been, had it been designed for building web-apps.
- [Angular Couch Potato](https://github.com/laurelnaiad/angular-couch-potato): Lazy-Load and Register Components in AngularJS Applications.
- [Angular UI Router](https://github.com/angular-ui/ui-router): The de-facto solution to flexible routing with nested views in AngularJS.
- [Angular Animate](https://angularjs.org): AngularJS provides animation hooks for common directives.
- [Angular Bootstrap](https://angular-ui.github.io/bootstrap/): Bootstrap components written in pure AngularJS by the AngularUI Team.
- [Bootstrap](http://getbootstrap.com/): Bootstrap, a sleek, intuitive, and powerful mobile first front-end framework for faster and easier web development.
- [DarkVelvet](http://pixelkit.com/): Free UI Kits built on Bootstrap for any developer that wants to build a cool looking and functional website.
- [MomentJs](http://momentjs.com/): Parse, validate, manipulate, and display dates in JavaScript.
- [Datatable](https://datatables.net/): DataTables is a plug-in for the jQuery Javascript library.

# Installation:

Copy and import this flow from node-red import clipboard:
```
[{"id":"cab4e39d.354b2","type":"watch","z":"640e548a.9bf1ac","name":"in-box","files":"/home/miguel/test/glukometer/export/","x":72,"y":62,"wires":[["7811681b.87ee98"]]},{"id":"209f559c.df60aa","type":"function","z":"640e548a.9bf1ac","name":"historic 01","func":"console.log('Start historic 01 node');\n\nvar fs = context.global.fs;\n\nif (fs === undefined)\n    node.error(\"fs module is not accessible\", msg);\n\n// move sensor file to historic folder\nfs.rename('/home/miguel/test/glukometer/export/' + msg.file, '/home/miguel/test/glukometer/export/.historic/' + msg.file, function (err) {\n    if (err) node.error(\"Historic error\", msg);\n    \n    node.log('Historic complete');\n    \n    node.send(msg);\n});\n\nreturn;","outputs":1,"noerr":0,"x":640,"y":62,"wires":[["75ab55bd.8a54ac"]]},{"id":"75ab55bd.8a54ac","type":"debug","z":"640e548a.9bf1ac","name":"out debug","active":true,"console":"false","complete":"payload","x":856,"y":62,"wires":[]},{"id":"be3aad0.f41c55","type":"catch","z":"640e548a.9bf1ac","name":"","scope":null,"x":192,"y":224,"wires":[["96d23fad.692dc"]]},{"id":"96d23fad.692dc","type":"function","z":"640e548a.9bf1ac","name":"historic 02","func":"console.log('Start historic 02 node');\n\nvar fs = context.global.fs;\n\nif (fs === undefined)\n    node.error(\"fs module is not accessible\", msg);\n\nif (msg.file === undefined)\n    return msg;\n    \n// move sensor file to historic folder\nfs.rename('/home/miguel/test/glukometer/export/' + msg.file, '/home/miguel/test/glukometer/export/.historic/' + msg.file, function (err) {\n    if (err) node.error(\"Historic error\", msg);\n\n    node.log('Historic complete');\n    \n    node.send(msg);\n});\n\nreturn;","outputs":1,"noerr":0,"x":393,"y":224,"wires":[["66e2ce50.991d3"]]},{"id":"66e2ce50.991d3","type":"debug","z":"640e548a.9bf1ac","name":"error","active":true,"console":"false","complete":"payload","x":612,"y":224,"wires":[]},{"id":"7811681b.87ee98","type":"function","z":"640e548a.9bf1ac","name":"parse","func":"console.log('Start parse node');\n\nvar fs = context.global.fs;\nvar moment = context.global.moment;\n\nif (fs === undefined)\n    node.error(\"fs module is not accessible\", msg);\n\n// preveent when remove files. The watch fire with a none file\nif (msg.type == 'none')   \n    return;\n        \n// recover sensor file from folder\nfs.readFile('/home/miguel/test/glukometer/export/' + msg.file, function(err, data) {\n    if (err) \n        node.error(\"Reading file error\", msg);\n\n    // convert from string to JSON\n    msg.payload = JSON.parse(data);\n\n    node.send(msg);\n});\n\nreturn;","outputs":1,"noerr":0,"x":254,"y":62,"wires":[["3a803a3d.c57fc6"]]},{"id":"3a803a3d.c57fc6","type":"function","z":"640e548a.9bf1ac","name":"persist","func":"console.log('Start persist node');\n\nvar loopback = context.global.loopback;\nvar Device = loopback.models.Device;\n\n// recover measure\nvar mes = msg.payload;\n\n// create or update the device measure\nDevice.findOne({\"serlnum\" : mes.serlnum, \n                \"ptname\" : mes.ptname,\n                \"ptid\" : mes.ptid},  function(err, device) {\n        if (err) node.error(\"findOne device error\", msg);\n\n        if (device === null) {\n            device = {\"serlnum\" : mes.serlnum,\n                      \"ptname\" : mes.ptname,\n                      \"ptid\" : mes.ptid,\n                      \"date\": mes.date};\n        }\n        else\n            device.date = mes.date;\n            \n        Device.upsert(device, function(err, device) {\n            if (err) node.error(\"upsert device error\", msg);\n        \n            // insert all measures from device\n            device.measures.create(mes.measures, function (err, device) {\n                if (err) node.error(\"create measures error\", msg);\n\n                // persist all the new measures\n                /*mes.measures.forEach(function(measure) {\n                    console.log('Measure: ' + measure.value);\n                    \n                });*/\n                \n                msg.payload = device;\n                \n                node.send(msg);\n            });\n        });           \n    });\n    \n\nreturn;","outputs":1,"noerr":0,"x":432,"y":62,"wires":[["209f559c.df60aa"]]}]
```

Execute npm to install node packages:
```
  npm install
```
Execute bower to install ui packages:
```
  bower install
```
Start Web
```
  http://localhost:2000
```
Start Node-Red
```
  http://localhost:2000/red
```
