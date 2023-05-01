const express = require('express');
const redis = require('redis');
const { promisify } = require('util');
const fetch = require('node-fetch');
const config = require('./config.json');

const app = express();
const redisClient = redis.createClient();
const redisGetAsync = promisify(redisClient.get).bind(redisClient);
const redisSetAsync = promisify(redisClient.set).bind(redisClient);

const CACHE_TTL = 60;

app.use(express.json());


app.post('/search', async (req, res) => {
  const term = req.body.term;
  const url = `${config.apiEndpoint}?q=${term}`;

  try {

    const cachedData = await redisGetAsync(term);
    if (cachedData) {
      console.log(`Data retrieved: ${cachedData}`);
      res.json({ source: 'cache', data: JSON.parse(cachedData) });
      return;
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${config.apiKey}`
      }
    });
    const data = await response.json();


    await redisSetAsync(term, JSON.stringify(data), 'EX', CACHE_TTL);

    console.log(`from API: ${JSON.stringify(data)}`);
    res.json({ source: 'API', data: data });
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    res.status(500).send('Error');
  }
});

app.listen(config.port, () => {
  console.log(`Server listening on ${config.port}`);
});
