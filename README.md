# Glukose Gateway

A light SaaS solution to parse and manage the measures captured by Glukose Service using IBM node-RED tool to parse the JSON input measures and IBM MQTT protocol to comunicate with the Glukose Cloud SaaS.

![glukose_2](https://cloud.githubusercontent.com/assets/1216181/13421902/9000ee1e-df91-11e5-9011-d8d80994b479.png)

The Node-RED flow Designer

![glukose-gateway-nodered](https://cloud.githubusercontent.com/assets/1216181/14145560/9d61d428-f694-11e5-8bb4-f975103a27ba.png)

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
[{"id":"3ae1255d.485df2","type":"mqtt-broker","z":"f2181939.0de7e8","broker":"localhost","port":"1883","clientid":"","usetls":false,"verifyservercert":true,"compatmode":true,"keepalive":"60","cleansession":true,"willTopic":"","willQos":"0","willRetain":null,"willPayload":"","birthTopic":"","birthQos":"0","birthRetain":null,"birthPayload":""},{"id":"8c2a9b8f.73d568","type":"watch","z":"f2181939.0de7e8","name":"in-box","files":"/home/miguel/test/glukose/export/","x":70,"y":60,"wires":[["968b956c.697468"]]},{"id":"56a4be1.fa95b4","type":"function","z":"f2181939.0de7e8","name":"historic 01","func":"console.log('Start historic 01 node');\n\nvar fs = context.global.fs;\n\nif (fs === undefined)\n    node.error(\"fs module is not accessible\", msg);\n\n// move sensor file to historic folder\nfs.rename('/home/miguel/test/glukose/export/' + msg.file, '/home/miguel/test/glukose/export/.historic/' + msg.file, function (err) {\n    if (err) node.error(\"Historic error\", msg);\n    \n    node.log('Historic complete');\n    \n    node.send(msg);\n});\n\nreturn;","outputs":1,"noerr":0,"x":638,"y":60,"wires":[["e50266db.96d0b"]]},{"id":"ec611d7f.139ee","type":"catch","z":"f2181939.0de7e8","name":"","scope":null,"x":190,"y":222,"wires":[["a2c28d0f.5d3d7"]]},{"id":"a2c28d0f.5d3d7","type":"function","z":"f2181939.0de7e8","name":"historic 02","func":"console.log('Start historic 02 node');\n\nvar fs = context.global.fs;\n\nif (fs === undefined)\n    node.error(\"fs module is not accessible\", msg);\n\nif (msg.file === undefined)\n    return msg;\n    \n// move sensor file to historic folder\nfs.rename('/home/miguel/test/glukose/export/' + msg.file, '/home/miguel/test/glukose/export/.historic/' + msg.file, function (err) {\n    if (err) node.error(\"Historic error\", msg);\n\n    node.log('Historic complete');\n    \n    node.send(msg);\n});\n\nreturn;","outputs":1,"noerr":0,"x":391,"y":222,"wires":[["bb6a5bca.4495a8"]]},{"id":"bb6a5bca.4495a8","type":"debug","z":"f2181939.0de7e8","name":"error","active":true,"console":"false","complete":"payload","x":610,"y":222,"wires":[]},{"id":"968b956c.697468","type":"function","z":"f2181939.0de7e8","name":"parse","func":"console.log('Start parse node');\n\nvar fs = context.global.fs;\nvar moment = context.global.moment;\n\nif (fs === undefined)\n    node.error(\"fs module is not accessible\", msg);\n\n// preveent when remove files. The watch fire with a none file\nif (msg.type == 'none')   \n    return;\n        \n// recover sensor file from folder\nfs.readFile('/home/miguel/test/glukose/export/' + msg.file, function(err, data) {\n    if (err) \n        node.error(\"Reading file error\", msg);\n\n    // convert from string to JSON\n    msg.payload = JSON.parse(data);\n\n    node.send(msg);\n});\n\nreturn;","outputs":1,"noerr":0,"x":252,"y":60,"wires":[["cbec3d13.3413c"]]},{"id":"cbec3d13.3413c","type":"function","z":"f2181939.0de7e8","name":"persist","func":"console.log('Start persist node');\n\nvar loopback = context.global.loopback;\nvar Device = loopback.models.Device;\n\nDevice.registerMeasure(msg.payload, function(err, device) {\n    if (err) node.error(\"registerMeasure device error\", msg);\n    \n    node.send(msg);\n});\n    \nreturn;","outputs":1,"noerr":0,"x":430,"y":60,"wires":[["56a4be1.fa95b4"]]},{"id":"e50266db.96d0b","type":"mqtt out","z":"f2181939.0de7e8","name":"Glukose","topic":"glukose","qos":"0","retain":"false","broker":"3ae1255d.485df2","x":824,"y":60,"wires":[]}]
```

# Licenses
The source code is released under Apache 2.0.
