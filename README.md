# friends-management-api-server
Simple API server to manage friends and subscriber relations

#### User Stories

**1. As a user, I need an API to create a friend connection between two email addresses.**

The API should receive the following JSON request:

```
{
  friends:
    [
      'andy@example.com',
      'john@example.com'
    ]
}
```

The API should return the following JSON response on success:

```
{
  "success": true
}
```

>Proposed route: POST /friends/connection

**2. As a user, I need an API to retrieve the friends list for an email address.**

The API should receive the following JSON request:

```
{
  email: 'andy@example.com'
}
```

The API should return the following JSON response on success:

```
{
  "success": true,
  "friends" :
    [
      'john@example.com'
    ],
  "count" : 1   
}
```

>Proposed route: GET /friends

**3. As a user, I need an API to retrieve the common friends list between two email addresses.**

The API should receive the following JSON request:

```
{
  friends:
    [
      'andy@example.com',
      'john@example.com'
    ]
}
```

The API should return the following JSON response on success:

```
{
  "success": true,
  "friends" :
    [
      'common@example.com'
    ],
  "count" : 1   
}
```

>Proposed route: GET /friends/common

**4. As a user, I need an API to subscribe to updates from an email address.**

Please note that "subscribing to updates" is NOT equivalent to "adding a friend connection".

The API should receive the following JSON request:

```
{
  "requestor": "lisa@example.com",
  "target": "john@example.com"
}
```

The API should return the following JSON response on success:

```
{
  "success": true
}
```

>Proposed route: PUT /subscribers

**5. As a user, I need an API to block updates from an email address.**

Suppose "andy@example.com" blocks "john@example.com":

- if they are connected as friends, then "andy" will no longer receive notifications from "john"
- if they are not connected as friends, then no new friends connection can be added

The API should receive the following JSON request:

```
{
  "requestor": "andy@example.com",
  "target": "john@example.com"
}
```

The API should return the following JSON response on success:

```
{
  "success": true
}
```

>Proposed route: DELETE /subscribers

**6. As a user, I need an API to retrieve all email addresses that can receive updates from an email address.**

Eligibility for receiving updates from i.e. "john@example.com":
- has not blocked updates from "john@example.com", and
- at least one of the following:
  - has a friend connection with "john@example.com"
  - has subscribed to updates from "john@example.com"
  - has been @mentioned in the update

The API should receive the following JSON request:

```
{
  "sender":  "john@example.com",
  "text": "Hello World! kate@example.com"
}
```

The API should return the following JSON response on success:

```
{
  "success": true
  "recipients":
    [
      "lisa@example.com",
      "kate@example.com"
    ]
}
```

>Proposed route: GET /subscribers