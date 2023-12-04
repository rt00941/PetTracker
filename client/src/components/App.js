import './App.css';
import React from "react"

const placeholderurl = "https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg"
const species = {
  Dog:"Dog",
  Cat:"Cat",
  Bird:"Bird"
}

class Pet{
  constructor(name, pictureurl, friendly, specie){
    this.name = name;
    this.pictureurl = pictureurl;
    this.friendly = friendly;
    this.specie = specie;
  }
}

// placeholder pets list
var pets = [
  new Pet("Lucky", placeholderurl, true, species.Dog),
  new Pet("Lucy",placeholderurl, false, species.Bird),
  new Pet("Lacy",placeholderurl, false, species.Bird),
  new Pet("Birdy",placeholderurl, false, species.Bird),
  new Pet("Sparkle",placeholderurl, false, species.Bird)
]

function App() {

  // state for form inputs
  const [state,setState] = React.useState({
    petname : "",
    petpicture : "",
    species : undefined,
    friendly : undefined,
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
    pets.push(
    new Pet(
      state.petname,
      state.petpicture,
      state.friendly,
      state.specie
    ));
  }

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
                name="petname" 
                required 
                alt='Enter Pet Name' 
                value={state.petname}
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
                name="petpicture" 
                placeholder='Picture URL'
                required 
                alt='Enter Picture URL'
                value={state.petpicture}
                onChange = {handleUpdateInput}
              >
              </input>
            </label>
          </span>
          <fieldset>
            <legend htmlFor="species">Species*</legend>
                <label htmlFor = "species1">
                  <input 
                    type="radio" 
                    id="species1" 
                    name="species" 
                    value={species.Cat}
                    required
                    checked={state.species === species.Cat}
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
                  name="species" 
                  value={species.Dog} 
                  required
                  checked={state.species === species.Dog}
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
                  name="species" 
                  value={species.Bird}
                  required                
                  checked={state.species === species.Bird}
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
            onSubmit={handleAddPet}
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

function PetList(){

  // state for pets list
  const [state, setState] = React.useState({
    petlist:pets,
  });

  // update state on remove
  function onRemovePet(){
    setState({
      ...state,
    })
  }
  return (
    // generate html for pets list
    <ul id="pet-list" name="petlist">
      {
        state.petlist.map((pet) => {
          return (
            <li key = {state.petlist.indexOf(pet)}>
              <div className = "card" >
              <p><b>{pet.name}</b></p>
              <p><img src = {pet.pictureurl} alt={pet.name}></img></p>
              <p>{pet.friendly === undefined ? "" : pet.friendly ?"Friendly!":"Not so friendly..."}</p>        
              <p>species: {pet.specie}</p>
              <button 
                id = {"remove"+pet.name} 
                name = "removepet"
                type='button'
                onClick={() => {pets.splice(pets.indexOf(pet),1); console.log(pets); onRemovePet()}}
              >
                Remove
              </button>
              </div>
            </li>
          )
        })
      }
    </ul>
  )
}

export default App;