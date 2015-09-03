/**
 * Module dependencies.
 */
import { OAuth2Strategy, InternalOAuthError } from 'passport-oauth';

/**
 * `Strategy` constructor.
 *
 * The Bullhorn authentication strategy authenticates requests by delegating to
 * Bullhorn using the OAuth 2.0 protocol.
 *
 * Applications must supply a `verify` callback which accepts an `accessToken`,
 * `refreshToken` and service-specific `profile`, and then calls the `done`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `clientID`      your Bullhorn application's client id
 *   - `clientSecret`  your Bullhorn application's client secret
 *   - `callbackURL`   URL to which Bullhorn will redirect the user after granting authorization
 *
 * Examples:
 *
 *     passport.use(new BullhornStrategy({
 *         clientID: '123-456-789',
 *         clientSecret: 'shhh-its-a-secret'
 *         callbackURL: 'https://www.example.net/auth/yourapp/callback'
 *       },
 *       function(accessToken, refreshToken, profile, done) {
 *         User.findOrCreate(..., function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
export class BullhornOAuthStrategy extends OAuth2Strategy {
    constructor(options, verify) {
        options = options || {};
        options.authorizationURL = options.authorizationURL || 'http://rest.bullhornstaffing.com/oauth/authorize';
        options.tokenURL = options.tokenURL || 'http://rest.bullhornstaffing.com/oauth/token';

        super(options, verify);
        this.name = 'bullhorn';   
        this.profileURL = options.profileURL || 'http://rest.bullhorn.com/rest-services/login?version=*';
    }
    
    /**
    * Retrieve BhRestToken and restUrl from Bullhorn.
    *
    * This function constructs a normalized profile, with the following properties:
    *
    *   - `id`
    *   - `token`
    *   - `url`
    *
    * @param {String} accessToken
    * @param {Function} done
    * @api protected
    */
    userProfile(accessToken, done) {
      this._oauth2.get(this.profileURL, accessToken, function (err, body, res) {
        if (err) { return done(new InternalOAuthError('failed to fetch user profile', err)); }

        try {
          var json = JSON.parse(body);
          var profile = { provider: 'bullhorn' };
          profile.id = json.BhRestToken;
          profile.token = json.BhRestToken;
          profile.url = json.restUrl;
          profile._raw = body;
          profile._json = json;
          done(null, profile);
        } catch(e) {
          done(e);
        }
      });
    }
}