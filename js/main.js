const inputsCheckbox = document.querySelectorAll('.container-custom-checkbox input'),
    ingredients = document.querySelectorAll('.current-pizza-item'),
    drinks = document.querySelectorAll('.select-drink-item'),
    totalAmount = document.querySelector('.total-amount>.amount'),
    orderBtn = document.querySelector('.typical-btn'),
    modalWindow = document.querySelector('.modal-window'),
    submitBtn = document.querySelector('.modal-window__submit-btn'),
    subject = document.querySelector('.modal-window__subject'),
    ingredientsSpan = document.querySelector('.modal-window__ingredients'),
    drinksSpan = document.querySelector('.modal-window__drinks');


const addIngredients = checkboxes => {
    const checkboxesArray = Array.from(checkboxes),
        ingredientsArray = Array.from(ingredients);
        ingredientsArray.splice(0, 2);

    for(let checkbox of checkboxes) {
        checkbox.addEventListener('click', event => {
            event.target.parentNode.classList.toggle('active');
            const index = checkboxesArray.indexOf(event.target);
            ingredientsArray[index].classList.toggle('active');
            calculateOrder();
        })
    }
}
addIngredients(inputsCheckbox);

const addDrinks = drinksItems => {
    for(let drink of drinksItems) {
        drink.addEventListener('click', event => {
            event.target.parentNode.classList.toggle('active');
            calculateOrder();
        })
    }
}
addDrinks(drinks);

const calculateOrder = () => {
    const orderIngridients = document.querySelectorAll('.container-custom-checkbox.active'),
        orderDrinks = document.querySelectorAll('.select-drink-item.active'),
        startPrice = 100,
        ingredientsPrice = orderIngridients.length * 50,
        drinksPrice = orderDrinks.length * 95;

    totalAmount.innerHTML = `${startPrice + ingredientsPrice + drinksPrice}₴`
}
const prepareWindowModalContent = () => {
    subject.innerHTML = ' ';
    ingredientsSpan.innerHTML = ' ';
    drinksSpan.innerHTML = ' ';

    const addedIngridients = document.querySelectorAll('.container-custom-checkbox.active'),
        addedDrinks = document.querySelectorAll('.select-drink-item.active');

    let ingredientsList = [];
    if(addedIngridients) {
        for (let ingredient of addedIngridients) {
            ingredientsList.push(ingredient.innerText);
        }
    };
    let drinksList = [];
    if(addedDrinks) {
        for (let drink of addedDrinks) {
            drinksList.push(drink.dataset.name);
        }
    };
    const totalIngredients = ingredientsList.join(', ') || 'нет ингердиентов',
        totalDrinks = drinksList.join(', ') || 'нет напитков';
        totalText = `Вы заказали: <br> 
        Пиццу с ингридиентами: '${totalIngredients}' <br> 
        Напитки: '${totalDrinks}' <br> 
        С Вас ${totalAmount.innerHTML}`;

        subject.innerHTML = totalText;
}

calculateOrder();

orderBtn.addEventListener('click', () => {
    modalWindow.classList.remove('none');
    prepareWindowModalContent();
})
window.addEventListener('click', event => {
    if (event.target === modalWindow) {
        modalWindow.classList.add('none');
    }
})
submitBtn.addEventListener('click', () => {
        modalWindow.classList.add('none');
})
