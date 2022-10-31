import { Optional } from 'sequelize';
import { Table, Model, Column, DataType, BelongsToMany } from 'sequelize-typescript';
import { AccountsI } from './account';
import Roles from './Roles.model';
import AccountRoles from './AccountRoles.model';

export type AccountsCreationAttributes = Optional<AccountsI, 'account'>;
@Table({
  timestamps: false,
  freezeTableName: false,
  modelName: 'Accounts',
  schema: 'public',
})
export default class Accounts extends Model<AccountsI, AccountsCreationAttributes> implements AccountsI {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  public account?: number;

  @Column({
    type: DataType.STRING,
  })
  public hash!: string;

  @Column({
    type: DataType.STRING,
  })
  public salt!: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  public accountName!: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  public email!: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  public emailGoogle!: string;

  // cardinality
  @BelongsToMany(() => Roles, () => AccountRoles) rols!: Array<Roles & { AccountRoles: AccountRoles }>;
}
