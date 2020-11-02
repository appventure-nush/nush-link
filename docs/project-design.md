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
CREATE TABLE urlredict (
    urlID INT NOT NULL,
    originalURL TEXT,
    urlAlias TEXT,
);
```
