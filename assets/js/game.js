//Function to generate a random numeric value
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    
    return value;
};

// function to set name, if invalid name, keep prompting.
var getPlayerName = function() {
    var name = "";
    while (name ==="" || name === null) {
        name = prompt("What is your robot's name?");
    }
    console.log("Your robot's name is " + name);
    return name;
};

//Game information / Variables
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10, 
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function () {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function () {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    } 
};
 
var enemyInfo = [
    {
        name: "Roberto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];
//var enemyNames = ['Roberto', 'Amy Android', 'Robo Trumble']; //You can use "" or ''- Don't need this since created under object, but keeping in code in case I need to look back at arrays.  

var fightOrSkip = function() {
    //Ask player if they want to fight or skip
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    //Conditional recursive function call
    if (promptFight === "" || promptFight === null) { //You could also say if (!promptFight)- this refers to Falsy values
        window.alert("You need to provide a valid answer. Please try again. ");
        return fightOrSkip();
    }
    
    //Make sure they entered information
    console.log( playerInfo.name + " chose to " + promptFight);
    
    //if player picks "skip" confirm and then top the loop
    promptFight = promptFight.toLowerCase();
    if (promptFight === "skip" ) {
        // confirm players wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
    
        //if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            //subtract money from playerInfo.money for skipping
            playerInfo.money = Math.max(0, playerInfo.money -10);
            
            //return true if player wants to leave
            return true;
        }
    }    
};


var fight = function (enemy) {
    //keep track of who goes first, enemy or player, randomly assign order
    var isPlayerTurn = true;
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }
   

    // repeat and execute as long as the enemy robot is alive
    while (playerInfo.health > 0 && enemy.health > 0 ) {
        if(isPlayerTurn) {
            //ask player if they'd like to fight or skip using the fightOrSkip function()
            if (fightOrSkip()) {
                //if true, leave fight breaking loop
                break;
            } 
        }
       
        //generate random damage value based on player's attack power
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
        console.log("enemy damage random number is " + damage);
        
        //remove enemy's health by subtracting the amoun we set in the damage variable
        enemy.health = Math.max(0, enemy.health - damage);
        console.log(
            playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
        );

        //check enemy's health
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died!");
            console.log(enemy.name + " has died!"); //I put that in to be able to see in the console what is going on
            
            // award player money for winning
            playerInfo.money = playerInfo.money + 20;
            console.log("playerInfo.money" + playerInfo.money);

            // leave while() loop since enemy is dead
            break;
        }

        else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }

        //remove player's health by subtracting the amount set in the enemyAttack variable 
        playerInfo.health = Math.max(0, playerInfo.health - damage);

        //Log a resulting message to the console so that we know it worked. 
        console.log (
            enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining." 
        );

        console.log(playerInfo);
        console.log(enemyInfo);

        //check player's health
        if (playerInfo.health <= 0 ) {
            window.alert(playerInfo.name + " has died! GAME OVER");
            //leave while() loop is player is dead
            break;
        }
        else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
        //switch turn order for the next round
        isPlayerTurn = !isPlayerTurn;
        console.log(isPlayerTurn);
    }
};

var startGame = function() {
    //reset player stats
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            //Let player know what round they are on, array starts at 0, so plus one to equal rounds 1-3
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1) );
         
           
            //pick new enemy to fight based on index of enemy.names array
            var pickedEnemyObj = enemyInfo[i];
           
           //reset enemy.health before starting NEW fight
            pickedEnemyObj.health =randomNumber(40, 60);
                       
            //use debugger to pause script from running and check what's going on at that moment in the code
            //debugger
    
            // pass the pickedEnemyObj variable's value into the fight function, where it will assume the value of the enemy.name parameter
            fight(pickedEnemyObj);

            //if we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length -1) {
                //ask if player wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round");

                //if yes, take them to the store() function 
                if (storeConfirm) {
                    shop();
                }
            }
        }
    
    }
    //after the loop ends, player is either out of health or enemies to fight so run endGame function
    endGame();
};

// Function to end the entire game 
var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");

    //check localStoarge for high score, if it's not there, use 0
    var highScore = localStorage.getItem("highscore");
    if (highScore === null) {
        highScore = 0;
    }

    //if player has more money than the highscore, player has a new high score
    if (playerInfo.money > highScore) {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);

        alert(playerInfo.name + " now has the high score of " + playerInfo.money);
    }
    else {
        window.alert(playerInfo.name + " did not beat the high score of " + highScore + ".  Maybe next time!");
    }

    //ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        //restart the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiator! Come back soon!");
    }
};

var shop = function() {
    console.log("entered the shop");
    // Ask player what they would like to do
    var shopOptionPrompt = window.prompt (
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
    );
    shopOptionPrompt = parseInt(shopOptionPrompt);
    // Use switch to carry out action
    switch (shopOptionPrompt) {
      
        case 1:
            playerInfo.refillHealth();
            break;

        case 2:
           playerInfo.upgradeAttack();
            break;

        case 3:
            window.alert("Leaving the store.");
            //do nothing, so function will end
            break;
            
        default: 
            window.alert("You did not pick a valid option. Try again.");
            //call shop() again to force player to pick a vlid option
            shop();
            break;
    }
};

//start the game when page loads
startGame();
