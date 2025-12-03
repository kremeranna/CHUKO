const mediaQuery = window.matchMedia('(max-width: 833px)');

function handleScreenChange(e) {
  if (e.matches) {
    // Код для маленьких экранов
    console.log('Маленький экран');


    const modal = document.querySelector('.modal');
    const openBtns = document.querySelectorAll('.krestik-button');
    const closeBtns = document.querySelectorAll('.modal-krestik-button, .OK');

    modal.style.display = 'none'; // окно скрыто при загрузке

    openBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.style.display = 'flex'; // показываем окно по клику на любую кнопку с классом krestik-button
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.style.display = 'none'; // скрываем окно по клику на крестик или ОК
        });
    });





    const musicButtonn = document.getElementById('music-buttonn');
    const musicIconn = document.getElementById('music-iconn');
    const backgroundMusic = document.getElementById('background-music');

    let isPlaying = false;

    musicButtonn.addEventListener('click', () => {
      if (isPlaying) {
        backgroundMusic.pause();
        musicIconn.src = 'img/music44.png';
        musicIconn.alt = 'Music Off';
      } else {
        backgroundMusic.play();
        musicIconn.src = 'img/musicc.png';
        musicIconn.alt = 'Music On';
      }
      isPlaying = !isPlaying;
    });


    const cursor = document.querySelector('.custom-cursor');

    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
      cursor.style.backgroundImage = "url('img/mouse2.png')";
    });

    document.addEventListener('mouseup', () => {
      cursor.style.backgroundImage = "url('img/mouse.png')";
    });




    const texts = [
      [
        "Мы — молодая и креативная команда разработчиков,",
        "увлеченных идеей создания устойчивого будущего."
      ],
      [
        "Пройдя долгий путь, мы готовы представить",
        "приложение способное изменить ваш взгляд",
        "на обычную покупку товаров."
      ],
      [
        "Присоединяйтесь к нам и создавайте будущее,",
        "где каждая вещь найдет своего нового владельца,",
        "а каждый из нас может внести свой вклад в заботу",
        "о нашей планете."
      ],
      [
        "Подари вторую жизнь старым вещам!"
      ]
    ];

    const container = document.getElementById('animated-text');

    async function typeLine(line, delay = 40) {
      let text = '';
      for (let char of line) {
        text += char;
        container.lastChild.textContent = text;
        await new Promise(r => setTimeout(r, delay));
      }
    }

    async function typeBlock(lines) {
      container.innerHTML = '';
      for (const line of lines) {
        const div = document.createElement('div');
        container.appendChild(div);
        await typeLine(line);
        await new Promise(r => setTimeout(r, 200));
      }
    }

    async function deleteBlockReverse() {
      const lines = Array.from(container.children);
      for (let i = lines.length - 1; i >= 0; i--) {
        while (lines[i].textContent.length > 0) {
          lines[i].textContent = lines[i].textContent.slice(0, -1);
          await new Promise(r => setTimeout(r, 20));
        }
        await new Promise(r => setTimeout(r, 100));
      }
    }

    async function playSequenceLoop() {
      while (true) {
        for (let i = 0; i < texts.length; i++) {
          await typeBlock(texts[i]);
          await new Promise(r => setTimeout(r, 1200));
          await deleteBlockReverse();
          await new Promise(r => setTimeout(r, 400));
        }
      }
    }

    playSequenceLoop();

    const modalSecond = document.querySelector('.modal-second');
    const openSecondBtns = document.querySelectorAll('.OTPRAVIT');
    const closeSecondBtns = document.querySelectorAll('.modal-krestik-button2, .OK2');

    modalSecond.style.display = 'none'; // скрываем окно при загрузке

    // Открываем окно по клику на кнопку "Отправить"
    openSecondBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modalSecond.style.display = 'flex';
      });
    });

    // Закрываем окно по клику на все кнопки закрытия (крестик и ОК)
    closeSecondBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modalSecond.style.display = 'none';
      });
    });

    // Закрываем окно по клику вне модального блока
    window.addEventListener('click', event => {
      if (event.target === modalSecond) {
        modalSecond.style.display = 'none';
      }
    });


    const inputName = document.querySelector('.ZAPOLN_pole1');
    const inputEmail = document.querySelector('.ZAPOLN_pole2');
    const inputQuestion = document.querySelector('.ZAPOLN_pole3');
    const btnSend = document.querySelector('.OTPRAVIT');

    btnSend.addEventListener('click', () => {
      // Очищаем поля
      inputName.value = '';
      inputEmail.value = '';
      inputQuestion.value = '';
    });


    const line = document.querySelector('.LINEotzyv');
    line.addEventListener('wheel', function(e) {
      if (e.deltaY !== 0) {
        e.preventDefault();
        line.scrollLeft += e.deltaY;
      }
    }, { passive: false });

    let direction = 1; // 1 — вправо, -1 — влево
    let autoScroll;

    function startAutoScroll() {
      autoScroll = setInterval(() => {
        // Прокручиваем плавно на 1px
        line.scrollLeft += direction;
        // Если дошли до конца — меняем направление
        if (line.scrollLeft + line.clientWidth >= line.scrollWidth) {
          direction = -1;
        }
        if (line.scrollLeft <= 0) {
          direction = 1;
        }
      }, 20); // скорость (меньше — быстрее)
    }

    function stopAutoScroll() {
      clearInterval(autoScroll);
    }

    // Останавливаем автопрокрутку при наведении мыши
    line.addEventListener('mouseenter', stopAutoScroll);
    line.addEventListener('mouseleave', startAutoScroll);

    // Запускаем автопрокрутку при загрузке
    startAutoScroll();



    document.addEventListener('DOMContentLoaded', () => {
      const mainBlock = document.getElementById('mainBlock');
      const originalContent = mainBlock.innerHTML;

      const videoContent = `
        <video controls autoplay loop muted>
          <source src="img/Video.mp4" type="video/mp4">
          Ваш браузер не поддерживает видео.
        </video>
      `;

      let showingVideo = false;

      mainBlock.addEventListener('click', () => {
        if (!showingVideo) {
          mainBlock.innerHTML = videoContent;
          mainBlock.classList.add('video-bg'); // Добавляем фон только при видео
          showingVideo = true;
        } else {
          mainBlock.innerHTML = originalContent;
          mainBlock.classList.remove('video-bg'); // Убираем фон
          showingVideo = false;
        }
      });
    });










  } else {
    // Код для больших экранов
    console.log('Большой экран');

    const modal = document.querySelector('.modal');
const openBtns = document.querySelectorAll('.krestik-button');
const closeBtns = document.querySelectorAll('.modal-krestik-button, .OK');

modal.style.display = 'none'; // окно скрыто при загрузке

openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.style.display = 'flex'; // показываем окно по клику на любую кнопку с классом krestik-button
    });
});

closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.style.display = 'none'; // скрываем окно по клику на крестик или ОК
    });
});





const musicButton = document.getElementById('music-button');
const musicIcon = document.getElementById('music-icon');
const backgroundMusic = document.getElementById('background-music');

let isPlaying = false;

musicButton.addEventListener('click', () => {
  if (isPlaying) {
    backgroundMusic.pause();
    musicIcon.src = 'img/music4.png';
    musicIcon.alt = 'Music Off';
  } else {
    backgroundMusic.play();
    musicIcon.src = 'img/music.png';
    musicIcon.alt = 'Music On';
  }
  isPlaying = !isPlaying;
});


const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
  cursor.style.backgroundImage = "url('img/mouse2.png')";
});

document.addEventListener('mouseup', () => {
  cursor.style.backgroundImage = "url('img/mouse.png')";
});




const texts = [
  [
    "Мы — молодая и креативная команда разработчиков,",
    "увлеченных идеей создания устойчивого будущего."
  ],
  [
    "Пройдя долгий путь, мы готовы представить",
    "приложение способное изменить ваш взгляд",
    "на обычную покупку товаров."
  ],
  [
    "Присоединяйтесь к нам и создавайте будущее,",
    "где каждая вещь найдет своего нового владельца,",
    "а каждый из нас может внести свой вклад в заботу",
    "о нашей планете."
  ],
  [
    "Подари вторую жизнь старым вещам!"
  ]
];

const container = document.getElementById('animated-text');

async function typeLine(line, delay = 40) {
  let text = '';
  for (let char of line) {
    text += char;
    container.lastChild.textContent = text;
    await new Promise(r => setTimeout(r, delay));
  }
}

async function typeBlock(lines) {
  container.innerHTML = '';
  for (const line of lines) {
    const div = document.createElement('div');
    container.appendChild(div);
    await typeLine(line);
    await new Promise(r => setTimeout(r, 200));
  }
}

async function deleteBlockReverse() {
  const lines = Array.from(container.children);
  for (let i = lines.length - 1; i >= 0; i--) {
    while (lines[i].textContent.length > 0) {
      lines[i].textContent = lines[i].textContent.slice(0, -1);
      await new Promise(r => setTimeout(r, 20));
    }
    await new Promise(r => setTimeout(r, 100));
  }
}

async function playSequenceLoop() {
  while (true) {
    for (let i = 0; i < texts.length; i++) {
      await typeBlock(texts[i]);
      await new Promise(r => setTimeout(r, 1200));
      await deleteBlockReverse();
      await new Promise(r => setTimeout(r, 400));
    }
  }
}

playSequenceLoop();

const modalSecond = document.querySelector('.modal-second');
const openSecondBtns = document.querySelectorAll('.OTPRAVIT');
const closeSecondBtns = document.querySelectorAll('.modal-krestik-button2, .OK2');

modalSecond.style.display = 'none'; // скрываем окно при загрузке

// Открываем окно по клику на кнопку "Отправить"
openSecondBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    modalSecond.style.display = 'flex';
  });
});

// Закрываем окно по клику на все кнопки закрытия (крестик и ОК)
closeSecondBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    modalSecond.style.display = 'none';
  });
});

// Закрываем окно по клику вне модального блока
window.addEventListener('click', event => {
  if (event.target === modalSecond) {
    modalSecond.style.display = 'none';
  }
});


const inputName = document.querySelector('.ZAPOLN_pole1');
const inputEmail = document.querySelector('.ZAPOLN_pole2');
const inputQuestion = document.querySelector('.ZAPOLN_pole3');
const btnSend = document.querySelector('.OTPRAVIT');

btnSend.addEventListener('click', () => {
  // Очищаем поля
  inputName.value = '';
  inputEmail.value = '';
  inputQuestion.value = '';
});


const line = document.querySelector('.LINEotzyv');
line.addEventListener('wheel', function(e) {
  if (e.deltaY !== 0) {
    e.preventDefault();
    line.scrollLeft += e.deltaY;
  }
}, { passive: false });

let direction = 1; // 1 — вправо, -1 — влево
let autoScroll;

function startAutoScroll() {
  autoScroll = setInterval(() => {
    // Прокручиваем плавно на 1px
    line.scrollLeft += direction;
    // Если дошли до конца — меняем направление
    if (line.scrollLeft + line.clientWidth >= line.scrollWidth) {
      direction = -1;
    }
    if (line.scrollLeft <= 0) {
      direction = 1;
    }
  }, 20); // скорость (меньше — быстрее)
}

function stopAutoScroll() {
  clearInterval(autoScroll);
}

// Останавливаем автопрокрутку при наведении мыши
line.addEventListener('mouseenter', stopAutoScroll);
line.addEventListener('mouseleave', startAutoScroll);

// Запускаем автопрокрутку при загрузке
startAutoScroll();



document.addEventListener('DOMContentLoaded', () => {
  const mainBlock = document.getElementById('mainBlock');
  const originalContent = mainBlock.innerHTML;

  const videoContent = `
    <video controls autoplay loop muted>
      <source src="img/Video.mp4" type="video/mp4">
      Ваш браузер не поддерживает видео.
    </video>
  `;

  let showingVideo = false;

  mainBlock.addEventListener('click', () => {
    if (!showingVideo) {
      mainBlock.innerHTML = videoContent;
      mainBlock.classList.add('video-bg'); // Добавляем фон только при видео
      showingVideo = true;
    } else {
      mainBlock.innerHTML = originalContent;
      mainBlock.classList.remove('video-bg'); // Убираем фон
      showingVideo = false;
    }
  });
});



  }
}
handleScreenChange(mediaQuery);
mediaQuery.addEventListener('change', handleScreenChange);


