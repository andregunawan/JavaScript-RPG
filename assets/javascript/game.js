// Declared Variable

var heroes = 
{
	'heroesName' : ["traxex", "leshrac", "luna", "slark"],
	'hp' : [200, 150, 250, 280],
	'att' : [20, 25, 15, 10],
	'counter' : [20, 30, 20, 10],
	'heroPicture' : ["assets/images/drowRanger.png",
					"assets/images/leshrac.jpg",
					"assets/images/luna.jpg",
					"assets/images/slark.jpg"],
	'heroLeft' : ["assets/images/heroes/traxexLeft.png",
						"assets/images/heroes/leshracLeft.png",
						"assets/images/heroes/lunaLeft.png",
						"assets/images/heroes/slarkLeft.png"],
	'heroRight' : ["assets/images/heroes/traxexRight.png",
						"assets/images/heroes/leshracRight.png",
						"assets/images/heroes/lunaRight.png",
						"assets/images/heroes/slarkRight.png"],
	'available' : ["y", "y", "y", "y"],

//CHOOSE YOUR HERO
startGame:function () 
	{
		var heroSelect = $(".heroSelect");
		for(var i=0;i<this.heroPicture.length;i++)
		{
			var newCol = $("<div>");
			var newPicture = $("<img>");
			var newHeroesName = $("<h4>");
			newCol.attr("class", "col-md-3 text-center");
			heroSelect.append(newCol);
			newPicture.attr("data-id", i);
			newPicture.attr("class", "heroImage");
			newPicture.attr("src", this.heroPicture[i]);
			newPicture.attr("alt", "hero" + (i+1));
			newCol.append(newPicture);
			newHeroesName.html(heroes.heroesName[i]);
			newCol.append(newHeroesName);
		}

	},


//CHOOSE YOUR ENEMY
chooseEnemy:function (hero) 
	{	
		var enemySelect = $(".enemySelect");
			enemySelect.empty();
		$(".heroHeader").css("visibility", "hidden");
		$(".heroSelect").css("visibility", "hidden");
		$("#chooseEnemyH3").css("visibility", "visible");
		$(".enemySelect").css("visibility", "visible");
		$(".enemySelect").css("pointer-events", "auto");

		for(var i=0;i<this.heroPicture.length;i++)
		{
			if(i!==hero && this.available[i]==="y") //available enemy...
			{
				var newCol = $("<div>");
				var newPicture = $("<img>");
				var newHeroesName = $("<h5>");
				newCol.attr("class", "col-md-3 text-center");
				enemySelect.append(newCol);
				newPicture.attr("data-id", i);
				newPicture.attr("class", "enemyImage");
				newPicture.attr("src", this.heroPicture[i]);
				newPicture.attr("alt", "enemy" + (i+1));
				newCol.append(newPicture);
				newHeroesName.html(heroes.heroesName[i]);
				newCol.append(newHeroesName);
			}
		}
	},

// BATTLE START
battleStart:function (chosenHero, chosenEnemy) 
	{
        $("#chosenHero").css("visibility", "visible");
        $("#chosenEnemy").css("visibility", "visible");
        $("#attackButton").css("visibility", "visible");
        $(".battleRight").css("visibility", "visible");
        $(".enemySelect").css("pointer-events", "none");
        $("#attackButton").css("pointer-events", "auto");

        var heroLeft = $("#chosenHero");
        var heroRight = $("#chosenEnemy");
        var heroLeftHp = $(".battleLeft");
        var heroRightHp = $(".battleRight");
        heroLeft.attr("src", this.heroLeft[chosenHero]);
        heroRight.attr("src", this.heroRight[chosenEnemy]);
        heroLeftHp.html(this.hp[chosenEnemy] + "%");
        heroRightHp.html(this.hp[chosenHero] + "%");
    },


// ATTACK
attackEnemy:function (heroHp, enemyHp, chosenHero, chosenEnemy) 
	{
		var attack = this.att[chosenHero]++;
		var heroRightHp = $(".battleRight");
		var win = 0;

		var healthHero = this.hp[chosenHero]-=this.counter[chosenEnemy];
		$(".battleLeft").html(healthHero + "%");
		var healthEnemy = this.hp[chosenEnemy]-=(attack*3);
		$(".battleRight").html(healthEnemy + "%");

		if(healthHero<=0)
		{
			$(".enemySelect").empty();
			$("#chooseEnemyH3").css("visibility", "hidden");
	        $("#chosenEnemy").css("filter", "grayscale(100%)");
	        $("#chosenEnemy").css("margin-top", "182px");
	        $("#chosenHero").css("margin-top", "182px");
	        $("#attackButton").css("visibility", "hidden");
	        $(".battleLeft").css("visibility", "hidden");
	        $(".battleRight").css("visibility", "hidden");
	        $(".gameOver").css("visibility", "visible");
	        // RESET BUTTON
		} else if(healthEnemy<=0)
		{
			this.hp[chosenEnemy] = 0;
			$("#chosenHero").css("visibility", "hidden");
				if(this.hp[chosenEnemy]===0)
				{
				$(".battleRight").css("visibility", "hidden");
				}
			this.available[chosenEnemy] = "n";
			heroes.chooseEnemy(chosenHero);
	
			$("#attackButton").css("pointer-events", "none");
	
			for(var i=0;i<this.available.length;i++)
			{
				if(i!==chosenHero)
				{
					if(this.available[i]==="y") 
					{
						win = 1;
						break;
					}
				}
			}
			if(win===0)
			{
				$("#chooseEnemyH3").css("visibility", "hidden");
				$(".battleLeft").css("visibility", "hidden");
				$("#chosenHero").css("visibility", "visible");
				$("#chosenHero").css("filter", "grayscale(100%)");
				$("#chosenHero").css("margin-top", "182px");
				$("#chosenEnemy").css("margin-top", "182px");
				$("#attackButton").css("visibility", "hidden");
				$(".win").css("visibility", "visible");
			}
		}
	},
};

$(document).ready(function() 
{
	heroes.startGame();
	var chosenHero; 
	var chosenEnemy;
	var heroHp;
	var enemyHp;

	var audio1 = $("#selectHero")[0];
	var audio2 = $("#sword")[0];

	$(".heroImage").on("click", function () 
	{
		chosenHero = $(this).data("id");
		heroes.chooseEnemy(chosenHero);
		audio1.play();
	});

	$(document).on("click", ".enemyImage", function () 
	{
	    chosenEnemy = $(this).data("id");
	    heroes.battleStart(chosenEnemy, chosenHero);
	    $(this).css("filter", "grayscale(100%)");
	    audio1.play();
	});

	$("#attackButton").on("click", function () 
		{
			heroes.attackEnemy(heroHp, enemyHp, chosenHero, chosenEnemy);
			audio2.play();
		});

	$(".gameOver").on("click", function () 
		{
			location.reload();

		});

	$(".win").on("click", function () 
		{
			location.reload();

		});
	
});





	




