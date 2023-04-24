// 15 сложных вопросов про createReducer в Redux Toolkit

//createAction - это тот же actionCreator
const actionCreator = createAction('ТИП_ВОЗДЕЙСТВИЯ')
actionCreator({ data: 'some data' }) //добавляем payload
//функция создаст action { type: 'ТИП_ВОЗДЕЙСТВИЯ', 
//payload: { data: 'some data' }}
 
//actionCreator.toString() и actionCreator.type 
//вернут 'ТИП_ВОЗДЕЙСТВИЯ'

//в createReducer они вызовутся автоматически
builder.addCase(actionCreator, (state, action) => {})
//вполне допустимо
builder.addCase(actionCreator.type, (state, action) => {})

//однако при создании редуктора как в Redux, автоматического
//вызова не будет. Нужно указать явно
const reducer = (state = {}, action) => {
    switch(action.type) {
        case actionCreator.toString(): {
            return 'новый стейт'
        }
        case actionCreator.type: {
            return 'новый стейт'
        }
    }
};