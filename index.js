// The Api key stored in the variable accessKey

const accessKey = "KCvtZvwNZ4BxWeWau85bGs9bfWlBwuzLCnGRW0DXZ70";
// we re getting access to all the elements
const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreButtonEl = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = searchInputEl.value;// To have access to the input
  // To do request to api, url to be dinamic                                                                                                                        
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;// we do have 3 variables : page,inputData,and accessKey

  const response = await fetch(url);// to fetch the response here, await method is going to wait till we get the result from api before going into the next line
  const data = await response.json();// we receive data from api
  if (page === 1) {
    searchResultsEl.innerHTML = "";// if the page is 1, we wanna make the search result empty
  }

  const results = data.results;// data to show 10 results

  results.map((result) => { // method map used to look through each results(10)
    // we manipulate the div by creating element div with the class of search result
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");// creating element img
    image.src = result.urls.small;// get image
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");// creating element anchor tag a
    imageLink.href = result.links.html;
    imageLink.target = "_blank";// to be opened inside new page
    imageLink.textContent = result.alt_description;
// we have created the wrap, image and imagelink we would like to append to the existing one, inside the div
    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    // we append a child result image wrapper into search result
    searchResultsEl.appendChild(imageWrapper);
  });
// we wanna add a page number
  page++;

  if (page > 1) {
    showMoreButtonEl.style.display = "block";//if page is above 1, shore more results
  }
}
// when a form is submitted ,we re wanna trigger a function
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;// when submit the form, we wanna set the page to be 1
  searchImages();
});
// we re adding the Eventlistener to the button, the event we wanna listen into is click
// By clicking the button , we trigger a function searchImages
showMoreButtonEl.addEventListener("click", () => {
  searchImages();
});