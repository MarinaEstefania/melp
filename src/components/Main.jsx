import React, { Component } from "react";
import MarkerMap from "./MarkerMap";
import Cards from './Cards';
import Search from './Search';

class Main extends Component {
 constructor(props) {
   super(props);
   this.switchToCards = this.switchToCards.bind(this);
   this.switchToMap = this.switchToMap.bind(this);
   this.state = {
     isMap: false,
    places: [],
    searchQuery: ""
   };
 }
 switchToMap = () => {
   this.setState({ isMap:  true});
 };

 switchToCards = () => {
  this.setState({ isMap:  false});
};

handlerSearch = (text) =>{
  this.setState({ searchQuery:  text});
}


// function for dynamic sorting
compareValues(key, order='asc') {
  return function(a, b) {
      if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          // property doesn't exist on either object
          return 0;
      }

      const varA = (typeof a[key] === 'string') ?
          a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ?
          b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
          comparison = 1;
      } else if (varA < varB) {
          comparison = -1;
      }
      return (
          (order == 'desc') ? (comparison * -1) : comparison
      );
  };
}

componentDidMount() {
  fetch('https://melp-backend.herokuapp.com/places')
  .then(response => response.json())
  .then(data => {
    this.setState ({
      places: data.places
    }, ()=>
    console.log('places', this.state.places))
  })

}
 render() {
 //console.log(this.state.data)
   const isMap = this.state.isMap;
   let view;
   
   const filteredPlaces = this.state.places.filter(i =>
    new RegExp(this.state.searchQuery, "i").exec(JSON.stringify(i)))

    const sortedPlaces = filteredPlaces.sort(this.compareValues('rating','desc'))
   if (isMap){
        console.log(sortedPlaces)
       view = <MarkerMap data={sortedPlaces}></MarkerMap>
   }
   else{
     console.log(sortedPlaces)
       view = <Cards data={sortedPlaces}></Cards>
   }
   return (
     <div>
       <header><Search searchQuery={this.state.searchQuery} eventSearch={this.handlerSearch} ></Search></header>
       <button onClick = {this.switchToCards}>Cards </button>
       <button onClick={this.switchToMap} >Map</button>
       <section>{view}</section>
       <footer>Footer</footer>
     </div>
   );
 }
}
export default Main;