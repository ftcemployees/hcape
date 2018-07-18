# HCAPE
## API Docs
**Currently still in developement**
[API Docs](https://app.swaggerhub.com/apis/Mando75/hcape/1.0.0-oas3)

[Project Requirements](https://docs.google.com/document/d/18ynRCsA3ZmNXLF9phwOLyY4Bm5zrEjFXtocZPq8GJtA/edit?usp=sharing) (Only accessible to BYU-Idaho accounts)


## Project Structure
This project follow traditional MVC structure, although there is currently no View.
### Controllers
Controllers can be found in the routes folder with the following structure:
```
-$apiVersion
      |_$branch1
      |_$branch2
      |_$branch3
      ...
      |_$branchn
```
Each branch should end in a controller for a specific RESTful operation tree. Each controller branch should have a corresponding model folder.


### Models
Models can be found in the resolvers folder. It follows a similar file structure to the Controller folder, with some modifications.
```
-$apiVersion
     |_$model1
        |_connectors
        |_helpers
     |_$model2
        |_connectors
        |_helpers
     ...
     |_$modeln
        |_connectors
        |_helpers      
```
Each model should have a connectors and a helpers folder. Connectors contain functions that interact directly with the database.
Helpers contain functions that deal with logical or processing operations, but do not communicate with the database.

## Current functionality
View the [API Docs](https://app.swaggerhub.com/apis/Mando75/hcape/1.0.0-oas3) for more details about how to interact with these endpoints.
### Authentication
Basic authentication exists for student's and faculty. The application uses jwt with passport.js as the authentication provider. 
You will need to provide a token lifespan and token secret to enable authentication. See [Environmental Variables](#Environmental Variables)
There are two basic endpoints available, account creation, and login. You may want
to create another one for token validation checking. 
### Faculty
I was currently working on this controller when I handed the project over.
#### Survey Data
This controller handles fetching and saving survey metadata from Qualtrics. 
When saving the survey metadata, the survey is attached in a set data 
structure to the teacher's document in MongoDB. When deleting the survey 
metadata, it is removed from the teacher's MongoDB record. 
The survey in Qualtrics is not affected.

####  Survey Feedback
Controller currently under construction. This controller handles creating 
and downloading response export jobs from Qualtrics. The POST request creates
a new job, while the get request checks the export job status. On 
completion, the response export zip can be downloaded by adding the 
/import flag to the url. This will download and unzip the response export 
file into a folder inside the top-level exports directory. What still needs
to be done, is finding a way to link responses to students within the Qualtrics survey. 
A couple ideas: Qualtrics Contact Lists, Recode Values, and Embedded data. Look into the 
Qualtrics API, and learn what you can and cannot do to find the solution. 

## Functions/Objects you should know about
### connectToDb(COLLECTION, DATABASE)
  Use this function to connect to and execute database queries. The function should be a Singleton, 
  so do not close the connection until application close. You may specify which collection and database you are connecting to
  in the parameters. I advise creating enums for the valid Collections and Databases
  within the same mongodb-connection file. This will help eliminate errors. 
  
### mongoId
Transforms a string into a MongoDB ObjectID object. Use this if you are trying to use
a Mongo _id field to perform lookups. 

### axiosQualtrics
Provides an application wide custom axios instance for executing http requests to the
Qualtrics api. You must provide it a domain and an API token for it to function correctly.


  
## Environmental Variables
The following are the environmental variables
needed to run the server application

* DATABASE_URL
    
    The connection string for the MongoDB server in use
* TOKEN_SECRET

    The authentication token secret used to sign auth_tokens
    issued by the application
* QUALTRICS_AUTH_TOKEN

    The authentication token needed to access the Qualtrics API
* QUALTRICS_DOMAIN

    The base Qualtrics domain for Qualtrics API requests. 
    This should include up to the API Version
* AUTH_TOKEN_LIFESPAN
    
    The lifespan of an authentication token issued by the web service
    
* MASTER_SURVEY

    The survey_id of the master template survey which all new surveys will be copied from    
 
    