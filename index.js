class MovieAPI {
  /**
   * The constructor will initialize a unique id for each of the movies
   * and append it as properties to the object
   * @param moviesJson is an object with properties of different movies.
   */
  constructor (moviesJson) {
    this.moviesJson = moviesJson
    for (let i = 0; i < moviesJson.length; i++) {
      this.moviesJson[i].Id = i
      this.moviesJson[i].rating = Math.floor(Math.random() * 5) + 1
    }
  }

  /**
   * A method that returns all available movie titles.
   * @return allTitles a list of all available movie titles.
   */
  getAllMovieTitles () {
    const allTitles = []
    this.moviesJson.forEach((object, i) => {
      for (const key in object) {
        if (key === 'title') {
          allTitles[i] = object[key]
        }
      }
    })
    return allTitles
  }

  /**
   * A method that returns all available genres
   * @return all available genres from the [movies.json]
   */
  getAllGenres () {
    const allGenres = []
    this.moviesJson.forEach((object) => {
      for (const key in object) {
        if (key === 'genre') {
          if (allGenres.includes(object[key]) === false) {
            allGenres.push(object[key])
          }
        }
      }
    })
    return allGenres
  }

  /**
   * 2. A method that returns movies from a certain genre.
   * @param genre you wish to find.
   * @return returnByGenre a list of all movies from a certain genre.
   */
  getMoviesBySearchedGenre (genre) {
    const returnByGenre = []
    this.moviesJson.forEach((object, i) => {
      for (const key in object) {
        if (String(object[key]).toLowerCase() === genre.toLowerCase()) {
          console.log(object[key])
          returnByGenre.push(moviesJson[i].title)
        }
      }
    })
    return returnByGenre
  }

  /**
   * 3. A method that removes a movie with a certain id (if found).
   * @param movieId id of the movie you with to remove
   */
  removeMovies (movieId) {
    let movieExist = false
    this.moviesJson.forEach((object, i) => {
      for (const key in object) {
        if (key === 'Id') {
          if (object[key] === movieId) {
            movieExist = true
            console.log('Removing...', this.moviesJson[i].title)
            delete this.moviesJson[i]
            const fs = require('fs')
            const jsonString = JSON.stringify(this.moviesJson, null, 1)
            // Please modify the correct file path, when used
            fs.writeFile('./updatedRemoveMovies.json', jsonString, err => {
              if (err) {
                console.log('Error writing file', err)
              } else {
                console.log('Successfully removed the movie of Id number: ', movieId)
              }
            })
          }
        }
      }
    })
    if (movieExist === false)
      console.log('The ID number does not exist\nTry again')
  }

  /**
   * 4. A method that returns the movies with the subtitle and thumb properties filtered out.
   * @return object
   */
  getMoviesWithoutSubThumb () {
    this.moviesJson.forEach((object, i) => {
      for (const key in object) {
        if (key === 'thumb' || key === 'subtitle') {
          delete this.moviesJson[i][key]
          //console.log(this.moviesJson[i][key])
          //console.log(key)
          //return object[key]
        }
      }
    })
    console.log(this.moviesJson)
  }

  /**
   * A method that checks if the @param is string or not
   * @param input
   * @return boolean
   */
  isString (input) {
    return typeof input === 'string' && Object.prototype.toString.call(input) === '[object String]'
  }

  /**
   * 5. A method that returns the movies sorted by name.
   * This method is case NOT case-sensitive
   */
  returnsSortedMovies () {
    let sortedArray = this.getAllMovieTitles().sort(function (a, b) {
      let x = a.toUpperCase(),
        y = b.toUpperCase()
      return x === y ? 0 : x > y ? 1 : -1
    })
    return sortedArray
  }

  /**
   * 6. A method that returns the 2 top rated movies and 2 bottom rated movies.
   * @return topThreeMovies array
   */
  returnTopBottomRatedMovies () {
    let topThreeMovies = []
    // Sorting algo
    topThreeMovies = this.moviesJson.sort((a, b) => {
      return b.rating - a.rating
    })
    // Sorting inverse
    topThreeMovies = topThreeMovies.slice(0, 2)
    let bottomMovies = this.moviesJson.sort((a, b) => {
      return a.rating - b.rating
    })
    bottomMovies = bottomMovies.slice(0, 2)
    topThreeMovies.push(bottomMovies)
    return topThreeMovies
  }

  /**
   * 7. A method that prints out the three top rated movies.
   * @param path to the file you wish to update
   */
  getThreeTopRatedMovieTitles () {
    let topThreeMovies = []
    topThreeMovies = this.moviesJson.sort((a, b) => {
      return b.rating - a.rating
    })
    return topThreeMovies.slice(0, 3)
  }

  /**
   * 8. A method that prints out movies sorted from bottom rated to top rated.
   */
  getSortedMoviesByRating () {
    this.moviesJson.sort((a, b) => {
      return a.rating - b.rating
    })
    return this.moviesJson
  }

  /**
   * This method will check if are properties are filled by the user,
   * when the user append a new movie to the list.
   * @param movieObject is an object
   * @return boolean
   */
  checkIfAllPropertiesAreFilled (movieObject) {
    let propertiesFilled = true
    for (const item in movieObject) {
      // Check if properties are correct type of properties
      if (!Array.isArray(movieObject[item]) && !this.isString(movieObject[item])) {
        propertiesFilled = false
        console.log('Error, you have entered  incorrect integer/string ' +
          '\nPlease change the property of:', movieObject[item])
        return propertiesFilled
      }
      if (((movieObject[item].length)) === 0) {
        console.log('You forgot to add properties to:', item)
        propertiesFilled = false
        return propertiesFilled
      }
    }
    return propertiesFilled
  }

  /**
   * 9. A method that allows the user to add a new movie object to the movie list
   *   supply all properties but the “id” and “rating”. The “id” and “rating”
   *   properties should be added internally by the method.
   * @param movieObject append to the movie object file
   */
  addMovies (movieObject) {
    // Finding the highest id number from previous json file,
    // in case the file is not sorted by id
    let highestId = 0
    if (this.checkIfAllPropertiesAreFilled(movieObject) == true) {
      this.moviesJson.forEach((object, i) => {
        for (const key in object) {
          if (key === 'Id') {
            if (object[key] > highestId) {
              highestId = object[key]
            }
          }
        }
      })
      // Assigning id and rating to the new object, and write to a new updated json file
      movieObject.Id = highestId + 1
      movieObject.rating = Math.floor(Math.random() * 5) + 1
      this.moviesJson[highestId] = movieObject
      const path = './updateMovieListWhenAppend.json'
      this.updateMovieList(path)
      // Adding a delay of 0.5 sec
      //setTimeout(() => { }, 10000);
      return this.moviesJson
    } else {
      return 'Please try again'
    }
  }

  /**
   * 10. A method that returns a movie with a certain id (if found).
   * @param id of the movie you wish to get
   */
  getTitleById (id) {
    let idFound = false
    let title = ''
    //console.log(this.moviesJson)
    this.moviesJson.forEach((object, i) => {
      for (const key in object) {
        if (key === 'Id' && object[key] === id) {
          idFound = true
          console.log(moviesJson[i].title)
          return this.moviesJson[i].title
        }
      }
    })
    if (idFound === false) {
      return 'Unable to find the movie by the Id:', id +
      '\nPlease try again'
    }
  }

  /**
   * 11. A method that changes the title of a movie with a certain id
   * (if found). The updated title should be sent in as an argument
   * to the method.
   * @param id of the movie, of which needs to be renamed
   * @param newName of the title with the id.
   */
  renameMovieTitle (id, newName) {
    let idFound = false
    this.moviesJson.forEach((object, i) => {
      for (const key in object) {
        if (key === 'Id') {
          if (object[key] === id) {
            this.moviesJson[i].title = newName
            console.log(this.moviesJson[i].title)
            idFound = true
          }
          return object[key]
        }
      }
    })
    console.log(this.moviesJson)
    if (idFound === false) {
      console.log('Unable to find the movie by the Id:', id +
        '\nPlease try again')
    }
      // Else, Id is found, update the new [updatedMovies.json]
    // file with the new name
    else {
      this.updateMovieList('./updatedMovies.json')
    }
  }

  /**
   * Update a json file with the latest version from the class
   * @param path to the file you wish to update
   */
  updateMovieList (path) {
    const wf = require('fs')
    const jsonString = JSON.stringify(this.moviesJson, null, 1)
    wf.writeFile(path, jsonString, err => {
      if (err) {
        console.log('Error \nUnable to update the [UpdatedMovie.json] file', err)
      } else {
        console.log('Successfully updated the', path)
      }
    })
  }
}

let moviesJson
let addMovie
// Making sure the json file has the correct format
try {
  moviesJson = require('./data/movies.json')
  addMovie = require('./data/addMovie.json')
} catch (e) {
  console.error('Error, please check if the json file has the correct format\n',
    e.name + ': ' + e.message)
  process.exit(1)
}

const API = new MovieAPI(moviesJson)

// Return all movie titles
//console.log('All movie titles:\n', API.getAllMovieTitles())

// A method to return all available genres
//console.log(API.getAllGenres())

// 2. A method that returns movies from a certain genre.
//console.log('All movie/s from searched genres:\n', API.getMoviesBySearchedGenre('action'))

// 3. A method that removes a movie with a certain id (if found).
//API.removeMovies(12)

// 4. A method that returns the movies with the subtitle and thumb properties filtered out.
//console.log(API.getMoviesWithoutSubThumb())

// 5. A method that returns the movies sorted by name.
//console.log('Sorting Movie by titles:\n', API.returnsSortedTitleMovies())

// 6. A method that returns the 2 top rated movies and 2 bottom rated movies.
//console.log(API.returnTopBottomRatedMovies())

// 7. A method that prints out the three top rated movies.
//console.log(API.getThreeTopRatedMovieTitles())

// 8. A method that prints out movies sorted from bottom rated to top rated.
//console.log(API.getSortedMoviesByRating())

// 9. A method that allows the user to add a new movie object to the movie list
// supply all properties but the “id” and “rating”. The “id” and “rating”
// properties should be added internally by the method.
//console.log(API.addMovies(addMovie)) // This addMovie parameter is a json file in the /.data/addMovie.json

// 10. A method that returns a movie with a certain id (if found).
//console.log("test", API.getTitleById(12))

// 11. A method that changes the title of a movie with a certain id (if found).
// The updated title should be sent in as an argument to the method.
//API.renameMovieTitle(0, 'Bunny')

// Updating the "path".json file
//console.log("updating.. ", API.updateMovieList('./data/updatedMovies.json'))
