const express = require('express');
const unirest = require("unirest");
let mysql = require('mysql2');

const app = express();

const conn = mysql.createConnection({
    database: 'touhou.land',
    host: "localhost",
    user: "root",
    password: ""
});

conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.set('view engine', 'ejs');
app.use('/static', express.static('static'));

conn.query('SELECT * FROM information_for_site', function (error, result, fields){

    app.get('/', (request, response) => {

        if(request.query.code) {
            let clientID = "";
            let redirect_uri = "";
            let clientSecret = "";
            let requestPayload = {redirect_uri, client_id: clientID, grant_type: "authorization_code", client_secret: clientSecret, code: request.query.code};
            return unirest.post("https://discordapp.com/api/oauth2/token").send(requestPayload).headers({"Content-Type": 'application/x-www-form-urlencoded', "User-Agent": 'DiscordBot'})
                .then((data) =>{
                    return unirest.get("https://discordapp.com/api/users/@me").headers({"Authorization": `${data.body.token_type} ${data.body.access_token}`})
                        .then((data) => {
                            conn.query(`INSERT INTO logged_sessions(ip_user, user_id, user_name, avatar, discriminator, banner) VALUES ('${request.ip}', ${data.body.id}, '${data.body.username}', '${data.body.avatar}', ${data.body.discriminator}, '${data.body.banner}')`, function(err, results) {
                                if(err) console.log(err);
                            });
                            return response.redirect('main')
                        });
                });
        } else {
            return conn.query(`SELECT ip_user FROM logged_sessions WHERE ip_user = '${request.ip}'`, function(err, results) {
                if (err) console.log(err);
                if (results.length != 0) {
                    return response.redirect('main');
                } else if (results.length == 0) {
                    return response.render('index', {params: result });
                }
            });
        };
    });
});

conn.query('SELECT * FROM information_for_site', function (error, result, fields){
    app.get('/main', (request, response) => {
        return conn.query(`SELECT * FROM logged_sessions WHERE ip_user = '${request.ip}'`, function(err, results) {
            if (err) console.log(err);
            if (results.length === 0) {
                return response.redirect('/');
            } else {
                if (results[0].discriminator < 1000) {
                    var discriminator = "0" + String(results[0].discriminator)
                } else {
                    var discriminator = results[0].discriminator
                }
                return response.render('main', {user: results, discr: discriminator, params: result });
            }
        });
    });
});

conn.query('SELECT * FROM information_for_site', function (error, result, fields){
    app.get('/rules', (request, response) => {
        return conn.query(`SELECT * FROM logged_sessions WHERE ip_user = '${request.ip}'`, function(err, results) {
            if (err) console.log(err);
            if (results.length === 0) {
                return response.redirect('/');
            } else {
                if (results[0].discriminator < 1000) {
                    var discriminator = "0" + String(results[0].discriminator)
                } else {
                    var discriminator = results[0].discriminator
                }
                return response.render('rules', {user: results, discr: discriminator, params: result });
            }
        });
    });
});

conn.query('SELECT * FROM information_for_site', function (error, result, fields){
    app.get('/license', (request, response) => {
        return conn.query(`SELECT * FROM logged_sessions WHERE ip_user = '${request.ip}'`, function(err, results) {
            if (err) console.log(err);
            if (results.length === 0) {
                return response.redirect('/');
            } else {
                if (results[0].discriminator < 1000) {
                    var discriminator = "0" + String(results[0].discriminator)
                } else {
                    var discriminator = results[0].discriminator
                }
                return response.render('license', {user: results, discr: discriminator, params: result });
            }
        });
    });
});

conn.query('SELECT * FROM information_for_site', function (error, result, fields){
    app.get('/dashboard', (request, response) => {
        return conn.query(`SELECT * FROM logged_sessions WHERE ip_user = '${request.ip}'`, function(err, results) {
            if (err) console.log(err);
            if (results.length === 0) {
                return response.redirect('/');
            } else {
                if (results[0].discriminator < 1000) {
                    var discriminator = "0" + String(results[0].discriminator)
                } else {
                    var discriminator = results[0].discriminator
                }
                return response.render('dashboard', {user: results, discr: discriminator, params: result });
            }
        });
    });
});

app.listen(5500)
console.log('app started on port 5500!')
