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
}
]

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
        const names = []
        for (let student of students) {
            names.push(student.name)
        }

        return names
    } 

    //Option 4
    
    function deleteStudent(){
       const deletedStudent = students.pop()

       return `${deletedStudent.name} has been deleted from the classroom.`
    }
        
    //Option 5
    function removeRandomStudent() {
            //Don't add + 1 because array starts at 0
            const randomIndex = Math.floor(Math.random() * students.length)
            const removedStudent = students.splice(randomIndex,1)
            let output = ""

            if (students.length === 0 && removedStudent === undefined) {
                output = "The are no students left in the classroom."
            } else {
                output = `${removedStudent[randomIndex].name} has been deleted from the classroom.`
            }
            
            return output
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

    //Option 8
    function allGirls() {
        return students.every(student => (
            student.gender === "female"
        ))
    }
    
    //Option 9
    function studentsByAge() {
        return students.filter( student => (
            student.age >=20 && student.age <= 25
        )
        )
    }
    
    //Option 10
    function generateRandomNum(min, max) {
        let difference = max - min;
        
        let randomNum = Math.random();
        
        randomNum = Math.floor( randomNum * difference) + 1;
    
        randomNum = randomNum + min;
    
        return randomNum
    
    }
    function pickRandomFemaleName() {
        const randomIndex = Math.floor(Math.random() * students.length)
        
        return availableFemaleNames[randomIndex]
    }
    function pickRandomMaleName() {
        const randomIndex = Math.floor(Math.random() * students.length)
        
        return availableMaleNames[randomIndex]
    }
    function randomGender() {
        const randomIndex = Math.floor(Math.random() * 2)
        
        return randomIndex === 1 ? "female" : "male"
        
    }
    function createRandomStudent() {
        debugger;
        const gender = randomGender()
       //pick name, age, gender, empty scores
        const newStudent =  {
        age: generateRandomNum(20,50) ,
        examScores: [],
        gender: gender,
        name:gender === "female" ? pickRandomFemaleName() : pickRandomMaleName()
       }    
       return newStudent
    }
    //Option 10
    function addStudent() {
        const newStudent = createRandomStudent()
        // add new student
        students.push({newStudent})
        return `New student: ${newStudent.name} has been added.`

    }

    //Option 11
    function getYoungest() {
        //Compare age of the accumulator and age of the current value
        const theYoungest = students.reduce( (youngest,currentStudent) => {
            if (youngest.age < currentStudent.age) {
                return youngest
            } else {
                return currentStudent
            }
           
        })

        return theYoungest.name
    }

    //Option 12
    function averageAge() {
        const totalAge = students.reduce((accum, currValue) => {
            return accum.age += currValue.age
        })

        return totalAge / students.length
    }

    //Option13

    function averageAgeGirls(){
       const girls = filterGirls()
       const totalAgeGirls = girls.reduce((accum,currValue) => {
            return accum.age += currValue.age
       })
       return totalAgeGirls / girls.length
    }

    //Option 14
    function addNewScore() {
        const scoresAdded = []
        for (let student of students) {
            let score = generateRandomNum(0,10)
            let newScore = student.examScores.push(score)
            scoresAdded.push(student.examScores[newScore - 1])
        }

        return `Scores : ${scoresAdded} have been added to the students.`
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
                output = console.log(nameStudents());
                break;
            case 4:
                output = console.log(deleteStudent());
                break;
            case 5:
                output = console.log(removeRandomStudent());
                break;
            case 6:
                console.log(filterGirls());
                break;
            case 7:
                console.log(`Girls: ${filterGirls().length}\nBoys: ${filterBoys().length}`);
                break;
            case 8:
                console.log(allGirls());
                break;
            case 9:
                console.log(studentsByAge());
                break;
            case 10:
                console.log(addStudent());
                break;
            case 11:
                console.log(getYoungest());
                break;
            case 12:
                console.log(averageAge());
                break;
            case 13:
                console.log(averageAgeGirls());
                break;
            case 14:
                console.log(addNewScore());
                break;
            case 15:
                console.log(nameStudents().sort());
                break;
            default:
                console.log(`You didn't introduce a valid number. Try again please.`);
        }
        
        return output;
    }
        //Close Console Interface
    rl.close();

}

manageStudents();