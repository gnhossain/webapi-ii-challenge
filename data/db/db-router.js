const router = require('express').Router();

// 5 update path for the require
const db = require('../db/db');

// 3
// this router handles requests beginning with /api/hubs
// so we remove that part of the URI and replace it with a /

// 4 rename server. to router.
router.get('/', (req, res) => {
  // google.com?term=express&sort=desc&field=date

  const query = req.query;

  db.find(query)
    .then(db => {
      res.status(200).json(db);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the db',
      });
    });
});

router.get('/:id', (req, res) => {
  db.findById(req.params.id)
    .then(db => {
      if (db) {
        res.status(200).json(db);
      } else {
        res.status(404).json({ message: 'db not found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the db',
      });
    });
});

router.post('/', (req, res) => {
  db.add(req.body)
    .then(db => {
      res.status(201).json(db);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the db',
      });
    });
});

router.delete('/:id', (req, res) => {
  Hubs.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The hub has been nuked' });
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error removing the hub',
      });
    });
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  Hubs.update(req.params.id, changes)
    .then(hub => {
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error updating the hub',
      });
    });
});

module.exports = router;

// router.get(':channel/messages', (req, res) => {
// router.get('channel/messages', (req, res) => {
// router.get('/hubs/messages', (req, res) => {
// router.get('/hubs/messages/:id', (req, res) => {
router.get('/:id/messages', (req, res) => {});

router.post('/:id/messages', (req, res) => {
  const message = { ...req.body, hubId: req.params.id };

  // save the message
});

router.get('/:id/users', (req, res) => {});

router.get('/:id/threads', (req, res) => {});

// add an endpoint that returns all the messages for a hub
// add an endpoint for adding new message to a hub

module.exports = router; // ES Modules
