import https from 'https';

const options = {
	method: 'GET',
	hostname: 'genius-song-lyrics1.p.rapidapi.com',
	port: null,
	path: '/search?q=Blinding%20Lights',
	headers: {
		'x-rapidapi-key': '842fe901bfmsh02e6744e352aee7p1cfb26jsna3302ed29bcb',
		'x-rapidapi-host': 'genius-song-lyrics1.p.rapidapi.com'
	}
};

const req = https.request(options, function (res) {
	const chunks = [];

	res.on('data', function (chunk) {
		chunks.push(chunk);
	});

	res.on('end', function () {
		const body = Buffer.concat(chunks);
		const data = JSON.parse(body.toString());
		
		// Check if there's audio preview in the response
		if (data.hits && data.hits.length > 0) {
			console.log('First song fields:');
			console.log(JSON.stringify(data.hits[0], null, 2));
		}
	});
});

req.end();