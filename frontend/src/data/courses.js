// Контент платформы: Этичный хакинг + технический английский
// Lesson types: "theory" | "choice" | "code" | "fill"

export const TRACKS = {
  hacking: {
    id: "hacking",
    name: "Хакинг",
    short: "Pentest",
    icon: "Terminal",
    color: "#22c55e",
    colorDark: "#16a34a",
    tint: "bg-emerald-50",
    gradient: "from-emerald-400 to-green-600",
    description: "Этичный хакинг с нуля: разведка, эксплуатация, пароли.",
  },
  english: {
    id: "english",
    name: "Английский",
    short: "Hacker English",
    icon: "Languages",
    color: "#6366f1",
    colorDark: "#4f46e5",
    tint: "bg-indigo-50",
    gradient: "from-indigo-400 to-violet-600",
    description: "Английский через хакерскую терминологию.",
  },
};

export const COURSES = {
  hacking: [
    {
      id: "hack-unit-1",
      title: "Основы Linux и сети",
      subtitle: "Первые шаги в Kali",
      lessons: [
        {
          id: "hack-1-1",
          title: "Kali Linux и виртуалки",
          type: "theory",
          xp: 10,
          cards: [
            {
              heading: "Зачем виртуальная машина",
              body: "VM (Virtual Machine) изолирует Kali от основной системы. Снапшоты позволяют откатиться назад за секунды, если что-то сломалось.",
              code: "sudo apt update\nsudo apt upgrade -y",
            },
            {
              heading: "update vs upgrade",
              body: "update — обновляет список доступных пакетов. upgrade — устанавливает сами обновления. Делать всегда по очереди.",
            },
          ],
        },
        {
          id: "hack-1-2",
          title: "Сетевые адреса",
          type: "choice",
          xp: 15,
          questions: [
            {
              prompt: "Какая команда покажет твой IP-адрес в Linux?",
              options: ["ip a", "show ip", "ipconfig", "netstat -a"],
              answer: 0,
            },
            {
              prompt: "Что значит адрес 127.0.0.1?",
              options: ["IP шлюза", "Loopback — компьютер сам с собой", "Адрес роутера", "DNS сервер"],
              answer: 1,
            },
            {
              prompt: "Что означает /24 после IP-адреса (например 192.168.1.0/24)?",
              options: ["Версия протокола", "Маска подсети", "Номер порта", "MAC адрес"],
              answer: 1,
            },
          ],
        },
        {
          id: "hack-1-3",
          title: "Собери команду",
          type: "code",
          xp: 20,
          questions: [
            {
              prompt: "Собери команду чтобы посмотреть сетевые интерфейсы",
              blocks: ["ip", "a"],
              answer: ["ip", "a"],
            },
            {
              prompt: "Собери команду обновления списка пакетов",
              blocks: ["sudo", "apt", "update"],
              answer: ["sudo", "apt", "update"],
            },
          ],
        },
      ],
    },
    {
      id: "hack-unit-2",
      title: "Разведка (Reconnaissance)",
      subtitle: "nmap — сканирование сети",
      lessons: [
        {
          id: "hack-2-1",
          title: "Что такое nmap",
          type: "theory",
          xp: 10,
          cards: [
            {
              heading: "Network Mapper",
              body: "nmap (Network Mapper) — инструмент для сканирования сети. Показывает какие устройства онлайн и какие порты открыты.",
              code: "nmap 192.168.1.0/24",
            },
            {
              heading: "Состояния портов",
              body: "open — сервис слушает и принимает соединения. closed — порт закрыт, хост отвечает. filtered — firewall блокирует, хост молчит.",
            },
            {
              heading: "Флаг -sV",
              body: "-sV (service Version) определяет версию сервиса на открытом порту. Зная версию, можно искать известные уязвимости (CVE).",
              code: "nmap -sV 192.168.56.102",
            },
          ],
        },
        {
          id: "hack-2-2",
          title: "Чтение вывода nmap",
          type: "choice",
          xp: 15,
          questions: [
            {
              prompt: "Что значит состояние порта 'open'?",
              options: ["Порт закрыт", "Сервис слушает, можно подключиться", "Хост недоступен", "Ошибка сканирования"],
              answer: 1,
            },
            {
              prompt: "Для чего нужен флаг -sV в nmap?",
              options: ["Ускорить сканирование", "Определить версию сервиса", "Сканировать только TCP", "Скрыть сканирование"],
              answer: 1,
            },
            {
              prompt: "Что значит 'filtered' порт?",
              options: ["Порт открыт", "Firewall блокирует трафик", "Сервис не установлен", "Ошибка DNS"],
              answer: 1,
            },
            {
              prompt: "CVE — это база данных...",
              options: ["Паролей", "Известных уязвимостей", "IP-адресов", "Доменных имён"],
              answer: 1,
            },
          ],
        },
        {
          id: "hack-2-3",
          title: "Собери сканирование",
          type: "code",
          xp: 20,
          questions: [
            {
              prompt: "Собери команду: просканировать всю подсеть 10.0.2.0/24",
              blocks: ["nmap", "10.0.2.0/24"],
              answer: ["nmap", "10.0.2.0/24"],
            },
            {
              prompt: "Собери команду: определить версии сервисов на цели 192.168.56.102",
              blocks: ["nmap", "-sV", "192.168.56.102"],
              answer: ["nmap", "-sV", "192.168.56.102"],
            },
            {
              prompt: "Собери команду: просканировать порты с 1 по 1000",
              blocks: ["nmap", "-p", "1-1000", "192.168.56.102"],
              answer: ["nmap", "-p", "1-1000", "192.168.56.102"],
            },
          ],
        },
        {
          id: "hack-2-4",
          title: "Заполни пропуск",
          type: "fill",
          xp: 15,
          questions: [
            {
              prompt: "Заполни пропуск:",
              template: "nmap ____ 192.168.1.5  — покажет версии сервисов",
              options: ["-sV", "-p", "-v", "-h"],
              answer: 0,
            },
            {
              prompt: "Заполни пропуск:",
              template: "Порт в состоянии ____ означает firewall блокирует доступ",
              options: ["open", "filtered", "closed", "active"],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "hack-unit-3",
      title: "Подключение к портам",
      subtitle: "netcat — швейцарский нож хакера",
      lessons: [
        {
          id: "hack-3-1",
          title: "Что такое netcat",
          type: "theory",
          xp: 10,
          cards: [
            {
              heading: "nc — netcat",
              body: "netcat умеет подключаться к любому открытому порту, передавать файлы и слушать соединения. Используется и для атаки, и для администрирования.",
              code: "nc 192.168.56.102 1524",
            },
            {
              heading: "Backdoor (бэкдор)",
              body: "Backdoor — скрытая дверь в программе, оставленная случайно или специально, дающая доступ в обход обычной авторизации.",
            },
            {
              heading: "Передача файлов через nc",
              body: "На одной машине: nc -lvp 4444 < file.txt (слушает и отправляет). На другой: nc <IP> 4444 > file.txt (принимает и сохраняет).",
            },
          ],
        },
        {
          id: "hack-3-2",
          title: "Проверка понимания",
          type: "choice",
          xp: 15,
          questions: [
            {
              prompt: "Что делает команда nc 192.168.1.5 21?",
              options: ["Сканирует все порты", "Подключается к порту 21 на цели", "Удаляет файл", "Создаёт пользователя"],
              answer: 1,
            },
            {
              prompt: "Что значит backdoor?",
              options: ["Антивирус", "Скрытый вход в систему в обход защиты", "Тип firewall", "Шифрование паролей"],
              answer: 1,
            },
            {
              prompt: "Флаг -lvp в netcat означает режим...",
              options: ["Подключения к цели", "Прослушивания порта (listen)", "Удаления файла", "Сканирования сети"],
              answer: 1,
            },
          ],
        },
        {
          id: "hack-3-3",
          title: "Собери подключение",
          type: "code",
          xp: 20,
          questions: [
            {
              prompt: "Собери команду подключения к порту 1524 на 192.168.56.102",
              blocks: ["nc", "192.168.56.102", "1524"],
              answer: ["nc", "192.168.56.102", "1524"],
            },
          ],
        },
      ],
    },
    {
      id: "hack-unit-4",
      title: "Пользователи и пароли Linux",
      subtitle: "/etc/passwd, /etc/shadow",
      lessons: [
        {
          id: "hack-4-1",
          title: "Файлы пользователей",
          type: "theory",
          xp: 10,
          cards: [
            {
              heading: "/etc/passwd",
              body: "Содержит список всех пользователей системы: имя, uid, домашнюю папку, shell. Пароли тут НЕ хранятся (только заглушка x).",
              code: "cat /etc/passwd | grep root",
            },
            {
              heading: "/etc/shadow",
              body: "Хранит зашифрованные (хэшированные) пароли. Доступен только root. Формат: имя:$алгоритм$соль$хэш:...",
            },
            {
              heading: "Hash и Salt",
              body: "Hash — одностороннее шифрование пароля, обратно не раскодировать. Salt — случайная добавка, чтобы одинаковые пароли давали разные хэши.",
            },
          ],
        },
        {
          id: "hack-4-2",
          title: "Проверка понимания",
          type: "choice",
          xp: 15,
          questions: [
            {
              prompt: "Где хранятся зашифрованные пароли в Linux?",
              options: ["/etc/passwd", "/etc/shadow", "/etc/users", "/home/passwords"],
              answer: 1,
            },
            {
              prompt: "Зачем нужен 'salt' при хэшировании пароля?",
              options: ["Ускорить вход", "Чтобы одинаковые пароли давали разные хэши", "Сжать файл", "Шифровать имя пользователя"],
              answer: 1,
            },
            {
              prompt: "Можно ли превратить hash обратно в пароль напрямую?",
              options: ["Да, всегда", "Нет, хэш односторонний", "Только через VPN", "Только root может"],
              answer: 1,
            },
          ],
        },
        {
          id: "hack-4-3",
          title: "Заполни пропуск",
          type: "fill",
          xp: 15,
          questions: [
            {
              prompt: "Заполни пропуск:",
              template: "____ — это блок кода/программа, использующая уязвимость для атаки",
              options: ["Exploit", "Antivirus", "Firewall", "Browser"],
              answer: 0,
            },
            {
              prompt: "Заполни пропуск:",
              template: "Команда useradd hacker создаёт нового ____ в системе",
              options: ["пользователя", "пароль", "файл", "процесс"],
              answer: 0,
            },
          ],
        },
      ],
    },
    {
      id: "hack-unit-5",
      title: "Взлом паролей",
      subtitle: "John the Ripper",
      lessons: [
        {
          id: "hack-5-1",
          title: "Brute force и словари",
          type: "theory",
          xp: 10,
          cards: [
            {
              heading: "John the Ripper",
              body: "Программа для взлома хэшей паролей перебором (brute force) или по словарю (wordlist). Названа в честь Джека Потрошителя.",
              code: "sudo john shadow.txt\nsudo john shadow.txt --show",
            },
            {
              heading: "Wordlist vs Incremental",
              body: "Wordlist — перебор готового списка популярных паролей (быстро). Incremental — перебор ВСЕХ возможных комбинаций символов (медленно, но находит всё).",
            },
            {
              heading: "Почему пароли ломаются",
              body: "Простые пароли типа '123456789' или 'batman' взламываются за секунды по словарю. Длинные пароли со спецсимволами устойчивы к перебору.",
            },
          ],
        },
        {
          id: "hack-5-2",
          title: "Проверка понимания",
          type: "choice",
          xp: 15,
          questions: [
            {
              prompt: "Что такое wordlist?",
              options: ["Список IP адресов", "Готовый список паролей для перебора", "Список открытых портов", "История команд"],
              answer: 1,
            },
            {
              prompt: "Почему пароль 'Vova20067891!' сложнее взломать чем 'batman'?",
              options: ["Он короче", "Длиннее и есть цифры+спецсимволы", "Написан на русском", "Нет разницы"],
              answer: 1,
            },
            {
              prompt: "Кто такой John the Ripper в контексте программы?",
              options: ["Антивирус", "Инструмент для взлома хэшей паролей", "Сетевой сканер", "Firewall"],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "hack-unit-6",
      title: "Metasploit Framework",
      subtitle: "Готовые эксплойты",
      lessons: [
        {
          id: "hack-6-1",
          title: "Что такое Metasploit",
          type: "theory",
          xp: 10,
          cards: [
            {
              heading: "Exploit, Vulnerability, Payload",
              body: "Vulnerability — ошибка/баг в программе. Exploit — код, использующий эту ошибку. Payload — что происходит после успешной атаки (например доступ к shell).",
            },
            {
              heading: "Основные команды msfconsole",
              body: "search <название> — найти эксплойт. use <путь> — выбрать эксплойт. set RHOSTS <ip> — указать цель. set LHOST <свой ip> — куда вернётся сессия. run — запустить атаку.",
              code: "search vsftpd\nuse exploit/unix/ftp/vsftpd_234_backdoor\nset RHOSTS 192.168.56.102\nset LHOST 192.168.56.103\nrun",
            },
            {
              heading: "Meterpreter",
              body: "Продвинутая оболочка после успешного эксплойта. Работает в памяти жертвы, сложнее обнаружить чем обычный shell.",
            },
          ],
        },
        {
          id: "hack-6-2",
          title: "Проверка понимания",
          type: "choice",
          xp: 15,
          questions: [
            {
              prompt: "Что такое RHOSTS в Metasploit?",
              options: ["Твой собственный IP", "IP-адрес цели атаки", "Список паролей", "Версия эксплойта"],
              answer: 1,
            },
            {
              prompt: "Что такое LHOST?",
              options: ["IP цели", "Твой локальный IP, куда вернётся доступ", "Порт цели", "Имя пользователя"],
              answer: 1,
            },
            {
              prompt: "Что делает команда 'use <exploit>' в msfconsole?",
              options: ["Удаляет эксплойт", "Выбирает эксплойт для настройки", "Запускает атаку немедленно", "Сканирует сеть"],
              answer: 1,
            },
            {
              prompt: "Что такое Meterpreter?",
              options: ["Сетевой сканер", "Продвинутая оболочка после взлома, работает в памяти", "Список эксплойтов", "Firewall"],
              answer: 1,
            },
          ],
        },
        {
          id: "hack-6-3",
          title: "Собери атаку",
          type: "code",
          xp: 25,
          questions: [
            {
              prompt: "Собери команду поиска эксплойта для vsftpd",
              blocks: ["search", "vsftpd"],
              answer: ["search", "vsftpd"],
            },
            {
              prompt: "Собери команду указания цели атаки",
              blocks: ["set", "RHOSTS", "192.168.56.102"],
              answer: ["set", "RHOSTS", "192.168.56.102"],
            },
            {
              prompt: "Собери команду запуска эксплойта",
              blocks: ["run"],
              answer: ["run"],
            },
          ],
        },
      ],
    },
    {
      id: "hack-unit-7",
      title: "Права доступа и базовые команды",
      subtitle: "rwx, sudo, файлы",
      lessons: [
        {
          id: "hack-7-1",
          title: "Права доступа Linux",
          type: "theory",
          xp: 10,
          cards: [
            {
              heading: "rwx — три права",
              body: "r (read) — читать, w (write) — изменять, x (execute) — запускать. Права делятся на: владелец / группа / остальные.",
              code: "ls -la\n-rwx------ 1 root root 1188612 file",
            },
            {
              heading: "sudo",
              body: "sudo (SuperUser DO) — выполнить команду от имени суперпользователя (root), временно повысив права.",
            },
            {
              heading: "Базовые команды",
              body: "cat — читать файл. ls — список файлов. grep — искать строку. cp — копировать. rm — удалить. useradd — создать пользователя. passwd — сменить пароль.",
            },
          ],
        },
        {
          id: "hack-7-2",
          title: "Проверка понимания",
          type: "choice",
          xp: 15,
          questions: [
            {
              prompt: "Что означает право 'x' (execute) на файле?",
              options: ["Можно читать", "Можно запускать как программу", "Можно удалить", "Файл зашифрован"],
              answer: 1,
            },
            {
              prompt: "Что делает sudo перед командой?",
              options: ["Ускоряет выполнение", "Выполняет от имени root", "Шифрует команду", "Отменяет команду"],
              answer: 1,
            },
            {
              prompt: "Какая команда удаляет файл?",
              options: ["del", "rm", "cut", "erase"],
              answer: 1,
            },
          ],
        },
        {
          id: "hack-7-3",
          title: "Заполни пропуск",
          type: "fill",
          xp: 15,
          questions: [
            {
              prompt: "Заполни пропуск:",
              template: "____ -la /home  — покажет подробный список файлов с правами",
              options: ["ls", "cat", "grep", "find"],
              answer: 0,
            },
            {
              prompt: "Заполни пропуск:",
              template: "____ root /etc/shadow  — изменит пароль пользователя root",
              options: ["passwd", "useradd", "chmod", "ls"],
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
      title: "Network Basics",
      subtitle: "Базовые сетевые термины",
      lessons: [
        {
          id: "en-1-1",
          title: "Host, Port, Scan",
          type: "theory",
          xp: 10,
          cards: [
            {
              heading: "host /hoʊst/",
              body: "Host — любое устройство в сети. Пример: 'The host is up' — устройство онлайн.",
            },
            {
              heading: "port /pɔːrt/",
              body: "Port — 'дверь' в сервис на компьютере. Пример: 'Port 22 is open' — порт 22 открыт.",
            },
            {
              heading: "scan /skæn/",
              body: "Scan — сканирование, проверка портов/устройств. Пример: 'Scan the network' — просканируй сеть.",
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
              prompt: "Как переводится 'host is up'?",
              options: ["Хост недоступен", "Хост в сети / онлайн", "Хост удалён", "Хост зашифрован"],
              answer: 1,
            },
            {
              prompt: "Что значит 'open port'?",
              options: ["Закрытый порт", "Открытый порт", "Удалённый порт", "Зашифрованный порт"],
              answer: 1,
            },
            {
              prompt: "Translate: 'Scan all ports on the target.'",
              options: ["Удали все порты на цели", "Просканируй все порты на цели", "Закрой все порты", "Создай порты"],
              answer: 1,
            },
          ],
        },
        {
          id: "en-1-3",
          title: "Fill the gap",
          type: "fill",
          xp: 15,
          questions: [
            {
              prompt: "Choose the right word:",
              template: "The ____ is up, latency is low.",
              options: ["host", "hostel", "ghost", "hose"],
              answer: 0,
            },
            {
              prompt: "Choose the right word:",
              template: "Port 80 is ____ and running a web server.",
              options: ["open", "opera", "opened door", "opening"],
              answer: 0,
            },
          ],
        },
      ],
    },
    {
      id: "en-unit-2",
      title: "Vulnerabilities & Exploits",
      subtitle: "Уязвимости и атаки",
      lessons: [
        {
          id: "en-2-1",
          title: "Exploit, Backdoor, Payload",
          type: "theory",
          xp: 10,
          cards: [
            {
              heading: "vulnerability /ˌvʌlnərəˈbɪləti/",
              body: "Уязвимость — слабое место в программе. Пример: 'This service has a known vulnerability.'",
            },
            {
              heading: "exploit /ˈɛksplɔɪt/",
              body: "Эксплойт — код, использующий уязвимость. Пример: 'Run the exploit against the target.'",
            },
            {
              heading: "backdoor /ˈbækdɔːr/",
              body: "Бэкдор — скрытый вход в обход защиты. Пример: 'A backdoor was found in the FTP server.'",
            },
          ],
        },
        {
          id: "en-2-2",
          title: "Translate",
          type: "choice",
          xp: 15,
          questions: [
            {
              prompt: "Как переводится 'vulnerability'?",
              options: ["Сила", "Уязвимость", "Защита", "Сеть"],
              answer: 1,
            },
            {
              prompt: "Что значит 'the target appears to be vulnerable'?",
              options: ["Цель защищена", "Цель похоже уязвима", "Цель не отвечает", "Цель удалена"],
              answer: 1,
            },
            {
              prompt: "Translate: 'A backdoor has been spawned.'",
              options: ["Бэкдор был удалён", "Бэкдор был создан/запущен", "Бэкдор найден антивирусом", "Бэкдор закрыт"],
              answer: 1,
            },
          ],
        },
        {
          id: "en-2-3",
          title: "Fill the gap",
          type: "fill",
          xp: 15,
          questions: [
            {
              prompt: "Choose the right word:",
              template: "We found a critical ____ in the login system.",
              options: ["vulnerability", "vulture", "valley", "value"],
              answer: 0,
            },
            {
              prompt: "Choose the right word:",
              template: "The ____ gives us root access to the server.",
              options: ["exploit", "export", "explore", "expert"],
              answer: 0,
            },
          ],
        },
      ],
    },
    {
      id: "en-unit-3",
      title: "Passwords & Hashing",
      subtitle: "Пароли и шифрование",
      lessons: [
        {
          id: "en-3-1",
          title: "Hash, Crack, Wordlist",
          type: "theory",
          xp: 10,
          cards: [
            {
              heading: "hash /hæʃ/",
              body: "Хэш — результат одностороннего шифрования. Пример: 'The password hash was leaked.'",
            },
            {
              heading: "crack /kræk/",
              body: "Crack — взломать, подобрать пароль. Пример: 'I cracked the password in 5 seconds.'",
            },
            {
              heading: "wordlist /ˈwɜːrdlɪst/",
              body: "Список слов для перебора паролей. Пример: 'Use a wordlist to crack the hash.'",
            },
          ],
        },
        {
          id: "en-3-2",
          title: "Translate",
          type: "choice",
          xp: 15,
          questions: [
            {
              prompt: "Как переводится 'crack the password'?",
              options: ["Создать пароль", "Взломать пароль", "Удалить пароль", "Сохранить пароль"],
              answer: 1,
            },
            {
              prompt: "Что значит '6 password hashes cracked'?",
              options: ["6 паролей сохранено", "6 хэшей паролей взломано", "6 паролей удалено", "6 ошибок найдено"],
              answer: 1,
            },
          ],
        },
        {
          id: "en-3-3",
          title: "Fill the gap",
          type: "fill",
          xp: 15,
          questions: [
            {
              prompt: "Choose the right word:",
              template: "John the Ripper can ____ weak passwords quickly.",
              options: ["crack", "crash", "crawl", "create"],
              answer: 0,
            },
          ],
        },
      ],
    },
    {
      id: "en-unit-4",
      title: "Permissions & Root Access",
      subtitle: "Права доступа",
      lessons: [
        {
          id: "en-4-1",
          title: "Root, Permissions, Shell",
          type: "theory",
          xp: 10,
          cards: [
            {
              heading: "root /ruːt/",
              body: "Root — суперпользователь с максимальными правами. Пример: 'I got root access.'",
            },
            {
              heading: "permission /pərˈmɪʃən/",
              body: "Permission — разрешение/право доступа. Пример: 'Permission denied' — доступ запрещён.",
            },
            {
              heading: "shell /ʃɛl/",
              body: "Shell — командная оболочка. Пример: 'Open a shell on the remote machine.'",
            },
          ],
        },
        {
          id: "en-4-2",
          title: "Translate",
          type: "choice",
          xp: 15,
          questions: [
            {
              prompt: "Что значит ошибка 'Permission denied'?",
              options: ["Файл не найден", "Доступ запрещён", "Сеть недоступна", "Команда неверна"],
              answer: 1,
            },
            {
              prompt: "Как переводится 'I got root access'?",
              options: ["Я потерял доступ", "Я получил root-доступ", "Я создал пользователя", "Я удалил root"],
              answer: 1,
            },
          ],
        },
        {
          id: "en-4-3",
          title: "Fill the gap",
          type: "fill",
          xp: 15,
          questions: [
            {
              prompt: "Choose the right word:",
              template: "cat: /etc/shadow: ____ denied",
              options: ["Permission", "Password", "Process", "Port"],
              answer: 0,
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
