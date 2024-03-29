# React Components Documentation

# Layout

## :pushpin: `<Navbar />`

> **Description:** Site nagivation; applicable to all pages

# Inputs

## :pushpin: `<QuickAdd />`

> **Description:** Provides inputs for thread name and skeins owned, performing a specified action on submit (e.g. posting to the server or updating the screen)
>
> **See also:** [`<ThreadAutofillInput />`](#pushpin-threadautofillinput-)

### props

- **`userId`**: the `id` for the currently signed-in user
- **`onAdd`**: a function defining what should happen upon form submission of this `<QuickAdd />`. Must accept an `event` parameter to take in the submission event. Defaults to posting to the backend to add the thread directly to the user's collection.
- **`allColors`**: an array of `ThreadColors` or `UserThreads` represented as objects that are valid selections for this input.
Example value (note that this is formatted like data returned from the `/api/users/:pk/collection?owned=all` route, just combined into one array):

    ```js
    [
        {
            userthread_id: 11,
            skeins_owned: "3.00",
            id: 2,
            name: "Eggplant",
            brand_number: "29",
            hex_value: "674076",
            brand: {
                id: 1,
                name: "DMC"
            }
        },
        {
            id: 1,
            name: "Apple Green Pale",
            brand_number: "14",
            hex_value: "D0FBB2",
            brand: {
                id: 1,
                name: "DMC"
            }
        }
    ]
    ```

## :pushpin: `<ThreadAutofillInput />`

> **Description:** Autofills and validates an input field for floss colors based on name, brand, etc. Used in the `<QuickAdd />` component. Should not be used independently.
>
> **See also:** [`<QuickAdd />`](#pushpin-quickadd-)

### props

- **`data`**: an array of `ThreadColors` or `UserThreads` represented as objects that are valid selections for this input.
Example value (note that this is formatted like data returned from the `/api/users/:pk/collection?owned=all` route, just combined into one array): 

    ```js
    [
        {
            userthread_id: 11,
            skeins_owned: "3.00",
            id: 2,
            name: "Eggplant",
            brand_number: "29",
            hex_value: "674076",
            brand: {
                id: 1,
                name: "DMC"
            }
        },
        {
            id: 1,
            name: "Apple Green Pale",
            brand_number: "14",
            hex_value: "D0FBB2",
            brand: {
                id: 1,
                name: "DMC"
            }
        }
    ]
    ```

# Thread Cards

## :pushpin: `<ThreadCard />`

> **Description:** Displays a `ThreadColor` / quantity pairing with a swatch of the color.
>
> **See also:** [`<ThreadCardList />`](#pushpin-threadcardlist-)

### props

- **`useModal`**: Whether or not this `<ThreadCard />` should have a popup modal to allow for editing and deleting the thread. Should be `true` or `false`, defaults to `true`.
- **`threadColor`**: An object containing data about this thread. 
Example value (note that this is formatted like data returned from the `/api/users/:pk/collection?owned=true` route):

    ```js
    {
        userthread_id: 11,
        skeins_owned: "3.00",
        id: 2,
        name: "Eggplant",
        brand_number: "29",
        hex_value: "674076",
        brand: {
            id: 1,
            name: "DMC"
        }
    }
    ```

## :pushpin: `<LoadingThreadCard />`

> **Description:** A placeholder for a normal `<ThreadCard />` when the data to populate it with is not fully loaded.
>
> **See also:** [`<ThreadCard />`](#pushpin-threadcard-)

### props

- **`headingWidth`**: A CSS value for the `width` property of the placeholder heading
Example value: `50%`

## :pushpin: `<ThreadCardList />`

> **Description:** Displays a list of `<ThreadCard />` components.
>
> **See also:** [`<ThreadCard />`](#pushpin-threadcard-)

### props

- **`useModal`**: Whether or not the `<ThreadCard />`s in this list should have a popup modal to allow for editing and deleting the thread. Should be `true` or `false`, defaults to `true`.
- **`threadColors`**: an array of objects containing data about every thread to add to this list. 
Example value (note that this is formatted like data returned from the `/api/users/:pk/collection?owned=true` route):

    ```js
    {
        userthread_id: 11,
        skeins_owned: "3.00",
        id: 2,
        name: "Eggplant",
        brand_number: "29",
        hex_value: "674076",
        brand: {
            id: 1,
            name: "DMC"
        }
    }
    ```
