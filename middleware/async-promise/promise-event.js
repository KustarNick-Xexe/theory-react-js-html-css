//промис - это сущность, которая представляет результат 
//асинхронной операции. Промис умеет выполнять только одно 
//действие - изменить свое состояние и вызвать обработчики, 
//зарегистрированные на такое изменение состояния. 
//С промисом мы можем взаимодействовать только при помощи 
//обработчиков, а значение промиса доступно нам только внутри 
//зарегистрированных через метод .then обработчиков  (() => {}, () => {})

//свой промис. Допустим где-то на сервере или внутри API
const myPromise = new Promise((resolve, reject) => {
    //основная логика
    //и в конце работы алгоритма
    if (isOk) {
      resolve(data); //определяем, когда промис успешно завершится
    } else {
      reject(error); //определяем, когда промис завершится с ошибкой
    }
});

//resolve и reject - обычные-функции (обработчики)
//при создании промис находится в ожидании (pending), 
//а затем может стать исполненным (fulfilled), вернув полученный 
//результат (значение), или отклонённым (rejected), вернув причину отказа
//промис может изменить состояние (выполниться) только один раз, 
//больше он свое состояние не меняет.

//принимает единственный аргумент
//всегда успешный - идет по then
Promise.resolve([9, 16, 25]).then((args) =>
  args.forEach((arg) => console.log(Math.sqrt(arg)))
);

//принимает единственный аргумент
//всегда отклоненный - идет по catch
Promise.reject([9, 16, 25])
  .then((args) => args.forEach((arg) => console.log(Math.sqrt(arg))))
  .catch((args) => args.forEach((arg) => console.log(-Math.sqrt(arg))));

//к этим двум можно применить finally - будет отрабатывать всегда