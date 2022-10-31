import { Optional } from 'sequelize';
import { Table, Model, Column, DataType, BelongsToMany, HasMany } from 'sequelize-typescript';
import { ArtistsI } from '../interfaces/artist';
import MovieCharacters from './MovieCharacters.model';
import Movies from './Movies.model';

export type ArtistsCreationAttributes = Optional<ArtistsI, 'artist'>;
@Table({
  timestamps: false,
  freezeTableName: false,
  modelName: 'Artists',
  schema: 'public',
})
export default class Artists extends Model<ArtistsI, ArtistsCreationAttributes> implements ArtistsI {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  public artist?: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public firstName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public lastName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public gender!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  public birthdate!: Date;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  public height!: number;

  @HasMany(() => Movies) directors!: Movies[];

  @BelongsToMany(() => Movies, () => MovieCharacters) movies!: Array<Movies & { MovieCharacters: MovieCharacters }>;
}
