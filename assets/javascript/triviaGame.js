$(document).ready(function () {

    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click', '.option', trivia.guessChecker);
})

var trivia = {
    // trivia properties
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timRosser: 30,
    timerOn: false,
    timerId: '',



    // Questions and Answers 
    questions: {
        q1: "In which European city is The Volvo Group headquarters?",
        q2: "The Beetle was the best selling vehicle of all time in the world until the late 1990s, when it was overtaken by which car?",
        q3: "What name was given to the most famous 1969 Dodge Charger driven in a television series?",
        q4: "What was the top selling car in the UK in 2016?",
        q5: "What flag is waved to start the 24 Hours of Le Mans race?",
        q6: "In 1971, the Rolls-Royce Silver Shadow two door models were given what name?",
        q7: "What informal name is given to the vehicles specially designed for the Pope during outdoor public appearances?"
    },
    options: {
        q1: ['Paris, France', 'Gothenburg, Sweden', 'Rome, Italy', 'Berlin, Germany'],
        q2: ['Honda Civic', 'Mazda 323', 'Toyota Corolla', 'Nissan Sentra'],
        q3: ['General Lee', 'Batmobile', 'Eleanor', 'Night Rider'],
        q4: ['Toyota Corolla', 'Renault Megane', 'Peugeot 206', 'Ford Fiesta'],
        q5: ['French Flag', 'Polish Flag', 'Italian Flag', 'Russian Flag'],
        q6: ['Night Shadow', 'Night Hawk', 'Silver Bullet', 'Corniche'],
        q7: ['Pope Mobiles', 'Pope Fleet', 'The Pope Car', 'Auto for the Pope']
    },
    answers: {
        q1: 'Gothenburg, Sweden',
        q2: 'Toyota Corolla',
        q3: 'General Lee',
        q4: 'Ford Fiesta',
        q5: 'French Flag',
        q6: 'Corniche',
        q7: 'Pope Mobiles'
    },


    // Restarting gamescore
    startGame: function () {

        trivia.currentSet = 0;
        trivia.correct = 0;
        trivia.incorrect = 0;
        trivia.unanswered = 0;
        clearInterval(trivia.timerId);

        $('#game').show();

        $('#results').html('');

        //  timer
        $('#timer').text(trivia.timer);

        // remove start button
        $('#start').hide();

        $('#remaining-time').show();

        // first question
        trivia.nextQuestion();

    },
    // Loop through questions
    nextQuestion: function () {

        // set timer to 20 seconds

        trivia.timer = 20;
        $('#timer').removeClass('last-seconds');
        $('#timer').text(trivia.timer);

        if (!trivia.timerOn) {
            trivia.timerId = setInterval(trivia.timerRunning, 1000);
        }


        var questionContent = Object.values(trivia.questions)[trivia.currentSet];
        $('#question').text(questionContent);


        var questionOptions = Object.values(trivia.options)[trivia.currentSet];


        $.each(questionOptions, function (index, key) {
            $('#options').append($('<button class="option btn btn-info btn-lg">' + key + '</button>'));
        })

    },

    guessChecker: function () {

        // Timer ID for gameResult setTimeout
        var resultId;

        // The answer to the current question being asked
        var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];

        // User picked the correct answer, add correct
        if ($(this).text() === currentAnswer) {

            // Turn button green for correct answer selected 
            $(this).addClass('btn-success').removeClass('btn-info');

            trivia.correct++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Correct Answer!</h3>');
        }
        // User picked the wrong answer, add incorrect
        else {
            // Turn button red for incorrect answer selected 
            $(this).addClass('btn-danger').removeClass('btn-info');

            trivia.incorrect++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Sorry! Wrong Answer. Correct answer is ' + currentAnswer + '</h3>');
        }

    },

    // Unanswered questions
    timerRunning: function () {

        if (trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length) {
            $('#timer').text(trivia.timer);
            trivia.timer--;
            if (trivia.timer === 4) {
                $('#timer').addClass('last-seconds');
            }
        } else if (trivia.timer === -1) {
            trivia.unanswered++;
            trivia.result = false;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Out of time! The answer was ' + Object.values(trivia.answers)[trivia.currentSet] + '</h3>');
        }
        // End Game
        else if (trivia.currentSet === Object.keys(trivia.questions).length) {

            // Adds score of game 
            $('#results')
                .html('<h3>Thank you for playing!</h3>' +
                    '<p>Correct: ' + trivia.correct + '</p>' +
                    '<p>Incorrect: ' + trivia.incorrect + '</p>' +
                    '<p>Unaswered: ' + trivia.unanswered + '</p>' +
                    '<p>Please play again!</p>');


            $('#game').hide();

            // New game
            $('#start').show();
        }

    },

    // Remove question results
    guessResult: function () {

        trivia.currentSet++;

        $('.option').remove();
        $('#results h3').remove();

        trivia.nextQuestion();

    }

}