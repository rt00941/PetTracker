import './App.css';
const placeholderurl = "https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg"
const species = {
  Dog:"Dog",
  Cat:"Cat",
  Bird:"Bird"
}
var pets = [
  { id : 1, name : "Lucky", pictureurl : placeholderurl, friendly:true, specie:species.Dog},
  { id : 2, name : "Lucy", pictureurl : placeholderurl, friendly:false, specie:species.Bird},
]
function App() {
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
            <label htmlFor="pname">Pet Name*: </label>
            <input type="text" id="pname" name="petname" required alt='Enter Pet Name'></input>
          </span>
          <span>
            <label htmlFor="ppicture">Profile Picture*: </label>
            <input type="text" id="ppicture" name="pet picture" placeholder='Picture URL' required alt='Enter Picture URL'></input>
          </span>
          <fieldset>
            <legend htmlFor="species">Species*</legend>
            <div className = "legend">
              <input type ="radio" id ="species1" name = "species" value="cat" required></input>
              <label htmlFor = "species1">Cat</label>
              <br></br>
              <input type ="radio" id ="species2" name = "species" value = "dog" required></input>
              <label htmlFor = "species2">Dog</label>
              <br></br>
              <input type ="radio" id ="species3" name = "species" value="bird" required></input>
              <label htmlFor = "species3">Bird</label>
              <br></br>
            </div>
          </fieldset>
            <span>
              <input type='checkbox' id = "friendly" name='friendly'></input>
              <label htmlFor = "friendly">Are They Friendly?</label>
            </span>
          <button id = "add" name = "addpet">Add Pet!</button>
        </form>
        <h2>Pet List</h2>
        <ul>
          {
            pets.map((pet) => {
              console.log(pet);
              return (
                <li key = {pet.id}>
                  <div className = "card" >
                  <p><b>{pet.name}</b></p>
                  <p><img src = {pet.pictureurl} alt='Pet description'></img></p>
                  <p>{pet.friendly?"friendly":"not friendly"}</p>        
                  <p>species: {pet.specie.toLowerCase()}</p>
                  <button id = {"remove"+pet.id} name = "removepet">Remove</button>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </main>
    </div>
  );
}
export default App;