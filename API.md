Комфортнедвиж
================================================================================

## API

### GET
* /users - получаем всех пользователей
* /users/:id - получаем одного пользователя по id
* /flats - получаем все квартиры
* /users/:id - получаем одну квартиру по id

### POST
* /users - записываем пользователя
    * name: { type: String },
    * password: { type: String },
    * role: { type: String }, 
* /flats - записываем пользователя
    * images: { type: Array },
    * cost: { type: Number },
    * cost_m2: { type: Number },
    * currency: { type: String },
    * owner: { type: String },
    * rooms: { type: Number },
    * floor: { type: Number },
    * city: { type: String },
    * address: { type: String },
    * area: { type: String },