//my try without ai

// let  currIndex = 0;
//  function getFileName(index) {
//   const files = ["print","web","marketing","code",];
//     let nextIndex = currIndex++;
//  console.log(files[nextIndex]);

//    let nextView = files[nextIndex];

//    if(nextView >= files.length) {
//     return 0;
//    } else {
//   return nextView;
//    }
// }

//AI try with prompt: ///////////////////////
// write a reduce function to get the next index of an array on a button click and when it reaches the end, it should return to the start of the array.

// Use this function to scroll to the next file name
// It will scroll to the next file name in the array and wrap around when it reaches the end of the array.
// The function will return the next file name to be displayed in the UI.

let currIndex = 0;

document.body.style.backgroundColor ="#D5006D";

const colors = ["#C51162", "#AA00B6", "#F48FB1", "#eb7063", "#4CAF50", "#2196F3"];

const files = ["home","print", "web", "code", "marketing", "genAI"];

const categories = ["graphic design","digital marketing","web design","web development","branding"];

const apps = ["Adobe Photoshop", "Adobe Illustrator","Canva Design","Front-End Development"];

const html_files = ["home.html", "print.html", "web.html", "code.html", "marketing.html", "genAI.html"];

// why is 3%6 equal 3?

// The modulo operator, often represented by the symbol %, gives the remainder of a division. It essentially tells you what's left over after dividing one number by another. For example, 7 modulo 3 (written as 7 % 3) equals 1, because 7 divided by 3 is 2 with a remainder of 1. 

// The expression 3 % 6 evaluates to 3 because the modulo operator (%) calculates the remainder of dividing the first number (the dividend) by the second number (the divisor). Here's the step-by-step explanation:

// Division Process:
// When dividing 3 by 6, the result is 0 because 6 cannot fit into 3 even once. This is integer division, so we only consider the whole number part of the quotient.

// Remainder:
// After dividing, the remainder is the part of the dividend that is left over. Since 6 cannot go into 3, the remainder is simply 3.

// Modulo Operator:
// The % operator returns this remainder. Therefore, 3 % 6 equals 3.

//3/6 is 0.5 but need whole division? so 3 is remainder since 6 cannot go into 3 1 whole time so it is the remainder?


//helper function for getNextFileName
function getNextIndex(array) {
  currIndex = (currIndex + 1) % array.length; // Increment index and wrap around using modulo
  // console.log(`currIndex ${currIndex}`)
  return currIndex;
}

function getNextFileName() {
  const nextIndex = getNextIndex(files);
  console.log(`nextIndex ${nextIndex}`)
  console.log(files[nextIndex]);
  return files[nextIndex];
}

function getPrevIndex(array) {
  currIndex = (currIndex - 1 + array.length) % array.length; // Decrement index and wrap around using modulo
  return currIndex;
}

function getPrevFileName() {
  const prevIndex = getPrevIndex(files);
  console.log(`prevIndex ${prevIndex}`);
  console.log(files[prevIndex]);
  return files[prevIndex];
}

//fetch the HTML file in html content folder based on the current index
//parse the html
//innerHTML the parsed content into the div with id htmlFile

async function getCurrentHtmlFileName() {
  const currentHtmlFileName = html_files[currIndex];
  console.log(`Current HTML file name: ${currentHtmlFileName}`);
  try {
    const response = await fetch(`../../html-content/${currentHtmlFileName}`);
    const html = await response.text();

    // Initialize the DOM parser
    const parser = new DOMParser();

    // Parse the text
    const doc = parser.parseFromString(html, "text/html");
    console.log('doc -- ' + doc);

    // You can now even select part of that html as you would in the regular DOM
    // Example:
    // Use the current file name (without extension) as the selector
    const sectionId = currentHtmlFileName.replace('.html', '');
    const docArticle = doc.querySelector(`#${sectionId}`);

    console.log(docArticle);

    if (docArticle) {
      document.getElementById("htmlFile").innerHTML = docArticle.innerHTML;
    } else {
      document.getElementById("htmlFile").innerHTML = "<p>Section not found.</p>";
    }
  } catch (error) {
    console.error('Failed to fetch page: ', error);
  }
}

//fetch the HTML file name based on the current index
async function getPrevHtmlFileName() {
  const prevHtmlFileName = html_files[currIndex];
  console.log(`Current HTML file name: ${prevHtmlFileName}`);
  try {
    const response = await fetch(`../../html-content/${prevHtmlFileName}`);
    const html = await response.text();

    // Initialize the DOM parser
    const parser = new DOMParser();

    // Parse the text
    const doc = parser.parseFromString(html, "text/html");
    console.log('doc -- ' + doc);

    // You can now even select part of that html as you would in the regular DOM
    // Example:
    // Use the current file name (without extension) as the selector
    const sectionId = prevHtmlFileName.replace('.html', '');
    const docArticle = doc.querySelector(`#${sectionId}`);

    console.log(docArticle);

    if (docArticle) {
      document.getElementById("htmlFile").innerHTML = docArticle.innerHTML;
    } else {
      document.getElementById("htmlFile").innerHTML = "<p>Section not found.</p>";
    }
  } catch (error) {
    console.error('Failed to fetch page: ', error);
  }
}

//mouse over go to load next content category html
  document.getElementById('myButton').addEventListener('mouseover', function() {
    scrollRight();
        console.log('Mouse is over the button!');
    });

function scrollRight() {
  let nextIndex = getNextFileName();
  // document.getElementById(nextIndex).scrollIntoView();
  getCurrentHtmlFileName();
  document.body.style.backgroundColor = colors[files.indexOf(nextIndex)];
  colors[files.indexOf(nextIndex)];
}

function scrollLeft() {
  let prevIndex = getPrevFileName();
  // document.getElementById(prevIndex).scrollIntoView();
  getPrevHtmlFileName();
  document.body.style.backgroundColor = colors[files.indexOf(prevIndex)];
}

document.getElementById("right-arrow").addEventListener("click", scrollRight, function(event) {
  // event.preventDefault();
});

document.querySelector('#left-arrow').addEventListener('click', scrollLeft, function(event) {
  // event.preventDefault(); 
  console.log('Button clicked, scrolling prevented.');
});

document.querySelector('#left-arrow').addEventListener('click', function(event) {
  // event.preventDefault(); 
  console.log('Button clicked, scrolling prevented.');
});

   //event click on marketing-goback X on project page scroll marketing into view
// document.getElementById("marketing-goback").addEventListener("click",  function(event) {
//   event.preventDefault();
//   document.getElementById("marketing").scrollIntoView();
// });