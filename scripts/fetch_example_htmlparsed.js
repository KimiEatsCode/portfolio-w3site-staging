// try https://gomakethings.com/getting-html-with-fetch-in-vanilla-js/

// The Fetch text() method #
// For example, what if I wanted to get the /about page from my site, and grab my profile photo from it?

// The trick is to use the text() method instead of the json() method on the stream. This will return a text string of the HTML.

fetch('/about').then(function (response) {
	// The API call was successful!
	return response.text();
}).then(function (html) {
	// This is the HTML from our response as a text string
	console.log(html);
}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});

//below WORK

//fetch the HTML file name based on the current index
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
