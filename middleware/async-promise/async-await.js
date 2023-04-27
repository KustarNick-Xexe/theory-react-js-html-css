//async - помечает функцию как асинхронную
//await - ждет результат функций и методов которые
//возращают промис

async function fetchData() {
    const response = await fetch('https://example.com/data');
    const data = await response.json();
    return data;
}

//это позволяет использовать промисы и другие асинхронные операции
//в более прямолинейном стиле, что повышает читаемость

//ошибки могут быть обработаны с помощью try/catch блока
async function fetchData() {
    try { //then() у промиса
      const response = await fetch('https://example.com/data');
      const data = await response.json();
      return { result: data };
    } catch (error) { //catch() у промиса
      console.error('Error fetching data:', error);
    } finally {  //finally() у промиса
        console.log('Fetch operation completed');
    }
}

//можно использовать с Promise.all()
//выполняет каждый запрос
//так нужно заменять запросы через циклы
//ВАЖНО: возвращает новый промис,который разрешается, когда все промисы в 
//массиве разрешаются, или отклоняется,когда хотя бы один из промисов отклоняется
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return { result: data };
}
  
const urls = ['https://example.com/data1', 'https://example.com/data2'];

Promise.all(urls.map(fetchData))
    .then((results) => {
        console.log(results);
})
    .catch((error) => {
        console.error('Error fetching data:', error);
});

//Promise.allSettled() - принимает массив промисов и возвращает новый промис
//который разрешается, когда все промисы в массиве завершены, 
//независимо от того, были они разрешены или отклонены. Результатом 
//разрешенного промиса является массив объектов, каждый из которых 
//представляет один промис в исходном массиве и содержит свойство "status", 
//которое указывает на то, был ли промис разрешен или отклонен, 
//и свойство "value" или "reason", которое содержит соответствующее значение
Promise.allSettled([promise1, promise2, promise3])
  .then(results => console.log(results));
  // [{status: 'fulfilled', value: 1}, 
  //  {status: 'rejected', reason: 'error'}, 
  //  {status: 'fulfilled', value: 3}]

//Promise.any() - принимает массив промисов и возвращает новый промис,
//который разрешается, когда хотя бы один из промисов в массиве разрешается. 
//Если все промисы отклонены, то возвращается отклоненный промис с ошибкой,
//которая содержит массив ошибок всех отклоненных промисов

//можно использовать с Promise.race()
//отправит все запросы, но вернет первый с ответом
//возвращает новый промис, который разрешается или отклоняется, 
//когда первый промис в массиве разрешается или отклоняется
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return { result: data };
}
  
const urls2 = ['https://example.com/data1', 'https://example.com/data2'];
  
Promise.race(urls2.map(fetchData))
    .then((result) => {
        console.log(result);
})
    .catch((error) => {
        console.error('Error fetching data:', error);
});

//Promise.any и Promise.race заключается в том, что первый метод 
//разрешается, когда хотя бы один из промисов разрешается,а второй
//метод разрешается или отклоняется, когда первый промис в массиве 
//разрешается или отклоняется