DROP TABLE IF EXISTS applicants;

CREATE TABLE applicants
(
    id                 INT AUTO_INCREMENT PRIMARY KEY,
    name               VARCHAR(100),
    email              VARCHAR(100),
    phone              VARCHAR(20),
    role               VARCHAR(100),
    location           VARCHAR(100),
    resume_link        TEXT,
    status             ENUM ('Applied', 'Interview Done', 'Offer Accepted', 'Candidate rejected', 'Contacted', 'Offer Made', 'Interview Scheduled') DEFAULT 'Applied',
    year_of_experience INT,
    photo_url          TEXT,
    created_at         TIMESTAMP                                                                                                                    DEFAULT CURRENT_TIMESTAMP,
    updated_at         TIMESTAMP                                                                                                                    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO applicants (name, email, phone, role, location, resume_link, status, year_of_experience, photo_url)
VALUES ('Dina Kurnia', 'dina@example.com', '081234567890', 'Frontend Developer', 'Jakarta',
        'http://link-to-resume.com/dina', 'Applied', 3, 'https://randomuser.me/api/portraits/women/1.jpg'),
       ('Rizky Pratama', 'rizky@example.com', '089876543210', 'Backend Developer', 'Bandung',
        'http://link-to-resume.com/rizky', 'Interview Scheduled', 5, 'https://randomuser.me/api/portraits/men/2.jpg'),
       ('Siti Nurhaliza', 'siti@example.com', '087712341234', 'Fullstack Developer', 'Surabaya',
        'http://link-to-resume.com/siti', 'Interview Done', 7, 'https://randomuser.me/api/portraits/women/3.jpg'),
       ('Ahmad Fauzi', 'ahmad@example.com', '082198765432', 'DevOps Engineer', 'Medan',
        'http://link-to-resume.com/ahmad', 'Offer Made', 4, 'https://randomuser.me/api/portraits/men/4.jpg'),
       ('Putri Melati', 'putri@example.com', '081276543210', 'Frontend Developer', 'Semarang',
        'http://link-to-resume.com/putri', 'Offer Accepted', 6, 'https://randomuser.me/api/portraits/women/5.jpg'),
       ('Budi Santoso', 'budi@example.com', '082134567891', 'Backend Developer', 'Yogyakarta',
        'http://link-to-resume.com/budi', 'Candidate rejected', 2, 'https://randomuser.me/api/portraits/men/6.jpg'),
       ('Ayu Lestari', 'ayu@example.com', '083212345678', 'Fullstack Developer', 'Bali',
        'http://link-to-resume.com/ayu', 'Contacted', 3, 'https://randomuser.me/api/portraits/women/7.jpg'),

-- Sisanya default Applied
       ('Joko Widodo', 'joko@example.com', '084212345678', 'Frontend Developer', 'Jakarta',
        'http://link-to-resume.com/joko', 'Applied', 8, 'https://randomuser.me/api/portraits/men/8.jpg'),
       ('Dewi Sartika', 'dewi@example.com', '085212345678', 'Backend Developer', 'Bandung',
        'http://link-to-resume.com/dewi', 'Applied', 5, 'https://randomuser.me/api/portraits/women/9.jpg'),
       ('Agus Salim', 'agus@example.com', '086212345678', 'Fullstack Developer', 'Surabaya',
        'http://link-to-resume.com/agus', 'Applied', 9, 'https://randomuser.me/api/portraits/men/10.jpg'),
       ('Nina Zulaika', 'nina@example.com', '087212345678', 'DevOps Engineer', 'Medan',
        'http://link-to-resume.com/nina', 'Applied', 1, 'https://randomuser.me/api/portraits/women/11.jpg'),
       ('Dian Pramana', 'dian@example.com', '088212345678', 'Frontend Developer', 'Semarang',
        'http://link-to-resume.com/dian', 'Applied', 6, 'https://randomuser.me/api/portraits/men/12.jpg'),
       ('Fitriani Sari', 'fitriani@example.com', '089212345678', 'Backend Developer', 'Yogyakarta',
        'http://link-to-resume.com/fitriani', 'Applied', 7, 'https://randomuser.me/api/portraits/women/13.jpg'),
       ('Hendra Gunawan', 'hendra@example.com', '081312345678', 'Fullstack Developer', 'Bali',
        'http://link-to-resume.com/hendra', 'Applied', 2, 'https://randomuser.me/api/portraits/men/14.jpg'),
       ('Maya Wulandari', 'maya@example.com', '082312345678', 'Frontend Developer', 'Jakarta',
        'http://link-to-resume.com/maya', 'Applied', 4, 'https://randomuser.me/api/portraits/women/15.jpg'),
       ('Fahri Ramadhan', 'fahri@example.com', '083312345678', 'Backend Developer', 'Bandung',
        'http://link-to-resume.com/fahri', 'Applied', 5, 'https://randomuser.me/api/portraits/men/16.jpg'),
       ('Silvi Anggraini', 'silvi@example.com', '084312345678', 'Fullstack Developer', 'Surabaya',
        'http://link-to-resume.com/silvi', 'Applied', 6, 'https://randomuser.me/api/portraits/women/17.jpg'),
       ('Yusuf Maulana', 'yusuf@example.com', '085312345678', 'DevOps Engineer', 'Medan',
        'http://link-to-resume.com/yusuf', 'Applied', 7, 'https://randomuser.me/api/portraits/men/18.jpg'),
       ('Anisa Putri', 'anisa@example.com', '086312345678', 'Frontend Developer', 'Semarang',
        'http://link-to-resume.com/anisa', 'Applied', 8, 'https://randomuser.me/api/portraits/women/19.jpg'),
       ('Reza Pratama', 'reza@example.com', '087312345678', 'Backend Developer', 'Yogyakarta',
        'http://link-to-resume.com/reza', 'Applied', 9, 'https://randomuser.me/api/portraits/men/20.jpg');
