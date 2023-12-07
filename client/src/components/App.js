import './App.css';
import React from "react";
import PetList from './List';

const species = {
  Dog:"Dog",
  Cat:"Cat",
  Bird:"Bird"
}

function App() {

  // state for form inputs
  const [state,setState] = React.useState({
    name : "",
    pictureurl : "",
    friendly : false,
    specie : "",
  });

  // update state with updated inputs from event
  function handleUpdateInput(event){
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setState({
      ...state,
      [event.target.name] : value
    });
  }
  
  // add pet to pets list
  function handleAddPet(){
    addPets();
  }
  
  // PUSH hooks
  const addPets = () => {
    fetch("http://localhost:5000/pets",{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    })
    .then((response)=>response.json())
    .then((data)=>console.log(data))
    .catch((e)=>console.log(e))
  };

  return (
    // generate html for App
    <div className="App">
      <header className="App-header">
      </header>
      <main>
      <h1>
          <b>Pet Tracker</b>
        </h1>
        <form>
          <h2>Add a new Pet!</h2>
          <span>
            <label htmlFor="pname">
              Pet Name*:&nbsp; 
              <input 
                type="text" 
                id="pname" 
                name="name" 
                required 
                alt='Enter Pet Name' 
                value={state.name}
                onChange={handleUpdateInput}
              >
              </input>
            </label>
          </span>
          <span>
            <label htmlFor="ppicture">
              Profile Picture*:&nbsp;  
              <input
                type="text" 
                id="ppicture" 
                name="pictureurl" 
                placeholder='Picture URL'
                required 
                alt='Enter Picture URL'
                value={state.pictureurl}
                onChange = {handleUpdateInput}
              >
              </input>
            </label>
          </span>
          <fieldset>
            <legend htmlFor="specie">Species*</legend>
                <label htmlFor = "species1">
                  <input 
                    type="radio" 
                    id="species1" 
                    name="specie" 
                    value={species.Cat}
                    required
                    checked={state.specie === species.Cat}
                    onChange={handleUpdateInput}
                  >
                  </input>
                  &nbsp;Cat
                </label>
                <br></br>
              <label htmlFor = "species2">
                <input 
                  type="radio" 
                  id="species2" 
                  name="specie" 
                  value={species.Dog} 
                  required
                  checked={state.specie === species.Dog}
                  onChange={handleUpdateInput}
                >
                </input>
                &nbsp;Dog
              </label>
              <br></br>
              <label htmlFor = "species3">
                <input 
                  type="radio" 
                  id="species3" 
                  name="specie" 
                  value={species.Bird}
                  required                
                  checked={state.specie === species.Bird}
                  onChange={handleUpdateInput}              
                >
                </input>
                &nbsp;Bird
              </label>
              <br></br>
          </fieldset>
            <label htmlFor = "friendly">
              <input 
                type="checkbox" 
                id="friendly" 
                name="friendly"
                value={state.friendly}
                onChange={handleUpdateInput}
              >
              </input>
              &nbsp;Are They Friendly?
            </label>
          <button 
            id = "add" 
            name = "addpet"
            onClick={handleAddPet}
          >
            Add Pet!
          </button>
        </form>
        <h2>Pet List</h2>
        <PetList/>
      </main>
    </div>
  );
}

export default App;