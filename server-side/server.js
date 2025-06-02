const express  = require('express');
const bodyParser = require('body-parser');  
const cors = require('cors');   
const axios = require('axios');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/api/search' , async (req , res) => {
    const searchTerm = req.query.term;

    if(!searchTerm){
        return res.status(400).json({ error: 'Search term is required' });
    }

    try{
        const response  = await axios.get('https://itunes.apple.com/search', {
            params:{
                term: searchTerm,
                entity: 'song',
                limit: 10,
                media: 'music',
            }
        });
        res.json(response.data);
    }catch(error){
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
    
})

app.listen(5000, () => {
    console.log('Server is running on post 5000');
})