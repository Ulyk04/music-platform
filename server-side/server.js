// server-side/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/api/search', async (req, res) => {
    const searchTerm = req.query.term;

    if (!searchTerm) {
        return res.status(400).json({ error: 'Search term is required' });
    }

    try {
        const response = await axios.get('https://itunes.apple.com/search', {
            params: {
                term: searchTerm,
                entity: 'song',
                limit: 10,
                media: 'music',
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from iTunes API:', error.message); // Добавил логирование
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }

})

app.get('/api/play-audio', async (req, res) => {
    const audioUrl = req.query.url;

    if (!audioUrl) {
        return res.status(400).json({ message: 'Audio URL is required' });
    }

    try {
        const response = await axios.get(audioUrl, {
            responseType: 'stream',
        });

        let contentType = response.headers['content-type'];

        // Дополнительная проверка и корректировка Content-Type
        // iTunes часто использует audio/x-m4a, audio/mp4 или video/mp4 для аудио превью.
        // Браузеры лучше работают с 'audio/mp4' для m4a или 'audio/mpeg' для mp3.
        if (contentType && contentType.includes('audio')) {
            // Если в Content-Type уже есть 'audio', оставляем его
            res.setHeader('Content-Type', contentType);
        } else if (contentType && contentType.includes('video/mp4')) {
            // Если iTunes отдал video/mp4, но это аудио, меняем на audio/mp4
            res.setHeader('Content-Type', 'audio/mp4');
        } else if (audioUrl.includes('.m4a')) {
            // Если URL заканчивается на .m4a, но Content-Type неверный
            res.setHeader('Content-Type', 'audio/mp4');
        } else if (audioUrl.includes('.mp3')) {
            // Если URL заканчивается на .mp3
            res.setHeader('Content-Type', 'audio/mpeg');
        } else {
            // Как запасной вариант, если ничего не подошло
            res.setHeader('Content-Type', 'application/octet-stream'); // или 'audio/mp4' как самый частый
        }
        
        // Устанавливаем Content-Length, если он есть
        if (response.headers['content-length']) {
            res.setHeader('Content-Length', response.headers['content-length']);
        }
        
        // Передаем поток данных
        response.data.pipe(res);

    } catch (error) {
        console.error('Error proxying audio:', error.message);
        if (error.response) {
            console.error('iTunes API response status:', error.response.status);
            console.error('iTunes API response data:', error.response.data);
            res.status(error.response.status).json({
                message: `Error from audio source: ${error.response.statusText || 'Unknown error'}`,
                details: error.message
            });
        } else {
            res.status(500).json({ message: 'Error proxying audio', error: error.message });
        }
    }
});

app.listen(5000, () => {
    console.log('Server is running on port 5000'); // Изменил "post" на "port"
});