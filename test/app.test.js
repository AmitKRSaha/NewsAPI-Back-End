var app = require('../app');
var assert = require('assert');



describe("app", function () {


    describe('validating input parameters ', function () {
        it('should return statCode 400 and message when invalid data passed', function () {
            const { statCode, message } = app.validateInput();
            assert.equal(statCode, "400");
        });
        it('should return statCode 400 and message when invalid data passed', function () {
            const obj = {
                query: { searchTerm: 'something' }
            };
            const { statCode, message } = app.validateInput(obj);
            assert.equal(statCode, "400");
        });
        it('should not return statCode 400 and message when valid data passed', function () {
            const obj = {
                query: { searchTerm: 'bitcoin' }
            };
            const { statCode, message } = app.validateInput(obj);
            assert.equal(statCode, "200");
        });
    });
});