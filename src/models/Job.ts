import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export class Job extends Model {
  public id!: string;
  public title!: string;
  public description!: string;
  public status!: 'draft' | 'published' | 'closed';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Job.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('draft', 'published', 'closed'),
    defaultValue: 'draft'
  }
}, {
  sequelize,
  tableName: 'Jobs'
});