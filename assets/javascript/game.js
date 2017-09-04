// Declared Variable

var heroes = 
{
	'heroesName' : ["traxex", "leshrac", "luna", "slark"],
	'hp' : [200, 150, 250, 300],
	'att' : [8, 10, 5, 2],
	'counter' : [20, 25, 15, 10],
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
	{	$("#chooseEnemyH3").css("visibility", "visible");
			var enemySelect = $(".enemySelect");
			enemySelect.empty();

		$(".enemySelect").css("visibility", "visible");
			
			var heroSelect = $(".heroSelect");
			heroSelect.empty();
			var newCol = $("<div>");
			var newPicture = $("<img>");
			var newHeroesName = $("<h4>");
			newCol.attr("class", "col-md-3 text-center");
			heroSelect.append(newCol);
			newPicture.attr("data-id", hero);
			newPicture.attr("class", "heroImage");
			newPicture.attr("src", this.heroPicture[hero]);
			newPicture.attr("alt", "hero" + (hero+1));
			newCol.append(newPicture);
			newHeroesName.html(heroes.heroesName[hero]);
			newCol.append(newHeroesName);

		for(var i=0;i<this.heroPicture.length;i++)
		{
			if(i!==hero)
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
attackEnemy:function (battleLeft, battleRight) 
	{
		var heroLeft = $("#chosenHero");
        var heroRight = $("#chosenEnemy");
        var heroLeftHp = $(".battleLeft");
        var heroRightHp = $(".battleRight");
        heroLeft.attr("src", this.heroLeft[chosenHero]);
        heroRight.attr("src", this.heroRight[chosenEnemy]);
        heroLeftHp.html(this.hp[chosenEnemy] -= this.counter[chosenHero] + "%");
        heroRightHp.html(this.hp[chosenHero] -= this.att[chosenEnemy] + "%");


	}
};

$(document).ready(function() 
{
	heroes.startGame();
	var chosenHero; 
	var chosenEnemy;
	$(".heroImage").on("click", function () 
	{
		chosenHero = $(this).data("id");
		heroes.chooseEnemy(chosenHero);
	});

	$(document).on("click", ".enemyImage", function () 
	{
	    chosenEnemy = $(this).data("id");
	    heroes.battleStart(chosenEnemy, chosenHero);
	    chosenEnemy = $(this).css("filter", "grayscale(100%)");
	    chosenEnemy = $(this).click(function() { return false; });

	});

	$("#attackButton").on("click", function () 
	{
		// attack = $(this).data("id");
	 	heroes.attackEnemy(battleLeft, battleRight);   
	 

	});

	
});





	




