import { Optional } from 'sequelize';
import { Table, Model, Column, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { SeasonsI } from '../interfaces/seasions';
import TVShows from './TVShows.model';
import Episodes from './Episodes.model';

export type SeasonsCreationAttributes = Optional<SeasonsI, 'season'>;
@Table({
  timestamps: false,
  freezeTableName: false,
  modelName: 'Seasons',
  schema: 'public',
})
export default class Seasons extends Model<SeasonsI, SeasonsCreationAttributes> implements SeasonsI {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  public season?: number;

  @ForeignKey(() => TVShows)
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  public TVShow!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public description!: string;

  @BelongsTo(() => TVShows) TVShows!: TVShows;

  @HasMany(() => Episodes) episodes!: Episodes[];
}
