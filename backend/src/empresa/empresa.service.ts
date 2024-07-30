import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { parse } from 'date-fns';
import { Repository } from 'typeorm';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { Empresa } from './entities/empresa.entity';
import CNPJValidate from './helper/CNPJValidate';
import { isValidDateFormat } from './helper/DateTransformer';

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(Empresa)
    private empresaRepository: Repository<Empresa>,
  ) {}
  async create(createEmpresaDto: CreateEmpresaDto) {
    try {
      const isCNPJvalid = await CNPJValidate(createEmpresaDto.cnpj);
      if (!isCNPJvalid) {
        throw new HttpException('CNPJ inválido', HttpStatus.BAD_REQUEST);
      }
      const empresaExists = await this.findOneByCnpj(createEmpresaDto.cnpj);
      if (empresaExists) {
        throw new HttpException('Empresa já cadastrada', HttpStatus.CONFLICT);
      }
      if (!isValidDateFormat(createEmpresaDto.data_de_registro.toString())) {
        throw new HttpException(
          'Data de registro inválida. Use o formato DD/MM/AAAA',
          HttpStatus.BAD_REQUEST,
        );
      }

      const dataDeRegistro = parse(
        createEmpresaDto.data_de_registro.toString(),
        'dd/MM/yyyy',
        new Date(),
      );
      if (isNaN(dataDeRegistro.getTime())) {
        throw new HttpException(
          'Data de registro inválida. Certifique-se de que a data esteja no formato DD/MM/AAAA',
          HttpStatus.BAD_REQUEST,
        );
      }

      const empresa = new Empresa();
      empresa.data_de_registro = dataDeRegistro;
      empresa.razao_social = createEmpresaDto.razao_social;
      empresa.cnpj = createEmpresaDto.cnpj;
      empresa.status = createEmpresaDto.status;
      return this.empresaRepository.save(empresa);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return this.empresaRepository.find();
  }

  async findOne(id: number) {
    const empresaBusca = await this.empresaRepository.findOne({
      where: { id },
    });
    if (!empresaBusca) {
      throw new HttpException('Empresa não encontrada', HttpStatus.NOT_FOUND);
    }
    return empresaBusca;
  }

  async findOneByCnpj(cnpj: string) {
    return this.empresaRepository.findOne({ where: { cnpj } });
  }

  async findOneByName(razao_social: string) {
    return this.empresaRepository.findOne({ where: { razao_social } });
  }

  async update(id: number, updateEmpresaDto: UpdateEmpresaDto) {
    const empresaData = await this.findOne(id);
    if (!empresaData) {
      throw new HttpException('Empresa não encontrada', HttpStatus.NOT_FOUND);
    }

    const empresaNova = {
      ...empresaData,
      razao_social: updateEmpresaDto.razao_social || empresaData.razao_social,
      cnpj: updateEmpresaDto.cnpj || empresaData.cnpj,
      status: updateEmpresaDto.status || empresaData.status,
      data_de_registro:
        updateEmpresaDto.data_de_registro || empresaData.data_de_registro,
    };

    return this.empresaRepository.update(id, empresaNova);
  }

  async remove(id: number) {
    return this.empresaRepository.remove(await this.findOne(id));
  }
}
