// import fauna from 'faunadb';

// const q = faunadb.query;
// const client = new faunadb.Client({
//     secret: process.env.FAUNADB_SECRET
// });

function refreshTheToken(refreshToken) {
    const clientIdClientSecret = 'Basic OTQ5YzIyNjBmNWUwNDlhOWJmODM5YmZmNzgwODE5OTA6YzM0MTUwNjIxNjdhNGMwNzgyZmM2ZDJlYzM1OGYwZDU=';
    const data = { 'grant_type': 'refresh_token', 'refresh_token': refreshToken };

    const headers = { 'Authorization': clientIdClientSecret };
    const p = requests.post('https://accounts.spotify.com/api/token', data = data, headers = headers);

    spotifyToken = p.json();

    // Place the expiration time(current time + almost an hour), and access token into the DB
    table.put_item(Item = {
        'spotify': 'prod', 'expiresAt': int(time.time()) + 3200,
        'accessToken': spotifyToken['access_token']
    })
}

exports.handler = (event, context, callback) => {
    // "event" has information about the path, body, headers, etc. of the request
    console.log('event', event)
    // "context" has information about the lambda environment and user details
    console.log('context', context)
    // The "callback" ends the execution of the function and returns a response back to the caller

    // Defaults
    let response = "Anindya isn't listening to Spotify right now.";
    let songName = 'n/a';
    let artistName = 'n/a';
    let isPlaying = false;

    // See if "expiresAt" indeed indicates we need a new token.
    // Spotify access tokens last for 3600 seconds. Get this data from FaunaDB. Gonna try out MongoDB Atlas too.
    // const data = client.query(q.Get(q.Ref(q.Collection('auth'), '263445428525072907'))).then();

    let dbResponse = null; // Get DB response here.
    let expiresAt = dbResponse['Item']['expiresAt']; // Get Unix EPOCH expiresAt

    // If expired....
    if (expiresAt <= Date.now()) {
        refreshTheToken(refreshToken);
    }

    dbResponse = table.get_item(Key = { 'spotify': 'prod' })
    accessToken = dbResponse['Item']['accessToken']

    return callback(null, {
        statusCode: 200,
        body: JSON.stringify({
            data: '⊂◉‿◉つ'
        })
    })
}