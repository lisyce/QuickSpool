# API Documentation

# Overview

TODO

# Thread Colors

# User Threads

# Users

## :pushpin: Get All Users

Get all registered `Users`.

**URL:** `/api/users`

**Method:** `GET`

### Successful Response

**Code:** `200 OK`

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

**Code:** `500 INTERNAL SERVER ERROR`

## :pushpin: Get User by PK

Get a `User` by its primary key.

**URL:** `/api/users/:pk`

**Method:** `GET`

**URL Params:** `pk=[int]` where `pk` is the `id` of the `User`.

### Successful Response

**Code:** `200 OK`

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

**Code:** `404 NOT FOUND`

## :pushpin: Get a User's Collection

Get all threads this `User` has or does not have in their collection.

**URL:** `/api/users/:pk/collection`

**Method:** `GET`

**URL Params:** `pk=[int]` where `pk` is the `id` of the `User`.

**Query Params:** `owned=[str]` where `owned` is either `true`, `false`, or `all`.

### Successful Response (`owned=all`)

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

### Error Response

**Invalid `owned` query param:** `400 BAD REQUEST`

**Invalid `:pk` URL param:** `404 NOT FOUND`
