import React, { Component } from "react";

class Search extends Component {
 constructor(props) {
   super(props);
   {
     this.state = {
       places: []
     };
   }
 }

/* 
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
} */


 handleChange = event => {
  const value = event.target.value;

   
   this.props.eventSearch(value);
 };


 



 render() {
   //console.log(this.state.dataFiltered);
  /*  const sortedPlaces = [...this.state.places.sort(this.compareValues('raiting','desc'))]
   this.state.places.sort(this.compareValues('raiting','desc')); */
   return (
     <div className="searchBar">
       <input
         type="text"
         placeholder="Search.."
         value={this.props.searchQuery}
         onChange={this.handleChange}
       />
     </div>
   );
 }
}
export default Search;