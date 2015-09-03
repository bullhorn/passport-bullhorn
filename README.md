# Passport-Bullhorn

[Passport](http://passportjs.org/) strategies for authenticating with [Bullhorn](http://www.bullhorn.com/)
using OAuth 2.0.

This module lets you authenticate using Bullhorn in your Node.js applications.
By plugging into Passport, Bullhorn authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

The client id and client secret needed to authenticate with Bullhorn can be set up from the developer's console [Bullhorn Developer's Console](https://console.bullhorn.io).

## Install

    $ npm install passport-bullhorn

## Usage of OAuth 2.0

#### Configure Strategy

The Bullhorn OAuth 2.0 authentication strategy authenticates users using a Bullhorn
account and OAuth 2.0 tokens.  The strategy requires a `verify` callback, which
accepts these credentials and calls `done` providing a user, as well as
`options` specifying a client ID, client secret, and callback URL.

```Javascript
var BullhornStrategy = require('passport-bullhorn').BullhornOAuthStrategy;

passport.use(new BullhornStrategy({
    clientID: BULLHORN_CLIENT_ID,
    clientSecret: BULLHORN_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/bullhorn/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    //profile.token == BhRestToken
    //profile.url == restUrl
  }
));
```

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'bullhorn'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```Javascript
app.get('/auth/bullhorn', 
  passport.authenticate('bullhorn'));

app.get('/auth/bullhorn/callback', 
  passport.authenticate('bullhorn', { failureRedirect: '/login' }),
  function(request, response) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
```

## Examples

TBD

## Tests

    $ npm install
    $ npm test

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2015 <[Bullhorn](http://bullhorn.com/)>