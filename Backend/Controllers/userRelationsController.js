User = require('./../Models/usersModel');
Neos4JDriver = require('./../Driver/neo4jDriver');


exports.addRelation = function (req, res) {
    User.findById(req.user.user_id, function (err, current_user) {
        if (err || current_user === null) {
            return res.status(400).json({
                success: false,
                data: err,
                ext: "current_user"
            });
        }

        User.findById(req.params.user_id, async function (err, target_user) {
            if (err || target_user === null) {
                return res.status(400).json({
                    success: false,
                    data: err,
                    ext: "target_user"
                });
            }


            console.log("creating relations")
            const writeQuery = `MERGE (p1:Person { id: $curId })
                       MERGE (p2:Person { id: $targId })
                       MERGE (p1)-[:KNOWS]->(p2)
                       RETURN p1, p2`;

            const writeResult = await Neos4JDriver.writeTransaction(tx =>
                tx.run(writeQuery, {
                    curId: current_user._id.toHexString(),
                    targId: target_user._id.toHexString(),
                })
            )
            writeResult.records.forEach(record => {
                const person1Node = record.get('p1')
                const person2Node = record.get('p2')
                console.log(
                    `Created friendship between: ${person1Node.properties.id}, ${person2Node.properties.id}`
                )
            })

            return res.status(400).json({
                success: true,
                data: {
                    message: 'relation created'
                }
            });
        });

    });
};

exports.getKnownBy = function (req, res) {
    User.findById(req.user.user_id, async function (err, current_user) {
        if (err || current_user === null) {
            return res.status(400).json({
                success: false,
                data: err,
                ext: "current_user"
            });
        }

        console.log("Getting relations for", current_user._id.toHexString())
        const readQuery = `MATCH (p2:Person)-[:KNOWS]->(p:Person)
                      WHERE p.id = $curId
                      RETURN p2.id AS id`;

        const readResult = await Neos4JDriver.readTransaction(tx =>
            tx.run(readQuery, {
                curId: current_user._id.toHexString(),
            })
        )

        const promisList = [];
        readResult.records.forEach(record => {
            console.log(`Found person: ${record.get('id')}`)
            promisList.push(new Promise((resolve, reject) => {
                User.findById(record.get('id'), async function (err, found_user) {
                    if (err || found_user === null) {
                        return reject({
                            success: false,
                            data: err,
                            ext: "Finding_user"
                        });
                    }
                    resolve(found_user);
                });
            }))
        })

        Promise.allSettled(promisList).then((result) => {
            return res.status(400).json({
                success: true,
                data: result
            });
        })
    });
};

exports.getRelations = function (req, res) {
    User.findById(req.user.user_id, async function (err, current_user) {
        if (err || current_user === null) {
            return res.status(400).json({
                success: false,
                data: err,
                ext: "current_user"
            });
        }

        console.log("Getting relations for", current_user._id.toHexString())
        const readQuery = `MATCH (p:Person)-[:KNOWS]->(p2:Person)
                      WHERE p.id = $curId
                      RETURN p2.id AS id`;

        const readResult = await Neos4JDriver.readTransaction(tx =>
            tx.run(readQuery, {
                curId: current_user._id.toHexString(),
            })
        )

        const promisList = [];
        readResult.records.forEach(record => {
            console.log(`Found person: ${record.get('id')}`)
            promisList.push(new Promise((resolve, reject) => {
                User.findById(record.get('id'), async function (err, found_user) {
                    if (err || found_user === null) {
                        return reject({
                            success: false,
                            data: err,
                            ext: "Finding_user"
                        });
                    }
                    resolve(found_user);
                });
            }))
        })
        Promise.allSettled(promisList).then((result) => {
            return res.status(400).json({
                success: true,
                data: result
            });
        })

    });
};


exports.removeRelation = function (req, res) {
    User.findById(req.user.user_id, function (err, current_user) {
        if (err || current_user === null) {
            return res.status(400).json({
                success: false,
                data: err,
                ext: "current_user"
            });
        }

        User.findById(req.params.user_id, async function (err, target_user) {
            if (err || target_user === null) {
                return res.status(400).json({
                    success: false,
                    data: err,
                    ext: "target_user"
                });
            }

            console.log("Deleting single relation")
            const writeQuery = `MATCH (p1:Person { id: $curId })-[r:KNOWS]->(p2:Person { id: $targId })
                                DELETE r`;

            const writeResult = await Neos4JDriver.writeTransaction(tx =>
                tx.run(writeQuery, {
                    curId: current_user._id.toHexString(),
                    targId: target_user._id.toHexString(),
                })
            )

            return res.status(400).json({
                success: true,
                data: {
                    message: 'relation deleted'
                }
            });
        });

    });
};
