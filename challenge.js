import readline from "readline";

const students = [{
    age: 32,
    examScores: [],
    gender: 'male',
    name: 'edu'
},
{
    age: 29,
    examScores: [],
    gender: 'female',
    name: 'silvia'
}]

const availableMaleNames = ['pepe', 'juan', 'victor', 'Leo', 'francisco', 'carlos'];
const availableFemaleNames = ['cecilia', 'ana', 'luisa', 'silvia', 'isabel', 'virginia'];
const availableGenders = ['male', 'female'];

//Create console interface

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


//Get user input
function getUserOption() {
    return new Promise((resolve, reject) => {
        rl.question('Introduce your option please: ', function(option) {
            rl.pause();
            const parsedOption = parseInt(option)
            resolve(parsedOption);
        })
      });
    }

//Await promise
const userOption = await getUserOption();

//Close Console Interface
rl.close();