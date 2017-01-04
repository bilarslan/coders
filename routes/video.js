var db = require('../db');
var requireAuth = require('../middlewares/middleware').requireAuth;
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype.split('/')[0] == 'image') {
            cb(null, './public/img/covers/');
        } else if (file.mimetype.split('/')[0] == 'video') {
            cb(null, './public/videos/');
        }
    },
    filename: function (req, file, cb) {
        var extension = file.mimetype.toString().split('/');
        extension = extension[1];
        if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png' && extension !== 'mp4') {
            return;
        }
        cb(null, Date.now() + '.' + extension);
    }
});

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1073741824
    }
});

module.exports = function (app, express) {
    var video = express.Router();

    //Video Playlist
    video.get('/', function (req, res) {

        db.playlist.findAll({
            attributes: ['id', 'title', 'description', 'imgUrl', 'createdAt'],
            include: [{
                model: db.user,
                attributes: ['id', 'username']
            }]
        }).then(function (playlists) {
            res.send(playlists);
        });
    });

    video.get('/:id', function (req, res) {

        var id = parseInt(req.params.id, 10);

        db.playlist.findOne({
            where: {
                id: id
            },
            attributes: ['id', 'title', 'description', 'imgUrl', 'createdAt'],
            include: [{
                model: db.user,
                attributes: ['id', 'username']
            }, {
                model: db.video,
                attributes: ['id', 'title', 'description', 'videoUrl'],
                include: [{
                    model: db.videoComment,
                    include:[{
                        model: db.user,
                        attributes:['username']
                    }]
                }]
            }]
        }).then(function (playlist) {
            if (playlist) {
                res.send(playlist);
            } else {
                res.status(404).send();
            }
        });

    });

    video.post('/create', requireAuth, upload.single('file'), function (req, res) {

        if (typeof req.body.title !== 'string' || typeof req.body.description !== 'string') {
            //400
            return res.status(400).json({
                error: 'Invalid data format!'
            });
        }

        var path = './img/covers/' + req.file.filename;

        db.playlist.create({
            title: req.body.title,
            description: req.body.description,
            imgUrl: path,
            userId: req.decoded.id
        }).then(function (playlist) {
            //console.log(playlist);
            res.send(playlist);
        });

    });

    video.post('/v/create', requireAuth, upload.single('file'), function (req, res) {

        if (typeof req.body.title !== 'string' || typeof req.body.description !== 'string' || typeof req.body.playlist !== 'string') {
            //400
            return res.status(400).json({
                error: 'Invalid data format!'
            });
        }

        var path = './videos/' + req.file.filename;

        db.video.create({
            title: req.body.title,
            description: req.body.description,
            videoUrl: path,
            playlistId: req.body.playlist
        }).then(function (playlist) {
            console.log(playlist);
            res.send(playlist);
        });
    });

    video.post('/comment/:id', requireAuth, function (req, res) {

        var id = parseInt(req.params.id, 10);
        if (!id) {
            return res.status(400).json({
                error: 'Invalid data format!'
            });
        }

        if (typeof req.body.content !== 'string') {
            //400
            return res.status(400).json({
                error: 'Invalid data format!'
            });
        }

        db.videoComment.create({
            content: req.body.content,
            videoId: id,
            userId: req.decoded.id
        }).then(function (videoComment) {
            res.send(videoComment);
        });

    });

    return video;
}