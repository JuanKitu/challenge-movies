import { Optional } from 'sequelize';
import { Table, Model, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { TVShowCharactersI } from '../interfaces/TVShowCharacters';
import TVShows from './TVShows.model';
import Artists from './Artists.model';

export type TVShowCharactersCreationAttributes = Optional<TVShowCharactersI, 'TVShow'>;
@Table({
  timestamps: false,
  freezeTableName: false,
  modelName: 'TVShowCharacters',
  schema: 'public',
})
export default class TVShowCharacters extends Model<TVShowCharactersI, TVShowCharactersCreationAttributes> implements TVShowCharactersI {
  @ForeignKey(() => TVShows)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  public TVShow!: number;

  @ForeignKey(() => Artists)
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  public actor!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public gender!: string;
}
