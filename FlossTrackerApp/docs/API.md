# API Documentation

# Thread Colors

## :pushpin: Get All Thread Colors

Get all `ThreadColors` in the database.

> **URL:** `/api/thread-color`
>
> **Method:** `GET`

### Successful Response

> **Code:** `200 OK`

**Content Example**

```json
[
    {
        "id": 1,
        "name": "Apple Green Pale",
        "brand_number": "14",
        "hex_value": "D0FBB2",
        "brand": {
            "id": 1,
            "name": "DMC"
        }
    },
    {
        "id": 2,
        "name": "Eggplant",
        "brand_number": "29",
        "hex_value": "674076",
        "brand": {
            "id": 1,
            "name": "DMC"
        }
    }
]
```

### Error Response

> **Code:** `500 INTERNAL SERVER ERROR`

## :pushpin: Get Thread Color by PK

Get a `ThreadColor` by its primary key.

> **URL:** `/api/thread-colors/:pk`
>
> **Method:** `GET`
>
> **URL Params:** `pk=[int]` where `pk` is the `id` of the `ThreadColor`.

### Successful Response

> **Code:** `200 OK`

**Content Example** 

```json
{
    "id": 1,
    "name": "Apple Green Pale",
    "brand_number": "14",
    "hex_value": "D0FBB2",
    "brand": {
        "id": 1,
        "name": "DMC"
    }
}
```

### Error Response

> **Code:** `404 NOT FOUND`

# User Threads

## :pushpin: Get All User Threads

Get all `UserThreads` in the database.

> **URL:** `/api/user-threads`
>
> **Method:** `GET`

### Successful Response

> **Code:** `200 OK`

**Content Example**

The `owner` key corresponds to the `id` of the `User` who owns this `UserThread`.

```json
[
    {
        "id": 11,
        "owner": 2,
        "skeins_owned": "3.00",
        "thread_data": {
            "id": 2,
            "name": "Eggplant",
            "brand_number": "29",
            "hex_value": "674076",
            "brand": {
                "id": 1,
                "name": "DMC"
            }
        }
    }
]
```

### Error Response

> **Code:** `500 INTERNAL SERVER ERROR`

## :pushpin: Create New User Thread

Add a new `UserThread` to the database.

> **URL:** `/api/user-threads/`
>
> **Method:** `POST`

### Example Request Body

```json
{
    "owner": 2,
    "thread_data": 1,
    "skeins_owned": "3.20"
}
```

### Successful Response

> **Code:** `201 CREATED`

### Error Response

> **Code:** `400 BAD REQUEST`

## :pushpin: Get User Thread by PK

Get a `UserThread` by its primary key.

> **URL:** `/api/user-threads/:pk`
>
> **Method:** `GET`
>
> **URL Params:** `pk=[int]` where `pk` is the `id` of the `UserThread`.

### Successful Response

> **Code:** `200 OK`

**Content Example** 

```json
{
    "id": 13,
    "owner": 2,
    "skeins_owned": "1.00",
    "thread_data": {
        "id": 3,
        "name": "Celadon Green Med",
        "brand_number": "163",
        "hex_value": "4D8361",
        "brand": {
            "id": 1,
            "name": "DMC"
        }
    }
}
```

### Error Response

> **Code:** `404 NOT FOUND`

## :pushpin: Update User Thread Skeins Owned

> **URL:** `/api/user-threads/:pk`
>
> **Method:** `PATCH`

### Example Request Body

`action` may be one of `"add"` or `"replace"`. `"add"` increments the existing skeins owned for this color. `"replace"` completely replaces the existing skeins owned for this color.

```json
{
    "skeins_owned": "4.50",
    "action": "replace"
}
```

### Successful Response

> **Code:** `200 OK`

### Error Response

> **Code:** `400 BAD REQUEST`

## :pushpin: Delete User Thread

> **URL:** `/api/user-threads/:pk`
>
> **Method:** `DELETE`
>
> **URL Params:** `pk=[int]` where `pk` is the `id` of the `UserThread`.

### Successful Response

> **Code:** `200 OK`

### Error Response

> **Code:** `404 NOT FOUND`

# Users

## :pushpin: Get All Users

Get all registered `Users`.

> **URL:** `/api/users`
>
> **Method:** `GET`

### Successful Response

> **Code:** `200 OK`

**Content Example**

```json
[
    {
        "id": 1,
        "password": "encrypted-password",
        "last_login": "2022-12-28T19:31:11.298576Z",
        "is_superuser": true,
        "username": "admin",
        "first_name": "Barry",
        "last_name": "Admin",
        "email": "b.admin@quickspool.com",
        "is_staff": true,
        "is_active": true,
        "date_joined": "2022-10-26T18:49:11.865097Z",
        "groups": [],
        "user_permissions": []
    }
]
```

### Error Response

> **Code:** `500 INTERNAL SERVER ERROR`

## :pushpin: Get User by PK

Get a `User` by its primary key.

> **URL:** `/api/users/:pk`
>
> **Method:** `GET`
>
> **URL Params:** `pk=[int]` where `pk` is the `id` of the `User`.

### Successful Response

> **Code:** `200 OK`

**Content Example** 

```json
[
    {
        "id": 1,
        "password": "encrypted-password",
        "last_login": "2022-12-28T19:31:11.298576Z",
        "is_superuser": true,
        "username": "admin",
        "first_name": "Barry",
        "last_name": "Admin",
        "email": "b.admin@quickspool.com",
        "is_staff": true,
        "is_active": true,
        "date_joined": "2022-10-26T18:49:11.865097Z",
        "groups": [],
        "user_permissions": []
    }
]
```

### Error Response

> **Code:** `404 NOT FOUND`

## :pushpin: Get a User's Collection

Get all threads this `User` has or does not have in their collection.

> **URL:** `/api/users/:pk/collection`
> 
> **Method:** `GET`
> 
> **URL Params:** `pk=[int]` where `pk` is the `id` of the `User`.
> 
> **Query Params:** `owned=[str]` where `owned` is either `true`, `false`, or `all`.

### Successful Response (`owned=all`)

> **Code:** `200 OK`

**Content Example**

Note that the `owned` set of threads includes the corresponding skeins owned and `UserThread` id.

```json
{
    "owned": [
        {
            "userthread_id": 11,
            "skeins_owned": "3.00",
            "id": 2,
            "name": "Eggplant",
            "brand_number": "29",
            "hex_value": "674076",
            "brand": {
                "id": 1,
                "name": "DMC"
            }
        },
    ],
    "unowned": [
        {
            "id": 1,
            "name": "Apple Green Pale",
            "brand_number": "14",
            "hex_value": "D0FBB2",
            "brand": {
                "id": 1,
                "name": "DMC"
            }
        }
    ]
}
```

### Successful Response (`owned=false`)

**Content Example**

```json
[
    {
        "id": 1,
        "name": "Apple Green Pale",
        "brand_number": "14",
        "hex_value": "D0FBB2",
        "brand": {
            "id": 1,
            "name": "DMC"
        }
    }
]
```


### Successful Response (`owned=true`)

**Content Example**

```json
[
    {
        "userthread_id": 11,
        "skeins_owned": "3.00",
        "id": 2,
        "name": "Eggplant",
        "brand_number": "29",
        "hex_value": "674076",
        "brand": {
            "id": 1,
            "name": "DMC"
        }
    }
]
```

### Error Response

> **Invalid `owned` query param:** `400 BAD REQUEST`
> 
> **Invalid `:pk` URL param:** `404 NOT FOUND`
