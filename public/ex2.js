// Create an object containing two fields
// name - Your name 
// countriese - An array of countries visited.
//  Each element in the array is an object with two fields:
//  name - name of country visited
//  year - year country was visited
const travel = {
    name: "Asher",
    countries: [
        {
            name: "Australia",
            year: "2019"
        },
        {
            name: "Jamica",
            year: "2018"
        },
        {
            name: "Mexico",
            year: "2018"
        },
        {
            name: "Italy",
            year: "2017"
        },
        {
            name: "Canada",
            year: "2018"
        }
    ]
};

// Send this array as JSON data to the server
const callApi = () => {
    fetch("/api/countries", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(travel)
    })
        .then(response => response.text())
        .then(result => {
            document.getElementById("result").textContent = result;
        })
        .catch(err => {
            console.error(err.message);
        })
};
//Add event listener for button click
//When the button is clicked, call the API
document.getElementById("btn").addEventListener("click", () => {callApi()});