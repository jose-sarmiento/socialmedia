require('dotenv').config();
require('express-async-errors');

const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const axios = require('axios');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
const users = require('./routes/users');
const posts = require('./routes/posts');
const auth = require('./routes/auth');
const photos = require('./data/photos');

const app = express();

app.use(
	cors({
		origin: 'http://localhost:3000',
		exposedHeaders: 'x-auth-token',
	})
);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/images', async (req, res) => {
	try {
		const {data: a} = await axios.get(
			'https://api.unsplash.com/photos/?client_id=HbBdPP7BI9ElcXfV78A518XWpgaqtS2vZ3NMJvEAE5o&page=1&per_page=30'
		);
		const {data: b} = await axios.get(
			'https://api.unsplash.com/photos/?client_id=HbBdPP7BI9ElcXfV78A518XWpgaqtS2vZ3NMJvEAE5o&page=2&per_page=30'
		);
		const {data: c} = await axios.get(
			'https://api.unsplash.com/photos/?client_id=HbBdPP7BI9ElcXfV78A518XWpgaqtS2vZ3NMJvEAE5o&page=3&per_page=30'
		);
		const {data: d} = await axios.get(
			'https://api.unsplash.com/photos/?client_id=HbBdPP7BI9ElcXfV78A518XWpgaqtS2vZ3NMJvEAE5o&page=4&per_page=30'
		);
		const {data: e} = await axios.get(
			'https://api.unsplash.com/photos/?client_id=HbBdPP7BI9ElcXfV78A518XWpgaqtS2vZ3NMJvEAE5o&page=5&per_page=30'
		);
		const {data: f} = await axios.get(
			'https://api.unsplash.com/photos/?client_id=HbBdPP7BI9ElcXfV78A518XWpgaqtS2vZ3NMJvEAE5o&page=6&per_page=30'
		);
		const {data: g} = await axios.get(
			'https://api.unsplash.com/photos/?client_id=HbBdPP7BI9ElcXfV78A518XWpgaqtS2vZ3NMJvEAE5o&page=7&per_page=30'
		);
		const {data: h} = await axios.get(
			'https://api.unsplash.com/photos/?client_id=HbBdPP7BI9ElcXfV78A518XWpgaqtS2vZ3NMJvEAE5o&page=8&per_page=30'
		);
		const {data: i} = await axios.get(
			'https://api.unsplash.com/photos/?client_id=HbBdPP7BI9ElcXfV78A518XWpgaqtS2vZ3NMJvEAE5o&page=9&per_page=30'
		);
		const {data: j} = await axios.get(
			'https://api.unsplash.com/photos/?client_id=HbBdPP7BI9ElcXfV78A518XWpgaqtS2vZ3NMJvEAE5o&page=10&per_page=30'
		);
		const {data: k} = await axios.get(
			'https://api.unsplash.com/photos/?client_id=HbBdPP7BI9ElcXfV78A518XWpgaqtS2vZ3NMJvEAE5o&page=11&per_page=30'
		);
		const {data: l} = await axios.get(
			'https://api.unsplash.com/photos/?client_id=HbBdPP7BI9ElcXfV78A518XWpgaqtS2vZ3NMJvEAE5o&page=12&per_page=30'
		);
		const {data: m} = await axios.get(
			'https://api.unsplash.com/photos/?client_id=HbBdPP7BI9ElcXfV78A518XWpgaqtS2vZ3NMJvEAE5o&page=13&per_page=30'
		);
		const {data: n} = await axios.get(
			'https://api.unsplash.com/photos/?client_id=HbBdPP7BI9ElcXfV78A518XWpgaqtS2vZ3NMJvEAE5o&page=14&per_page=30'
		);
		const {data: o} = await axios.get(
			'https://api.unsplash.com/photos/?client_id=HbBdPP7BI9ElcXfV78A518XWpgaqtS2vZ3NMJvEAE5o&page=15&per_page=30'
		);
		const {data: p} = await axios.get(
			'https://api.unsplash.com/photos/?client_id=HbBdPP7BI9ElcXfV78A518XWpgaqtS2vZ3NMJvEAE5o&page=16&per_page=30'
		);
		const {data: q} = await axios.get(
			'https://api.unsplash.com/photos/?client_id=HbBdPP7BI9ElcXfV78A518XWpgaqtS2vZ3NMJvEAE5o&page=17&per_page=30'
		);
		const {data: r} = await axios.get(
			'https://api.unsplash.com/photos/?client_id=HbBdPP7BI9ElcXfV78A518XWpgaqtS2vZ3NMJvEAE5o&page=18&per_page=30'
		);
		const {data: s} = await axios.get(
			'https://api.unsplash.com/photos/?client_id=HbBdPP7BI9ElcXfV78A518XWpgaqtS2vZ3NMJvEAE5o&page=19&per_page=30'
		);
		const {data: t} = await axios.get(
			'https://api.unsplash.com/photos/?client_id=HbBdPP7BI9ElcXfV78A518XWpgaqtS2vZ3NMJvEAE5o&page=20&per_page=30'
		);
		const {data: u} = await axios.get(
			'https://api.unsplash.com/photos/?client_id=HbBdPP7BI9ElcXfV78A518XWpgaqtS2vZ3NMJvEAE5o&page=21&per_page=30'
		);
		const {data: v} = await axios.get(
			'https://api.unsplash.com/photos/?client_id=HbBdPP7BI9ElcXfV78A518XWpgaqtS2vZ3NMJvEAE5o&page=22&per_page=30'
		);
		const {data: w} = await axios.get(
			'https://api.unsplash.com/photos/?client_id=HbBdPP7BI9ElcXfV78A518XWpgaqtS2vZ3NMJvEAE5o&page=23&per_page=30'
		);
		const {data: x} = await axios.get(
			'https://api.unsplash.com/photos/?client_id=HbBdPP7BI9ElcXfV78A518XWpgaqtS2vZ3NMJvEAE5o&page=24&per_page=30'
		);
		const {data: y} = await axios.get(
			'https://api.unsplash.com/photos/?client_id=HbBdPP7BI9ElcXfV78A518XWpgaqtS2vZ3NMJvEAE5o&page=25&per_page=30'
		);
		const {data: z} = await axios.get(
			'https://api.unsplash.com/photos/?client_id=HbBdPP7BI9ElcXfV78A518XWpgaqtS2vZ3NMJvEAE5o&page=26&per_page=30'
		);
		const {data: aa} = await axios.get(
			'https://api.unsplash.com/photos/?client_id=HbBdPP7BI9ElcXfV78A518XWpgaqtS2vZ3NMJvEAE5o&page=27&per_page=30'
		);
		const {data: ab} = await axios.get(
			'https://api.unsplash.com/photos/?client_id=HbBdPP7BI9ElcXfV78A518XWpgaqtS2vZ3NMJvEAE5o&page=28&per_page=30'
		);
		const {data: ac} = await axios.get(
			'https://api.unsplash.com/photos/?client_id=HbBdPP7BI9ElcXfV78A518XWpgaqtS2vZ3NMJvEAE5o&page=29&per_page=30'
		);
		const {data: ad} = await axios.get(
			'https://api.unsplash.com/photos/?client_id=HbBdPP7BI9ElcXfV78A518XWpgaqtS2vZ3NMJvEAE5o&page=30&per_page=30'
		);

		const allImages = [
			...a,
			...b,
			...c,
			...d,
			...e,
			...f,
			...g,
			...h,
			...i,
			...j,
			...k,
			...l,
			...m,
			...n,
			...o,
			...p,
			...q,
			...r,
			...s,
			...t,
			...u,
			...v,
			...w,
			...x,
			...y,
			...z,
			...aa,
			...ab,
			...ac,
			...ad,
		];

		const shh = allImages.map(photo => {
		const {
			urls: { regular, small }		} = photo;
		return {
			regular,
			small,
		};
	});

	console.log(shh.length);
	res.send(shh);
	} catch (err) {
		console.log(err)
	}
	
});

app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/posts', posts);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 8000;
const start = async () => {
	try {
		await connectDB(process.env.DATABASE_URI);
		app.listen(port, () =>
			console.log(`Server is listening on port ${port}...`)
		);
	} catch (error) {
		console.log(error);
	}
};

start();
