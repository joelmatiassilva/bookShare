# Book Share

**Book Share** allows users to connect through their love of reading by sharing their favorite books with friends.

## Table of Contents

1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
1. [Roadmap](#roadmap)
1. [Team](#team)
1. [Contributing](#contributing)

## Requirements

- React
- Node
- mySql

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
bower install
```

### Routes

| Route                       | Method | Controller      | Method                     |
|-----------------------------|--------|-----------------|----------------------------|
| /api/friendRequests         | POST   | User Controller | addFriend                  |
| /api/friends                | GET    | User Controller | viewAllFriends             |
| /api/user/:id               | GET    | User Controller | getUser                    |
| /api/findFriends/:query     | GET    | User Controller | findFriends                |
| /api/friendRequests         | GET    | User Controller | getFriendRequests          |
| /api/acceptFriendRequest    | POST   | User Controller | acceptFriendRequest        |
| /api/deleteFriendRequest    | POST   | User Controller | deleteFriendRequest        |
| /api/friends/:id/books      | GET    | Book Controller | viewFriendBooks            |
| /api/books                  | GET    | Book Controller | addBook                    |
| /api/books                  | DELETE | Book Controller | viewMyShelf                |
| /api/friendsBooks/:id       | GET    | Book Controller | viewFriendBook             |
| /api/friendsBooks/:id       | GET    | Book Controller | deleteBook                 |
| /api/bookRequest            | POST   | Book Controller | makeBookRequest            |
| /api/deleteBookRequest      | POST   | Book Controller | deleteBookRequest          |
| /api/acceptBookRequest      | POST   | Book Controller | acceptBookRequest          |
| /api/myBookRequests         | GET    | Book Controller | getRequestedBooksToFriends |
| /api/myRequestedBooks       | GET    | Book Controller | getRequestedBooksToMe      |
| /api/lentBooks              | GET    | Book Controller | getLentBooks               |
| /api/borrowedBooks          | GET    | Book Controller | getBorrowedBooks           |
| /api/getAllBooksFromFriends | GET    | Book Controller | getAllBooksFromFriends     |
| /api/tradeRequests          | POST   | Book Controller | makeTradeRequest           |
| /api/deleteTradeRequest     | POST   | Book Controller | deleteTradeRequest         |
| /api/acceptTradeRequest     | POST   | Book Controller | acceptTradeRequest         |
| /api/completeTradeRequest   | POST   | Book Controller | completeTradeRequest       |
| /api/viewFriendBooks        | POST   | Book Controller | viewFriendBooks            |


### Roadmap

View the app roadmap [here](https://github.com/CavernousRhinos/bookShare/issues)

## Team

  [Yasu Flores](https://github.com/carlosyasu91)

  [Leorina Baybay](https://github.com/Aniroel)

  [Jonathan Blaising](https://github.com/jblza)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
