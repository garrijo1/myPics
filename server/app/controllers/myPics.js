var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    mypics = mongoose.model('mypics'),
    passportService = require('../../config/passport'),
    passport = require('passport'),
    multer = require('multer'),
    mkdirp = require('mkdirp');
    


var requireAuth = passport.authenticate('jwt', { session: false });
   
module.exports = function (app, config) {
    app.use('/api', router);
    
    router.get('/mypics/galleries/:galleriesId', requireAuth,function (req, res, next){
        logger.log('Find galleries by Id', 'verbose');

        var query = mypics.find({galleriesId:req.params.galleriesId})
        .sort(req.query.order)
        .exec()
        .then(result => {
           if(result) {
             res.status(200).json(result);
         } else {
             res.status(404).json({message: "No mypics"});
         }
        })
        .catch(err => {
          return next(err);
        });
    });  

    //     res.status(200).json({message: 'Find ToDo by Id'});

    // });

    router.get('/mypics/:mypicsId', requireAuth, function (req, res, next){
        logger.log('Get My mypics List'+ req.params.userId, 'verbose');

        mypics.findById(req.params.mypicsId)
                    .then(mypics => {
                        if(mypics){
                            res.status(200).json(mypics);
                        } else {
                            res.status(404).json({message: "No user found"});
                        }
                    })
                    .catch(error => {
                        return next(error);
                    });
            }); 

    //     res.status(200).json({message: 'Get My ToDo List'+ req.params.userId});
    // });    

    router.post('/mypics', function(req, res, next){
        logger.log('Create mypics', 'verbose');

        var myPics = new mypics(req.body);       
        myPics.save()
       .then(result => {
           res.status(201).json(result);
       })
       .catch( err => {
          return next(err);
       });
    });  


    var storage = multer.diskStorage({
        destination: function (req, file, cb) {      
              var path = config.uploads + req.params.userId + "/";
            mkdirp(path, function(err) {
                if(err){
                    res.status(500).json(err);
                } else {
                    cb(null, path);
                }
            });
        },
        filename: function (req, file, cb) {
            let fileName = file.originalname.split('.');   
            cb(null, fileName[0] + new Date().getTime() + "." + fileName[fileName.length - 1]);
        }
      });
      var upload = multer({storage:storage});
    
    router.post('/mypics/upload/:userId/:mypicsId', upload.any(), function(req, res, next){
            logger.log('Upload file for mypics ' + req.params.mypicsId + ' and ' + req.params.userId, 'verbose');
            
            mypics.findById(req.params.mypicsId, function(err, mypics){
                if(err){ 
                    return next(err);
                } else {     
                    if(req.files){
                        mypics.file = {
                            fileName : req.files[0].filename,
                            originalName : req.files[0].originalname,
                            dateUploaded : new Date()
                        };
                    }           
                    mypics.save()
                        .then(mypics => {
                            res.status(200).json(mypics);
                        })
                        .catch(error => {
                            return next(error);
                        });
                }
            });
        });
    //     res.status(201).json({message: 'ToDo created'+ req.params.userId});

    // });
    
    router.put('/mypics/:mypicsId', function (req, res, next){
        logger.log('Update mypics with id mypicsId'+ req.params.mypicsId, 'verbose');

        
        mypics.findOneAndUpdate({_id: req.params.mypicsId}, 		
            req.body, {new:true, multi:false})
                .then(mypics => {
                    res.status(200).json(mypics);
                })
                .catch(error => {
                    return next(error);
                });
    });

    //     res.status(200).json({message: 'Update ToDo'+ req.params.userId});
    // });  

    router.delete('/mypics/:mypicsId', requireAuth, function (req, res, next){
        logger.log('Delete mypics'+ req.params.userId, 'verbose');

        mypics.remove({ _id: req.params.mypicsId })
                .then(user => {
                    res.status(200).json({msg: "mypics Deleted"});
                })
                .catch(error => {
                    return next(error);
                });
    });

    //     res.status(200).json({message: 'Delete ToDo'+ req.params.userId});
    // });  

//     router.post('/login', function(req, res, next){
//         console.log(req.body);
//         var email = req.body.email
//         var password = req.body.password;
  
//         var obj = {'email' : email, 'password' : password};
//       res.status(201).json(obj);
//   });
  
};
