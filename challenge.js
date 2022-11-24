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

const options = ` 
1- Show all students in table format.\n
2- Show the number of students in class on the console.\n
3- Show all the names of the students on the console.\n
4- Delete the last student in the class.\n
5- Delete a student randomly from the class.\n
6- Show by console all the data of the students who are girls.\n
7- Show the number of boys and girls in the class on the console.\n
8- Show true or false if all the students in the class are girls on the console.\n
9- Display the names of students between 20 and 25 years old on the console.\n
10- Add a new student with the following data:\n
- random name.\n
- random age between 20 and 50 years.\n
- random gender.\n
- empty rating list.\n
11- Display the name of the youngest person in the class on the console.\n
12- Display the average age of all the students in the class on the console.\n
13- Display the average age of the girls in the class on the console.\n
14- Add a new score to the students. For each student in the class, we will have to calculate a score at random (number between 0 and 10) and add it to their list of notes.\n
15- Order the array of students alphabetically according to their name.\n
`
async function manageStudents() {
    //Show options
    console.log(options);

    //Invalid input
    let isInvalidInput = false;

    //Create console interface
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });


    //Get user input
    function getUserOption() {
        return new Promise((resolve, reject) => {
            rl.question('Introduce the number of your option, please: ', function (option) {
                rl.pause();
                const parsedOption = parseInt(option);
                resolve(parsedOption);
            })
        });
    }

    while (!isInvalidInput) {
        //Await promise
        const userOption = await getUserOption();

        //Out of the loop if invalid input
        if (userOption <= 0 || userOption > 15) {
            isInvalidInput = true;
            break;
        } else {
            fetchOutput(userOption);
        }
    }
    
    
    //Option 3
    function nameStudents () {
        for (let student of students) {
            student.name;
        }
    } 

    //Option 5
    function removeRandomItem() {
        //Don't add + 1 because array starts at 0
        return students.splice(Math.floor(Math.random * students.length ),1);
    }

    //Option 6

    function filterGirls () {
        return students.filter( student => (
            student.gender === "female"
       ) )
    } 

    //Option 7

    function filterBoys () {
        return students.filter(student => (
            student.gender === "male"
        ))
    }
    
    function fetchOutput(input) {
    
        let output;
        
        switch (input) {
            case 1:
                output = console.table(students);
                break;
            case 2:
                output = console.log(students.length);
                break;
            case 3:
                output = nameStudents();
                break;
            case 4:
                output = console.log(students.pop());
                break;
            case 5:
                output = console.log(removeRandomItem());
                break;
            case 6:
                console.log(filterGirls());
                break;
            case 7:
                console.log(`Girls: ${filterGirls().length}\nBoys: ${filterBoys().length}`);
                break;
            case 8:
                console.log('Oranges are $0.59 a pound.');
                break;
            case 9:
                console.log('Mangoes and papayas are $2.79 a pound.');
                break;
            case 10:
                console.log('Mangoes and papayas are $2.79 a pound.');
                break;
            case 11:
                console.log('Oranges are $0.59 a pound.');
                break;
            case 12:
                console.log('Mangoes and papayas are $2.79 a pound.');
                break;
            case 13:
                console.log('Mangoes and papayas are $2.79 a pound.');
                break;
            case 14:
                console.log('Mangoes and papayas are $2.79 a pound.');
                break;
            case 15:
                console.log('Mangoes and papayas are $2.79 a pound.');
                break;
            default:
                console.log(`You didn't introduce a valid number.`);
        }
        
        return output;
    }
        //Close Console Interface
    rl.close();

}

manageStudents();