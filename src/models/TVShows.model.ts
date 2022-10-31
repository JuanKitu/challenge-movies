import { Optional } from 'sequelize';
import { Table, Model, Column, DataType, BelongsToMany, HasMany } from 'sequelize-typescript';
import { TVShowsI } from '../interfaces/TVShows';
import Artists from './Artists.model';
import TVShowCharacters from './TVShowCharacters.model';
import Seasons from './Seasons.model';

export type TVShowsCreationAttributes = Optional<TVShowsI, 'TVShow'>;
@Table({
  timestamps: false,
  freezeTableName: false,
  modelName: 'TVShows',
  schema: 'public',
})
export default class TVShows extends Model<TVShowsI, TVShowsCreationAttributes> implements TVShowsI {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  public TVShow?: number;

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
    type: DataType.NUMBER,
    allowNull: false,
  })
  public director!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  public releaseDate!: Date;

  @Column({
    type: DataType.STRING,
  })
  public description!: string;

  @Column({
    type: DataType.STRING,
  })
  public languages!: string;

  @BelongsToMany(() => Artists, () => TVShowCharacters) artist!: Array<Artists & { TVShowCharacters: TVShowCharacters }>;

  @HasMany(() => Seasons) seasons!: Seasons[];
}
