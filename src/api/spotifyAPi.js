import https from 'https';

const options = {
	method: 'GET',
	hostname: 'spotify23.p.rapidapi.com',
	port: null,
	path: '/search/?q=Blinding%20Lights&type=tracks&offset=0&limit=5',
	headers: {
		'x-rapidapi-key': '842fe901bfmsh02e6744e352aee7p1cfb26jsna3302ed29bcb',
		'x-rapidapi-host': 'spotify23.p.rapidapi.com'
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
		
		console.log('Full Response:');
		console.log(JSON.stringify(data, null, 2));
	});
});

req.on('error', (err) => {
	console.error('Error:', err);
});

req.end();