//localStorage.clear();

//ПРОВЕРКА НА ДАТУ СБРОСА ВОССТАНОВЛЕНИЯ ЭНЕРГИИ
let lvlRestartDate = localStorage.getItem("lvlRestartDate");
let today = new Date().toDateString();
let lvlRestart;

if (lvlRestartDate !== today) {
	lvlRestart = 0;
} else {
	lvlRestart = localStorage.getItem("lvlRestart")
		? Number(localStorage.getItem("lvlRestart"))
		: 0;
}

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
let scoreInHour = localStorage.getItem("scoreInHour")
	? Number(localStorage.getItem("scoreInHour"))
	: 0;

let cardData = {
	//КАРТОЧКИ БУСТОВ ТЕСТ
	1: {
		price: 100,
		img: "5395330096556013928.jpg",
		bonus: 100,
		title: "Доширак",
		level: 0,
		k: 2.3,
	},
	2: {
		price: 350,
		img: "5400008011726058205.jpg",
		bonus: 300,
		title: "Пупкорм",
		level: 0,
		k: 2.7,
	},

	3: {
		price: 500,
		img: "5395641043598308226.jpg",
		bonus: 450,
		title: "Пончик",
		level: 0,
		k: 3.1,
	},
	4: {
		price: 1000,
		img: "5397756211912372516.jpg",
		bonus: 900,
		title: "Пицца",
		level: 0,
		k: 5.3,
	},
};
//ПРИ Заходе на страницу восстанавливаем карточки из LS
Object.keys(cardData).forEach(id => {
	const saved = JSON.parse(localStorage.getItem(`card${id}`));
	if (saved) {
		cardData[id] = saved;
	}
});

let scoreHTML = document.getElementById("coinScore");
let energyHTML = document.getElementById("energyText");
let energyFillHTML = document.getElementById("energyFill");
let lvlEnergyHTML = document.getElementById("lvlEnergy");
let countEnergyHTML = document.getElementById("countEnergy");
let priceLvlEnergyHTML = document.getElementById("priceLvlEnergy");
let lvlRestartHTML = document.getElementById("lvlRestart");
let scoreInHourHTML = document.getElementById("inHour");

function dataScreen() {
	// ФУНКЦИЯ ОТРИСОВКИ ВСЕХ ИЗМЕНЯЕМЫХ ЭЛЕМЕНТОВ
	scoreHTML.innerText = Math.floor(score);
	energyHTML.innerText = energy;
	percentEnergy = (energy / fullEnergy) * 100;
	energyFillHTML.style.width = percentEnergy + "%";
	scoreInHourHTML.innerText = scoreInHour;
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

const containersCardPassive = document.querySelectorAll(".cardPassive");
containersCardPassive.forEach(container => {
	const id = container.getAttribute("data-id");
	const data = cardData[id];
	if (data) {
		container.innerHTML = `
<div class="imgCard card2" style="background-image: url(photo/${data.img});
background-size : cover;">
  <p>
     ур. <span id="lvl${id}">${data.level}</span> +
		 </p>
  </div>
  <p class="text2">${data.title}</p>
	`;
	}
});

const dialog = document.getElementById("screenlvlPassive");
containersCardPassive.forEach(container => {
	let touchStart = 0;
	let touchEnd = 0;
	container.addEventListener("touchstart", e => {
		touchStart = e.changedTouches[0].screenX;
	});
	container.addEventListener("touchend", e => {
		touchEnd = e.changedTouches[0].screenX;

		if (Math.abs(touchStart - touchEnd) < 10) {
			const id = container.getAttribute("data-id");
			const data = cardData[id];
			if (data) {
				dialog.innerHTML = `
				 <form method="dialog">
        <button class="closeButton">❌</button>
        <img src="photo/${data.img}" alt="" class="picture">
        <h2>${data.title}</h2>
        <div class="textContainer">
          <p>ур. <span class="lvlPassive">${data.level}</span><p>
          <p><span class="bonusPassive">${data.bonus}</span><p> 
        </div>
        <button class="payLvlCardPassive">
          <p>Купить за <span class="priceLvlCardPassive">${data.price}</span></p>
        </button>
      </form>
				`;
				dialog.showModal();
				dialog
					.querySelector(".payLvlCardPassive")
					.addEventListener("touchstart", e => {
						payLvlCardPassive(id, data);
					});
			}
		}
	});
});

function payLvlCardPassive(id, data) {
	if (score >= data.price) {
		score -= data.price;
		scoreHTML.innerText = Math.floor(score);
		data.level++;
		data.price = Math.floor(data.price * data.k);
		scoreInHour += data.bonus;
		scoreInHourHTML.innerText = scoreInHour;
		data.bonus = Math.floor(data.bonus * data.k);
		document.querySelector(`#lvl${id}`).innerText = data.level;

		localStorage.setItem(`card${id}`, JSON.stringify(data));
		localStorage.setItem("scoreInHour", scoreInHour);
	}
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
	localStorage.setItem("lvlRestartDate", new Date().toDateString());
}

function clicker(event) {
	// ФУНКЦИЯ КЛИКА ПО ПЕРСОНАЖУ
	if (energy >= countClick) {
		score += countClick;
		scoreHTML.innerText = Math.floor(score);

		energy -= countClick;
		energyHTML.innerText = energy;
		const img = event.currentTarget.querySelector("#imgClick");
		img.style.transform = "scale(0.9";
		setTimeout(() => (img.style.transform = ""), 200);

		const plus = document.createElement("div");
		plus.className = "plusOne";
		plus.textContent = `+${countClick}`;

		const panel = event.currentTarget;
		const rect = panel.getBoundingClientRect();
		plus.style.left = `${event.clientX - rect.left}px`;
		plus.style.top = `${event.clientY - rect.top}px`;

		panel.appendChild(plus);
		setTimeout(() => plus.remove(), 3000);
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
	}
	score += scoreInHour / 3600;
	scoreHTML.innerText = Math.floor(score);
	saveData();
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

//ВЫЗОВ ПРИ ЗАКРЫТИИ ИГРЫ
window.addEventListener("beforeunload", () => {
	localStorage.setItem("lastVisit", Date.now());
});

//ВЫЗОВ ПРИ ЗАГРУЗКЕ ИГРЫ
window.addEventListener("load", () => {
	const lastVisit = localStorage.getItem("lastVisit");
	const now = Date.now();
	if (now - lastVisit > 60000 && lastVisit) {
		let hoursAway = (now - parseInt(lastVisit)) / (60 * 60 * 1000);
		if (hoursAway > 3) {
			hoursAway = 3;
		}
		//Начисление монет
		let offlineScore = Math.floor(scoreInHour * hoursAway);
		score += offlineScore;
		scoreHTML.innerText = Math.floor(score);
		alert(`Вы заработали ${offlineScore}`);

		//Начисление энергии
		let offlineEnergy = Math.floor(hoursAway * 3600);
		energy = Math.min(energy + offlineEnergy, fullEnergy);
		energyHTML.innerText = energy;
		energyFillHTML.style.width = percentEnergy + "%";
		scoreInHourHTML.innerText = scoreInHour;
	}
});
