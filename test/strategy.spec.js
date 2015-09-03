/* global describe, it, expect, before */
/* jshint expr: true */

import { BullhornOAuthStrategy } from 'passport-bullhorn';

describe('Strategy', function () {

    var strategy = new BullhornOAuthStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret'
    }, function () {});
    
    it('should be named bullhorn', function () {
        expect(strategy.name).toEqual('bullhorn');
    });

});