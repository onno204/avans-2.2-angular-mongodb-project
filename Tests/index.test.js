const assert = require('assert').strict;
const axios = require('axios').default;
const chai = require('chai');
// var assert = chai.assert;
const expect = chai.expect;
const Should = chai.Should();
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
    testCommentText: `comment-${randomstring.generate(10)}`,
};
console.log("Using test data: ", testData)

describe("Avans Apps Test", () => {
    describe("Should verify the Authorization routes", () => {
        it("Should fail to login", (done) => {
            axios.post(`${apiUrl}/login`, {
                email: testData.testUsername,
                password: testData.testPassword,
            }).then((response) => {
                return done(new Error("Shouldn't come in this block"))
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

        it("Should register a user", (done) => {
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

        it("Should register a second user", (done) => {
            axios.post(`${apiUrl}/register`, {
                email: testData.testUsername2,
                password: testData.testPassword,
            }).then((response) => {
                try {
                    assert.equal(response.status, 200);
                    expect(response.data.success).to.equal(true);
                    expect(response.data.data.token).to.be.a('string')
                    testData['userId2'] = response.data.data.user_id
                    testData['token2'] = response.data.data.token
                } catch (err) {
                    return done(err)
                }
                done()
            }).catch((error) => {
                done(error);
            })
        });

        it("Should register a third user", (done) => {
            axios.post(`${apiUrl}/register`, {
                email: testData.testUsername3,
                password: testData.testPassword,
            }).then((response) => {
                try {
                    assert.equal(response.status, 200);
                    expect(response.data.success).to.equal(true);
                    expect(response.data.data.token).to.be.a('string')
                    testData['userId3'] = response.data.data.user_id
                    testData['token3'] = response.data.data.token
                } catch (err) {
                    return done(err)
                }
                done()
            }).catch((error) => {
                done(error);
            })
        });


        it("Should login as an user", (done) => {
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

    describe("Should verify the user management routes", () => {
        it("Should get all users of the platform, including its self", (done) => {
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

        it("Should be able to update a user", (done) => {
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

        it("Should be able to delete a user", (done) => {
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

    describe("Should verify the device management routes", () => {
        it("Should be able to add a device", (done) => {
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

        it("Should be able to get all devices", (done) => {
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

        it("Should be able to update a device", (done) => {
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

        it("Should be able to delete a device", (done) => {
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

    describe("Should verify the App management routes", () => {
        it("Should be able to add an app", (done) => {
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

        it("Should not be able to add an app with the same name", (done) => {
            const axiosAuthed = axios.create({headers: {'Authorization': `Bearer ${testData['token']}`}});
            axiosAuthed.post(`${apiUrl}/apps`, {
                'name': testData['testApp'],
                'description': `description-${testData['testApp']}`,
                'deviceName': testData['testDevice2'],
                'category': `category-${testData['testApp']}`,
                'public': false,
                'icon': "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII",
            }).then((response) => {
                return done(new Error("Shouldn't come in this block"))
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

        it("Should be able to add a second app", (done) => {
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

        it("Should be able to fetch a single app", (done) => {
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

        it("Should be able to fetch all apps", (done) => {
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

        it("Should be able to update an app", (done) => {
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

        it("Should be able to delete an app", (done) => {
            const axiosAuthed = axios.create({headers: {'Authorization': `Bearer ${testData['token']}`}});
            axiosAuthed.delete(`${apiUrl}/apps/${testData['appId']}`).then((response) => {
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

    describe("Should verify the authorized comments routes", () => {
        it("Should be able to add a comment", (done) => {
            const axiosAuthed = axios.create({headers: {'Authorization': `Bearer ${testData['token']}`}});
            axiosAuthed.post(`${apiUrl}/comments`, {
                'comment': testData['testCommentText'],
                'appId': testData['appId2'],
            }).then((response) => {
                try {
                    assert.equal(response.status, 201);
                    expect(response.data.success).to.equal(true);
                    expect(response.data.data._id).to.be.a('string')
                    testData['commentId'] = response.data.data._id
                } catch (err) {
                    return done(err)
                }
                done()
            }).catch((error) => {
                console.log("Api Error", error.response.data);
                done(error);
            })
        });

        it("Should be able to get all comments for an app", (done) => {
            const axiosAuthed = axios.create({headers: {'Authorization': `Bearer ${testData['token']}`}});
            axiosAuthed.get(`${apiUrl}/comments?commentId=${testData['appId2']}`).then((response) => {
                try {
                    assert.equal(response.status, 200);
                    expect(response.data.success).to.equal(true);
                    expect(JSON.stringify(response.data.data)).to.contain(testData['testCommentText']);
                } catch (err) {
                    return done(err)
                }
                done()
            }).catch((error) => {
                console.log("Api Error", error.response.data);
                done(error);
            })
        });

        it("Should not be able to delete some elses comment", (done) => {
            const axiosAuthed = axios.create({headers: {'Authorization': `Bearer ${testData['token3']}`}});
            axiosAuthed.delete(`${apiUrl}/comments/${testData['commentId']}`).then((response) => {
                return done(new Error("Shouldn't come in this block"))
            }).catch((error) => {
                try {
                    assert.equal(error.response.status, 400);
                    expect(error.response.data.success).to.equal(false);
                } catch (err) {
                    return done(err)
                }
                done();
            })
        });

        it("Should be able to delete his own comment for an app", (done) => {
            const axiosAuthed = axios.create({headers: {'Authorization': `Bearer ${testData['token']}`}});
            axiosAuthed.delete(`${apiUrl}/comments/${testData['commentId']}`).then((response) => {
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
    describe("Should test the relations routes", () => {
        it("Should create a relation with an user", (done) => {
            const axiosAuthed = axios.create({headers: {'Authorization': `Bearer ${testData['token']}`}});
            axiosAuthed.post(`${apiUrl}/user/relation/${testData['userId3']}`).then((response) => {
                try {
                    assert.equal(response.status, 201);
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

        it("Should get my relations", (done) => {
            const axiosAuthed = axios.create({headers: {'Authorization': `Bearer ${testData['token']}`}});
            axiosAuthed.get(`${apiUrl}/user/relations`).then((response) => {
                try {
                    assert.equal(response.status, 200);
                    expect(response.data.success).to.equal(true);
                    expect(JSON.stringify(response.data.data)).to.contain(testData['testUsername3']);

                } catch (err) {
                    return done(err)
                }
                done()
            }).catch((error) => {
                console.log("Api Error", error.response.data);
                done(error);
            })
        });

        it("Shouldn't be known by anyone", (done) => {
            const axiosAuthed = axios.create({headers: {'Authorization': `Bearer ${testData['token']}`}});
            axiosAuthed.get(`${apiUrl}/user/known_by`).then((response) => {
                try {
                    assert.equal(response.status, 200);
                    expect(response.data.success).to.equal(true);
                    expect(JSON.stringify(response.data.data)).to.equal('[]');
                } catch (err) {
                    return done(err)
                }
                done()
            }).catch((error) => {
                console.log("Api Error", error.response.data);
                done(error);
            })
        });

        it("Should be able to delete a relation", (done) => {
            const axiosAuthed = axios.create({headers: {'Authorization': `Bearer ${testData['token']}`}});
            axiosAuthed.delete(`${apiUrl}/user/relation/${testData['userId3']}`).then((response) => {
                try {
                    assert.equal(response.status, 200);
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

    // describe("Finals", () => {
    //     it("Should print the final test data", () => {
    //         console.log('Final test-data', testData)
    //     });
    // });
});

const apiFailed = (error) => {
    console.log("Api Error", error.data);
    assert.fail("Api Error");
}
