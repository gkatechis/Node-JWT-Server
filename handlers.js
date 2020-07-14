
// Welcome handler

const welcome = (req, res) => {
    // Get token from request's cookies
    const token = req.cookies.token

    // No cookie? 401 for you.
    if (!token) {
        return res.status(401).end();
    };

    var payload
    try {
        payload = jwt.verify(token, jwtKey);
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(401).end();
        }
        return res.status(400).end();
    };

    res.send(`Welcome ${payload.username}!`)

};

// Refresh handler since expiry is short

const refresh = (req, res) => {
    // Get token from request's cookies
    const token = req.cookies.token

    // No cookie? 401 for you.
    if (!token) {
        return res.status(401).end();
    };

    var payload
    try {
        payload = jwt.verify(token, jwtKey);
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(401).end();
        }
        return res.status(400).end();
    };

    const nowUnixSeconds = Math.round(Number(new Date()) / 1000);
    if (payload.exp - nowUnixSeconds > 30) {
        return res.status(400).end();
    };

    // Create new token from usernam in payload; expires in 30s
    const newToken = jwt.sign({
        username
    }, jwtKey, {
        algorithm: 'HS256',
        expiresIn: jwtExpirySeconds,
    })
    console.log('token: ', newToken);

    // Set cookie as token string
    res.cookie('token', newToken, {
        maxAge: jwtExpirySeconds * 1000
    })
    res.end();

};

module.exports = {
    signIn,
    welcome,
    refresh,
}