const express = require('express');
const router = express.Router();
const path = require('path');

// Routes for self-closing OAuth popups
router.get('/authsuccess', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/popup/authsuccess/index.html'));
});

module.exports = router;