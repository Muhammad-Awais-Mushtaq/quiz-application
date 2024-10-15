const signupPage = document.getElementById('signup-page');
const loginPage = document.getElementById('login-page');
const subjectPage = document.getElementById('subject-page');
const quizPage = document.getElementById('quiz-page');
const quizTitle = document.getElementById('quiz-title');
const quizOptions = document.getElementById('quiz-options');
const quizResults = document.getElementById('quiz-results');
const studentInfo = document.getElementById('student-info');
const quizContent = document.getElementById('quiz-content');
const submitQuizBtn = document.getElementById('submit-quiz');
const backToSubjectsBtn = document.getElementById('back-to-subjects');

let loggedInUser = null;
let currentSubject = '';
let currentQuiz = null;

const subjects = [
    {
        name: 'PPSD',
        quizzes: [
            { id: 1, name: 'Quiz 1', dueDate: '2024-10-12', book: 'Professional Practices in Software Development' },
            { id: 2, name: 'Quiz 2', dueDate: '2024-10-15', book: 'Professional Practices in Software Development' }
        ],
        mcqs: [
            { quizId: 1, question: 'What is the purpose of software testing?', options: ['To find bugs', 'To find requirements', 'To improve code quality', 'To reduce costs'], correct: 'To find bugs' },
            { quizId: 2, question: 'What is Agile methodology?', options: ['Waterfall model', 'Iterative process', 'Incremental model', 'None of the above'], correct: 'Iterative process' }
        ]
    },
    {
        name: 'AI',
        quizzes: [
            { id: 1, name: 'Quiz 1', dueDate: '2024-10-10', book: 'Artificial Intelligence Concepts' },
            { id: 2, name: 'Quiz 2', dueDate: '2024-10-14', book: 'Artificial Intelligence Concepts' }
        ],
        mcqs: [
            { quizId: 1, question: 'What is a neural network?', options: ['A network of neurons', 'A type of software', 'A programming language', 'None of the above'], correct: 'A network of neurons' },
            { quizId: 2, question: 'What is deep learning?', options: ['Shallow learning', 'Supervised learning', 'Learning with more layers', 'None of the above'], correct: 'Learning with more layers' }
        ]
    },
    {
        name: 'SE',
        quizzes: [
            { id: 1, name: 'Quiz 1', dueDate: '2024-10-13', book: 'Software Engineering Concepts' },
            { id: 2, name: 'Quiz 2', dueDate: '2024-10-17', book: 'Software Engineering Concepts' }
        ],
        mcqs: [
            { quizId: 1, question: 'What is the first phase of the SDLC?', options: ['Design', 'Testing', 'Maintenance', 'Requirements Gathering'], correct: 'Requirements Gathering' },
            { quizId: 2, question: 'What is a UML diagram used for?', options: ['Coding', 'Modeling systems', 'Bug fixing', 'Unit testing'], correct: 'Modeling systems' }
        ]
    },
    {
        name: 'WT',
        quizzes: [
            { id: 1, name: 'Quiz 1', dueDate: '2024-10-11', book: 'Web Technologies and Development' },
            { id: 2, name: 'Quiz 2', dueDate: '2024-10-18', book: 'Web Technologies and Development' }
        ],
        mcqs: [
            { quizId: 1, question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'Hyper Text Markdown Language', 'Hyperlinks and Text Markup Language', 'None of the above'], correct: 'Hyper Text Markup Language' },
            { quizId: 2, question: 'What is the purpose of CSS?', options: ['Structure content', 'Style the content', 'Make content dynamic', 'None of the above'], correct: 'Style the content' }
        ]
    },
    {
        name: 'IS',
        quizzes: [
            { id: 1, name: 'Quiz 1', dueDate: '2024-10-09', book: 'Information Security Principles' },
            { id: 2, name: 'Quiz 2', dueDate: '2024-10-16', book: 'Information Security Principles' }
        ],
        mcqs: [
            { quizId: 1, question: 'What is the CIA triad?', options: ['Confidentiality, Integrity, Availability', 'Confidentiality, Information, Access', 'Cryptography, Integrity, Authentication', 'None of the above'], correct: 'Confidentiality, Integrity, Availability' },
            { quizId: 2, question: 'What is phishing?', options: ['A method to encrypt data', 'A type of hacking attack', 'A social engineering attack', 'None of the above'], correct: 'A social engineering attack' }
        ]
    }
];


// Sign up functionality
function signup() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const email = document.getElementById('signup-email').value;
    
    if (username && password && email) {
        if (password.length < 8) {
            alert('Password must be at least 8 characters long!');
            return;
        }
        localStorage.setItem(username, JSON.stringify({ password, email }));
        alert('Sign up successful!');
        showLoginPage();
    } else {
        alert('Please fill all fields!');
    }
}

// Login functionality
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const storedUser = JSON.parse(localStorage.getItem(username));
    
    if (storedUser && storedUser.password === password) {
        loggedInUser = username;
        alert('Login successful!');
        showSubjectPage();
    } else {
        alert('Invalid credentials!');
    }
}

// Show the signup page
function showSignupPage() {
    signupPage.style.display = 'block';
    loginPage.style.display = 'none';
}

// Show the login page
function showLoginPage() {
    loginPage.style.display = 'block';
    signupPage.style.display = 'none';
}

// Show the subjects page
function showSubjectPage() {
    subjectPage.style.display = 'block';
    quizPage.style.display = 'none';
    loginPage.style.display = 'none';
    signupPage.style.display = 'none';
}

// Logout functionality
function logout() {
    loggedInUser = null;
    localStorage.removeItem('loggedInUser'); // Clear any session-related data
    alert('Logged out successfully!');
    showLoginPage(); // Navigate back to login page after logout
}

// Load quizzes for a subject
function loadQuizzes(subjectName) {
    currentSubject = subjectName;
    const subject = subjects.find(s => s.name === currentSubject);

    const quizzesList = subject.quizzes.map(quiz => `
        <button onclick="loadQuiz(${quiz.id})">${quiz.name} - Due: ${quiz.dueDate}</button>
    `).join('');

    subjectPage.innerHTML = `
        <h1>${subjectName} Quizzes</h1>
        ${quizzesList}
        <button onclick="showSubjectPage()">Back to Subjects</button>
        <button onclick="logout()">Logout</button>
    `;
    quizPage.style.display = 'none';
}

// Load a specific quiz and show name/roll number input
function loadQuiz(quizId) {
    currentQuiz = quizId;
    const subject = subjects.find(s => s.name === currentSubject);
    const quiz = subject.quizzes.find(q => q.id === quizId);
    
    quizTitle.innerText = `${quiz.name} - ${quiz.book}`;
    quizContent.style.display = 'none'; // Hide quiz questions until the student provides name/roll number
    quizPage.style.display = 'block';
    subjectPage.style.display = 'none';
}

// Start the quiz after entering name and roll number
function startQuiz() {
    const name = document.getElementById('student-name').value;
    const rollNumber = document.getElementById('roll-number').value;
    
    if (!name || !rollNumber) {
        alert('Please enter your name and roll number!');
        return;
    }
    
    // Now show the quiz content after name and roll number are provided
    quizContent.style.display = 'block';
    studentInfo.style.display = 'none'; // Hide name/roll number fields

    const subject = subjects.find(s => s.name === currentSubject);
    const questions = subject.mcqs.filter(q => q.quizId === currentQuiz);
    
    quizOptions.innerHTML = questions.map((q, index) => `
        <div>
            <p>${q.question}</p>
            ${q.options.map(option => `
                <label>
                    <input type="radio" name="question-${index}" value="${option}"> ${option}
                </label>
            `).join('')}
        </div>
    `).join('');
    
    submitQuizBtn.style.display = 'block';
}

// Submit the quiz and show the results
submitQuizBtn.addEventListener('click', () => {
    const selectedOptions = document.querySelectorAll('input[type="radio"]:checked');
    if (selectedOptions.length === 0) {
        alert('Please answer all questions!');
        return;
    }

    let score = 0;
    const name = document.getElementById('student-name').value;
    const rollNumber = document.getElementById('roll-number').value;
    const subject = subjects.find(s => s.name === currentSubject);
    const questions = subject.mcqs.filter(q => q.quizId === currentQuiz);

    selectedOptions.forEach((selectedOption, index) => {
        const question = questions[index];
        if (selectedOption.value === question.correct) {
            score++;
        }
    });

    quizResults.innerHTML = `
        <h2>Results</h2>
        <p>Student: ${name}</p>
        <p>Roll Number: ${rollNumber}</p>
        <p>Score: ${score}/${questions.length}</p>
        ${questions.map((q, index) => `
            <p>Q${index + 1}: ${q.question}<br>Correct Answer: ${q.correct}</p>
        `).join('')}
    `;
    backToSubjectsBtn.style.display = 'block';
    submitQuizBtn.style.display = 'none';
});

// Go back to the subject dashboard
function goBackToSubjects() {
    quizPage.style.display = 'none';
    showSubjectPage();
}
backToSubjectsBtn.addEventListener('click', goBackToSubjects);
