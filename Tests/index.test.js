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
    testUsername: `test-${randomstring.generate(10)}@admin-test.nl`,
    testUsername2: `test2-${randomstring.generate(10)}@admin-test.nl`,
    testUsername3: `test3-${randomstring.generate(10)}@admin-test.nl`,
    testPassword: randomstring.generate(),
    testDevice: `device-${randomstring.generate(10)}`,
    testDevice2: `device2-${randomstring.generate(10)}`,
    testApp: `app-${randomstring.generate(10)}`,
    testApp2: `app2-${randomstring.generate(10)}`,
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

        it("should register a second user", (done) => {
            axios.post(`${apiUrl}/register`, {
                email: testData.testUsername2,
                password: testData.testPassword,
            }).then((response) => {
                try {
                    assert.equal(response.status, 200);
                    expect(response.data.success).to.equal(true);
                    expect(response.data.data.token).to.be.a('string')
                    testData['userId2'] = response.data.data.user_id
                } catch (err) {
                    return done(err)
                }
                done()
            }).catch((error) => {
                done(error);
            })
        });

        it("should register a third user", (done) => {
            axios.post(`${apiUrl}/register`, {
                email: testData.testUsername3,
                password: testData.testPassword,
            }).then((response) => {
                try {
                    assert.equal(response.status, 200);
                    expect(response.data.success).to.equal(true);
                    expect(response.data.data.token).to.be.a('string')
                    testData['userId3'] = response.data.data.user_id
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
    });

    describe("should verify the user management routes", () => {
        it("should get all users of the platform, including its self", (done) => {
            const axiosAuthed = axios.create({headers: {'Authorization': `Bearer ${testData['token']}`}});
            axiosAuthed.get(`${apiUrl}/users`).then((response) => {
                try {
                    assert.equal(response.status, 200);
                    expect(response.data.success).to.equal(true);
                    expect(JSON.stringify(response.data.data)).to.contain(testData.testUsername);
                } catch (err) {
                    return done(err)
                }
                done()
            }).catch((error) => {
                console.log("Api Error", error.response.data);
                done(error);
            })
        });

        it("should be able to update a user", (done) => {
            const axiosAuthed = axios.create({headers: {'Authorization': `Bearer ${testData['token']}`}});
            axiosAuthed.put(`${apiUrl}/users/${testData['userId2']}`, {
                role: 'user'
            }).then((response) => {
                try {
                    assert.equal(response.status, 202);
                    expect(response.data.success).to.equal(true);
                    expect(response.data.data.role).to.equal('user');
                } catch (err) {
                    return done(err)
                }
                done()
            }).catch((error) => {
                console.log("Api Error", error.response.data);
                done(error);
            })
        });

        it("should be able to delete a user", (done) => {
            const axiosAuthed = axios.create({headers: {'Authorization': `Bearer ${testData['token']}`}});
            axiosAuthed.delete(`${apiUrl}/users/${testData['userId2']}`).then((response) => {
                try {
                    assert.equal(response.status, 202);
                    expect(response.data.success).to.equal(true);
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

    describe("should verify the device management routes", () => {
        it("should be able to add a device", (done) => {
            const axiosAuthed = axios.create({headers: {'Authorization': `Bearer ${testData['token']}`}});
            axiosAuthed.post(`${apiUrl}/devices`, {
                'name': testData['testDevice']
            }).then((response) => {
                try {
                    assert.equal(response.status, 201);
                    expect(response.data.success).to.equal(true);
                    expect(response.data.data._id).to.be.a('string')
                    testData['deviceId'] = response.data.data._id
                } catch (err) {
                    return done(err)
                }
                done()
            }).catch((error) => {
                console.log("Api Error", error.response.data);
                done(error);
            })
        });

        it("should be able to get all devices", (done) => {
            const axiosAuthed = axios.create({headers: {'Authorization': `Bearer ${testData['token']}`}});
            axiosAuthed.get(`${apiUrl}/devices`).then((response) => {
                try {
                    assert.equal(response.status, 200);
                    expect(response.data.success).to.equal(true);
                    expect(JSON.stringify(response.data.data)).to.contain(testData.testDevice);
                } catch (err) {
                    return done(err)
                }
                done()
            }).catch((error) => {
                console.log("Api Error", error.response.data);
                done(error);
            })
        });

        it("should be able to update a device", (done) => {
            const axiosAuthed = axios.create({headers: {'Authorization': `Bearer ${testData['token']}`}});
            axiosAuthed.put(`${apiUrl}/devices/${testData['deviceId']}`, {
                'name': testData['testDevice2']
            }).then((response) => {
                try {
                    assert.equal(response.status, 202);
                    expect(response.data.success).to.equal(true);
                    expect(response.data.data._id).to.equal(testData['deviceId']);
                    expect(response.data.data.name).to.equal(testData['testDevice2']);
                } catch (err) {
                    return done(err)
                }
                done()
            }).catch((error) => {
                console.log("Api Error", error.response.data);
                done(error);
            })
        });

        it("should be able to delete a device", (done) => {
            const axiosAuthed = axios.create({headers: {'Authorization': `Bearer ${testData['token']}`}});
            axiosAuthed.delete(`${apiUrl}/devices/${testData['deviceId']}`).then((response) => {
                try {
                    assert.equal(response.status, 202);
                    expect(response.data.success).to.equal(true);
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

    describe("should verify the App management routes", () => {
        it("should be able to add a app", (done) => {
            const axiosAuthed = axios.create({headers: {'Authorization': `Bearer ${testData['token']}`}});
            axiosAuthed.post(`${apiUrl}/apps`, {
                'name': testData['testApp'],
                'description': `description-${testData['testApp']}`,
                'deviceName': testData['testDevice2'],
                'category': `category-${testData['testApp']}`,
                'public': false,
                'icon': "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII",
            }).then((response) => {
                try {
                    assert.equal(response.status, 201);
                    expect(response.data.success).to.equal(true);
                    expect(response.data.data._id).to.be.a('string')
                    testData['appId'] = response.data.data._id
                } catch (err) {
                    return done(err)
                }
                done()
            }).catch((error) => {
                console.log("Api Error", error.response.data);
                done(error);
            })
        });

        it("should not be able to add an app with the same name", (done) => {
            const axiosAuthed = axios.create({headers: {'Authorization': `Bearer ${testData['token']}`}});
            axiosAuthed.post(`${apiUrl}/apps`, {
                'name': testData['testApp'],
                'description': `description-${testData['testApp']}`,
                'deviceName': testData['testDevice2'],
                'category': `category-${testData['testApp']}`,
                'public': false,
                'icon': "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII",
            }).then((response) => {
                return done(new Error("shouldn't come in this block"))
            }).catch((error) => {
                try {
                    assert.equal(error.response.status, 400);
                    expect(error.response.data.success).to.equal(false);
                } catch (err) {
                    return done(err)
                }
                done();
            });
        });

        it("should be able to add a second app", (done) => {
            const axiosAuthed = axios.create({headers: {'Authorization': `Bearer ${testData['token']}`}});
            axiosAuthed.post(`${apiUrl}/apps`, {
                'name': testData['testApp2'],
                'description': `description-${testData['testApp2']}`,
                'deviceName': testData['testDevice2'],
                'category': `category-${testData['testApp2']}`,
                'public': false,
                'icon': "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII",
            }).then((response) => {
                try {
                    assert.equal(response.status, 201);
                    expect(response.data.success).to.equal(true);
                    expect(response.data.data._id).to.be.a('string')
                    testData['appId2'] = response.data.data._id
                } catch (err) {
                    return done(err)
                }
                done()
            }).catch((error) => {
                console.log("Api Error", error.response.data);
                done(error);
            })
        });

        it("should be able to fetch a single app", (done) => {
            const axiosAuthed = axios.create({headers: {'Authorization': `Bearer ${testData['token']}`}});
            axiosAuthed.get(`${apiUrl}/apps/${testData['appId']}`).then((response) => {
                try {
                    assert.equal(response.status, 200);
                    expect(response.data.success).to.equal(true);
                    expect(response.data.data.public).to.equal(false)
                    expect(response.data.data.description).to.equal(`description-${testData['testApp']}`)
                } catch (err) {
                    return done(err)
                }
                done()
            }).catch((error) => {
                console.log("Api Error", error.response.data);
                done(error);
            })
        });

        it("should be able to fetch all apps", (done) => {
            const axiosAuthed = axios.create({headers: {'Authorization': `Bearer ${testData['token']}`}});
            axiosAuthed.get(`${apiUrl}/apps?nolimit=1`).then((response) => {
                try {
                    assert.equal(response.status, 200);
                    expect(response.data.success).to.equal(true);
                    expect(JSON.stringify(response.data.data)).to.contain(`description-${testData['testApp']}`);
                } catch (err) {
                    return done(err)
                }
                done()
            }).catch((error) => {
                console.log("Api Error", error.response.data);
                done(error);
            })
        });

        it("should be able to update a app", (done) => {
            const axiosAuthed = axios.create({headers: {'Authorization': `Bearer ${testData['token']}`}});
            axiosAuthed.put(`${apiUrl}/apps/${testData['appId']}`, {
                'description': `description2-${testData['testApp']}`,
                'public': true,
            }).then((response) => {
                try {
                    assert.equal(response.status, 202);
                    expect(response.data.success).to.equal(true);
                    expect(response.data.data.public).to.equal(true)
                    expect(response.data.data.description).to.equal(`description2-${testData['testApp']}`)
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

    describe("Finals", () => {
        it("should print the final test data", () => {
            console.log('Final test-data', testData)
        });
    });
});

const apiFailed = (error) => {
    console.log("Api Error", error.data);
    assert.fail("Api Error");
}
