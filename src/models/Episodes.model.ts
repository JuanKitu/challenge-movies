import { Optional } from 'sequelize';
import { Table, Model, Column, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { EpisodesI } from '../interfaces/episodes';
import Seasons from './Seasons.model';
import Artists from './Artists.model';

export type EpisodesCreationAttributes = Optional<EpisodesI, 'episode'>;
@Table({
  timestamps: false,
  freezeTableName: false,
  modelName: 'Episodes',
  schema: 'public',
})
export default class Episodes extends Model<EpisodesI, EpisodesCreationAttributes> implements EpisodesI {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  public episode?: number;

  @ForeignKey(() => Seasons)
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  public TVShow!: number;

  @ForeignKey(() => Seasons)
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  public season!: number;

  @ForeignKey(() => Artists)
  @Column({
    type: DataType.NUMBER,
  })
  public director!: number;

  @Column({
    type: DataType.NUMBER,
  })
  public number!: number;

  @Column({
    type: DataType.STRING,
  })
  public name!: string;

  @Column({
    type: DataType.STRING,
  })
  public description!: string;

  @BelongsTo(() => Artists) directors!: Artists;

  @BelongsTo(() => Seasons) Seasons!: Seasons;
}
