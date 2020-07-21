/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/


//current student list
const ul = document.getElementsByClassName('student-list')[0];
//all li student objects (a collection)
const li = ul.children;
//parent of the student list
const div = document.getElementsByClassName('page')[0]

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


/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

function appendPageLinks ( listOfStudents ) {

   const nOfPages = Math.ceil( li.length / 10 );

   //Creating the pagination links div element, setting its className to 'pagination' and appending it to DOM
   const paginationDiv = document.createElement('div');
   paginationDiv.className = 'pagination';
   div.insertBefore(paginationDiv, ul.nextSibling);

   //Creating the pagination links ul element and appending it to the pagination links div element
   const paginationUl = document.createElement('ul');
   paginationDiv.appendChild(paginationUl);

   for ( let i = 0; i < nOfPages; i++ ) {
      const paginationLi = document.createElement('li');
      
      const paginationAnchorLink = document.createElement('a');
      paginationAnchorLink.href = '#';
      paginationAnchorLink.textContent = (i + 1).toString();

      paginationLi.appendChild(paginationAnchorLink);
      paginationUl.appendChild(paginationLi);
   }

   const paginationLiCollection = paginationUl.children;
   paginationLiCollection[0].firstElementChild.className = 'active';

   for ( let i = 0; i < paginationLiCollection.length; i++ ) {
      const currentAnchorLink = paginationLiCollection[i].firstElementChild;
      
      currentAnchorLink.addEventListener('click', (e) => {
         showPage( li, +currentAnchorLink.textContent );
         for ( let i = 0; i < paginationLiCollection.length; i++) {
            paginationLiCollection[i].firstElementChild.className = '';
         }
         e.target.className = 'active'
      })
   }

}

appendPageLinks( li );
showPage( li, 1 );