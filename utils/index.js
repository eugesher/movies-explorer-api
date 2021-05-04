module.exports.concatenateErrors = (err) => Object.values(err.errors).map((e) => e.message).join('. ');
