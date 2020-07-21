/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/


//current student list
const ul = document.getElementsByClassName('student-list')[0];
//all li student objects (a collection)
const li = ul.children;
//parent of new list
const div = document.getElementsByClassName('page')[0]

//Creating the div element, setting its className to 'pagination' and appending it to DOM
const showListDiv = document.createElement('div');
showListDiv.className = 'pagination';
div.insertBefore(showListDiv, ul.nextSibling);


//Logging all of the names from the li to the console

/*
for ( let i = 0; i < li.length; i++) {
   let div = li[i].querySelector('h3');
   console.log(div)
}
*/



//Showing 10 elements coresponding to the page selected
function showPage ( listOfStudents, pageNo ) {
   
   const numberOfStudents = listOfStudents.length;
   const lowIndex = pageNo * 10 - 10;
   const highIndex = pageNo * 10 - 1;
   
   for ( let i = 0; i < numberOfStudents; i++ ) {

      const currentStudent = listOfStudents[i];
      
      if ( i >= lowIndex && i <= highIndex) {
         currentStudent.style.display = 'block';
      } else {
         currentStudent.style.display = 'none';
      }
   }
}

//Calling a hardcoded function to check function functionality
/*
showPage( li, 3 );
*/



/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
