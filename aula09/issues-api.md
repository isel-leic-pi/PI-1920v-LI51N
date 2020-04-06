# Issue tracker (IT)

The base part of the URI path for the issues API is `/it/api`

The following sections describe each API endpoint.

## Obtain all issues

```http
GET /issues
```

- Request:
  - Body: none
- Response:
  - Success:
    - Status code: 200
    - Content-Type: application/json
    - Body example:

    ```json
      {
        "issues": [
          {
            "id": 1,
            "name": "issue1",
            "description": "description of issue 1"
          },
          {
            "id": 2,
            "name": "issue2",
            "description": "description of issue 2"
          },
          ...
        ]
      }
    ```

---

## Obtain a specific issue

```http
GET /issues/:id
```

- Request:
  - Path parameters:
    - id - The issue identifier
  - Body: none
- Response:
  - Success:
    - Status code: 200
    - Content-Type: application/json
    - Body:

    ```json
        {
          "id": 1,
          "name": "issue1",
          "description": "description of issue 1"
          "books": [  
            {
              ...
            }
          ]
        }
    ```

  - Errors:
    - 400 and 404 (see Common Error Handling section)

---

## Create a issue

```http
POST /issues
```

- Request:
  - Content-Type: application/json
  - Body:

```json
  {
    "name": "issue1",
    "description": "description of issue 1"
  },  

```

- Response:
  - Success:
    - Status code: 201
    - Headers:
      - Location: `/b4/api/issues/2`
    - Content-Type: application/json
    - Body example:
 
    ```json
      {
        "status" : "issue create",
        "uri": `/b4/api/issues/2`
      }
    ```
  
---

## Update a issue

```http
PUT /issues/:id
```

- Request:
  - Path parameters:
    - id - The issue identifier
  - Content-Type: application/json
  - Body:

```json
  {
    "name": "issue11",
    "description": "description of issue 11"
  },  

```

- Response:
  - Success:
    - Status code: 200
    - Content-Type: application/json
    - Body example:
 
    ```json
      {
        "status" : "issue updated",
        "uri": `/b4/api/issues/2`
      }
    ```

  - Errors:
    - 400 and 404 (see Common Error Handling section)
  
---

## Delete a issue

```http
DELETE /issues/:id
```

- Request:
  - Path parameters:
    - id - The issue identifier
  - Content-Type: application/json
  - Body: none

- Response:
  - Success:
    - Status code: 200
    - Content-Type: application/json
    - Body example:
 
    ```json
      {
        "status" : "issue deleted",
        "uri": `/b4/api/issues/2`
      }
    ```

  - Errors:
    - 404 (see Common Error Handling section)
  
---

## Associate a Book with a issue

```http
PUT /issues/:id/:book-id
```

- Request:
  - Path parameters:
    - id - The issue identifier
    - book-id - The book identifier
  - Content-Type: application/json
  - Body: none

- Response:
  - Success:
    - Status code: 200
    - Content-Type: application/json
    - Body example:
 
    ```json
      {
        "status" : "Book associated with a issue deleted",
        "uri": `/b4/api/issues/2`
      }
    ```

  - Errors:
    - 404 (see Common Error Handling section)
  
---

## Common Error Handling

This section describes the error handling that is done in every endpoint that produces these erros. This is presented in a separate section to avoid repeating these descriptions wherever it applies.

Every error response has an `application/json` body with the content described for each error.

### 400 - Bad request

Every time the request contains a URI with and invalid QueryString or a Body with invalid Json content for that specific request, the response has a 400 status code with the following sample body:

- Body:

  ```json
      {
        "error": "The request query string is invalid",
        "uri": "/b4/api/issues/?InvalidQueryString",
      }
  ```

### 404 - Not found

Every time the request contains a URI for a resource not managed by the API, the response has a 404 status code with the following sample body.

- Body:

  ```json
      {
        "error": "Resource not found",
        "uri": "/b4/api/issues/notfoundissue",
      }
  ```
