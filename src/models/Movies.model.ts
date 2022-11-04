import { Optional } from 'sequelize';
import { Table, Model, Column, DataType, BelongsToMany, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { MoviesI } from '../interfaces/movie';
import Artists from './Artists.model';
import MovieCharacters from './MovieCharacters.model';

export type MoviesCreationAttributes = Optional<MoviesI, 'movie'>;
@Table({
  timestamps: false,
  freezeTableName: false,
  modelName: 'Movies',
  schema: 'public',
})
export default class Movies extends Model<MoviesI, MoviesCreationAttributes> implements MoviesI {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  public movie?: number;

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

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public budget!: string;

  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  public duration!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  public releaseDate!: Date;

  @Column({
    type: DataType.STRING,
  })
  public languages!: string;

  @ForeignKey(() => Artists)
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  public director!: number;

  @BelongsTo(() => Artists) directors!: Artists;

  @BelongsToMany(() => Artists, () => MovieCharacters)
  actors!: Artists[];
}
