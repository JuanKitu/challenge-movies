import { Optional } from 'sequelize';
import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { MovieCharactersI } from '../interfaces/movieCharacter';
import Movies from './Movies.model';
import Artists from './Artists.model';

export type MovieCharactersCreationAttributes = Optional<MovieCharactersI, 'movieCharacter'>;
@Table({
  timestamps: false,
  freezeTableName: false,
  modelName: 'MovieCharacters',
  schema: 'public',
})
export default class MovieCharacters extends Model<MovieCharactersI, MovieCharactersCreationAttributes> implements MovieCharactersI {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  public movieCharacter?: number;

  @ForeignKey(() => Movies)
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  public movie!: number;

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

  @BelongsTo(() => Movies) movies!: Movies;

  @BelongsTo(() => Artists) artists!: Artists;
}
