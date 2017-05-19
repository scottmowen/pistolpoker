(function ($) {
    var maxWidth = $(document).width();
    var myVar;
    var suits = ["spades", "hearts", "clubs", "diams"];
    var playerHand = [];
    var cardsDealt = [];
    var Card = Backbone.Model.extend({
        defaults: {
            suit: '',
            value: ''
        }
    });

    var Deck = Backbone.Collection.extend({
        model: Card
    });

    var CardView = Backbone.View.extend({
        tagname: 'div',
        className: 'card shadow rounded',

        events: {
            'click': 'saveCard'
        },

        initialize: function () {
            _.bindAll(this, 'render', 'saveCard');
        },

        render: function () {
            $(this.el).html('<div class="corner top"><span class="number">' + this.model.get('value') +
                '</span><span>' + this.model.get('suit') + '</span></div>' +
                '<div class=cardFace></div>' +
                '<div class="corner bottom"><span class="number">' + this.model.get('value') + '</span><span>' + this.model.get('suit') + '</span></div>');

            switch (this.model.get('value')) {
                case 'A':
                    $('.cardFace', this.el).append('<span class="suit middle_center">' + this.model.get('suit') + '</span>');
                    break;
                case 'K':
                    $('.cardFace', this.el).append('<span class="suit middle_center">' + this.model.get('value') + '</span>');
                    break;
                case 'Q':
                    $('.cardFace', this.el).append('<span class="suit middle_center">' + this.model.get('value') + '</span>');
                    break;
                case 'J':
                    $('.cardFace', this.el).append('<span class="suit middle_center">' + this.model.get('value') + '</span>');
                    break;
                default:
                    this.drawCardFace(this.model.get('suit'), this.model.get('value'));
            }
            return this;
        },

        drawCardFace: function (suit, value) {
            if (value == 'A' || value == 'J' || value == 'Q' || value == 'K') {
                return;
            }

            else {
                switch (value) {
                    case 2:
                        $('.cardFace', this.el).append('<span class="suit top_center">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit bottom_center">' + this.model.get('suit') + '</span>');
                        break;
                    case 3:
                        $('.cardFace', this.el).append('<span class="suit top_center">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit middle_center">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit bottom_center">' + this.model.get('suit') + '</span>');
                        break;
                    case 4:
                        $('.cardFace', this.el).append('<span class="suit top_left">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit top_right">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit bottom_left">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit bottom_right">' + this.model.get('suit') + '</span>');
                        break;
                    case 5:
                        $('.cardFace', this.el).append('<span class="suit top_left">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit top_right">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit bottom_left">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit bottom_right">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit middle_center">' + this.model.get('suit') + '</span>');
                        break;
                    case 6:
                        $('.cardFace', this.el).append('<span class="suit top_left">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit middle_left">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit bottom_left">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit top_right">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit middle_right">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit bottom_right">' + this.model.get('suit') + '</span>');
                        break;
                    case 7:
                        $('.cardFace', this.el).append('<span class="suit top_left">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit top_right">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit middle_left">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit middle_top">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit middle_right">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit bottom_left">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit bottom_right">' + this.model.get('suit') + '</span>');
                        break;
                    case 8:
                        $('.cardFace', this.el).append('<span class="suit top_left">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit top_right">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit middle_left">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit middle_top">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit middle_right">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit middle_bottom">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit bottom_left">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit bottom_right">' + this.model.get('suit') + '</span>');
                        break;
                    case 9:
                        $('.cardFace', this.el).append('<span class="suit top_left">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit top_right">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit middle_top_left">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit middle_center">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit middle_top_right">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit bottom_left">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit bottom_right">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit middle_bottom_left">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit middle_bottom_right">' + this.model.get('suit') + '</span>');
                        break;
                    case 10:
                        $('.cardFace', this.el).append('<span class="suit top_left">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit top_right">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit middle_top_left">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit middle_top_center">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit middle_top_right">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit bottom_left">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit bottom_right">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit middle_bottom_center">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit middle_bottom_left">' + this.model.get('suit') + '</span>');
                        $('.cardFace', this.el).append('<span class="suit middle_bottom_right">' + this.model.get('suit') + '</span>');
                }
            }
        },

        saveCard: function () {
            var self = this;
            if (playerHand.indexOf(this.model.get('value') + this.model.get('suit')) === -1 && playerHand.length < 5) {

                var $selectedCard = $(this.el).clone();
                $selectedCard.removeAttr('style');
                $selectedCard.removeClass('throw');
                $selectedCard.addClass('playerHand');
                $selectedCard.click(function () {
                    var selectedIndex = playerHand.indexOf(self.model.get('value') + self.model.get('suit'));
                    $(this).remove();
                    playerHand.splice(selectedIndex, 1);
                });

                $selectedCard.appendTo('#playerHand');
                playerHand.push(this.model.get('value') + this.model.get('suit'));
            }

            //$(this.el).addClass('spin');
            //$(".card.spin").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){ $('.card.spin').removeClass('spin'); });


        }
    });

    var TableView = Backbone.View.extend({
        el: $('body'),
        events: {
            'click button#deal': 'deal'
        },

        initialize: function () {
            _.bindAll(this, 'render', 'deal');

            this.collection = new Deck();


            this.render();

        },

        render: function () {
            var self = this;
            $(this.el).append('<div id="playerHand"></div>');
            $(this.el).append('<button id="deal">Deal</button>');
            $(this.el).append('<div id="tableCards"></div>');
            /*for (var i=0; i<suits.length; i++)
            {
                $(this.el).append('<div class="'+suits[i]+'Group"></div>');
                for (var j=1; j<=13; j++)
                {
                    var card = new Card();
                    card.set({
                        suit: '&'+suits[i]+';',
                    });
                    switch (j)
                    {
                        case 1:
                            card.set({ value: 'A' });
                            break;
                        case 11:
                            card.set({ value: 'J' });
                            break;
                        case 12:
                            card.set({ value: 'Q' });
                            break;
                        case 13:
                            card.set({ value: 'K' });
                            break;
                        default:
                            card.set({ value: j });
                    }

                    this.collection.add(card);

                    var cardView = new CardView({
                        model: card,
                        className: 'card shadow rounded '+suits[i]
                    });

                    $('.'+suits[i]+'Group').append(cardView.render().el);
                }

            } */

        },

        deal: function () {
            myVar = window.setInterval(dealCards(this), 500);



        }
    });

    function dealCards(view) {
        var currentDeal = [];
        $('.card.throw').remove();
        var self = view;
        var numCards = Math.floor(Math.random() * (5 - 3) + 3);
        while (currentDeal.length < numCards) {

            var suitIndex = Math.floor((Math.random() * 4));
            var faceValue = Math.floor((Math.random() * 14) + 2);

            var card = new Card();
            card.set({
                suit: '&' + suits[suitIndex] + ';',
            });
            switch (faceValue) {
                case 11:
                    card.set({ value: 'J' });
                    break;
                case 12:
                    card.set({ value: 'Q' });
                    break;
                case 13:
                    card.set({ value: 'K' });
                    break;
                case 14:
                    card.set({ value: 'A' });
                    break;
                default:
                    card.set({ value: faceValue });
            }

            if ($.inArray(faceValue + suits[suitIndex], currentDeal) == -1) {
                self.collection.add(card);

                var cardView = new CardView({
                    model: card,
                    className: 'card shadow rounded throw ' + suits[suitIndex]
                });
                var endX;
                var startX = Math.floor(Math.random() * maxWidth);

                if (startX < $(document).width() / 2) {
                    endX = Math.floor(Math.random() * (maxWidth / 2));
                }
                else {
                    endX = Math.floor(Math.random() * (maxWidth - (maxWidth / 2)) + maxWidth / 2);
                }
                /*var bezier_params = {
                    start: {
                      x: maxWidth-100,
                      y: $(document).height()-100,
                      angle: 60,
                      length: .99
                    },
                    end: {
                      x: Math.random()*(maxWidth-100),
                      y: 300,
                      angle: 270,
                      length: 1
                    }
                  }*/

                //var direction =  Math.random() < 0.5 ? -1 : 1;
                var start = Math.floor(Math.random() * (360 - 270) + 270);
                var end = Math.floor(Math.random() * (360 - 270) + 270);
                var radius = Math.floor(Math.random() * (900 - 500) + 500);
                if (start > end) {
                    direction = 1;
                }
                else {
                    direction = -1;
                }
                var arc_params = {
                    center: [700, 800],
                    radius: radius,
                    start: start,
                    end: end,
                    dir: direction
                }

                cardsDealt.push(cardView.render().el);
                $(self.el).append(cardView.render().el);
                var rotAngle = (Math.floor(Math.random() * 4) + 1) * 360;
                $(cardView.render().el).css({
                    '-webkit-transform': 'rotate(' + rotAngle + 'deg)',
                    '-moz-transform': 'rotate(' + rotAngle + 'deg)',
                    '-webkit-transition': '-webkit-transform 3s ease-out'
                });
                currentDeal.push(faceValue + suits[suitIndex]);
                $(cardView.render().el).animate({ path: new $.path.arc(arc_params) }, 5000);
                //$(cardView.render().el).addClass('spin');

            }


        }
    }

    var tableView = new TableView();
})(jQuery);