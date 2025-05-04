'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('applicants_2', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      resume_link: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('Applied', 'Interview Done', 'Offer Accepted', 'Candidate rejected', 'Contacted', 'Offer Made', 'Interview Scheduled'),
        defaultValue: 'Applied',
      },
      year_of_experience: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      photo_url: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue:  Sequelize.fn('NOW'),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue:  Sequelize.fn('NOW'),
        onUpdate: Sequelize.fn('NOW'),
      },
    });

    // Insert default data
    await queryInterface.bulkInsert('applicants_2', [
      { name: 'Dina Kurnia', email: 'dina@example.com', phone: '081234567890', role: 'Frontend Developer', location: 'Jakarta', resume_link: 'http://link-to-resume.com/dina', status: 'Applied', year_of_experience: 3, photo_url: 'https://randomuser.me/api/portraits/women/1.jpg' },
      { name: 'Rizky Pratama', email: 'rizky@example.com', phone: '089876543210', role: 'Backend Developer', location: 'Bandung', resume_link: 'http://link-to-resume.com/rizky', status: 'Interview Scheduled', year_of_experience: 5, photo_url: 'https://randomuser.me/api/portraits/men/2.jpg' },
      { name: 'Siti Nurhaliza', email: 'siti@example.com', phone: '087712341234', role: 'Fullstack Developer', location: 'Surabaya', resume_link: 'http://link-to-resume.com/siti', status: 'Interview Done', year_of_experience: 7, photo_url: 'https://randomuser.me/api/portraits/women/3.jpg' },
      { name: 'Ahmad Fauzi', email: 'ahmad@example.com', phone: '082198765432', role: 'DevOps Engineer', location: 'Medan', resume_link: 'http://link-to-resume.com/ahmad', status: 'Offer Made', year_of_experience: 4, photo_url: 'https://randomuser.me/api/portraits/men/4.jpg' },
      { name: 'Putri Melati', email: 'putri@example.com', phone: '081276543210', role: 'Frontend Developer', location: 'Semarang', resume_link: 'http://link-to-resume.com/putri', status: 'Offer Accepted', year_of_experience: 6, photo_url: 'https://randomuser.me/api/portraits/women/5.jpg' },
      { name: 'Budi Santoso', email: 'budi@example.com', phone: '082134567891', role: 'Backend Developer', location: 'Yogyakarta', resume_link: 'http://link-to-resume.com/budi', status: 'Candidate rejected', year_of_experience: 2, photo_url: 'https://randomuser.me/api/portraits/men/6.jpg' },
      { name: 'Ayu Lestari', email: 'ayu@example.com', phone: '083212345678', role: 'Fullstack Developer', location: 'Bali', resume_link: 'http://link-to-resume.com/ayu', status: 'Contacted', year_of_experience: 3, photo_url: 'https://randomuser.me/api/portraits/women/7.jpg' },
      { name: 'Joko Widodo', email: 'joko@example.com', phone: '084212345678', role: 'Frontend Developer', location: 'Jakarta', resume_link: 'http://link-to-resume.com/joko', status: 'Applied', year_of_experience: 8, photo_url: 'https://randomuser.me/api/portraits/men/8.jpg' },
      { name: 'Dewi Sartika', email: 'dewi@example.com', phone: '085212345678', role: 'Backend Developer', location: 'Bandung', resume_link: 'http://link-to-resume.com/dewi', status: 'Applied', year_of_experience: 5, photo_url: 'https://randomuser.me/api/portraits/women/9.jpg' },
      { name: 'Agus Salim', email: 'agus@example.com', phone: '086212345678', role: 'Fullstack Developer', location: 'Surabaya', resume_link: 'http://link-to-resume.com/agus', status: 'Applied', year_of_experience: 9, photo_url: 'https://randomuser.me/api/portraits/men/10.jpg' },
      { name: 'Nina Zulaika', email: 'nina@example.com', phone: '087212345678', role: 'DevOps Engineer', location: 'Medan', resume_link: 'http://link-to-resume.com/nina', status: 'Applied', year_of_experience: 1, photo_url: 'https://randomuser.me/api/portraits/women/11.jpg' },
      { name: 'Dian Pramana', email: 'dian@example.com', phone: '088212345678', role: 'Frontend Developer', location: 'Semarang', resume_link: 'http://link-to-resume.com/dian', status: 'Applied', year_of_experience: 6, photo_url: 'https://randomuser.me/api/portraits/men/12.jpg' },
      { name: 'Fitriani Sari', email: 'fitriani@example.com', phone: '089212345678', role: 'Backend Developer', location: 'Yogyakarta', resume_link: 'http://link-to-resume.com/fitriani', status: 'Applied', year_of_experience: 7, photo_url: 'https://randomuser.me/api/portraits/women/13.jpg' },
      { name: 'Hendra Gunawan', email: 'hendra@example.com', phone: '081312345678', role: 'Fullstack Developer', location: 'Bali', resume_link: 'http://link-to-resume.com/hendra', status: 'Applied', year_of_experience: 2, photo_url: 'https://randomuser.me/api/portraits/men/14.jpg' },
      { name: 'Maya Wulandari', email: 'maya@example.com', phone: '082312345678', role: 'Frontend Developer', location: 'Jakarta', resume_link: 'http://link-to-resume.com/maya', status: 'Applied', year_of_experience: 4, photo_url: 'https://randomuser.me/api/portraits/women/15.jpg' },
      { name: 'Fahri Ramadhan', email: 'fahri@example.com', phone: '083312345678', role: 'Backend Developer', location: 'Bandung', resume_link: 'http://link-to-resume.com/fahri', status: 'Applied', year_of_experience: 5, photo_url: 'https://randomuser.me/api/portraits/men/16.jpg' },
      { name: 'Silvi Anggraini', email: 'silvi@example.com', phone: '084312345678', role: 'Fullstack Developer', location: 'Surabaya', resume_link: 'http://link-to-resume.com/silvi', status: 'Applied', year_of_experience: 6, photo_url: 'https://randomuser.me/api/portraits/women/17.jpg' },
      { name: 'Yusuf Maulana', email: 'yusuf@example.com', phone: '085312345678', role: 'DevOps Engineer', location: 'Medan', resume_link: 'http://link-to-resume.com/yusuf', status: 'Applied', year_of_experience: 7, photo_url: 'https://randomuser.me/api/portraits/men/18.jpg' },
      { name: 'Anisa Putri', email: 'anisa@example.com', phone: '086312345678', role: 'Frontend Developer', location: 'Semarang', resume_link: 'http://link-to-resume.com/anisa', status: 'Applied', year_of_experience: 8, photo_url: 'https://randomuser.me/api/portraits/women/19.jpg' },
      { name: 'Reza Pratama', email: 'reza@example.com', phone: '087312345678', role: 'Backend Developer', location: 'Yogyakarta', resume_link: 'http://link-to-resume.com/reza', status: 'Applied', year_of_experience: 9, photo_url: 'https://randomuser.me/api/portraits/men/20.jpg' }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('applicants_2');
  }
};
