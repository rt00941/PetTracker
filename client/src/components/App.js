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
var pets = [
  new Pet("Lucky", placeholderurl, true, species.Dog),
  new Pet("Lucy",placeholderurl, false, species.Bird)
]
function App() {
  const [state,setState] = React.useState({
    petname : "",
    petpicture : "",
    species : undefined,
    friendly : undefined,
  });
  function handleUpdateInput(event){
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setState({
      ...state,
      [event.target.name] : value
    });
  }
  
  function handleAddPet(){
    if (state.petname === "" || state.petpicture === "" || state.species === undefined){
      console.log("required field missing");
      return;
    }
    pets.push(
    new Pet(
      state.petname,
      state.petpicture,
      state.friendly,
      state.specie
    ));
  }
  return (
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
function PetList(){
  const [state, setState] = React.useState({
    petlist:pets,
  });
  function handleRemovePet(){
    setState({
      ...state,
    })
  }
  return (
    <ul name = "petlist">
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
                onClick={() => {pets.splice(pets.indexOf(pet)); console.log(pets); handleRemovePet()}}
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