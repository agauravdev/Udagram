import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  app.get("/filteredimage", async (req,res)=> {
  	let {image_url} = req.query;
  	if(!image_url){
  		res.status(400).send('Error : Url of image not sent');
  	}
  	else{
  		try{
  			const result = await filterImageFromURL(image_url);
  			res.sendFile(result, ()=> {deleteLocalFiles([result]);});
  		}
  		catch(err){
  			res.status(422).send("Unprocessable Entity");
  		}
  		

  	}
  });

  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();