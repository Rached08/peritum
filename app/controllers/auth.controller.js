const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    email: req.body.email,
    visibility:false,
    salary:0,
    score:0,
    offers:[],
    skills:[],
    contacts:[],
    password: bcrypt.hashSync(req.body.password, 8)
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

      Role.findOne({ name: "Expert" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.role = role._id;
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "Expert was registered successfully!" });
        });
      });
    
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("role", "-__v")
    .populate("contacts", "-__l")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var users = [];

      for (let i = 0; i < user.contacts.length; i++) {
        users.push( user.contacts[i].username);
      }
    
      var rol = user.role.name;

      res.status(200).send({
        
        username: user.username,
        firstname:user.firstname,
        lastname:user.lastname,
        email: user.email,
        password: user.password,
       role: rol,
       contacts:users,
       // user: user ,
        
      });
    });
};

exports.getUser = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.status(200).send({
        
        username: user.username,
        firstname:user.firstname,
        lastname:user.lastname,
        email: user.email,
        password: user.password,
      
      });
    });
};


exports.updateUser = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: "bbb" });
        return;
      }

      user.firstname=req.body.firstname,
      user.lastname =req.body.lastname,
      user.email=req.body.email,
      user.salary=req.body.salary,
      user.password =bcrypt.hashSync(req.body.password, 8)
      user.save(err => {
        if (err) {
          res.status(500).send({ message: "hhh" });
          return;
        }

        res.status(200).send({
        
        
          username: user.username,
          firstname:user.firstname,
          lastname:user.lastname,
          email: user.email,
          
        });      });
     // user.password= bcrypt.hashSync(req.body.password, 8)
 
    });
};




