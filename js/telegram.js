// telegram-fix.js - Решение проблемы с полями формы

(function() {
    'use strict';
    
    console.log('🔄 Запускаем фикс формы...');
    
    const BOT_TOKEN = '7753728710:AAHtoiZjBAPcVMpmiOw7NLzqDkCrHNA_2H8';
    const CHAT_ID = '-1003326967947';
    
    // Объект для хранения значений формы
    const formValues = {
        name: '',
        email: '',
        question: ''
    };
    
    // Инициализация после полной загрузки
    setTimeout(initializeForm, 1000);
    
    function initializeForm() {
        console.log('🎯 Инициализирую форму...');
        
        // Находим кнопку отправки
        const sendButton = document.querySelector('.OTPRAVIT');
        
        if (!sendButton) {
            console.error('❌ Кнопка OTPRAVIT не найдена');
            return;
        }
        
        console.log('✅ Кнопка найдена:', sendButton);
        
        // Удаляем все старые обработчики с кнопки
        const newButton = sendButton.cloneNode(true);
        sendButton.parentNode.replaceChild(newButton, sendButton);
        
        // Находим поля формы
        const nameField = document.querySelector('.ZAPOLN_pole1');
        const emailField = document.querySelector('.ZAPOLN_pole2');
        const questionField = document.querySelector('.ZAPOLN_pole3');
        
        console.log('📝 Поля формы:');
        console.log('Имя:', nameField);
        console.log('Email:', emailField);
        console.log('Вопрос:', questionField);
        
        // Сохраняем ссылки на поля
        window.formFields = { nameField, emailField, questionField };
        
        // Добавляем обработчики изменения для полей
        if (nameField) {
            nameField.addEventListener('input', function(e) {
                formValues.name = e.target.value;
                console.log('Имя изменено:', formValues.name);
            });
        }
        
        if (emailField) {
            emailField.addEventListener('input', function(e) {
                formValues.email = e.target.value;
                console.log('Email изменен:', formValues.email);
            });
        }
        
        if (questionField) {
            questionField.addEventListener('input', function(e) {
                formValues.question = e.target.value;
                console.log('Вопрос изменен:', formValues.question);
            });
        }
        
        // Добавляем новый обработчик на кнопку
        newButton.addEventListener('click', handleFormSubmit);
        
        console.log('✅ Форма инициализирована');
    }
    
    function handleFormSubmit(event) {
        console.log('🎯 Событие отправки формы поймано!');
        
        event.preventDefault();
        event.stopPropagation();
        
        // Получаем значения из объекта formValues
        const name = formValues.name || '';
        const email = formValues.email || '';
        const question = formValues.question || '';
        
        console.log('📋 Данные из formValues:', { name, email, question });
        
        // Альтернативно: получаем значения напрямую из полей
        const nameField = window.formFields?.nameField || document.querySelector('.ZAPOLN_pole1');
        const emailField = window.formFields?.emailField || document.querySelector('.ZAPOLN_pole2');
        const questionField = window.formFields?.questionField || document.querySelector('.ZAPOLN_pole3');
        
        const directName = nameField?.value || '';
        const directEmail = emailField?.value || '';
        const directQuestion = questionField?.value || '';
        
        console.log('📋 Данные напрямую из полей:', { directName, directEmail, directQuestion });
        
        // Используем оба метода для надежности
        const finalName = name || directName;
        const finalEmail = email || directEmail;
        const finalQuestion = question || directQuestion;
        
        console.log('📋 Финальные данные:', { finalName, finalEmail, finalQuestion });
        
        // Проверка заполнения
        if (!finalName.trim()) {
            alert('Пожалуйста, введите ваше имя');
            return;
        }
        
        if (!finalEmail.trim()) {
            alert('Пожалуйста, введите ваш email');
            return;
        }
        
        if (!finalQuestion.trim()) {
            alert('Пожалуйста, введите ваш вопрос');
            return;
        }
        
        // Проверка email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(finalEmail)) {
            alert('Пожалуйста, введите корректный email адрес (например: name@example.com)');
            return;
        }
        
        // Отправляем в Telegram
        sendToTelegram(finalName, finalEmail, finalQuestion);
    }
    
    function sendToTelegram(name, email, question) {
        const message = `📨 НОВАЯ ЗАЯВКА С CHUKO\n\n` +
                       `👤 Имя: ${name}\n` +
                       `📧 Email: ${email}\n` +
                       `❓ Вопрос: ${question}\n\n` +
                       `⏰ Время: ${new Date().toLocaleString('ru-RU')}`;
        
        console.log('📤 Отправляю сообщение:', message);
        
        // Показываем загрузку
        const button = document.querySelector('.OTPRAVIT');
        const originalText = button.textContent;
        button.textContent = 'Отправка...';
        button.disabled = true;
        
        // Метод 1: Используем FormData для отправки
        const formData = new FormData();
        formData.append('chat_id', CHAT_ID);
        formData.append('text', message);
        
        fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('✅ Ответ от Telegram:', data);
            
            if (data.ok) {
                showSuccessModal();
                clearForm();
            } else {
                alert('Ошибка отправки: ' + (data.description || 'Неизвестная ошибка'));
            }
        })
        .catch(error => {
            console.error('❌ Ошибка:', error);
            alert('Произошла ошибка сети. Пожалуйста, попробуйте еще раз.');
        })
        .finally(() => {
            button.textContent = originalText;
            button.disabled = false;
        });
    }
    
    function showSuccessModal() {
        // Показываем существующее модальное окно
        const modal = document.querySelector('.modal.modal-second');
        if (modal) {
            modal.style.display = 'block';
            
            // Автоматически скрываем через 3 секунды
            setTimeout(() => {
                modal.style.display = 'none';
            }, 3000);
        } else {
            alert('✅ Сообщение отправлено! Спасибо!');
        }
    }
    
    function clearForm() {
        // Очищаем объект значений
        formValues.name = '';
        formValues.email = '';
        formValues.question = '';
        
        // Очищаем поля ввода
        const nameField = window.formFields?.nameField || document.querySelector('.ZAPOLN_pole1');
        const emailField = window.formFields?.emailField || document.querySelector('.ZAPOLN_pole2');
        const questionField = window.formFields?.questionField || document.querySelector('.ZAPOLN_pole3');
        
        if (nameField) nameField.value = '';
        if (emailField) emailField.value = '';
        if (questionField) questionField.value = '';
    }
    
    // Экспортируем функцию для отладки
    window.debugForm = function() {
        console.log('=== ОТЛАДКА ФОРМЫ ===');
        console.log('formValues:', formValues);
        console.log('Поля формы:');
        console.log('.ZAPOLN_pole1:', document.querySelector('.ZAPOLN_pole1')?.value);
        console.log('.ZAPOLN_pole2:', document.querySelector('.ZAPOLN_pole2')?.value);
        console.log('.ZAPOLN_pole3:', document.querySelector('.ZAPOLN_pole3')?.value);
    };
    
    console.log('✅ Telegram-fix скрипт загружен');
})();