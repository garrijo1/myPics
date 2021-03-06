// var express = require('express'),
//     router = express.Router();

// module.exports = function (app, config) {
//     app.use('/api', router);
    
// }
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    Galleries = mongoose.model('galleries'),
    passportService = require('../../config/passport'),
    passport = require('passport'),
    multer = require('multer'),
    mkdirp = require('mkdirp');
    


var requireAuth = passport.authenticate('jwt', { session: false });
   
module.exports = function (app, config) {
    app.use('/api', router);
    
    router.get('/galleries/user/:userId', requireAuth,function (req, res, next){
        logger.log('Find galleries by Id', 'verbose');

        var query = Galleries.find({userId:req.params.userId})
        .sort(req.query.order)
        .exec()
        .then(result => {
           if(result) {
             res.status(200).json(result);
         } else {
             res.status(404).json({message: "No galleries"});
         }
        })
        .catch(err => {
          return next(err);
        });
    });  

    //     res.status(200).json({message: 'Find galleries by Id'});

    // });

    router.get('/galleries/:galleriesId', requireAuth, function (req, res, next){
        logger.log('Get My galleries List'+ req.params.userId, 'verbose');

        Galleries.findById(req.params.galleriesId)
                    .then(galleries => {
                        if(galleries){
                            res.status(200).json(galleries);
                        } else {
                            res.status(404).json({message: "No user found"});
                        }
                    })
                    .catch(error => {
                        return next(error);
                    });
            }); 

    //     res.status(200).json({message: 'Get My galleries List'+ req.params.userId});
    // });    

    router.post('/galleries', function(req, res, next){
        logger.log('Create galleries', 'verbose');

        var galleries = new Galleries(req.body);       
        galleries.save()
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
    
    router.post('/galleries/upload/:userId/:galleriesId', upload.any(), function(req, res, next){
            logger.log('Upload file for galleries ' + req.params.mypicsId + ' and ' + req.params.userId, 'verbose');
            
            mypics.findById(req.params.galleriesId, function(err, galleries){
                if(err){ 
                    return next(err);
                } else {     
                    if(req.files){
                        galleries.file = {
                            fileName : req.files[0].filename,
                            originalName : req.files[0].originalname,
                            dateUploaded : new Date()
                        };
                    }           
                    galleries.save()
                        .then(galleries => {
                            res.status(200).json(galleries);
                        })
                        .catch(error => {
                            return next(error);
                        });
                }
            });
        });
    //     res.status(201).json({message: 'ToDo created'+ req.params.userId});

    // });
    
    router.put('/galleries/:galleriesId', function (req, res, next){
        logger.log('Update galleries with id galleriesId'+ req.params.galleriesId, 'verbose');

        
        Galleries.findOneAndUpdate({_id: req.params.galleriesId}, 		
            req.body, {new:true, multi:false})
                .then(galleries => {
                    res.status(200).json(galleries);
                })
                .catch(error => {
                    return next(error);
                });
    });

    //     res.status(200).json({message: 'Update galleries'+ req.params.userId});
    // });  

    router.delete('/galleries/:galleriesId', requireAuth, function (req, res, next){
        logger.log('Delete galleries'+ req.params.userId, 'verbose');

        Galleries.remove({ _id: req.params.galleriesId })
                .then(user => {
                    res.status(200).json({msg: "galleries Deleted"});
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
