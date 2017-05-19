var suits = ["s", "h", "c", "d"],
    sources = {},
    playerHand = [],
    playerCards = [],
    cardsDealt = [],
    currentDeal = [],
    dealInterval,
    anim, bgImg, dealerGroup,
    roundScore,
    roundLength = 120000,
    isFlush = true;

    $(function() {

        generateSources();
        loadImages(sources, initStage);

    });

function writeMessage(timerLayer, message, x, y, fontString) {
    var context = timerLayer.getContext();
    timerLayer.clear();
    context.font = fontString;
    context.fillStyle = 'red';
    context.fillText(message, x, y);
}

function loadImages(sources, callback) {
    var assetDir = 'img/cards/';
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function() {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = assetDir + sources[src];
    }


}

function initStage(images) {
    dealerGroup = new Kinetic.Group();

    var stage = new Kinetic.Stage({
        container: 'container',
        width: 900,
        height: 550,

    });
    var cardX = 508;

    //var timerLayer = new Kinetic.Layer();
    var dealerLayer = new Kinetic.Layer();
    var handLayer = new Kinetic.Layer();
    var borderLayer = new Kinetic.Layer({id: 'shootArea'});

    var borderRect = new Kinetic.Rect({
        x: 0,
        y: 130,
        width: 900,
        height: 420,
        stroke: 'black',
        strokeWidth: 2
    });

    bgImg = new Image();
    bgImg.onload = function() {
        borderRect.setFillPatternImage(bgImg);
        borderRect.setFillPatternScale(0.75);
        borderRect.setFillPatternOffsetY(70);
        stage.draw();
    };
    bgImg.src = 'img/woodbg.jpg';

    dealerLayer.add(borderRect);

    var handBorderRect = new Kinetic.Rect({
        x: 506,
        y: 0,
        width: 394,
        height: 100,

    });

    borderLayer.add(handBorderRect);

    for (var i = 0; i < 5; i++) {
        var cardBorderRect = new Kinetic.Rect({
            x: cardX,
            y: 2,
            width: 70,
            height: 96,
            stroke: '#D98819',
            strokeWidth: 2
        });

        borderLayer.add(cardBorderRect);
        cardX += 80;
    }



    stage.add(borderLayer);

    stage.add(handLayer);
    //stage.add(timerLayer);
    stage.add(dealerLayer);
    dealerLayer.draw();


    borderRect.on('mouseover', function() {
        $("canvas").css('cursor', 'url(img/crosshair.png) 15 15, auto');
    });

    borderRect.on('mouseout', function() {
        $("canvas").css('cursor', 'default');
    });

    $("#start").click(function() {
        startGame(images, dealerLayer, handLayer, stage);
        $("#start").hide();
    });
}

function generateSources() {
    for (var i = 0; i < suits.length; i++) {
        for (var j = 1; j <= 13; j++) {
            sources[suits[i] + j] = suits[i] + j + '.png';
        }
    }
}

function startGame(images, dealerLayer, handLayer, stage) {

    roundScore = 0;


    var startText = new Kinetic.Text({
        x: stage.getWidth() / 2,
        y: 350,
        text: 'GET READY',
        fontSize: 36,
        fontFamily: 'Calibri',
        fill: 'red'
    });
    startText.setOffset({
        x: startText.getWidth() / 2
    });

    dealerLayer.add(startText);
    dealerLayer.draw();

    var count = 3;
    var startInterval = window.setInterval(function() {
        startText.setText(count);
        startText.setOffset({
            x: startText.getWidth() / 2
        });
        dealerLayer.draw();
        count--;
    }, 1000);

    setTimeout(function() {
        clearInterval(startInterval);
        startText.setVisible(false);
        countdown(roundLength);

        deal(images, dealerLayer, handLayer, stage);

        dealInterval = window.setInterval(function() {
            deal(images, dealerLayer, handLayer, stage);
        }, 3500);

        setTimeout(function() {
            clearInterval(dealInterval);
            clearHand(handLayer);
            $("#start").show();
        }, roundLength+2000);

    }, 4000);


}

function deal(images, dealerLayer, handLayer, stage) {
    var maxSpeedY = 550,
        minSpeedY = 500,
        maxSpeedX = 150,
        minSpeedX = 100,
        maxAngularSpeed = 6,
        minAngularSpeed = 2,
        gravity = 450,
        left = 120;
    cardsDealt = [];
    currentDeal = [];
    dealerGroup.removeChildren();

    var numCards = 5;
    while (currentDeal.length < numCards) {

        var plusOrMinus = Math.random() < 0.5 ? -1 : 1;

        var suitIndex = Math.floor((Math.random() * 4));
        var faceValue = Math.floor((Math.random() * 13) + 1);

        if ($.inArray(suits[suitIndex] + faceValue, cardsDealt) == -1 && $.inArray(suits[suitIndex] + faceValue, playerHand) == -1) {

            var cardName = suits[suitIndex] + faceValue;

            var card = new Kinetic.Image({
                image: images[cardName],
                x: Math.floor(Math.random() * 900),
                y: 550
            });

            card.suit = suits[suitIndex];
            card.value = faceValue;
            card.name = cardName;
            card.startX = left;
            card.startY = card.attrs.y;
            card.dY = Math.floor((Math.random() * (maxSpeedY - minSpeedY)) + minSpeedY);
            card.dX = Math.floor((Math.random() * (maxSpeedX - minSpeedX)) + minSpeedX);

            card.angularSpeed = Math.PI / ((Math.random() * (maxAngularSpeed - minAngularSpeed)) + minAngularSpeed) * plusOrMinus;

            if (card.attrs.x > 450) {
                card.dX *= -1;
            }

            card.on('mousedown', function() {
                saveCard(this, handLayer, stage);
            });

            card.on('touchstart', function() {
                saveCard(this, handLayer, stage);
            });

            card.on('mouseover', function() {
                $("canvas").css('cursor', 'url(img/crosshair.png) 15 15, auto');
            });

            currentDeal.push(card);
            cardsDealt.push(suits[suitIndex] + faceValue);
            dealerGroup.add(card);
            dealerLayer.add(dealerGroup);
            left = left + 160;
        }


    }
    dealerLayer.draw();

    if (anim != null) {
        anim.stop();
    }

    anim = new Kinetic.Animation(function(frame) {
        for (var i = 0; i < currentDeal.length; i++) {
            if (currentDeal[i].attrs.y > stage.getHeight() + 2*currentDeal[i].getHeight()) {
                continue;
            }
            if (currentDeal[i].attrs.y <= 0 && currentDeal[i].dY > 0) {
                currentDeal[i].dY *= -1;
            }
            currentDeal[i].setY(currentDeal[i].attrs.y - (currentDeal[i].dY * (frame.timeDiff / 1000)));
            currentDeal[i].dY -= gravity * (frame.timeDiff / 1000);
            currentDeal[i].setX(currentDeal[i].attrs.x + (currentDeal[i].dX * (frame.timeDiff / 1000)));

            currentDeal[i].angleDiff = frame.timeDiff * currentDeal[i].angularSpeed / 1000;
            currentDeal[i].rotate(currentDeal[i].angleDiff);
        }

    }, dealerLayer);

    anim.start();

}


function saveCard(card, handLayer, stage) {

    if (playerHand.length < 5) {
        var handCard = new Kinetic.Image({
            image: card.attrs.image,
            x: (stage.getWidth() - 392) + 80 * (playerHand.length),
            y: 2
        });
        handCard.name = card.name;
        handCard.suit = card.suit;
        handCard.value = card.value;

        if (playerCards.length > 0 && isFlush)
        {
            if (handCard.suit != playerCards[playerCards.length-1].suit)
            {
                isFlush = false;
            }
        }

        playerHand.push(handCard.name);
        playerCards.push(handCard);

/*
        handCard.on('click', function() {
            removeCard(this, handLayer, stage)
        });

        handCard.on('touchstart', function() {
            removeCard(this, handLayer, stage)
        });
*/
        handLayer.add(handCard);
        card.destroy();

        // shooting cards earns 10 pts per card
        roundScore += 10;
        $("#roundScoreDiv").html(roundScore);

        handLayer.draw();

        if (playerHand.length == 5)
        {
            // wait 1ms so the user actually sees the 5th card added to their hand
            setTimeout(function() {
                roundScore += scoreHand();
                $("#roundScoreDiv").html(roundScore);
                updatePrevHands(playerCards, scoreHand());
                clearHand(handLayer);
                isFlush = true;
            }, 100);

        }
    }

}

/*
function removeCard(card, handLayer, stage) {

    var selectedIndex = playerHand.indexOf(card.name);

    playerHand.splice(selectedIndex, 1);
    selectedIndex = playerCards.indexOf(card);

    playerCards.splice(selectedIndex, 1);
    card.destroy();

    for (var i = selectedIndex; i < playerCards.length; i++) {
        playerCards[i].setX(playerCards[i].attrs.x - 80);
    }

    handLayer.draw();
}
*/

function countdown(miliseconds) {
    var time = miliseconds / 1000;
    time = updateTime(time);

    var interval = setInterval(function() {
        time = updateTime(time);
        if (time < 0) {
            clearInterval(interval);
        }
    }, 1000);
}

function updateTime(time) {

    var minutes = Math.floor(time / 60);
    if (minutes < 10) minutes = minutes;
    var seconds = time % 60;
    if (seconds < 10) seconds = "0" + seconds;
    var text = minutes + ':' + seconds;
    $("#timerDiv").html(text);
    if (time <= 10)
    {
        $("#timerDiv").css('color', 'red');
    }
    //writeMessage(timerLayer, text, 10, 120, '18pt Calibri');
    return --time;
}


/* SCORING FUNCTION */
function scoreHand() {

    var cardHistogram = {};
    var count = 0;
    var handScore;

    playerCards.sort(sortCardsByValue);

    for (var i=0; i < playerCards.length; i++)
    {
        if (cardHistogram[playerCards[i].value])
        {
            cardHistogram[playerCards[i].value] +=1;
        }
        else
        {
            cardHistogram[playerCards[i].value] = 1;
            count ++;
        }

    }

    switch(count)
    {
        //5 unique cards: Straight flush, straight, flush, or high card
        case 5:
            // Straight
            if (playerCards[4].value - playerCards[0].value == 4 || playerCards[4].value - playerCards[0].value == 12)
            {
                // Straight Flush
                if (isFlush)
                {
                    handScore = 50000;
                }
                // Normal straight
                else
                {
                    handScore = 1000;
                }
            }
            // Flush
            else if (isFlush)
            {
                handScore = 1500;
            }
            // High Card
            else
            {
                handScore =  10;
            }
            break;

        // 4 unique cards: one pair
        case 4:
            handScore =  100;
            break;

        // 3 unique cards: 3 of a kind or two pair
        case 3:

            for (var x in cardHistogram)
            {
                // 3 of a kind
                if (cardHistogram[x] == 3)
                {
                    handScore = 500;
                    break;
                }

                // 2 pair
                if (cardHistogram[x] == 2)
                {
                    handScore = 200;
                    break;
                }
            }
            break;

        // 2 unique cards: Full House
        case 2:
            handScore = 5000;
            break;

        // 1 unique card: 4 of a kind
        case 1:
            handScore = 10000;
            break;
    }

    return handScore;

}

function clearHand(handLayer) {
    playerHand = [];
    for (var i =0; i < playerCards.length; i++)
    {
        playerCards[i].destroy();
    }
    playerCards = [];
    handLayer.draw();
}

function sortCardsByValue(a, b) {
    var aValue = a.value;
    var bValue = b.value;

    return ((aValue < bValue) ? -1 : ((aValue > bValue) ? 1: 0));
}

function updatePrevHands(hand, score) {
    var $handSpan = $('<span class="handSpan"/>');

    for (var i=0; i<hand.length; i++)
    {
        var cardImg = $('<img class="prevCardImg">');

        cardImg.attr('src', hand[i].getImage().src);
        cardImg.width(hand[i].getWidth()*.6);
        cardImg.height(hand[i].getHeight()*.6);
        $handSpan.append(cardImg);
    }

    var handScoreDiv = $('<div class="prevScoreDiv">&nbsp;=' +score + '</div>');
    $handSpan.append(handScoreDiv);
    $handSpan.prependTo("#prevHands");
}

