import React, { Component } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Restaurant from './components/Restaurant';



class App extends Component {
  constructor(props) {
    super(props);
      
    this.state = {
      restaurants:[],
      newResName: '',
      newResCuisine: ''
    }
    this.update = this.update.bind(this);
  }
	update(event){
    let target = event.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name] : value
    });
  }


  addRestaurants() {
    let oldRestaurants = this.state.restaurants;
    let newRestaurant = {
      name : this.state.newResName,
      cuisine : this.state.newResCuisine
    }
		this.setState({
      restaurants: oldRestaurants.concat(newRestaurant),
    });
    let inputs = document.getElementsByTagName("input");
    for(var item of inputs){
      item.value="";
    }
  }
  
  removeRestaurants(restaurant) {
		/*
		let oldHobbies = this.state.hobbies;
		let pos = this.state.hobbies.indexOf(Restaurant);
		oldHobbies.splice(pos, 1);
		*/
	const oldRestaurants = this.state.restaurants.filter(
      (elem, index) => {
        console.log(elem)
        return (elem !== restaurant) ? elem : null;
      }
    );	
		
		this.setState({
			restaurants: oldRestaurants
		});
	}
  getDataFromServer(){
    console.log("--- GETTING DATA ---");
     fetch('http://localhost:8080/api/restaurants')
     .then(response => {
       return response.json(); // transforme le json texte en objet js
     })
     .then(res => { // data c'est le texte json de response ci-dessus
       let restaurants = [];
      //  let cuisine = [];
       res.data.forEach((el) => {
         let restaurant = {
            name:el.name,
            cuisine:el.cuisine
          }
          restaurants.push(restaurant);
       });

       this.setState({
        restaurants: restaurants
      });
       
     }).catch(err => {
       console.log("erreur dans le get : " + err)
     });

  }

  componentWillMount() {
    console.log("Component will mount");
    // on va chercher des donnees sur le Web avec fetch, comme
    // on a fait avec VueJS
    this.getDataFromServer();

  }
  
  render() {
    // let list = this.state.restaurants.map(
		// 	(el) => {
		// 		return <li onClick={() => this.removeRestaurants(el)} key={el}>{el}</li>
		// 	}
    // );
    
    let listAvecComponent = 
				this.state.restaurants.map((el, index) => {
				return <Restaurant restaurant={el} key={index} id={index} removeRestaurants={this.removeRestaurants.bind(this)}/>
			}
    );
    
    return (
      <div className="App">
        <h3>Liste des restaurants :</h3>
        {/* <form id = "newResto"> */}
          <output type="text" value="nom"/>
          <input type="text" name="newResName" onChange={this.update}/>
          <output type="text" value="cuisine"/>
          <input type="text" name="newResCuisine" onChange={this.update}/>
          <button onClick={() => this.addRestaurants()}>Add Restaurant</button>
        {/* </form> */}
        <p style={{color: (this.state.restaurants.length < 5) ? 'green' : 'red'}}>
            Nombre de restaurants : {this.state.restaurants.length}
        </p>

    
    <div class="container" >

<table class="table table-striped table-bordered">
  <thead>
  <tr>
    <th scope="col">key</th>
      <th scope="col">num</th>
      <th scope="col">cuisine</th>
      <th scope="col">action</th>
    </tr>
    </thead>

  <tbody>
  {listAvecComponent} 
  </tbody>
  </table>
  

  </div>
  </div>
    );
  }
}

export default App;
