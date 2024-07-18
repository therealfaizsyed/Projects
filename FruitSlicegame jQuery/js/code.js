let playing=false;
let score;
let trialleft;
let step;
let action;
let fruits=["apple","banana","berry","cherries","grapes","mango","orange","peach","pear","pineapple","watermelon"];
$(()=>
{
    //click on start / Reset Button
    $("#startreset").click(()=>
    {
        // if we are playing
        if(playing)
        {
            //reload page
            location.reload();
            playing=false;
        }
        else
        {
            //if we are not playing
            //hide the game over box
            $("#gameover").hide();
            // change the text to Reset Game
            $("#startreset").html("Reset Game");
            // start playing game
            playing=true;
            //score initialize to 0
            score=0;
            $("#scorevalue").html(score);
            //show the trial or life left
            $("#trialleft").show();
            //setting initial trial value
            trialleft=3;
            //Adding trial hearts
            addhearts();
            //start sending fruits
            startAction();
        }
    });
    function addhearts()
    {
        //clear hearts
        $("#trialleft").empty();
        //fill with hearts
        for(let i=0;i<trialleft;i++)
        {
            $("#trialleft").append('<img src="image/heart.png" class="heart">');
        }
    }
    //start sending fruits
    function startAction()
    {
        //generate fruits
        $("#fruit").show();
        //generate random fruits
        chooseFruit();
        //random position
        $("#fruit").css({"left":Math.round(650 * Math.random()),"top":-50});
        //generate steps
        step=1 + Math.round( 5 * Math.random());
        //move fruit down by steps every 10ms
        action=setInterval(()=>{
            $("#fruit").css("top",$("#fruit").position().top + step);
            // to check that fruit is to slow
            if($("#fruit").position().top > $("#fruitContainer").height())
            {
                // to check we have life left
                if(trialleft > 1)
                {
                    $("#fruit").show();
                    chooseFruit();
                    $("#fruit").css({"left":Math.round(650 * Math.random()),"top":-50});
                    step=1 + Math.round( 5 * Math.random());
                    //reduce the life or trial
                    trialleft--;
                    //populate hearts
                    addhearts();
                }
                else //game over
                {
                    playing=false;
                    // we are not playing
                    $("#startreset").html("Start Game");
                    $("#gameover").show();
                    $("#gameover").html("<p>Game Over !</p><p>Your Score is " +score +"</p>");
                    //hide the trial or life left
                    $("#trialleft").hide();
                    stopAction();
                }
            }
        },10)
    }
    //generate random fruit
    function chooseFruit()
    {
        let rand=fruits[Math.round(7*Math.random())];
        //console.log(rand);
        $("#fruit").attr('src','image/' + rand + '.png');
    }
    function stopAction()
    {
        clearInterval(action);
        //hide the fruits
        $("#fruit").hide();
    }
    //slice the fruits
    $("#fruit").mouseover(()=>
    {
        //increase the score by one
        score++;
        //update score value
        $("#scorevalue").html(score);
        //play the sound
        $("#slicesound")[0].play();
        //stop fruit
        clearInterval(action);
        //hide fruit animate
        $("#fruit").hide("explode",200);
        //send new fruit
        setTimeout(startAction,400);
    });
})