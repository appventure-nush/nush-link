# Project Design

## Front end design

Adobe XD Link:

## API

`/create`

Query Arguements:

- `original`: The orginal url

- `alias`: The new alias for redirect. If not specified, a random alias will be returned

Response

- `original`: The orginal url

- `alias`: The new alias for redirect.

`/<alias>`

Query Arguments:

- None

Response

- `original`: The original url

## Database

SQL

```sql
CREATE TABLE urlredirect (
    id INT NOT NULL AUTO_INCREMENT,
    originalURL TEXT NOT NULL,
    urlAlias TEXT NOT NULL,
    createdOn DATETIME NOT NULL,
    PRIMARY KEY(ID)
);
```
