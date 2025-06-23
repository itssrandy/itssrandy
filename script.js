//localStorage.clear();
let score = localStorage.getItem("score")
	? Number(localStorage.getItem("score"))
	: 0;
let energy = localStorage.getItem("energy")
	? Number(localStorage.getItem("energy"))
	: 500;
let fullEnergy = localStorage.getItem("fullEnergy")
	? Number(localStorage.getItem("fullEnergy"))
	: 500;
let percentEnergy;
let countClick = 10; //для теста изменить силу клика
let lvlEnergy = localStorage.getItem("lvlEnergy")
	? Number(localStorage.getItem("lvlEnergy"))
	: 0;
let priceLvlEnergy = localStorage.getItem("priceLvlEnergy")
	? Number(localStorage.getItem("priceLvlEnergy"))
	: 100;
let lvlRestart = localStorage.getItem("lvlRestart")
	? Number(localStorage.getItem("lvlRestart"))
	: 0;

let scoreHTML = document.getElementById("coinScore");
let energyHTML = document.getElementById("energyText");
let energyFillHTML = document.getElementById("energyFill");
let lvlEnergyHTML = document.getElementById("lvlEnergy");
let countEnergyHTML = document.getElementById("countEnergy");
let priceLvlEnergyHTML = document.getElementById("priceLvlEnergy");
let lvlRestartHTML = document.getElementById("lvlRestart");

function dataScreen() {
	// ФУНКЦИЯ ОТРИСОВКИ ВСЕХ ИЗМЕНЯЕМЫХ ЭЛЕМЕНТОВ
	scoreHTML.innerText = score;
	energyHTML.innerText = energy;
	percentEnergy = (energy / fullEnergy) * 100;
	energyFillHTML.style.width = percentEnergy + "%";
}

function dataScreen2() {
	//ФУНКЦИЯ ОТРИСОВКИ ВСЕХ ИЗМЕНЯЕМЫХ ЭЛЕМЕНТОВ "ДОХОД"
	dataScreen();
	lvlEnergyHTML.innerText = lvlEnergy;
	priceLvlEnergyHTML.innerText = priceLvlEnergy;
	lvlRestartHTML.innerHTML = lvlRestart;
}

//ПРОВЕРКА СТАРТОВОЙ СТРАНИЦЫ
const path = window.location.pathname;
if (path.includes("index.html")) {
	dataScreen();
} else if (path.includes("earnings.html")) {
	dataScreen2();
}

const obj = document.getElementById("objectClick");
if (obj) {
	obj.addEventListener("touchstart", clicker);
}

const obj2 = document.getElementById("payLvlEnergy");
if (obj2) {
	obj2.addEventListener("touchstart", payLvlEnergy);
}

const obj3 = document.getElementById("paylvlRestart");
if (obj3) {
	obj3.addEventListener("touchstart", payLvlRestart);
}

function saveData() {
	// ФУНКЦИЯ СОХРАНЕНИЯ ВСЕХ ДАННЫХ В ЛС
	localStorage.setItem("score", score);
	localStorage.setItem("energy", energy);
	localStorage.setItem("fullEnergy", fullEnergy);
	localStorage.setItem("priceLvlEnergy", priceLvlEnergy);
	localStorage.setItem("lvlEnergy", lvlEnergy);
	localStorage.setItem("lvlRestart", lvlRestart);
}

function clicker(event) {
	// ФУНКЦИЯ КЛИКА ПО ПЕРСОНАЖУ
	if (energy >= countClick) {
		score += countClick;
		scoreHTML.innerText = score;

		energy -= countClick;
		energyHTML.innerText = energy;
	}

	percentEnergy = (energy / fullEnergy) * 100;
	energyFillHTML.style.width = percentEnergy + "%";

	saveData();
}

// Функция пополнения энергии
function regenerateEnergy() {
	if (energy < fullEnergy) {
		energy++;
		energyHTML.innerText = energy;
		percentEnergy = (energy / fullEnergy) * 100;
		energyFillHTML.style.width = percentEnergy + "%";
		saveData();
	}
}

function payLvlEnergy() {
	if (score >= priceLvlEnergy) {
		score -= priceLvlEnergy;
		lvlEnergy++;
		priceLvlEnergy *= 3.25;
		fullEnergy += 100;
		scoreHTML.innerHTML = score;
		lvlEnergyHTML.innerText = lvlEnergy;
		priceLvlEnergyHTML.innerText = priceLvlEnergy;
		countEnergyHTML.innerText = 100;
		saveData();
	}
}

function payLvlRestart() {
	if (lvlRestart < 6) {
		lvlRestart++;
		energy = fullEnergy;
		saveData();
		dataScreen2();
	}
}

setInterval(regenerateEnergy, 1000);
