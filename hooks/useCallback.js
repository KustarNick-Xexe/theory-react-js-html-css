//при каждом ререндеринге заново создаются переменные
//и функции внутри компонента. Чтобы пользоваться одной
//функцией необходимо использовать useCallback

const handleEvent = useCallback(() => {
    //здесь тело обычной функции
}, [dependency]); //вторым аргументом зависимость

//использование внутри useEffect
useEffect(() => {
    const fetchData = useCallback(async () => {
      const response = await fetch('https://api.example.com/data');
      const data = await response.json();
      setData(data);
    }, []);
  
    fetchData();
}, []);

//когда можно заменить useCallback на useMemo?

