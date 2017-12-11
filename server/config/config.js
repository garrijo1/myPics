var path = require('path'),    
rootPath = path.normalize(__dirname + '/..'),    
env = process.env.NODE_ENV || 'development';

var config = {  
  development: {
    root: rootPath,
    app: {
      name: 'mypics'
    },
    port: 5000,
    db: 'mongodb://127.0.0.1/mypics-dev',
    uploads: rootPath + "/public/uploads/",
    secret: "cayennedlikedhistreats"    
},

 test: {    
  root: rootPath,    
  app: {      name: 'mypics'    },    
  port: 4000,  
  db: 'mongodb://127.0.0.1/mypics-test',  
  secret: "cayennedlikedhistreats"  
},  
 production: {    
              root: rootPath,    
              app: {      name: 'mypics'    },    
               port: 80,  
               db: 'mongodb://127.0.0.1/mypics'},
               secret: "cayennedlikedhistreats"
               
  };



module.exports = config[env];
