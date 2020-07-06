# Комфортнедвиж

## API

### GET
    '/users' - получаем всех пользователей
    '/users/:id' - получаем одного пользователя по id

    '/flats' - получаем все квартиры


### POST
    '/users' - записываем пользователя
        *name: { type: String },*
        *password: { type: String },*
        * role: { type: String }, *