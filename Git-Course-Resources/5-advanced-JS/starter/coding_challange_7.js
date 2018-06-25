(function () {
    let question = function (que, answers, correct) {
        this.que = que;
        this.answers = answers;
        this.correct = correct;
    };

    question.prototype.display = function () {
        console.log(this.que);
        console.log("Answers\n++++++");
        for (let i = 0; i <this.answers.length; i++)
            console.log(i + " " + this.answers[i])
    }

    question.prototype.checkAnswer = function (ans, callback) {
        let sc;
        if (ans == this.correct) {
            console.log("Correct Answer");
            sc=callback(true);
        } else {
            console.log("Incorrect Answer");
            sc=callback(false);
        }
        this.calculateScore(sc);
    }

    question.prototype.calculateScore = function (score) {
        console.log('Your Current Score is ' + score);
        console.log('----------------------------');
    }

    let questions = new Array(new question('Who am i?', ['Yash', 'Nobody'], 0), new question('Best Language?', ['.net', 'javascript'], 1));

    // let random = function (select) {

    //     console.log("Question " + select + " : " + questions[select].que);

    //     let answer = prompt("Input The Answer");
    //     if (parseInt(answer) === questions[select].correct)
    //         console.log("\nAnswer is Correct \n --------------------");
    //     else
    //         random(select);
    // }

    function score() {
        let sc = 0;
        return function (correct) {
            if (correct)
                sc++;
            return sc;
        }
    }

    let keepScore = score();

    function nextQuestion() {
        let n=Math.floor(Math.random() * questions.length);
        questions[n].display();
        let ans = prompt("Please, Select The right answer");
        if (ans !== 'exit') {
            questions[n].checkAnswer(parseInt(ans), keepScore);
            nextQuestion();
        }
    }
    nextQuestion();
})();