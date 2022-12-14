/* eslint-disable max-len */

/*
  Hook this script to index.html
  by adding `<script src="script.js">` just before your closing `</body>` tag
*/

/*
  ## Utility Functions
    Under this comment place any utility functions you need - like an inclusive random number selector
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function injectHTML(list) {
  console.log('fired injectHTML');
  const target = document.querySelector('#restaurant_list');
  target.innerHTML = '';

  const listEl = document.createElement('ol');
  target.appendChild(listEl);
  list.forEach((item) => {
    const el = document.createElement('li');
    el.innerText = item.name;
    listEl.appendChild(el);
  });
  /*

  ## JS and HTML Injection
    There are a bunch of methods to inject text or HTML into a document using JS
    Mainly, they're considered "unsafe" because they can spoof a page pretty easily
    But they're useful for starting to understand how websites work
    the usual ones are element.innerText and element.innerHTML
    Here's an article on the differences if you want to know more:
    https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent#differences_from_innertext

  ## What to do in this function
    - Accept a list of restaurant objects
    - using a .forEach method, inject a list element into your index.html for every element in the list
    - Display the name of that restaurant and what category of food it is
*/
}

function processRestaurants(list) {
  console.log('fired restaurants list');
  const range = [...Array(15).keys()]; // Special notation to create and array of 15 elements
  const newArray = range.map((item) => {
    const index = getRandomIntInclusive(0, list.length);
    return list[index];
  });
  return newArray;

  /*
    ## Process Data Separately From Injecting It
      This function should accept your 1,000 records
      then select 15 random records
      and return an object containing only the restaurant's name, category, and geocoded location
      So we can inject them using the HTML injection function

      You can find the column names by carefully looking at your single returned record
      https://data.princegeorgescountymd.gov/Health/Food-Inspection/umjn-t2iz

    ## What to do in this function:

    - Create an array of 15 empty elements (there are a lot of fun ways to do this, and also very basic ways)
    - using a .map function on that range,
    - Make a list of 15 random restaurants from your list of 100 from your data request
    - Return only their name, category, and location
    - Return the new list of 15 restaurants so we can work on it separately in the HTML injector
  */
}

async function getData() {
  const url = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'; // remote URL! you can test it in your browser
  const data = await fetch(url); // We're using a library that mimics a browser 'fetch' for simplicity
  const json = await data.json(); // the data isn't json until we access it using dot notation
  const reply = json.filter((item) => Boolean(item.geocoded_column_1)).filter((item) => Boolean(item.name));
  return reply;
}

async function mainEvent() {
  /*
        ## Main Event
      */
  // const map = initMap();

  // the async keyword means we can make API requests
  const form = document.querySelector('.main_form'); // get your main form so you can do JS with it
  const submit = document.querySelector('#form_button'); // get a reference to your submit button
  const loadAnimation = document.querySelector('.lds-ellipsis');
  const restoName = document.querySelector('#resto');
  const chartTarget = document.getElementById('#myChart');
  submit.style.display = 'none'; // let your submit button disappear

  
  const chartData = await getData();
  const shapedData = shapeDataForLinceChart(chartData);
  const myChart = initChart(chartTarget, shapedData);
  /* API Data request */


  if (chartData.length > 0) {
    submit.style.display = 'block'; // let's turn the submit button back on by setting it to display as a block when we have data available

    loadAnimation.classList.remove('lds-ellipsis');
    loadAnimation.classList.add('lds-ellipsis_hidden');
  
    let currentArrray;
    form.addEventListener('submit', async (submitEvent) => {
      submitEvent.preventDefault();
      currentList = processRestaurants(chartData);
    

      const restaurants = currentArray.filter((item) => Boolean(item.geocoded_column_1));
      // And this function call will perform the "side effect" of injecting the HTML list for you
      injectHTML(restaurants);
      // markerPlace(currentList, pageMap);
    });

    restoName.addEventListener('input', (event) => {
      if (!currentArray.length) { return; }

      // Debug logging to make sure the code is doing what we think it is
      // console.log(evenet.target.value);
      // console.log(currentArray);

      const restarants = currentArray
        .filter((item) => {
          const lowerCaseName = item.name.toLowerCase();
          const lowerCaseQuery = event.target.value.toLowerCase();
          return lowerCaseName.includes(lowerCaseQuery);
        })
        .filter((item) => Boolean(item.geocoded_column_1));
  
      if (restaurants.lenfth > 0) {
        injectHTML(restuarants);

        markerPlace(restaurants, map);
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API request