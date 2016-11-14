var db=require('../db');
module.exports=function(app,express){

  var contact = express.Router();

  contact.post('/new',function(req,res){

  if(typeof req.body.cname !=='string' || typeof req.body.cemail!=='string'|| typeof req.body.cmessage!=='string'){

    return res.status(401).json({
      error : " Your message did not send"
    });
  }


db.contact.create({
  contactName: req.body.cname,
  contactMail: req.body.cemail,
  contactSubject: req.body.csubject,
  contactMessage: req.body.cmessage
}).then(function(){
  res.json({
    message: 'Your message is received! Thanks :)'
  });
});

  });

  return contact;
}
