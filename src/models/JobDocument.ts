import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { Job } from './Job';
import { Portal } from './Portal';

export class JobDocument extends Model {
  public id!: string;
  public jobId!: string;
  public portalId!: string;
  public documentUrl!: string;
  public documentType!: 'pdf' | 'doc' | 'docx';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

JobDocument.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  jobId: {
    type: DataTypes.UUID,
    references: {
      model: 'Jobs',
      key: 'id'
    }
  },
  portalId: {
    type: DataTypes.UUID,
    references: {
      model: 'Portals',
      key: 'id'
    }
  },
  documentUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  documentType: {
    type: DataTypes.ENUM('pdf', 'doc', 'docx'),
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'JobDocuments'
});

Portal.hasMany(JobDocument);
JobDocument.belongsTo(Portal);

Job.hasMany(JobDocument);
JobDocument.belongsTo(Job);
