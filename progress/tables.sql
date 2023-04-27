USERS
- id (integer, primary key)
- name (text)
- email (text)
- password_hash (text)

CATEGORIES
- id (integer, primary key)
- name (text)
- user_id (integer, foreign key references users.id)

TASKS
- id (integer, primary key)
- name (text)
- due_date (date)
- duration (integer)
- start_time (time)
- end_time (time)
- category_id (integer, foreign key references categories.id)
- recurring BOOLEAN DEFAULT FALSE,
- recurrence_frequency TEXT,
- recurrence_interval INTEGER
- progress (integer)

TASK_STATISTICS
- id (integer, primary key)
- task_id (integer, foreign key references tasks.id)
- date (date)
- duration (integer)
- completed (boolean)

DAILY_STATS
- id (integer, primary key)
- user_id (integer, foreign key references users.id)
- date (date)
- total_duration (integer)

MONTHLY_STATS
- id (integer, primary key)
- user_id (integer, foreign key references users.id)
- month (integer)
- year (integer)
- total_duration (integer)

YEARLY_STATS
- id (integer, primary key)
- user_id (integer, foreign key references users.id)
- year (integer)
- total_duration (integer)

TIME_LOG
- id (integer, primary key)
- name (text)
- start_time (datetime)
- end_time (datetime)
- duration (integer)
- category_id (integer, foreign key references categories.id)
- user_id (integer, foreign key references users.id)


CREATE TABLE reminders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    task_id INT NOT NULL,
    date_time DATETIME NOT NULL,
    reminder_type ENUM('notification', 'email', 'other') NOT NULL,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
);
