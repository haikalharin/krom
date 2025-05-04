import { Model, DataTypes,Sequelize } from 'sequelize';
import sequelize from '../configDb/database';

class Applicant extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public phone!: string;
    public role!: string;
    public location!: string;
    public resume_link!: string;
    public status!: string;
    public year_of_experience!: number;
    public photo_url!: string;
    public created_at!: Date;
    public updated_at!: Date;
}

Applicant.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        resume_link: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('Applied', 'Interview Done', 'Offer Accepted', 'Candidate rejected', 'Contacted', 'Offer Made', 'Interview Scheduled'),
            defaultValue: 'Applied',
        },
        year_of_experience: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        photo_url: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,  // Gunakan DataTypes.DATE untuk tanggal dan waktu
            defaultValue: DataTypes.NOW,  // Nilai default adalah waktu sekarang
            onUpdate:'CURRENT_TIMESTAMP', // Menggunakan Sequelize.fn('NOW') untuk mengupdate dengan CURRENT_TIMESTAMP
        },
    },
    {
        sequelize,
        modelName: 'Applicant',
        tableName: 'applicants_2',
        timestamps: false, // Set to true if you want Sequelize to automatically manage `createdAt` and `updatedAt`
    }
);

export default Applicant;
