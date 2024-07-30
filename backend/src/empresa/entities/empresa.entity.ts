import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DateTransformer } from '../helper/DateTransformer';

@Entity()
@Check(`status IN ('vigente', 'expirado')`)
export class Empresa {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  razao_social: string;
  @Column()
  cnpj: string;
  @Column({
    type: 'varchar',
    transformer: new DateTransformer(),
  })
  data_de_registro: Date;
  @Column()
  status: string;
  @CreateDateColumn()
  criado_em: Date;
  @UpdateDateColumn()
  atualizado_em: Date;
}
