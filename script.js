const find_btn = document.getElementById('find');
find_btn.addEventListener('click', getInfo);
let prev_rand = 0;//character id might be in range of 1 - 10

//main async feth function
async function getInfo() {
    cleanInfo();
    startSpinner();
    try {
        const body = await fetch(`https://www.swapi.tech/api/people/${rand()}`);
        const personObj = await body.json();

        const body2 = await fetch(personObj.result.properties.homeworld);
        const planetObj = await body2.json();
        printInfo(personObj, planetObj);
    } catch (err) {
        console.log(err);
        printError();
    } finally {
        stopSpinner();
    }
}
//function to display personage info on html element
function printInfo(person, planet) {
    const info = document.querySelector('.person_info');
    const properties = person.result.properties;
    const world = planet.result.properties.name;
    info.innerHTML = `
        <p>name: ${properties.name}</p>
        <p>height: ${properties.height}</p>
        <p>gender: ${properties.gender}</p>
        <p>birth year: ${properties.birth_year}</p>
        <p>world: ${world}</p>
    `;
}
//function to display error message on html element
function printError() {
    const info = document.querySelector('.person_info');
    info.innerHTML = `
        <p>oh no. that person isn't available</p>
    `;
}
//function to clean prev message from html element 
function cleanInfo() {
    const info = document.querySelector('.person_info');
    info.innerHTML = ``;
}
//function do display loading spinner
function startSpinner() {
    const div_spinner = document.querySelector('.spinner');
    div_spinner.classList.remove('none');
}
//function do hide loading spinner
function stopSpinner() {
    const div_spinner = document.querySelector('.spinner');
    div_spinner.classList.add('none');
}

//function to get random number 1-10 excluding previous call result
function rand() {
    let rand;
    do {
        rand = Math.floor(Math.random() * 10) + 1;
    } while (rand === prev_rand);

    prev_rand = rand;
    return rand;
}
