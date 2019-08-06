import React, { Component } from "react";
import data from "../data/data.json";

class Search extends Component {
 constructor(props) {
   super(props);
   {
     this.state = {
       dataFiltered: data
     };
   }
 }

 dataToArray = Object.values(data)

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


 handleChange = event => {
   
  let found =  data.restaurants.filter(i =>
    new RegExp(this.state.search, "i").exec(JSON.stringify(i))
  );


   this.setState({
     search: event.target.value,
     dataFiltered: found
   });

   
   this.props.eventSearch(found);
 };
 render() {
   //console.log(this.state.dataFiltered);
   console.log(this.dataToArray[0].sort(this.compareValues('raiting','desc')));
   return (
     <div className="searchBar">
       <input
         type="text"
         placeholder="Search.."
         value={this.state.search}
         onChange={this.handleChange}
       />
     </div>
   );
 }
}
export default Search;