const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('req.user:', req.user);
    if(req.isAuthenticated()){
        pool.query(`SELECT "content" FROM "secret"
    JOIN "user" ON "secret"."secrecy_level" <= "user"."clearance_level"
    WHERE "user"."id" = ${req.user.id};`)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error making SELECT for secrets:', error);
            res.sendStatus(500);
        });
    }else{
        res.sendStatus(403);
    }
});

module.exports = router;