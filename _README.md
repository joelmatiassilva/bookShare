# Project Name

> Pithy project description

## Team

  - __Product Owner__: teamMember
  - __Scrum Master__: teamMember
  - __Development Team Members__: teamMember, teamMember

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Some usage instructions

## Requirements

- Node 0.10.x
- Redis 2.6.x
- Postgresql 9.1.x
- etc
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```
# weird one offs
brew install mysql
npm install bluebird
ruby
sass
react-debounce-input
api keys

Create a database and load the tables:

```
mysqld # to start up sql server
mysql -uroot # in a new tab
CREATE DATABASE bookShare_development;
exit
../node_modules/.bin/sequelize db:migrate
```

Helpful commands
```sh
../node_modules/.bin/sequelize help
../node_modules/.bin/sequelize db:migrate # to update SQL schema
../node_modules/.bin/sequelize help:model:create #to create a new table
```

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
