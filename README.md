[![Build Status](https://travis-ci.org/abdennour/udacity-readable-api.svg?branch=master)](https://travis-ci.org/abdennour/udacity-readable-api)
[![Coverage Status](https://coveralls.io/repos/github/abdennour/udacity-readable-api/badge.svg?branch=master)](https://coveralls.io/github/abdennour/udacity-readable-api?branch=master)


# Readable API Server

## Installation

Install packages: `npm install`
Launch server: `npm start`
Unless modified in `.env` ,  server will use port 3010.

> **Note**
> Launch server with real-time update: `npm run dev`.

## Deployment

Using `heroku`, it is available remotely.

  https://abdennour-readable-api.herokuapp.com/


## API Documentation
Use an Authorization header to work with your own data:

`fetch(url, { headers: { 'Authorization': 'whatever-email@you-want' }})`

The following endpoints are available:  

# `GET /categories` ✅

  **USAGE:**   
    Get all of the categories available for the app. List is found in categories.js.
    Feel free to extend this list as you desire.    

  **Input**

    N/A

  **Output**

| Parameter   | Type     | Description     | Present    |
| :------------- | :------------- | :------------- | :------------- |
| categories       | Array       |All available categories    | Always Two       |


  **Errors & Problems**

| Type   | Status Code     | Description     |
| :------------- | :------------- | :------------- |
| Unauthorized       | 401       |The request does not include valid "Authorization" header  |
| NotFound       | 404       |No category found  |

# `GET /:category/posts` ✅

  **USAGE:**    
    Get all of the posts for a particular category   

  **Input**

| Parameter   | Type     | Description     | Required?    |
| :------------- | :------------- | :------------- | :------------- |
|  /`:category`       | String       | Category to filter posts with    | No       |

  **Output**

| Parameter   | Type     | Description     | Present?    |
| :------------- | :------------- | :------------- | :------------- |
| posts      | Array       | List of posts filtered by `:category`    | Always       |

  **Errors & Problems**

| Type   | Status Code     | Description     |
| :------------- | :------------- | :------------- |
| Unauthorized       | 401       |The request does not include valid "Authorization" header  |    
| NotFound       | 404       | No post found  |


# `GET /posts`  ✅

  **USAGE:**    
    Get all of the posts. Useful for the main page when no category is selected.  

  **Input**

    N/A

  **Output**

| Parameter   | Type     | Description     | Present?    |
| :------------- | :------------- | :------------- | :------------- |
| posts      | Array       | List of all posts   | Always       |

    **Errors & Problems**

| Type   | Status Code     | Description     |
| :------------- | :------------- | :------------- |
| Unauthorized       | 401       |The request does not include valid "Authorization" header  |    
| NotFound       | 404       | [No post found]  Or [all posts have the deleted flag  & no post where the User is the author] |

# `POST /posts`  ✅

  **USAGE:**  
    Add a new post  

  **Input**

| Parameter   | Type     | Description     | Required?    |
| :------------- | :------------- | :------------- | :------------- |
|  title       | String       | Title of new post    | Yes       |
|  body       | String       | Content of new post   | Yes       |
|  category       | String       | Category of new post  And should be lowercase  | Yes       |


  **Output**

If request is OK, the response includes all info about this new post including:

| Parameter   | Type     | Description     | Present?    |
| :------------- | :------------- | :------------- | :------------- |
| id      | String       | ID    | Always       |
| dateCreated      | String ISO-8601       | Creation Date   | Always       |
| lastUpdated      | String ISO-8601       | Last update Date   | Sometimes       |
| title      | String        | Post's title   | Always       |
| body      | String        | Post's content   | Always       |
| category     | String        | Post's category   | Always       |
| owner     | String        | Post's Author   | Always       |
| voteScore     | Integer        | Net votes the post has received (default: 1)   | Always       |
| upVote     | Integer        | Number of up votes the post has received (default: 1)   | Always       |
| downVote     | Integer        | Number of down votes the post has received (default: 0)   | Always       |
| deleted     | Boolean        | If post is deleted or not (default: undefined)  | Sometimes       |

  **Errors & Problems**

| Type   | Status Code     | Description     |
| :------------- | :------------- | :------------- |
| Unauthorized       | 401       |The request does not include valid "Authorization" header  |    
| Invalid       | 422       | Invalid/Missing inputs (title, body or category)  |
| Too Short |400 | Post's body is too short |


# `GET /posts/:id`  ✅

  **USAGE:**  
    Get the details of a single post

  **Input**

| Parameter   | Type     | Description     | Required?    |
| :------------- | :------------- | :------------- | :------------- |
|  /`:id`       | String       | ID of the requested post    | Yes       |

  **Output**

  | Parameter   | Type     | Description     | Present?    |
  | :------------- | :------------- | :------------- | :------------- |
  | id      | String       | ID    | Always       |
  | dateCreated      | String ISO-8601       | Creation Date   | Always       |
  | lastUpdated      | String ISO-8601       | Last update Date   | Sometimes       |
  | title      | String        | Post's title   | Always       |
  | body      | String        | Post's content   | Always       |
  | category     | String        | Post's category   | Always       |
  | owner     | String        | Post's Author   | Always       |
  | voteScore     | Integer        | Net votes the post has received (default: 1)   | Always       |
  | upVote     | Integer        | Number of up votes the post has received (default: 1)   | Always       |
  | downVote     | Integer        | Number of down votes the post has received (default: 0)   | Always       |
  | deleted     | Boolean        | If post is deleted or not (default: undefined)  | Sometimes       |

  **Errors & Problems**

| Type   | Status Code     | Description     |
| :------------- | :------------- | :------------- |
| Unauthorized       | 401       |The request does not include valid "Authorization" header  |    
| NotFound       | 404       | No post found with ID `/:id` Or the deleted flag is true & the User is not the owner |
| Invalid       | 422       | Inputs are invalid|

# `POST /posts/:id`  ✅

  **USAGE:**  
    Used for voting on a post  

  **Input**

| Parameter   | Type     | Description     | Required?    |
| :------------- | :------------- | :------------- | :------------- |
|  /`:id`       | String       | The ID of post to vote on    | Yes       |
|  option       | String       | Can be either "upVote" or "downVote"    | Yes       |

  **Output**

| Parameter   | Type     | Description     | Present?    |
| :------------- | :------------- | :------------- | :------------- |
| voteScore      | Integer       | The new score after voting    | Always       |

  **Errors & Problems**

| Type   | Status Code     | Description     |
| :------------- | :------------- | :------------- |
| Unauthorized       | 401       |The request does not include valid "Authorization" header  |    
| NotFound       | 404       | No post found with ID `/:id` Or the deleted flag is true & the User is not the owner |
| NotAuthorized      |  403   | Not authroized to vote your own post |
| Conflict      |  409   | Cannot vote up/down twice ( Vote already done) |
| Invalid       | 422       | Inputs are Invalid|

# `PUT /posts/:id` ✅

  **USAGE:**  
    Edit the details of an existing post  

  **Input**

| Parameter   | Type     | Description     | Required?    |
| :------------- | :------------- | :------------- | :------------- |
|  /`:id`       | String       | The ID of post to edit    | Yes       |
|  title       | String       | Updated post title    | No       |
|  body       | String       | Updated post content    | No       |

  **Output**


  If request is OK, the response includes all info about this updated post including:

| Parameter   | Type     | Description     | Present?    |
| :------------- | :------------- | :------------- | :------------- |
| id      | String       | ID    | Always       |
| dateCreated      | String ISO-8601       | Creation Date   | Always       |
| lastUpdated      | String ISO-8601       | Last update Date   | Always       |
| title      | String        | Post's title   | Always       |
| body      | String        | Post's content   | Always       |
| category     | String        | Post's category   | Always       |
| owner     | String        | Post's Author   | Always       |
| voteScore     | Integer        | Net votes the post has received (default: 1)   | Always       |
| upVote     | Integer        | Number of up votes the post has received (default: 1)   | Always       |
| downVote     | Integer        | Number of down votes the post has received (default: 0)   | Always       |
| deleted     | Boolean        | If post is deleted or not (default: undefined)  | Sometimes       |

  **Errors & Problems**

| Type   | Status Code     | Description     |
| :------------- | :------------- | :------------- |
| Unauthorized       | 401       |The request does not include valid "Authorization" header  |    
| Forbidden       | 403      | User is not the owner/author of the post |    
| NotFound       | 404       | No post found with ID `/:id` Or the deleted flag is true & the User is not the owner  |
| Invalid       | 422       | Inputs are Invalid|

# `DELETE /posts/:id` ✅

  **USAGE:**  
    Sets the deleted flag for a post to 'true'.   
    Sets the parentDeleted flag for all child comments to 'true'.

  **Input**

  | Parameter   | Type     | Description     | Required?    |
  | :------------- | :------------- | :------------- | :------------- |
  |  /`:id`       | String       | Post's ID    | Yes       |

  **Output**

     204

  **Errors & Problems**

  | Type   | Status Code     | Description     |
  | :------------- | :------------- | :------------- |
  | Unauthorized       | 401       |The request does not include valid "Authorization" header  |    
  | Forbidden       | 403      | User is not the owner/author of the post |
  | NotFound       | 404       | No post found  |



# `GET /posts/:id/comments`  ✅

  **USAGE:**  
    Get all the comments for a single post  

    **Input**

  | Parameter   | Type     | Description     | Required?    |
  | :------------- | :------------- | :------------- | :------------- |
  |  /`:id`       | String       | Should match a post id in the database  | Yes       |

    **Output**

  | Parameter   | Type     | Description     | Present?    |
  | :------------- | :------------- | :------------- | :------------- |
  | comments      | Array       | array of comments  | Always       |


    **Errors & Problems**

  | Type   | Status Code     | Description     |
  | :------------- | :------------- | :------------- |
  | Unauthorized       | 401       |The request does not include valid "Authorization" header  |    


# `POST /comments`  ✅

  **USAGE:**  
    Add a comment to a post  

  **Input**

  | Parameter   | Type     | Description     | Required?    |
  | :------------- | :------------- | :------------- | :------------- |
  |  body     | String       | comment itself | Yes       |
  |  parentId     | String       | Post ID of comment | Yes       |

  **Output**

  | Parameter   | Type     | Description     | Present?    |
  | :------------- | :------------- | :------------- | :------------- |
  | id      | String       | ID  of comment  | Always       |
  | dateCreated      | String ISO-8601       | Creation Date   | Always       |
  | lastUpdated      | String ISO-8601       | Last update Date   | Sometimes       |
  | body      | String        | Post's content   | Always       |
  | parentId     | String        | its post's ID  | Always       |
  | owner     | String        | Post's Author   | Always       |
  | voteScore     | Integer        | Net votes the post has received (default: 1)   | Always       |
  | upVote     | Integer        | Number of up votes the post has received (default: 1)   | Always       |
  | downVote     | Integer        | Number of down votes the post has received (default: 0)   | Always       |
  | deleted     | Boolean        | If comment is deleted or not (default: undefined)  | Sometimes       |
  | parentDeleted     | Boolean        | If its post is deleted or not (default: undefined)  | Sometimes       |


    **Errors & Problems**

  | Type   | Status Code     | Description     |
  | :------------- | :------------- | :------------- |
  | Unauthorized       | 401       |The request does not include valid "Authorization" header  |    
  | NotFound       | 404       | No post found with ID `parentId` Or the deleted flag is true & the User is not the owner  |
  | NotValid | 422 |  Invalid parameters |
  | Too Short |400 | Comment's body is too short |




# `GET /comments/:id`  ✅

  **USAGE:**  
    Get the details for a single comment  
  **Input**

| Parameter   | Type     | Description     | Required?    |
| :------------- | :------------- | :------------- | :------------- |
|  `/:id`     | String       | comment ID | Yes       |

  **Output**

| Parameter   | Type     | Description     | Present?    |
| :------------- | :------------- | :------------- | :------------- |
| id      | String       | ID  of comment  | Always       |
| dateCreated      | String ISO-8601       | Creation Date   | Always       |
| lastUpdated      | String ISO-8601       | Last update Date   | Always       |
| body      | String        | Post's content   | Always       |
| owner     | String        | Post's Author   | Always       |
| voteScore     | Integer        | Net votes the post has received (default: 1)   | Always       |
| upVote     | Integer        | Number of up votes the post has received (default: 1)   | Always       |
| downVote     | Integer        | Number of down votes the post has received (default: 0)   | Always       |
| deleted     | Boolean        | If comment is deleted or not (default: undefined)  | Sometimes       |
| parentId     | String        | its post's ID  | Always       |
| parentDeleted     | Boolean        | If its post is deleted or not (default: undefined)  | Sometimes       |


  **Errors & Problems**

| Type   | Status Code     | Description     |
| :------------- | :------------- | :------------- |
| Unauthorized       | 401       |The request does not include valid "Authorization" header  |    
| NotFound       | 404       | No comment found with ID `/:id` Or the deleted flag is true & the User is not the owner  |



# `POST /comments/:id`  ✅

  **USAGE:**  
    Used for voting on a comment.  
    **Input**

  | Parameter   | Type     | Description     | Required?    |
  | :------------- | :------------- | :------------- | :------------- |
  |  /`:id`       | String       | The ID of comment to vote on    | Yes       |
  |  option       | String       | Can be either "upVote" or "downVote"    | Yes       |

    **Output**

  | Parameter   | Type     | Description     | Present?    |
  | :------------- | :------------- | :------------- | :------------- |
  | voteScore      | Integer       | The new score after voting    | Always       |

    **Errors & Problems**

  | Type   | Status Code     | Description     |
  | :------------- | :------------- | :------------- |
  | Unauthorized       | 401       |The request does not include valid "Authorization" header  |    
  | NotFound       | 404       | No post found with ID `/:id` Or the deleted flag is true & the User is not the owner |
  | NotAuthorized      |  403   | Not authorized to vote your own comment |
  | Conflict      |  409   | Cannot vote up/down twice ( Vote already done) |
  | Invalid       | 422       | Inputs are Invalid|    

# `PUT /comments/:id` ✅

  **USAGE:**  
    Edit the details of an existing comment  

  **Input**

  | Parameter   | Type     | Description     | Required?    |
  | :------------- | :------------- | :------------- | :------------- |
  |  /`:id`       | String       | The ID of comment to edit    | Yes       |
  |  body       | String       | Updated post content    | No       |

  **Output**


  If request is OK, the response includes all info about this updated comment including:

  | Parameter   | Type     | Description     | Present?    |
  | :------------- | :------------- | :------------- | :------------- |
  | id      | String       | ID  of comment  | Always       |
  | dateCreated      | String ISO-8601       | Creation Date   | Always       |
  | lastUpdated      | String ISO-8601       | Last update Date   | Always       |
  | body      | String        | Post's content   | Always       |
  | owner     | String        | Post's Author   | Always       |
  | voteScore     | Integer        | Net votes the post has received (default: 1)   | Always       |
  | upVote     | Integer        | Number of up votes the post has received (default: 1)   | Always       |
  | downVote     | Integer        | Number of down votes the post has received (default: 0)   | Always       |
  | deleted     | Boolean        | If comment is deleted or not (default: undefined)  | Sometimes       |
  | parentId     | String        | its post's ID  | Always       |
  | parentDeleted     | Boolean        | If its post is deleted or not (default: undefined)  | Sometimes       |

  **Errors & Problems**

  | Type   | Status Code     | Description     |
  | :------------- | :------------- | :------------- |
  | Unauthorized       | 401       |The request does not include valid "Authorization" header  |    
  | Forbidden       | 403      | User is not the owner/author of the comment |    
  | NotFound       | 404       | No comment found with ID `/:id` Or the deleted flag is true & the User is not the owner  |
  | Invalid       | 422       | Inputs are Invalid|


# `DELETE /comments/:id` ✅

  **USAGE:**  
    Sets a comment's deleted flag to 'true'  

  **Input**

| Parameter   | Type     | Description     | Required?    |
| :------------- | :------------- | :------------- | :------------- |
|  /`:id`       | String       | Comment's ID     | Yes       |

  **Output**

     204

    **Errors & Problems**

  | Type   | Status Code     | Description     |
  | :------------- | :------------- | :------------- |
  | Unauthorized       | 401       |The request does not include valid "Authorization" header  |  
  | Forbidden       | 403      | User is not the owner/author of the comment |      
  | NotFound       | 404       | No comment found  |    