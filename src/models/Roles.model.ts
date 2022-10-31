import { Optional } from 'sequelize';
import { Table, Model, Column, DataType, HasMany, BelongsToMany } from 'sequelize-typescript';
import Accounts from './Accounts.model';
import AccountRoles from './AccountRoles.model';
import Permissions from './Permissions.model';
import { RolesI } from './role';

type RolesCreationAttributes = Optional<RolesI, 'role'>;
@Table({
  timestamps: false,
  freezeTableName: false,
  modelName: 'Roles',
  schema: 'public',
})
export default class Roles extends Model<RolesI, RolesCreationAttributes> implements RolesI {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  public role!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public roleName!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  public defaultRole!: boolean;

  // cardinality
  @BelongsToMany(() => Accounts, () => AccountRoles) asd!: Array<Accounts & { AccountRoles: AccountRoles }>;

  @HasMany(() => Permissions) permissions!: Permissions[];
}
