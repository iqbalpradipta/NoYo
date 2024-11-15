
## API Reference

#### Register

```http
  POST /register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Name User |
| `email` | `string` | **Required**. email User |
| `password` | `string` | **Required**. password User |

#### Login

```http
  GET /login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. email user for login |
| `password`      | `string` | **Required**. password user for login |

#### Get Profile

```http
  GET /profile
```

#### Get Place (must login)

```http
  GET /user-place
```

#### Get Place by id

```http
  GET /places/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. search place by id |

#### Get All Place

```http
  GET /places
```

#### Get Bookings (must login)

```http
  GET /bookings
```



## Screenshots

![Home Screenshot](https://i.ibb.co.com/j3NtJSd/2.png)

![Place Screenshot](https://i.ibb.co.com/4WX3x4m/1.png)

![Booking Screenshot](https://i.ibb.co.com/x1cBQC6/3.png)


## Tech Stack

**Client:** React, TailwindCSS

**Server:** Node, Express, MongoDB


## Authors

- [Iqbal Pradipta](https://www.github.com/iqbalpradipta)

