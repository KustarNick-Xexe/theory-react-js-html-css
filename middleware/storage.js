//localStorage - хранение данных не ограничено по времени
//у каждого домена он собственный (доступен на любой вкладке)
//в нем не стоит хранить конфиденциальную информацию
//о пользователе
//---до 10 Мбайт

//sessionStorage - хранилище данных до закрытия вкладки
//доступен только из того же окна (хотя домен тот же)
//---до 5 Мбайт

//cookies - до 4 Кбайт и отправляются на сервер и обратно
//идут с HTTP

//ключ и значение должны быть строками
localStorage.setItem(key, value) // сохранить пару ключ/значение;
localStorage.key = value;
localStorage[key] = value;
localStorage.getItem(key) // получить данные по ключу key;
localStorage.key;
localStorage[key];
localStorage.removeItem(key) // удалить данные с ключом key;
localStorage.clear() // удалить все;
localStorage.key(index) // получить ключ на заданной позиции;
localStorage.length // количество элементов в хранилище.
Object.keys() //для получения всех ключей

//event loop - неблокирующее чтение

// Установка cookie
document.cookie = "username=John Doe; expires=Thu, 18 Dec 2022 12:00:00 UTC; path=/";
//запись в document.cookie обновит только упомянутые в ней куки, 
//но при этом не затронет все остальные
document.cookie = "user=John"; // обновляем только куки с именем 'user'

// специальные символы (пробелы), требуется кодирование
let name = "my name";
let value = "John Smith"
// кодирует в my%20name=John%20Smith
document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

//URL-префикс пути, куки будут доступны для страниц под этим путём. 
//должен быть абсолютным. По умолчанию используется текущий путь.
//path=/;

// находясь на странице site.com
// сделаем куки доступным для всех поддоменов *.site.com:
document.cookie = "user=John; domain=site.com"

//дата истечения срока действия куки, когда браузер удалит его автоматически.
// +1 день от текущей даты
let date = new Date(Date.now() + 86400e3);
date = date.toUTCString();
document.cookie = "user=John; expires=" + date;

// куки будет удалено через 1 час == 3600 секунд
document.cookie = "user=John; max-age=3600";

// Получение cookie
const cookies = document.cookie.split(';');
cookies.forEach(cookie => {
  const [name, value] = cookie.split('=');
  console.log(`${name.trim()}=${value.trim()}`);
});

// Удаление cookie
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

// возвращает куки с указанным name,
// или undefined, если ничего не найдено
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {
    options = {
        path: '/',
        // при необходимости добавьте другие значения по умолчанию
        ...options
    };
  
    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }
  
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  
    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }
  
    document.cookie = updatedCookie;
  }
  
  // Пример использования:
  setCookie('user', 'John', {secure: true, 'max-age': 3600});

function deleteCookie(name) {
    setCookie(name, "", {
        'max-age': -1
    })
}