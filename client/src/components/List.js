import './App.css';
import React from "react";

function List(){

  // state for pets list
  const [pets, setState] = React.useState();


  // update state on remove
  function onRemovePet(i){
    deletePets(i);
  }

  // GET hooks
  const fetchPets = async () => {
    await fetch("http://localhost:5000/pets",{})
    .then((response)=>response.json())
    .then((data)=>setState(data))
    .catch((e)=>console.log(e))
  };

  React.useEffect(()=>{
    fetchPets();
    console.log("fetched");
  },[])

  // DELETE hooks
  const deletePets = async (i) => {
    const url = "http://localhost:5000/pets/" + i;
    await fetch(url,{
      method:"DELETE"
    })
    .then((response)=>response.text())
    .then((message)=>console.log(message))
    .then(()=>fetchPets())
    .catch((e)=>console.log(e))
  };

  return (
    // generate html for pets list
    <ul id="pet-list" name="petlist">
      {
        pets?.map((pet) => {
        
          return (
            <li key = {pet.pet_id}>
              <div className = "card" >
              <p><b>{pet.name}</b></p>
              <p><img src = {pet.pictureurl} alt={pet.name}></img></p>
              <p>{pet.friendly === true ? "Friendly!":"Not so friendly..."}</p>        
              <p>species: {pet.specie}</p>
              <button 
                id = {"remove pet number: "+pet.pet_id+" named: "+pet.name} 
                name = "removepet"
                type='button'
                onClick={() => onRemovePet(pet.pet_id)}
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

export default List;