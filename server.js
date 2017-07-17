const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); //path is core module

const app = express();



//middleware for bodyParser
app.use(bodyParser.json());//parse json content
app.use(bodyParser.urlencoded({extended:false}));

//middleware for static path files
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res)=>{
	res.send('Hello marie');
	
});
app.listen(3000, ()=>{
	console.log('server started express...');
});

