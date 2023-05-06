//разница null и undefined
//undefined - способ обозначить неизвестные или неопределённые переменные
//в которых ЗНАЧЕНИЯ ВООБЩЕ НЕТ. Поэтому непонятно как с ней работать.
//Получаем при обращение к переменной которая не существует,
//в объявленной переменной без указания начального значения, как 
//результат функции, которая ничего не возвращает, к параметру функции, 
//которым не заданы значения 
//null - способ обозначить намеренное отсутствие значения. Значение есть
//и оно равно null

//разница строгого(===) и нестрогого(==) сравнения
//делаем приведения / не делаем его
//String(что-угодно кроме символов) -> 'что-угодно кроме символов'


//сравнение
//правила сравнения строк
//чем дальше в алфавите символ, тем он больше, но смотрим Unicode.
//если первый символ первой строки больше (меньше), чем первый символ 
//второй строки, то первая строка больше (меньше) второй.
//Так до тех пор, пока не закончатся символы. Закончились у первой
//строки, но сравнение ничего не дало, побеждает длинная строка
//'2' > '10 '2' < '45'


//оператор нулевого слияния ??
//a ?? b - если a определено, то a, если a не определено, то b
//оператор || возвращает первое истинное значение -  null || 1 // 1 
//if (condition) || /* вычисления */ --- (1 < 0) || (x = 5); //x=5
//оператор && возвращает первое ложное значение или последнее, 
//если ничего не найдено. -1 && 2 && null && 3  //null
//if (condition) && /* вычисления */ --- (1 > 0) && (x = 5); //x=5
//оператор ! - приводит к логическому типу и возвращает обратное
//двойное !! приводит к обратному и возвращает исходное в лог. типе