const assert = require('assert').strict;
const axios = require('axios').default;
const chai = require('chai');
// var assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const randomstring = require("randomstring");

const apiUrl = `http://localhost:8080/api/v1`;
// Not the "@admin-test.nl" gets elevated to admin
const testData = {
    testUsername: `test-${randomstring.generate(7)}@admin-test.nl`,
    testPassword: randomstring.generate()
};
console.log("Using test data: ", testData)

describe("Avans Apps Test", () => {
    describe("should verify the Authorization routes", () => {
        it("should fail to login", (done) => {
            axios.post(`${apiUrl}/login`, {
                email: testData.testUsername,
                password: testData.testPassword,
            }).then((response) => {
                return done(new Error("shouldn't come in this block"))
            }).catch((error) => {
                try {
                    assert.equal(error.response.status, 401);
                    expect(error.response.data.success).to.equal(false);
                } catch (err) {
                    return done(err)
                }
                done();
            })
        });

        it("should register a user", (done) => {
            axios.post(`${apiUrl}/register`, {
                email: testData.testUsername,
                password: testData.testPassword,
            }).then((response) => {
                try {
                    assert.equal(response.status, 200);
                    expect(response.data.success).to.equal(true);
                    expect(response.data.data.token).to.be.a('string')
                    testData['role'] = response.data.data.role
                    testData['userId'] = response.data.data.user_id
                    testData['token'] = response.data.data.token
                } catch (err) {
                    return done(err)
                }
                done()
            }).catch((error) => {
                done(error);
            })
        });

        it("should login as an user", (done) => {
            axios.post(`${apiUrl}/login`, {
                email: testData.testUsername,
                password: testData.testPassword,
            }).then((response) => {
                try {
                    console.log("response", response.data);
                    assert.equal(response.status, 200);
                    expect(response.data.success).to.equal(true);
                    expect(response.data.data.token).to.be.a('string')
                    testData['role'] = response.data.data.role
                    testData['userId'] = response.data.data.user_id
                    testData['token'] = response.data.data.token
                } catch (err) {
                    return done(err)
                }
                done()
            }).catch((error) => {
                console.log("Api Error", error.response.data);
                done(error);
            })
        });
    });
    describe("should verify the Authorization routes", () => {
    });
});

const apiFailed = (error) => {
    console.log("Api Error", error.data);
    assert.fail("Api Error");
}
