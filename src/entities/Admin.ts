import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import bcrypt from 'bcryptjs';

@Entity()
class Admin extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  username!: string;

  @Column({ type: 'text' })
  password!: string;

  @Column({ type: 'timestamptz' })
  @CreateDateColumn()
  created_at!: Date;

  private hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
  };

  public setPassword = async (password: string): Promise<void> => {
    this.password = await this.hashPassword(password);
  };

  public validPassword = async (password: string): Promise<boolean> => {
    return await bcrypt.compare(password, this.password);
  };
}

export default Admin;
