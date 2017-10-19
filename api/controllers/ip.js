module.exports = {
  ip
};

function ip(req, res) {
  res.json({ip: req.connection.remoteAddress})
}
