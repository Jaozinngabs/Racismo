document.addEventListener('DOMContentLoaded', function() {
    // Configuração do quiz
    const quizData = [
        {
            question: "Quem fundou os Racionais MC's?",
            options: ["Emicida", "Mano Brown", "Criolo", "MV Bill"],
            correct: 1,
            feedback: "Correto! Mano Brown foi um dos fundadores dos Racionais MC's, grupo formado em 1988."
        },
        {
            question: "Qual orixá está associado ao mar?",
            options: ["Oxóssi", "Ogum", "Iemanjá", "Xangô"],
            correct: 2,
            feedback: "Exato! Iemanjá é a orixá das águas salgadas, mãe de quase todos os orixás."
        },
        {
            question: "Em 'Cidade de Deus', qual o principal tema tratado?",
            options: ["O amor romântico", "A violência urbana e exclusão", "A imigração japonesa", "O futebol brasileiro"],
            correct: 1,
            feedback: "Isso mesmo! O filme retrata a violência e exclusão social nas favelas do Rio de Janeiro."
        },
        {
            question: "Qual prática brasileira mistura dança e luta?",
            options: ["Frevo", "Capoeira", "Maracatu", "Jongo"],
            correct: 1,
            feedback: "Correto! A capoeira foi desenvolvida por africanos escravizados no Brasil como forma de resistência."
        },
        {
            question: "Quem escreveu 'Pequeno Manual Antirracista'?",
            options: ["Conceição Evaristo", "Djamila Ribeiro", "Lélia Gonzalez", "Sueli Carneiro"],
            correct: 1,
            feedback: "Exato! Djamila Ribeiro é uma importante filósofa e ativista antirracista brasileira."
        }
    ];

    // Elementos do DOM
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const feedbackContainer = document.getElementById('feedback-container');
    const feedbackText = document.getElementById('feedback-text');
    const nextButton = document.getElementById('next-button');
    const resultContainer = document.getElementById('result-container');
    const scoreContainer = document.getElementById('score-container');
    const correctAnswersElement = document.getElementById('correct-answers');
    const totalQuestionsElement = document.getElementById('total-questions');
    const resultMessage = document.getElementById('result-message');
    const restartButton = document.getElementById('restart-button');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');

    // Variáveis do quiz
    let currentQuestion = 0;
    let score = 0;
    let selectedOption = null;

    // Inicializar quiz
    function initQuiz() {
        currentQuestion = 0;
        score = 0;
        showQuestion();
        resultContainer.style.display = 'none';
        feedbackContainer.style.display = 'none';
    }

    // Mostrar pergunta
    function showQuestion() {
        const question = quizData[currentQuestion];
        questionText.textContent = question.question;
        
        // Atualizar barra de progresso
        progressBar.style.width = `${(currentQuestion / quizData.length) * 100}%`;
        progressText.textContent = `${currentQuestion + 1}/${quizData.length}`;
        
        // Limpar opções anteriores
        optionsContainer.innerHTML = '';
        
        // Adicionar novas opções
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('quiz-option');
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => selectOption(index));
            optionsContainer.appendChild(optionElement);
        });
        
        // Resetar seleção
        selectedOption = null;
        nextButton.disabled = true;
    }

    // Selecionar opção
    function selectOption(index) {
        // Remover seleção anterior
        const options = document.querySelectorAll('.quiz-option');
        options.forEach(option => option.classList.remove('selected'));
        
        // Marcar opção selecionada
        options[index].classList.add('selected');
        selectedOption = index;
        nextButton.disabled = false;
    }

    // Verificar resposta
    function checkAnswer() {
        const question = quizData[currentQuestion];
        const options = document.querySelectorAll('.quiz-option');
        
        // Mostrar feedback
        feedbackContainer.style.display = 'block';
        
        if (selectedOption === question.correct) {
            feedbackText.textContent = question.feedback;
            options[selectedOption].classList.add('correct');
            score++;
        } else {
            feedbackText.textContent = `Resposta incorreta. A resposta correta é: ${question.options[question.correct]}`;
            options[selectedOption].classList.add('incorrect');
            options[question.correct].classList.add('correct');
        }
        
        // Desabilitar cliques nas opções
        options.forEach(option => {
            option.style.pointerEvents = 'none';
        });
    }

    // Próxima pergunta
    function nextQuestion() {
        currentQuestion++;
        
        if (currentQuestion < quizData.length) {
            showQuestion();
            feedbackContainer.style.display = 'none';
        } else {
            showResult();
        }
    }

    // Mostrar resultado
    function showResult() {
        questionContainer.style.display = 'none';
        feedbackContainer.style.display = 'none';
        resultContainer.style.display = 'block';
        
        // Atualizar barra de progresso para 100%
        progressBar.style.width = '100%';
        
        // Mostrar pontuação
        correctAnswersElement.textContent = score;
        totalQuestionsElement.textContent = quizData.length;
        
        // Mensagem personalizada baseada na pontuação
        const percentage = (score / quizData.length) * 100;
        
        if (percentage >= 80) {
            resultMessage.textContent = "Parabéns! Você demonstrou excelente conhecimento sobre a cultura negra brasileira.";
        } else if (percentage >= 50) {
            resultMessage.textContent = "Bom trabalho! Você tem um conhecimento básico, mas ainda pode aprender mais.";
        } else {
            resultMessage.textContent = "Que tal revisar o conteúdo e tentar novamente? A cultura negra brasileira é riquíssima e vale a pena conhecer!";
        }
    }

    // Event listeners
    nextButton.addEventListener('click', function() {
        checkAnswer();
        setTimeout(nextQuestion, 1500);
    });
    
    restartButton.addEventListener('click', initQuiz);

    // Iniciar quiz quando a página carrega
    initQuiz();
}); 