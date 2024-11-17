import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export class Portal extends Model {
  public id!: string;
  public name!: string;
  public description?: string;
  public status!: 'active' | 'inactive';
  public logoUrl?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Portal.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  },
  logoUrl: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'Portals'
});