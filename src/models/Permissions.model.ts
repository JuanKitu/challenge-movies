import { Optional } from 'sequelize';
import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { PermissionsI } from './permission';
import Roles from './Roles.model';
import Petitions from './Petitions.model';

type PermissionsCreationAttributes = Optional<PermissionsI, 'permission'>;
@Table({
  timestamps: false,
  freezeTableName: false,
  modelName: 'Permissions',
  // schema: 'public',
})
export default class Permissions extends Model<PermissionsI, PermissionsCreationAttributes> implements PermissionsI {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  public permission!: number;

  @ForeignKey(() => Roles)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  public role!: number;

  @Column({
    type: DataType.STRING,
  })
  public routeName!: string;

  @BelongsTo(() => Roles, { foreignKey: 'role' }) Roles!: Roles;

  @HasMany(() => Petitions) petitions!: Petitions[];
}
