/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/


//Current student list
const allStudentsUl = document.getElementsByClassName('student-list')[0];
//Collection of 'li' student objects
const allStudentsLi = allStudentsUl.children;
//Parent of the student lists (current and new)
const parentDiv = document.getElementsByClassName('page')[0]

//Creating the search 'div' element and setting its class name to student search
const searchBarDiv = document.createElement('div');
searchBarDiv.className = 'student-search';

//Creating the search bar ('input') element, setting its placeholder text and appending it to the search 'div'
const searchBarInput = document.createElement('input');
searchBarInput.placeholder = 'Search for students...';
searchBarDiv.appendChild(searchBarInput);

//Creating the search button ('button') element, setting its inner text and appending it to the search 'div'
const searchButton = document.createElement('button');
searchButton.textContent = 'Search';
searchBarDiv.appendChild(searchButton);

//Appending the search 'div' element to the DOM 
const searchBarParent = document.getElementsByClassName('page-header cf')[0];
searchBarParent.appendChild(searchBarDiv);

//Getting student names collection to pass into 'searchFunc' function
const studentNamesCollection = document.getElementsByTagName('h3');
console.log(studentNamesCollection);


function searchFunc ( searchBarInput, studentNames ) {
  
   for ( let i = 0; i < studentNames.length; i++ ) {
     studentNames[i].className = '';
     if ( searchBarInput.value.length !== 0 && studentNames[i].textContent.toLowerCase().includes(searchBarInput.value.toLowerCase()) ) {
       studentNames[i].className = 'match';
     }
   }
   
   console.log(updateStudentCollection());
 }


function updateStudentCollection () {
   
   currentCollection = allStudentsLi;
   newCollection = [];

   for ( let i = 0; i < currentCollection.length; i++ ) {
      const currentLi = currentCollection[i];

      if ( currentLi.tagName === 'match' ) {
         newCollection.push(currentLi);
      }
   }
   return newCollection;
  
}




searchButton.addEventListener('click', (e) => {
   e.preventDefault(); 
   searchFunc ( searchBarInput, studentNamesCollection );
 });
 
 searchBarInput.addEventListener('keyup', () => {  
   searchFunc ( searchBarInput, studentNamesCollection );
 });


/**
 * Displays 10 elements coresponding to the page selected
 * @constructor
 * @param {HTMLcollection} listOfStudents - Collection of student 'li' objects.
 * @param {number} pageNo - Page number.
 */
function showPage ( listOfStudents, pageNo ) {
   
   //Calculating the number of student objects in passed collection
   const numberOfStudents = listOfStudents.length;

   //Calculating the low and high border of object indexes that need to be displayed
   const lowIndex = pageNo * 10 - 10;
   const highIndex = pageNo * 10 - 1;
   
   //Looping through the given collection of students and displaying only the ones coresponding to the page given
   for ( let i = 0; i < numberOfStudents; i++ ) {

      const currentStudent = listOfStudents[i];
      
      if ( i >= lowIndex && i <= highIndex) {
         currentStudent.style.display = 'block';
      } else {
         currentStudent.style.display = 'none';
      }
   }
}


/**
 * Creates and appends the page links after displayed 'ul' list of student objects based on the number of items in that list
 * Adds Event listeners to each link, so when clicked, calls the 'showPage' function to display selected elements
 * @constructor
 * @param {HTMLcollection} listOfStudents - Collection of student 'li' objects.
 */
function appendPageLinks ( listOfStudents ) {

   //Calculating the number of pages required based on the number of 'li' student objects
   const nOfPages = Math.ceil( allStudentsLi.length / 10 );

   //Creating the pagination links div element, setting its className to 'pagination' and appending it to DOM
   const paginationDiv = document.createElement('div');
   paginationDiv.className = 'pagination';
   parentDiv.insertBefore(paginationDiv, allStudentsUl.nextSibling);

   //Creating the pagination links ul element and appending it to the pagination links div element
   const paginationUl = document.createElement('ul');
   paginationDiv.appendChild(paginationUl);

   //Creating and appending the same number of 'li' objects as there are pages to the DOM 
   for ( let i = 0; i < nOfPages; i++ ) {

      //Creating the 'li' object
      const paginationLi = document.createElement('li');
      
      //Creating anchor ('a') element, setting its 'href' value and 'text' value
      const paginationAnchorLink = document.createElement('a');
      paginationAnchorLink.href = '#';
      paginationAnchorLink.textContent = (i + 1).toString();

      //Appending the 'anchor' element to the 'li' object and the 'li' object to to 'ul' collection
      paginationLi.appendChild(paginationAnchorLink);
      paginationUl.appendChild(paginationLi);
   }

   //Setting the firt 'anchor' link's class name property to active so when the web page first loads, the first page shows up
   const paginationLiCollection = paginationUl.children;
   paginationLiCollection[0].firstElementChild.className = 'active';

   //calling the 'showPage' function when a button is clicked with its 'pageNo' and the whole 'li' collection
   for ( let i = 0; i < paginationLiCollection.length; i++ ) {

      //Selecting current anchor link
      const currentAnchorLink = paginationLiCollection[i].firstElementChild;
      
      //Adding the event listener listening for the click event, then targeting the link pressed with the event object and target property
      currentAnchorLink.addEventListener('click', (e) => {
         showPage( allStudentsLi, +currentAnchorLink.textContent );
         for ( let i = 0; i < paginationLiCollection.length; i++) {
            //Removing current 'active' class name from an 'anchor' object that has it
            paginationLiCollection[i].firstElementChild.className = '';
         }
         //Setting selected link's class name to active
         e.target.className = 'active'
      })
   }

}

//Calling on the 'appendPageLinks' function passing in the whole 'li' collection of student objects
appendPageLinks( allStudentsLi );

//Showing the first page when the web page loads
showPage( allStudentsLi, 1 );