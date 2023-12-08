// Routes for the pets data

const petRoutes = (app, fs) => {
    
    const dataPath = './data/pets.json'; // local json for now
  
    // helper for reading the file
    const readFile = (
        callback,
        returnJson = true,
        filePath = dataPath,
        encoding = 'utf8'
      ) => {
        fs.readFile(filePath, encoding, (err, data) => {
          if (err) {
            throw err;
          }
          
          callback(returnJson ? JSON.parse(data) : data);
        });
      };

      // helper for writing data to the file
      const writeFile = (
        fileData,
        callback,
        filePath = dataPath,
        encoding = 'utf8'
      ) => {
        fs.writeFile(filePath, fileData, encoding, (err) => {
          if (err) {
            throw err;
          }
    
          callback();
        });
      };

    // READ
    app.get('/pets', (req, res) => {
      readFile((data) => {
        res.send(data);
      }, true);
    });

    // CREATE
    app.post('/pets', (req,res) => {
      readFile((data) => {            
        
        // Could add some conditionals here to handle if data is in the format we want
        data["pets"].push(req.body);
        writeFile(JSON.stringify(data, null, 2), () => {
          res.status(200).send(req.body);
        });
      }, true);
    });

    // DELETE
    app.delete('/pets/:id', (req,res) => {
      readFile((data) => {
        
        const pets = data["pets"];
        const petindex = req.params['id'];
        pets.splice(petindex,1);
    
        writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).send(`pets id:${petindex} removed`);
        });
      }, true);
    })
  };
  
  module.exports = petRoutes;