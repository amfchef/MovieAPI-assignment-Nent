# Tech Trainee Code Test
## Contents
1. [Introduction](#introduction)
2. [MovieAPI Class](#MovieAPI)
3. [Methods](#Methods)
4. [Object data files](#data)
5. [Calling the Class and its methods](#calling)
6. [Exception handler](#Exception)
7. [Conclusion](#Conclusion)
8. [Timeframe](#Timeframe)
9. [Improvements](#Improvements)
## Introduction
This test has been interesting and useful to me. As I haven't coded much in JavaScript before.
It took some extra time to convert all syntax from the previous programme language I usually code in (Python).
The libraries and packages are a bit different, when you have the ability to read and understand a package's docs, it will be more efficient to change language.
But I managed to solve the test in accordance to my experience.
### MovieAPI Class<a name="MovieAPI"></a>
I created this class, and it's constructor, and passed in the `movies.json` file as object.
The constructor iterate through all objects and initialize two properties to each of the movies.
The properties are:
* `Id` This property will be increasing for every iteration, which means that it will be unique.
* `Rating` I would like to remain un-bias, so I will let the random generator give me a number between 1-5.

### Methods
Every method in the `index.js` file have been documented to understand what it does, and this would make it easier for another developer to continue its functionality.
I usually give a method and variables an understandable name for what it does.<br>
I also added other methods, which were not asked in this assignment. Please see below:
* `getAllMovieTitles()` returns all movie titles
* `getAllGenres()` return all available genres (it will remove duplicates)
* `checkIfAllPropertiesAreFilled(object)` return true if all properties in object NOT empty 
* `updateMovieList(path)` will update the movies.json file
### Object data files <a name="data"></a>
These files have been moved to the dir `data/`. As I created multiple json files for each of the method.
This is because I didn't want to change the original file, and each method changed some original properties.
It is easy to change the code, so it will edit the same file.<br>
There is also a `addMovie.json` file, which is a file I enter as parameter for task 9.

### Calling the Class and its methods <a name="calling"></a>
I have commented out the code blocks with calls the methods from the class. Just remove the `//`, if you want to check the methods.
I'm entering the parameters manually, to the methods. I haven't implemented a user input functionality, hence it was not instructed in the method description.

### Exception handler <a name="Exception"></a>
This has been implemented:
* `Try/catch` handler, to make sure json objects is in correct format.
* `case-senitive` handler
* If user input object has all properties filled `checkIfAllPropertiesAreFilled(movieObject)`
* If value === str/int (making sure that the correct type of value is used)
## Conclusion
### Timeframe
I spent approximate 3 hours to complete this test (not including writing documentation). I'm aware that the test only required an hours, but I had to double-check som syntax for JavaScript. 
I finished all the methods that was defined in the test, hence the test only required 6 of them.
But I wanted to finish all of them, as it was a good practice for me. And I don't like to send in the test, before all tasks has been completed.
### Improvements 
* New exception handlers can always be implemented to the code. This will make the code better to the end-user.
I tried to implement most of the exception handlers as I could think of.
* The methods could improve with a `clean code` functionality. Which means, most of the methods repeat themselves. 
I first started to create an `iterateAllObject(keyWord)` method. Which would iterate all objects with a nested loop.
Then it would filter and search for the `keyValue` in objects properties. But the `iterateAllObject()` method did not work for all other methods.
As you can see in the code, many methods have a nested `for loop`. 
I usually don't like to repeat the same code more than twice. But due to the time limit, I didn't had the time to implement this.<br>
Please see below for how first started the Class in the project. Creating two methods below the constructor, to search for either `iterateKeys(keyWord)` or `iterateValue(keyword)`
This would make it possible to create recursive methods.
```
  iterateKeys (keyWord) 
{
  this.moviesJson.forEach((object, i) => {
    for (const key in object) {
      if (key == keyWord) {
        console.log(key)
        return object[key]
      }
    }
  })
}
iterateValues (keyWord) 
{
  this.moviesJson.forEach((object, i) => {
    for (const key in object) {
      if (object[key] == keyWord) {
        console.log(object[key])
        return object[key]
      }
    }
  })
}
```