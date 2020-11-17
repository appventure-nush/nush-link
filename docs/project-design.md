# Project Design

## Front end design

Adobe XD Link:

## API

`/createRedirect`

Query Arguements:

- originalURL: The orginal url

- urlalias: The new alias for redirect. If not specified, a random alias will be returned

Response

- originalURL: The orginal url

- urlalias: The new alias for redirect.

`/<urlalias>`

Query Arguments:

- None

Response

- originalURL: The original url

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
