const express =  require('express');
const axios =  require('axios');
const app = express();

app.get('/:id', async(req, resp)=>{
	const id = req.params.id;
	try {
		if (isNaN(id)){
			return resp.status(400).json({err:'invalid id'})
		}
		const response = await axios.get(`https://fakestoreapi.com/products/${id}`)
		resp.json(response.data)

	} catch (err) {
		console.log("error : ", err);
		resp.status(400).json({error: err});
	}
});

app.listen(3000, ()=>{
	console.log("server started at : 3000")
})

