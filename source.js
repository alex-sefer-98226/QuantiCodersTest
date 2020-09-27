//1
const santaFunction = (x, y, z, w) => {

    let arr = []; //Массив с результатами, на случай, если нужно будет вывести комбинации, которые подходят под условие

    const limit = Math.ceil(w / Math.min(x, y, z)) + 1; //Максимальное количество одного предмета в наборе 
    //(берем максимальный вес и делим на минимальный вес предмета (в случае примера - 10))


    const isMatch = (tip) => (tip[0] * x + tip[1] * y + tip[2] * z === w); //Функция для сравнения общего веса одного набора предметов и допустимого веса

    for (let i = 0; i <= limit; i++) {
        for (let j = 0; j <= limit; j++) {
            for (let k = 0; k <= limit; k++) {
                if (isMatch([i, j, k])) arr.push([i, j, k]); //По очереди формируем комбинации, тут же проверяем их на соответсвие - если подходят, то заносим в массив результатов
            }
        }
    }

    console.log(arr.length); //Вывод количества комбинаций, которые подходят

}
santaFunction(10, 15, 25, 40);

//2

const xeroxFunction = (n, x, y) => {

    let totalTime = 0; //Общее время процесса
    let totalCopies = 0; //Общее количество копий

    totalTime += Math.min(x, y); //  Для того, чтобы печатать на втором принтере нужно сделать одну копию 
    //с оригинала (т. к. невозможно с одного оригинала ксерить сразу на двух принтерах)
    //Соответственно, выбираем принтер, который сделает это быстрее - и это время добавляем в общее

    totalCopies++;//Добавляем сделанную копию в общее количество копий

    let xCopies = 0, yCopies = 0; //Счётчики копий для каждого принтера
    let time = 0; //Счётчик времени одновременной работы двух принтеров (без учёта первой копии, необходимой для работы второго принтера)

    for (let i = 1; xCopies + yCopies + 1 < n; i++) { //Каждую итерацию у нас добавляется время по секунде

        if (i % x === 0) { //Если время совпадает с временем печати первого принтера - то добавляем одну копию к счётчику этого принтера 
            //(например, принтер печатает одну копию за две секунды - значит он будет выдавать по одной копии каждые 2,4,6.... секунд)
            xCopies++;
        }

        if (i % y === 0) { //Такая же проверка для второго принтера
            yCopies++;
        }

        time = i; //Устанавливаем затраченное время (работы обеих принтеров) в конце итерации цикла 
    }
    totalTime += time; //Суммируем время, потраченное для первой копии, и для всех остальных
    totalCopies += (xCopies + yCopies);//Суммируем общее количество копий

    console.log("Total time: "+totalTime+"s");//Выводим общее время, общее количество копий, копии первого принтера, копии второго.
    console.log("Copies from the first Xerox: ",xCopies,"Copies from the second Xerox: ",yCopies);
}

xeroxFunction(5, 1, 2);
//3

const employees = [{ "id": 1, "name": "Mildred Carson", "drinks": ["Macchiato"] },
{ "id": 2, "name": "Clifford Brown", "drinks": ["Latte"] },
{ "id": 3, "name": "Kellie Fletcher", "drinks": ["Flat White", "Espresso"] },
{ "id": 4, "name": "Don Parsons", "drinks": ["Espresso"] },
{ "id": 5, "name": "Renee Reynolds", "drinks": ["Cappuccino", "Macchiato"] },
{ "id": 6, "name": "Rudolph Bishop", "drinks": ["Latte", "Macchiato", "Flat White"] },
{ "id": 7, "name": "Geraldine Carpenter", "drinks": ["Espresso"] },
{ "id": 8, "name": "Hilda Jimenez", "drinks": ["Latte", "Macchiato", "Espresso"] },
{ "id": 9, "name": "Pa  uline Roberson", "drinks": ["Espresso"] },
{ "id": 10, "name": "Vanessa Barrett", "drinks": ["Flat White", "Cappuccino", "Latte"] }];

const recipes = {
    "Cappuccino": {
        "coffee": 0.01,
        "water": 0.035,
        "milk": 0.09
    },
    "Espresso": {
        "coffee": 0.01,
        "water": 0.035
    },
    "Latte": {
        "coffee": 0.01,
        "water": 0.035,
        "milk": 0.135
    },
    "Flat White": {
        "coffee": 0.02,
        "water": 0.04,
        "milk": 0.11
    },
    "Macchiato": {
        "coffee": 0.01,
        "water": 0.035,
        "milk": 0.015
    }
};

const prices = {
    "coffee": 3.6,
    "water": 1,
    "milk": 1.5
};


let pricesOfRecipes = {}; //Объект, в котором будут хранится пары вида [название_напитка]:[цена]
for (const recipe in recipes) {

    let value = 0; //Цена напитка

    for (const prop in recipes[recipe]) {
        value += (recipes[recipe][prop] * prices[prop]); //Перебираем каждый ингридиент и ищём его цена в объекте Prices
    }

    pricesOfRecipes = { ...pricesOfRecipes, [recipe]: value.toFixed(3) }; //Добавляем в объект pricesOfRecipes новою пару
};

function getCheaper(drinks) { //Поиск самого дешёвого напитка в предпочтениях каждого сотрудника
    let drinksPrices = drinks.map((item) => pricesOfRecipes[item]); //Преобразовуем массив напитков в массив цен
    return Math.min(...drinksPrices); //Возвращаем минимальную цену (предполагается, что сотрудника можно звать, если хотя бы один из его любимых напитков будет)

}

const employeesById = employees.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {}); //Создаём новый объект, который будет содержать пары вида [id_сотрудника]:[карточка_сотрудника]
const sortedEmployyes = employees
    .map((item) => ({ id: item.id, price: getCheaper(item.drinks) })) // Получаем набор вида [id_сотрудника]:[цена_самого_дешёвого_напитка_из_его_любимых]
    .sort((a, b) => a.price - b.price);//Сортируем по возрастанию

function getPossibleVariants(sortedEmployyes, employeersById, m) {

    let result = []; //Массив результатов
    let value = 0; //Общие затраты на набранных сотрудников, которая потом будет сравниваться с бюджетом
    const limit = sortedEmployyes.length; //Общее количество сотрудников, на случай, если бюджет вместит их всех

    for (let i = 0; i < limit && (value + sortedEmployyes[i].price) <= m; i++) { //итерация цикла начнётся, если 
        //общие затраты + затраты на следующего сотрудника будут меньше либо равны выделенному бюджету
        result.push(sortedEmployyes[i].id); //Добавляем id сотрудника в список приглашённых
        value += sortedEmployyes[i].price; //Добавляем затраты на него в общие затраты
    }

    result = result.map((item) => employeersById[item]); //преобразовуем массив id сотрудника в массив сотрудников

    return result; //возравщаем результат
}

console.log(getPossibleVariants(sortedEmployyes, employeesById, 0.25));



