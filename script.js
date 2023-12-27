var usernameInput = document.getElementById('username');
var emailInput = document.getElementById('email');
var passwordInput = document.getElementById('password');
var confirmPasswordInput = document.getElementById('confirm-password');
var registerButton = document.getElementById('register-button');

document.addEventListener('DOMContentLoaded', function () {
    
    usernameInput.addEventListener('input', Check);
    emailInput.addEventListener('input', Check);
    passwordInput.addEventListener('input', Check);
    confirmPasswordInput.addEventListener('input', Check);

    registerButton.style.backgroundColor = 'gray';
    registerButton.disabled = true;
    registerButton.style.cursor = 'default';
});

function Check(){
    if(usernameInput.value != '' && emailInput.value != '' && passwordInput.value != '' && confirmPasswordInput.value != ''){
        registerButton.style.backgroundColor = '#4caf50';
        registerButton.disabled = false;
        registerButton.style.cursor = 'pointer';
    }
    else{
        registerButton.style.backgroundColor = 'gray';
        registerButton.disabled = true;
        registerButton.style.cursor = 'default';
    }
}

function toggleMobileMenu(){
    var mobileMenu = document.querySelector('.mobile-menu');
    mobileMenu.style.top = (mobileMenu.style.top === '0px') ? '-100%' : '0px';
  }

  // Код для проверок на регистрацию

  async function validateForm(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение отправки формы
  
    var usernameError = document.getElementById('username-error');
    var emailError = document.getElementById('email-error');
    var passwordError = document.getElementById('password-error');
    var confirmPasswordError = document.getElementById('confirm-password-error');
  
    // Очищаем сообщения об ошибках
    usernameError.innerHTML = '';
    emailError.innerHTML = '';
    passwordError.innerHTML = '';
    confirmPasswordError.innerHTML = '';
  
    // Создаем массив для хранения сообщений об ошибках
    const errors = [];
  
    // Проверка имени
    if (!/^[а-яА-ЯёЁa-zA-Z\s\-]+$/.test(usernameInput.value) || usernameInput.value.length < 2 || usernameInput.value.length > 14) {
      errors.push('Введите корректное имя');
      usernameInput.style.borderColor = 'red';
    }
  
    // Проверка email
    if (!/^[a-zA-Z0-9.\-_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailInput.value) || emailInput.value.length < 5 || emailInput.value.length > 50) {
      errors.push('Некорректный e-mail');
      emailInput.style.borderColor = 'red';
    }
  
    // Проверка пароля
    if (!/^[а-яА-ЯёЁa-zA-Z0-9\s\-_!@#$%^&*()+=`~{}[\]:;<>,.?/\\]+$/.test(passwordInput.value) || passwordInput.value.length < 6 || passwordInput.value.length > 50) {
      errors.push('Некорректный пароль');
      passwordInput.style.borderColor = 'red';
    }
  
    // Проверка совпадения паролей
    if (passwordInput.value !== confirmPasswordInput.value) {
      errors.push('Пароли не совпадают');
      confirmPasswordInput.style.borderColor = 'red';
    }
  
    // Проверка уникальности email (используя локальное хранилище)
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const isEmailTaken = storedUsers.some(user => user.email === emailInput.value);
    if (isEmailTaken) {
      errors.push('Такой пользователь уже существует');
    }
  
    // Если есть ошибки, выводим их в соответствующие div
    if (errors.length > 0) {
      errors.forEach(error => {
        switch (error) {
          case 'Введите корректное имя':
            usernameError.innerHTML = error;
            break;
          case 'Некорректный e-mail':
            emailError.innerHTML = error;
            break;
          case 'Некорректный пароль':
            passwordError.innerHTML = error;
            break;
          case 'Пароли не совпадают':
            confirmPasswordError.innerHTML = error;
            break;
          case 'Такой пользователь уже существует':
            emailError.innerHTML = error; // Используем emailError, так как сообщение об ошибке для email
            break;
        }
      });

        

      return false;
    }

      // Если ошибок нет, делаем кнопку активной
        document.getElementById('register-button').disabled = false;
  
    // Добавление нового пользователя в локальное хранилище
    const newUser = { username: usernameInput.value, email: emailInput.value, password: passwordInput.value };
    storedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(storedUsers));
  
    // Если все условия соблюдены, показываем сообщение об успешной регистрации
    var successMessage = document.getElementById('success-message');
    successMessage.innerHTML = 'Регистрация успешна!';
    successMessage.style.display = 'block';
  
    return true;
  }


// Объявление массива cartItems
let cartItems = [];
let cartCount = 0;

// Функция для добавления товара в корзину
function addToCart(productId) {
  const product = document.querySelector(`[data-product-id="${productId}"]`);
  const productName = product.querySelector('.product-title').innerText;
  const productPrice = product.querySelector('.product-price').innerText;
  const productImageSrc = product.querySelector('.product-image').src;

  cartItems.push({
    name: productName,
    price: productPrice,
    image: productImageSrc
  });
  cartCount++;

  updateCartUI();
}

// Функция для обновления интерфейса корзины
function updateCartUI() {
  const cartCountElement = document.getElementById('cart-count');
  cartCountElement.innerText = cartCount;

  // Отображение содержимого корзины во всплывающем окне
  const cartPopup = document.getElementById('cart-popup');
  const cartItemsList = document.getElementById('cart-items-list');
  cartItemsList.innerHTML = ''; // Очистка текущего списка

  cartItems.forEach(item => {
    const listItem = document.createElement('li');
    
    // Создаем элемент изображения
    const imageElement = document.createElement('img');
    imageElement.src = item.image;
    imageElement.alt = item.name;
    imageElement.classList.add('cart-item-image');
    listItem.appendChild(imageElement);

    // Создаем элемент с информацией о товаре
    const itemInfo = document.createElement('div');
    itemInfo.classList.add('cart-item-info');

    const itemName = document.createElement('p');
    itemName.innerText = item.name;
    itemInfo.appendChild(itemName);

    const itemPrice = document.createElement('p');
    itemPrice.innerText = item.price;
    itemInfo.appendChild(itemPrice);

    listItem.appendChild(itemInfo);
    
    cartItemsList.appendChild(listItem);
  });

  // Открываем всплывающее окно
  cartPopup.style.display = 'block';
}

function closeCart() {
  const cartPopup = document.getElementById('cart-popup');
  cartPopup.style.display = 'none';
}
function openCart() {
  const cartPopup = document.getElementById('cart-popup');
  cartPopup.style.display = 'block';
}