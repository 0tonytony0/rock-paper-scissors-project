setTimeout(() => {
    document.body.classList.remove("preload");
  }, 500);

//DOM
const btn_rules= document.querySelector(".rules-btn");
const btn_next= document.querySelector(".next-btn");
const btn_close= document.querySelector(".close-btn");
const rules_module= document.querySelector(".module");

//show and hide rules module [adding and removing show-module class ]

// Show/Hide Rules
btn_rules.addEventListener("click", () => {
    rules_module.classList.toggle("show-module");
});
btn_close.addEventListener("click", () => {
    rules_module.classList.toggle("show-module");
});



// array of objects for later use  
const CHOICES = [
    {
      name: "paper",
      beats: "rock",
    },
    {
      name: "scissors",
      beats: "paper",
    },
    {
      name: "rock",
      beats: "scissors",
    },
  ];

const gameDiv = document.querySelector(".game");
//selecting whole div with game class.
const choiceButtons = document.querySelectorAll(".choice-btn");
//all 3 buttons ie, rock paper and scissors buttons that the user will choose.
const ResultsDiv = document.querySelector(".Results");
// entire div that wraps the results.
const resultDivs = document.querySelectorAll(".result");
//select divs of individual ResultsDiv.

const resultWinner= document.querySelector(".results_winner");
const resultText= document.querySelector(".results_text");

const playAgainBtn = document.querySelector(".play-again");

const scoreNumber1 = document.querySelector(".score_y");
const scoreNumber2 = document.querySelector(".score_c");
let score1=0;
let score2=0;

//Game logic

function PCchoose(){
    const rand=Math.floor(Math.random()*CHOICES.length)
    return CHOICES[rand]
}
//a random no. btw 0,1,2 is stored in const rand
//the object from CHOICES is returned of 'rand' index


choiceButtons.forEach( button => {
    button.addEventListener("click",()=>{
        const choiceName = button.dataset.choice;
        const choice= CHOICES.find((choice) => choice.name === choiceName)
        choose(choice)
    })
})
//here we iterate on each choicebuttons with forEach function
//then for each button we add an event listener 'click'
//on clicking particular button, dataset of that choice is returned as mentioned in html document.
//dataset name ie, rock, paper, scissors is stored in const choiceName.
//then we find the object in CHOICES where choice.name from dataset 'choice' matches choiceName
//store that object in const choice and pass it to function 'choose'


function choose(choice){
    const PCchoice=PCchoose()
    displayResults([choice,PCchoice])
    displayWinner([choice,PCchoice])
}
//CHOICES passed from function PCchoose is stored in PCchoice
//this function holds PCchoice and user's choice 
//they both are passed to the function displayResults

function displayResults(results){      //this 'results' is an array of 2 results
    resultDivs.forEach( (ResultsDiv,idx) => {
        setTimeout(() => {
            ResultsDiv.innerHTML = `    
        <div class="choice ${results[idx].name}">
          <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
        </div>
      `;
        }, idx* 1000 );
    });

    gameDiv.classList.toggle("hidden");    
    ResultsDiv.classList.toggle("hidden");    // once innerhtml is formated and we have to display results, game div is toggled hidden and results div in toggled visible.
}
// in displayResults function array of results is passed
// we have 2 result divs in html . we are looping through both .
// first div will be our result and second div will be pc's result.
// we have to display images of both respectively
// this is done by innerHTML for Results div in html which is the parent div of result divs.
// set timeout is used so that pc's result is displayed 1 sec after user's choice.
//for index 0 timeout will be 0 and for index 1 timeout will be 1000 ie, 1sec.

function displayWinner(results){
    setTimeout(() => {
        const userwins= isWinner(results)
        const pcwins= isWinner(results.reverse())

        if(userwins){
            resultText.innerText='you win'
            resultDivs[0].classList.toggle('winner')
            keepscore1(1)
            btn_next.classList.toggle("show-next");

        }
        else if(pcwins){
            resultText.innerText='you lose'
            resultDivs[1].classList.toggle('winner')
            keepscore2(1)
        }
        else{
            resultText.innerText='Tie up'
        }

        resultWinner.classList.toggle("hidden");
        ResultsDiv.classList.toggle("show-winner");
    }, 1000 );
}

function isWinner(results) {
    return results[0].beats === results[1].name;
}

//play again

playAgainBtn.addEventListener("click", () => {
    gameDiv.classList.toggle("hidden");
    ResultsDiv.classList.toggle("hidden");
  
    resultDivs.forEach((ResultsDiv) => {
      ResultsDiv.innerHTML = "";
      ResultsDiv.classList.remove("winner");
    });
  
    resultText.innerText = "";
    resultWinner.classList.toggle("hidden");
    ResultsDiv.classList.toggle("show-winner");
});

//keep score

function keepscore1(point){
    score1 += point
    scoreNumber1.innerText = score1
}
  
function keepscore2(point){
    score2 += point
    scoreNumber2.innerText = score2
}
  
