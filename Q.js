const apiKey = '1gpn1wCyI4a3GgunHDgrJLcUcM0b5ub5bv5YgOBX';
const limit = 10;
const url = `https://quizapi.io/api/v1/questions?limit=${limit}`;

let c = 1;

let marks = 0;

let Qnum = document.querySelector("#Qno");
let Qt = document.querySelector("#Qtext");
let b1 = document.querySelector("#btn1");
let b2 = document.querySelector("#btn2");
let b3 = document.querySelector("#btn3");
let b4 = document.querySelector("#btn4");
async function fetchData() {
    try {
        const response = await fetch(url, {
            headers: {
                'X-Api-Key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log(data); 
        showQuestion(data);
    }catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }

    function showQuestion(data) {
        if (c > limit) {
            alert(`Your score is ${marks}/${limit}`);
            location.reload();
            return;
        }
    
        Qnum.innerHTML = `Question ${c}`;
        Qt.innerHTML = data[c-1].question;
    
        b1.classList.remove("red", "green");
        b2.classList.remove("red", "green");
        b3.classList.remove("red", "green");
        b4.classList.remove("red", "green");
        if(data[c-1].answers.answer_a==null) b1.style.display = "none"
        else b1.style.display = "block"
        if(data[c-1].answers.answer_b==null) b2.style.display = "none"
        else b2.style.display = "block"
        if(data[c-1].answers.answer_c==null) b3.style.display = "none"
        else b3.style.display = "block"
        if(data[c-1].answers.answer_d==null) b4.style.display = "none"
        else b4.style.display = "block"
        b1.innerText = ""+data[c-1].answers.answer_a;
        b2.innerText = ""+data[c-1].answers.answer_b;
        b3.innerText = ""+data[c-1].answers.answer_c;
        b4.innerText = ""+data[c-1].answers.answer_d;
    
        function handleAnswer(button, correctAnswer) {
            if (correctAnswer) {
                button.classList.add("green");
                marks++;
            } else {
                button.classList.add("red");
                if (data[c-1].correct_answers.answer_a_correct === 'true') b1.classList.add("green");
                if (data[c-1].correct_answers.answer_b_correct === 'true') b2.classList.add("green");
                if (data[c-1].correct_answers.answer_c_correct === 'true') b3.classList.add("green");
                if (data[c-1].correct_answers.answer_d_correct === 'true') b4.classList.add("green");
            }
    
            setTimeout(() => {
                c++;
                showQuestion(data);
            }, 1000);
        }
    
        b1.onclick = () => handleAnswer(b1, data[c-1].correct_answers.answer_a_correct === 'true');
        b2.onclick = () => handleAnswer(b2, data[c-1].correct_answers.answer_b_correct === 'true');
        b3.onclick = () => handleAnswer(b3, data[c-1].correct_answers.answer_c_correct === 'true');
        b4.onclick = () => handleAnswer(b4, data[c-1].correct_answers.answer_d_correct === 'true');
    }

    

fetchData()