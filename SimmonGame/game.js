var gamePattern = [];
var buttonColours  = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var started = false;
var level = 0;

    $(document).keydown(function(){
        if (!started){
        $("#level-title").text("Level "+level);
        nextSequence();
    }
        
    });
    
    

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random() *4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    //This won't work since Chrome blocks automatically played audio
    //It works if you add an key down event triggers it
    playSound(randomChosenColour);
    

}


$(".btn").click(
    function(){
    //this is a object, in order to get id of this button object, we do need to use $().attr()
    var userChosenColour =$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
}
);

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed")
    }, 100);
}
function checkAnswer(currentLevel){
    
    if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(currentLevel===gamePattern.length-1){
            setTimeout(function(){
                //之前把reset userClickedPattern = [];放在这里但是发现一旦错了以后就不好使了。
                //因为错了以后没有reset会直接到下面67的else。 除非在startOver()里也加上这一条， 要不就乖乖把这个放在nextSequence（）里。
                nextSequence();
                
            }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart ");
        startOver();
    }
    
}

function startOver(){
    gamePattern=[];
    started=false;
    level=0;
}