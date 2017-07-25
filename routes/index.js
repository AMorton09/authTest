var express = require('express');
var router = express.Router();
var Athelete = require('../models/athelete');
var path = require('path');
var fs = require('fs');
var multer = require('multer');


var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./uploads/");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});



var upload = multer({ storage: Storage }).single('photo');


var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
}

module.exports = function(passport){

    /* GET login page. */
    router.get('/', function(req, res) {
        // Display the Login page with any flash message, if any
        res.render('index', { message: req.flash('message') });
    });

    /* Handle Login POST */
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash : true
    }));

    /* GET Registration Page */
    router.get('/signup', function(req, res){
        res.render('register',{message: req.flash('message')});
    });

    router.get('/test', function(req, res){
        res.render('test');
    });


    /* Handle Registration POST */
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/home',
        failureRedirect: '/signup',
        failureFlash : true
    }));

    /* GET Home Page */
    router.get('/home', isAuthenticated, function(req, res){
        res.render('home', { user: req.user });
    });

    /* Handle Logout */
    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });




    router.post('/addAthelete', isAuthenticated,function(req, res){


        upload(req, res, function (err) {
            if (err) {
                return console.log("Something went wrong!");
            }
            var newAthelete = Athelete({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                town: req.body.town,
                photo: req.file.path
            });
            newAthelete.save(function(err) {
                if (err) throw err;

                console.log('User saved successfully!');
            });
            return console.log("File uploaded sucessfully!.");
        });




        res.render('homeAddSuccess',{ath: { firstname: ath.firstname,
            lastname: ath.lastname,
            town: ath.town,
            photo: ath.path}});

    });

    return router;
}



