let flags = [];
let names = [];
let correctCountry = "";

fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(data => {
        flags = data.map(country => country.cca2.toLowerCase());
        names = data.map(country => country.name.common);
        generateFlag();
    })
    .catch(error => console.error(error));

function generateFlag() {
    const nameIndex = Math.floor(Math.random() * flags.length);
    correctCountry = names[nameIndex];
    const flag = flags[nameIndex];

    document.getElementById('flag').src = `https://flagcdn.com/h120/${flag}.png`;
    document.getElementById('flag').style = 'block';

    setButton(nameIndex);
}

function setButton(correctIndex) {
    const options = [correctIndex];

    while (options.length < 3) {
        const randomIndex = Math.floor(Math.random() * names.length);
        if (!options.includes(randomIndex)) {
            options.push(randomIndex);
        }
    }

    options.sort(() => Math.random() - 0.5);

    options.forEach((index, i) => {
        const button = document.getElementById(`option${i + 1}`);
        button.textContent = names[index];
        button.onclick = () => checkAnswer(names[index]);
    });
}

function checkAnswer(selectedCountry) {
    if (selectedCountry === correctCountry) {

        generateFlag();
    } else {
        alert("Wrong! Try again.");
    }
}
