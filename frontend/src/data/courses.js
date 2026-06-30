// Sample content for the learning platform. The user will refine lesson content later.
// Lesson types: "theory" | "choice" | "code" | "fill"

export const TRACKS = {
  programming: {
    id: "programming",
    name: "Программирование",
    short: "JavaScript",
    icon: "Code2",
    color: "#22c55e",
    colorDark: "#16a34a",
    tint: "bg-emerald-50",
    gradient: "from-emerald-400 to-green-600",
    description: "Изучай JavaScript с нуля шаг за шагом.",
  },
  design: {
    id: "design",
    name: "Дизайн",
    short: "UI / UX",
    icon: "Palette",
    color: "#ec4899",
    colorDark: "#db2777",
    tint: "bg-pink-50",
    gradient: "from-pink-400 to-rose-600",
    description: "Основы визуального и продуктового дизайна.",
  },
  english: {
    id: "english",
    name: "Английский",
    short: "Tech English",
    icon: "Languages",
    color: "#6366f1",
    colorDark: "#4f46e5",
    tint: "bg-indigo-50",
    gradient: "from-indigo-400 to-violet-600",
    description: "Технический английский для программистов.",
  },
};

export const COURSES = {
  programming: [
    {
      id: "js-unit-1",
      title: "Основы JavaScript",
      subtitle: "Переменные и типы данных",
      lessons: [
        {
          id: "js-1-1",
          title: "Что такое переменная",
          type: "theory",
          xp: 10,
          cards: [
            {
              heading: "Переменные",
              body: "Переменная — это контейнер для хранения данных. В JavaScript мы объявляем переменные с помощью let, const или var.",
              code: "let age = 25;\nconst name = \"Анна\";",
            },
            {
              heading: "let vs const",
              body: "let позволяет менять значение позже. const создаёт константу, которую нельзя переназначить.",
              code: "let score = 10;\nscore = 20; // OK\n\nconst pi = 3.14;\n// pi = 3; // Ошибка!",
            },
          ],
        },
        {
          id: "js-1-2",
          title: "Типы данных",
          type: "choice",
          xp: 15,
          questions: [
            {
              prompt: "Какое ключевое слово создаёт неизменяемую переменную?",
              options: ["var", "const", "let", "static"],
              answer: 1,
            },
            {
              prompt: "Какой тип данных у значения true?",
              options: ["string", "number", "boolean", "object"],
              answer: 2,
            },
            {
              prompt: "Что выведет typeof \"hello\" ?",
              options: ["text", "string", "char", "word"],
              answer: 1,
            },
          ],
        },
        {
          id: "js-1-3",
          title: "Собери код",
          type: "code",
          xp: 20,
          questions: [
            {
              prompt: "Собери строку, которая объявляет константу name со значением \"Sam\"",
              blocks: ["const", "name", "=", "\"Sam\"", ";"],
              answer: ["const", "name", "=", "\"Sam\"", ";"],
            },
            {
              prompt: "Собери цикл, который выводит i от 0 до 2",
              blocks: ["for", "(let i = 0;", "i < 3;", "i++)", "console.log(i);"],
              answer: ["for", "(let i = 0;", "i < 3;", "i++)", "console.log(i);"],
            },
          ],
        },
        {
          id: "js-1-4",
          title: "Заполни пропуск",
          type: "fill",
          xp: 15,
          questions: [
            {
              prompt: "Заполни пропуск, чтобы вывести текст в консоль:",
              template: "console.____(\"Hi\");",
              options: ["log", "print", "write", "show"],
              answer: 0,
            },
            {
              prompt: "Заполни пропуск, чтобы объявить переменную:",
              template: "____ count = 0;",
              options: ["int", "let", "make", "set"],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "js-unit-2",
      title: "Функции",
      subtitle: "Создание и вызов функций",
      lessons: [
        {
          id: "js-2-1",
          title: "Что такое функция",
          type: "theory",
          xp: 10,
          cards: [
            {
              heading: "Функции",
              body: "Функция — это блок кода, который можно вызывать многократно. Она может принимать аргументы и возвращать результат.",
              code: "function add(a, b) {\n  return a + b;\n}\nadd(2, 3); // 5",
            },
            {
              heading: "Стрелочные функции",
              body: "Современный короткий синтаксис для функций в JavaScript.",
              code: "const add = (a, b) => a + b;",
            },
          ],
        },
        {
          id: "js-2-2",
          title: "Вызов функций",
          type: "choice",
          xp: 15,
          questions: [
            {
              prompt: "Что вернёт функция add(2,3) { return a+b }?",
              options: ["23", "5", "undefined", "ошибка"],
              answer: 1,
            },
            {
              prompt: "Какой синтаксис создаёт стрелочную функцию?",
              options: ["() => {}", "func() {}", "def()", "=> func"],
              answer: 0,
            },
          ],
        },
        {
          id: "js-2-3",
          title: "Собери функцию",
          type: "code",
          xp: 20,
          questions: [
            {
              prompt: "Собери стрелочную функцию double, удваивающую n",
              blocks: ["const double", "=", "(n)", "=>", "n * 2;"],
              answer: ["const double", "=", "(n)", "=>", "n * 2;"],
            },
          ],
        },
      ],
    },
  ],
  design: [
    {
      id: "ds-unit-1",
      title: "Основы дизайна",
      subtitle: "Цвет, контраст, иерархия",
      lessons: [
        {
          id: "ds-1-1",
          title: "Визуальная иерархия",
          type: "theory",
          xp: 10,
          cards: [
            {
              heading: "Иерархия",
              body: "Визуальная иерархия направляет взгляд пользователя. Размер, цвет и контраст определяют, что важнее на экране.",
            },
            {
              heading: "Контраст",
              body: "Высокий контраст между текстом и фоном улучшает читаемость и доступность интерфейса.",
            },
          ],
        },
        {
          id: "ds-1-2",
          title: "Основы цвета",
          type: "choice",
          xp: 15,
          questions: [
            {
              prompt: "Что улучшает читаемость текста?",
              options: ["Низкий контраст", "Высокий контраст", "Мелкий шрифт", "Серый на сером"],
              answer: 1,
            },
            {
              prompt: "Сколько основных цветов рекомендуют в палитре интерфейса?",
              options: ["1", "2-3", "8-10", "Чем больше тем лучше"],
              answer: 1,
            },
          ],
        },
        {
          id: "ds-1-3",
          title: "Заполни принцип",
          type: "fill",
          xp: 15,
          questions: [
            {
              prompt: "Заполни принцип дизайна:",
              template: "Близкие элементы воспринимаются как ____.",
              options: ["группа", "ошибка", "текст", "фон"],
              answer: 0,
            },
          ],
        },
      ],
    },
    {
      id: "ds-unit-2",
      title: "Типографика",
      subtitle: "Шрифты и интервалы",
      lessons: [
        {
          id: "ds-2-1",
          title: "Шрифтовые пары",
          type: "theory",
          xp: 10,
          cards: [
            {
              heading: "Парные шрифты",
              body: "Хорошая пара шрифтов: один для заголовков, другой для текста. Контраст по начертанию создаёт ритм.",
            },
          ],
        },
        {
          id: "ds-2-2",
          title: "Проверка знаний",
          type: "choice",
          xp: 15,
          questions: [
            {
              prompt: "Сколько шрифтов обычно достаточно для интерфейса?",
              options: ["1-2", "5-6", "10+", "Не важно"],
              answer: 0,
            },
          ],
        },
      ],
    },
  ],
  english: [
    {
      id: "en-unit-1",
      title: "Tech Vocabulary",
      subtitle: "Базовые слова разработчика",
      lessons: [
        {
          id: "en-1-1",
          title: "Common Terms",
          type: "theory",
          xp: 10,
          cards: [
            {
              heading: "Bug & Fix",
              body: "A 'bug' is an error in the code. To 'fix' a bug means to repair it. Пример: I need to fix this bug.",
            },
            {
              heading: "Deploy",
              body: "'Deploy' means to publish your application so users can access it. Пример: We deploy on Friday.",
            },
          ],
        },
        {
          id: "en-1-2",
          title: "Translate",
          type: "choice",
          xp: 15,
          questions: [
            {
              prompt: "Как переводится слово 'deploy'?",
              options: ["удалить", "развернуть / опубликовать", "тестировать", "писать"],
              answer: 1,
            },
            {
              prompt: "Что значит 'merge a branch'?",
              options: ["удалить ветку", "слить ветку", "создать файл", "запустить тест"],
              answer: 1,
            },
            {
              prompt: "Translate: 'I will fix the bug.'",
              options: ["Я создам ошибку", "Я исправлю баг", "Я найду баг", "Я игнорирую баг"],
              answer: 1,
            },
          ],
        },
        {
          id: "en-1-3",
          title: "Fill the sentence",
          type: "fill",
          xp: 15,
          questions: [
            {
              prompt: "Choose the right word:",
              template: "Let's ____ the new feature to production.",
              options: ["deploy", "delete", "drink", "draw"],
              answer: 0,
            },
            {
              prompt: "Choose the right word:",
              template: "There is a ____ in the login page.",
              options: ["bug", "dog", "bag", "big"],
              answer: 0,
            },
          ],
        },
      ],
    },
    {
      id: "en-unit-2",
      title: "Code Reviews",
      subtitle: "Фразы для ревью кода",
      lessons: [
        {
          id: "en-2-1",
          title: "Review phrases",
          type: "theory",
          xp: 10,
          cards: [
            {
              heading: "LGTM",
              body: "'LGTM' = Looks Good To Me. Используется при одобрении кода в ревью.",
            },
          ],
        },
        {
          id: "en-2-2",
          title: "Quiz",
          type: "choice",
          xp: 15,
          questions: [
            {
              prompt: "Что значит 'LGTM'?",
              options: ["Let's go to meeting", "Looks good to me", "Large git tree merge", "Log get time"],
              answer: 1,
            },
          ],
        },
      ],
    },
  ],
};

export function getCourse(trackId) {
  return COURSES[trackId] || [];
}

export function findLesson(trackId, lessonId) {
  const units = getCourse(trackId);
  for (const unit of units) {
    const lesson = unit.lessons.find((l) => l.id === lessonId);
    if (lesson) return { lesson, unit };
  }
  return null;
}

export function getAllLessonsFlat(trackId) {
  return getCourse(trackId).flatMap((u) => u.lessons);
}
