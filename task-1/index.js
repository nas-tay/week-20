let heroes;

document.addEventListener("DOMContentLoaded", async function () {
    if (localStorage.getItem("superheroes")) {
        heroes = JSON.parse(localStorage.getItem("superheroes"));
    } else {
        let url = "index.json";
        let response = await fetch(url);
        heroes = await response.json();
    }

    let heroesContent = [];
    let i = 0;
    let btnPrev = document.querySelector("#prev");
    let btnFoll = document.querySelector("#foll");

    for (const hero of heroes) {
        let heroCard =
            `
                <div class="card">
                    <div class="card__top">
                        <div class="inf">
                            <h2>${hero.name}</h2>
                            <div><span class="card__title">Вселенная:</span> <span class="card__info">${hero.universe}</span></div>
                            <div><span class="card__title">Альтер Эго:</span> <pclass="card__info">${hero.alterEgo}</pclass=></div>
                            <div><span class="card__title">Род деятельности:</span> <span class="card__info">${hero.occupation}</span></div>
                            <div><span class="card__title">Друзья:</span> <span class="card__info">${hero.friends}</span></div>
                            <div><span class="card__title">Суперсилы:</span> <span class="card__info">${hero.superpowers}</span></div>
                        </div>
                        <div class="pic">
                            <img src="${hero.src}" alt="${hero.name}" class="card__image">
                        </div>
                    </div>
                    <div>
                        <span class="card__title">Подробнее:</span> <span class="card__info">${hero.description}</span>
                    </div><br/>
                    <div>
                    <label for="rate${i}"> Оцените супергероя:
                        <input type="text" class="rate" id="rate${i}">/10
                    </label>
                    <button id="sendRating" onclick="saveRate(${i})">Сохранить</button>
                    </div>
                    <div class="rateResult">` +
            (hero.rating ? "Ваша оценка: " + hero.rating + "/10" : "") +
            `</div>
                </div>
                `;
        i++;
        heroesContent.push(heroCard);
    }
    i = 0;

    //Создание галереи
    document.querySelector(".cards").innerHTML = heroesContent[i];
    btnPrev.classList.add("hide");

    btnFoll.addEventListener("click", () => {
        btnPrev.classList.remove("hide");
        if (i == heroesContent.length - 2) {
            btnFoll.classList.add("hide");
        }
        if (i == heroesContent.length - 1) return;
        i++;
        document.querySelector(".cards").innerHTML = heroesContent[i];
    });

    btnPrev.addEventListener("click", () => {
        btnFoll.classList.remove("hide");
        if (i == 1) {
            btnPrev.classList.add("hide");
        }
        if (i == 0) return;
        i--;
        document.querySelector(".cards").innerHTML = heroesContent[i];
    });
});

function saveRate(id) {
    let rating = document.querySelector(`#rate${id}`);
    heroes[id].rating = +rating.value;
    localStorage.setItem("superheroes", JSON.stringify(heroes));
    document.querySelector(".rateResult").innerHTML = `Ваша оценка: ${rating.value}/10`;
}
