const QueryPets = require("../backend/querydata");

// Routes for the pets data
const petRoutes = (app, fs) => {
      
  // Setup query constants
  const getquery = "SELECT * FROM pets_table"; // get all pets

  const addquery = (name,pictureurl,friendly,specie) =>{
    const exp1 = "INSERT INTO pets_table (name,pictureurl,friendly,specie) VALUES (";
    const sep = ",";
    const invc="'";
    const exp2 = invc+name+invc+sep+invc+pictureurl+invc+sep+friendly+sep+invc+specie+invc+");";
    const exp3 = "SELECT * FROM pets_table WHERE pet_id = currval('pets_table_pet_id_seq');"
    return exp1+exp2+exp3;
  }; // add a pet with the given value

  const removequery = (index) => 
    "DELETE FROM pets_table WHERE pet_id = "+index; // remove a pet at the given index

  // READ
  app.get('/pets', (req, res) => QueryPets(
    getquery,
    function (err, recordset) {
      if (err) console.log(err)
      res.send(recordset.rows);
  }));

  // CREATE
  app.post('/pets', (req,res) => QueryPets(
    addquery(
      req.body["name"],
      req.body["pictureurl"],
      req.body["friendly"],
      req.body["specie"]
    ),
    function (err, recordset) {
      if (err) console.log(err)
      res.send(recordset[1].rows);
    }
  ))
  
  // DELETE    
  app.delete('/pets/:id', (req,res) => QueryPets(
    removequery(req.params["id"]),
    function (err) {
      if (err) console.log(err)
      res.send(`pets id:${req.params["id"]} removed`);
    }
  ))
};
  
module.exports = petRoutes;