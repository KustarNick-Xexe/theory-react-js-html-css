//selector - это отбор. функция, которая принимает
//состояние и возвращает отдельное значение или объект, 
//который представляет из себя преобразованные данные из состояния 

//создание через библиотеку reselect
import { createSelector } from 'reselect';

const selector = state => state.data;

const getFilteredData = createSelector(
  selector,
  data => data.filter(item => item.completed)
);

//где-то в компоненте
const filtered = userSelector(getFilteredData);

//комбинирование селекторов
const userSelector = state => state.user;
const activeUserIdSelector = state => state.activeUserId;

const activeUserSelector = createSelector(
  userSelector,
  activeUserIdSelector,
  (users, activeUserId) => users.find(user => user.id === activeUserId)
);

//или так
//обычная функция 
function getFilteredItems(items, filter) {
    return items.filter((item) => item.name.includes(filter));
  }
//селектор на основе этой функции
const filteredItemsSelector = createSelector(
    (state) => state.items,
    (state) => state.filter,
    getFilteredItems
);

//как создать принимающий аргументы селектор?
//- путем возвращения функции из селектора

//как создать селектор, который зависит от нескольких 
//частей состояния? -  путем комбинирования селекторов

//преимущества имеет использование селекторов:
//помогает избежать повторных вычислений, 
//улучшает производительность и упрощает поддержку кода

//передача аргументов
const getItems = state => state.items;
const getItemById = (state, id) => state.items.find(item => item.id === id);

const getSelectedItem = createSelector(
    //вторым параметром используем функцию, которая получает снаружи значение itemId
    //getItems вернет items для (items, itemId), itemId мы передали при создании
    //itemId вторым аргументом, так как первый в getSelectedItem(state, itemId)
    //является state, то есть (_, itemId) => itemId
    [getItems, (state, itemId) => itemId],
    (items, itemId) => {
        return getItemById(items, itemId);
    }
);

const selectedItem = useSelector(state => getSelectedItem(state, itemId));

