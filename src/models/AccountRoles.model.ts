import { Optional } from 'sequelize';
import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Accounts from './Accounts.model';
import Roles from './Roles.model';
import { AccountRolesI } from './accountRole';

type AccountRolesCreationAttributes = Optional<AccountRolesI, 'role'>;
// type AccountRolesCreationAttributes = Optional<AccountRolesI, 'role' | 'account'>;
@Table({
  timestamps: false,
  freezeTableName: false,
  modelName: 'AccountRoles',
  schema: 'public',
})
export default class AccountRoles extends Model<AccountRolesI, AccountRolesCreationAttributes> implements AccountRolesI {
  @ForeignKey(() => Roles)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: false,
    allowNull: false,
  })
  public role!: number;

  @ForeignKey(() => Accounts)
  @Column({
    type: DataType.INTEGER,
    // primaryKey: true,
    autoIncrement: false,
    allowNull: false,
  })
  public account!: number;

  @BelongsTo(() => Accounts) accounts!: Accounts;

  @BelongsTo(() => Roles) roles!: Roles;
}
