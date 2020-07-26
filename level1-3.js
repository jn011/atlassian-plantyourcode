// Solutions for atlassian - https://plantyourcode.com/
/**
 * level 1.1
 * Determines how many rows and columns your garden will
 * need to be closest to a square given a number of seeds.
 *
 * @param {number} seedCount - The number of seeds in your
 * seed packet.
 * @return {array} - [rows, columns] needed for your grid
 * layout (for example [4, 5] represents a 4 row x 5 column
 * grid)
*/

function grid(seedCount) {
    let root = Math.sqrt(seedCount);
    let result = [Math.floor(root), Math.ceil(root)];
    if (result[0] * result[1] < seedCount)
        result[0] += 1;
    return result
}

/**
 * level 1.2
 * The following represents all your plants' locations 
 * in your garden and whether they need water.
 * 
 * const plant_1 = {
 *      gardenLocation: [1, 1],
 *      needsWater: true
 * };
 * 
 * const plant_2 = {
 *      gardenLocation: [1, 2],
 *      needsWater: false
 * };
 * 
 * const plant_3 = {
 *      gardenLocation: [2, 1],
 *      needsWater: false
 * };
 * 
 * const plant_4 = {
 *      gardenLocation: [2, 2],
 *      needsWater: true
 * };
 * 
 * const plants = [plant_1, plant_2, plant_3, plant_4];
*/

/**
 * Write a function that takes in your array of plants and 
 * returns a new array of garden locations you should water.
 *
 * @param {array} plants - Your array of plants.
 * @return {array} - An array of garden locations you should 
 * water.
 */

function whereToWater(plantsArray) {
    let result = [];
    plantsArray.forEach(plant => plant["needsWater"] ? result.push(plant["gardenLocation"]) : false)
    return result;
}

/**
 * Give your plants CO2 by talking to them. Complete the following function that converts any string 
 * into Plant-Latin so that your plants can understand you.
 * NOTES: Plant-Latin has different vowels than we do. Append "tiva" after every vowel "a", 
 * "llia" after every vowel "e", "mus" after every vowel "i", "phylum" after every vowel 
 * "o", and "rea" after every vowel "u". For example: "I love water!" becomes "Imus lophylumvellia wativatelliar!"
 * 
 * 
 * Converts a message into Plant-Latin.
 * @param {string} message - The message to be translated.
 * @return {string} - Translated Plant-Latin message.
 */

function translatePlantLatin(message) {
    const vowels = {
        "a": "tiva",
        "e": "llia",
        "i": "mus",
        "o": "phylum",
        "u": "rea",
    };

    // Answer needs to be in lower case.
    // https://community.developer.atlassian.com/t/solved-a-bug-in-plant-your-code-challenge/39102
    return message.toLowerCase().split("").reduce((acc, curr) => {
        return acc + curr + (vowels[curr] || "")
    }, "");
}


/** Level 2.1
 * Plant your new seeds.This time, write a function that takes an array of seeds and
 * any number of rows and columns to plant your seeds in a grid represented by a 2D array.
 */
function grid(seeds, rows, cols) {
    let result = [];
    let temp = [];

    for (let i = 1; i <= seeds.length; i++) {
        temp.push(seeds[i-1]);
        if (i % cols == 0)
        {
            result.push(temp);
            temp = [];
        } 
    }
    return result;
}


/** Level 2.2
 * A plant needs help.Using the same rules of Plant - Latin as before, 
 * write a function that sorts through the array of plants and returns the one calling out for "help".
 */

/**
 * Converts a message from Plant-Latin.
 * @param {string} message - The Plant-Latin message to be translated.
 * @return {string} - Translated message.
 */

function translate(message) {
    const vowelReplacements = {
        tiva: "a",
        llia: "e",
        mus: "i",
        phylum: "o",
        rea: "u"
    };

    for (let [key, value] of Object.entries(vowelReplacements)) {
        message = message.replace(new RegExp(key, 'g'), '')
    }
    return message;

/**
* The Plant class has an instance property called message
* which is a string. The Plant's message is in Plant-Latin.
* Write a function that takes in an array of Plants, a message
* in human language, and returns all the Plants whose Plant-Latin
* matches the message.
*
* @param {array} plants - Array of Plants to be searched
* @param {string} message - The message in human language to search for
* @return {array} - Array of Plants whose Plant-Latin translates to message
*/

function searchPlantsForMessage(plants, message) {
    let res = plants.filter(x => translate(x.message) == message)
    return res;
}


// Level 2.3
// Some plants need more sun.Write a function that re - orders
// your plants so that their heights don't cast shadows on each 
// other and then prioritizes your plants by their health.
/**
 * The Plant class
 */

var Plant = class Plant {
/**
 * @param {number} height - height in number of inches
 * @param {string} health - string of either "below average", "average", or
 * "above average"
 */
  constructor(height, health) {
    this.height = height;
    this.health = health;
  }
}

/**
 *
 * Write a function that passes in an array of Plants and
 * orders the array from shortest Plant to tallest.
 * If two heights are the same, then order by least healthiest
 * to healthiest.
 *
 * @param {Plant[]} plants - Array of Plants
 * @return {array} - Array of Plants ordered from shortest
 * to tallest.
 */

function reorderPlants(plants) {
    return plants.sort((a, b) => {
        if (a.height < b.height)
            return -1;
        else if (a.height > b.height)
            return 1;
    
        // equal height case
        if (a.health != b.health) {
            if (a.health == "below average") return -1;
            
            if (a.health == "above average") return 1;
        }

        // Plants have the same health and height
        return 0;
    
    });
}

// Level 3.1
// Your new seeds come with very specific instructions. "Please plant me in soil that grew KALE last season."
// You’ll need to connect to an API and get last season’s growing records and then determine which sections of 
// soil your new seeds will thrive in.
/**
 * Determine the locations in your garden layout where a given
 * plant was planted last year based on API data. The garden layout
 * is represented as a 2D array of Plants. Plants are represented
 * as strings by their name.
 *
 * Complete the following function that takes a plant's name,
 * garden layout API endpoint data that retrieves a 2D array of plant names,
 * and returns an array of that plant's locations {row: number, col: number}
 * from last year's garden layout.
 *
 * @param {string} plantName - The name of plant to find in garden layout
 * @param {string} endpointUrl -accept a URL endpoint to retrieve data from.
 *        Will return JSON similar to this example endpoint:
 *        https://https://plantyourcode.com/api/previous-locations
 * @return {array} - Array of locations {row: number, col: number} for each location
*/
async function findPlantLocations(plantName, endpointUrl) {
    let response = await fetch(endpointUrl);

    if (response.ok) {
        let json = await response.json();
        // Make array into JSON array so we can call JSON.parse on it.
        let garden = json["garden-2019"];
        garden = garden.slice(2, -1); // remove trailing '[[' ']'
        let split = garden.split('[');

        garden = '{';
        split.forEach((val, i) => {
            garden = garden + `\"${i}\": [` + val;
        });
        garden = garden + '}';
        garden = garden.replace(/'/g, '"');

        locations = [];
        
        garden = JSON.parse(garden);
        Object.keys(garden).forEach(row => {
            let plants = garden[row];
            plants.forEach((plant, col) => {
                if (plant == plantName)
                    locations.push({
                        "row": row,
                        "col": parseInt(col)
                    });
            });
        });

        return locations;
    }
    else {
        alert(`HTTP Error: ${response.status}`);
    }
}


//  Level 3.2
// Your plants are getting hungry! Each requires a different set of nutrients—luckily you’ve 
// logged this data in your journal.Create a class called CustomPlantFood that extends the base plant
// food class, and then write a function that determines how much food each plant needs.

/**
  * Below is an example of the input plantData. Actual values may vary.
  *
  * {
  *  "tomato": {
  *    "nutrients-required": ['nitrogen', 'calcium', 'magnesium'],
  *    "grams-food-per-plant": 3, // amount of plant food needed in grams per plant
  *    "current-count": 6 // amount of plants currently in your garden
  *  },
  *    "blueberries": {
  *    "nutrients-required": ['nitrogen', 'phosphorus', 'potassium', 'sulfur', 'boron'],
  *    "grams-food-per-plant": 2,
  *    "current-count": 4
  *  },
  *    "chard": {
  *    "nutrients-required": ['phosphorus', 'potassium', 'calcium', 'magnesium', 'cobalt', 'iron'],
  *    "grams-food-per-plant": 2,
  *    "current-count": 8
  *  }
  * }
  */

  var BasePlantFood = class BasePlantFood {
    constructor() {
      this.nutrients = ["nitrogen", "phosphorus", "potassium", "calcium"];
    }
      getAmountNeeded(count, grams) {
      return count * grams;
    }
  }

  /**
   * Create a class CustomPlantFood that extends the BasePlantFood class.
   * It should initialize with its additional nutrients required.
  */

  var CustomPlantFood = class CustomPlantFood extends BasePlantFood {
    constructor(customPlant) {
        super();
        this.gramsFoodPerPlant = customPlant["grams-food-per-plant"];
        this.currentCount = customPlant["current-count"];
        this.addNutrients(customPlant["nutrients-required"]);
    }

    /**
     * Write a function that adds nutrients to the base plant food.
     * Any nutrients already included in the base plant food should
     * not be added twice.
     *
     * @param {array} nutrients - array of strings of nutrient names
    */

    addNutrients(nutrients) {
      nutrients.forEach(item => {
          if (!this.nutrients.includes(item)) {
              this.nutrients.push(item);
          }
      });
    }
  }

  /**
   *
   * Write a function that determines the amount of each custom
   * plant food you'll need based off the provided plantData object.
   * For each type of plant food, create a new instance of the
   * CustomPlantFood class.
   *
   * @return {array} - Array of objects {food: CustomPlantFood, gramsNeeded: number}
  */

  function determineCustomPlantFoods(plantData) {
    let customPlantFoods = [];

    Object.keys(plantData).forEach(key => {
        let customPlant = new CustomPlantFood(plantData[key]);
        customPlantFoods.push({
            "food": customPlant,
            "gramsNeeded": customPlant.getAmountNeeded(customPlant.currentCount, customPlant.gramsFoodPerPlant)
        });
    })

    return customPlantFoods;
  }


// Level 3.3

// Start tracking your new plant conversations. In previous years, your 
// journal entries have been formatted: row-col type: message [number of times spoken].
// For example: 3-2 tomato: hungry i am [43]
// Now, you'd rather see the number of times spoken come first, 
// followed by the type: message and row-col. Complete the following function that restructures your communication log.

/**
 * You've been recording logs of your plants speaking in
 * the following format grid location, message, count.
 * Write a function that takes in a string from your log
 * and properly rearranges so that the count is first,
 * followed by the message, then the grid location.
 *
 * @param {string} log - A string of a log in your journal
 * @return {string} - New rearranged string
*/
function rearrangeLog(log) {
    let gridLocation = log.substring(0, 3)
    let splitBySpace = log.split(" ");
    let type = splitBySpace[1];
    let count = splitBySpace[splitBySpace.length - 1];
    let message = splitBySpace.slice(2, splitBySpace.length - 1);
    const d = " ";
    return [count, type, message.join(d), gridLocation].join(d)
}
