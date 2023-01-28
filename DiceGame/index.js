var  randomNumber1 = Math.floor(Math.random()*6)+1;
var  randomNumber2 = Math.floor(Math.random()*6)+1;

var dices = document.querySelectorAll("img");
var dice1 = dices[0];
var dice2 = dices[1];
dice1.setAttribute("src","images/dice1.png");
changeSrc(dice1,randomNumber1);
changeSrc(dice2,randomNumber2);
function changeSrc(src, num){
    if (num==1)
    {src.setAttribute("src","images/dice1.png");}
    else if(num==2)
    {src.setAttribute("src","images/dice2.png");}
    else if(num==3)
    {src.setAttribute("src","images/dice3.png");}
    else if(num==4)
    {src.setAttribute("src","images/dice4.png");}
    else if(num==5)
    {src.setAttribute("src","images/dice5.png");}
    else if(num==6)
    {src.setAttribute("src","images/dice6.png");}
}
var msg = document.querySelector("h1");
if (randomNumber1 > randomNumber2){
    msg.innerHTML=("🚩Player 1 Wins!");
}
else if(randomNumber2 > randomNumber1){
    msg.innerHTML=("Player 2 Wins!🚩");
}
else{
    msg.innerHTML=("Draw!");
}