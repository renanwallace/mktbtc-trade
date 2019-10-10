import Joi, { JoiObject, ValidationError } from 'joi';
import dotenv from 'dotenv';

// le variaveis do .env e preenche no process.env
dotenv.config();

// valida nossas variaveis
const envVarsSchema: JoiObject = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test'])
    .default('production')
    .required(),
  PORT: Joi.number().required().default(8000).description('Porta usada pela API'),
  BASE_URL: Joi.string().required()
}).unknown().required();

const { error, value: envVars }: { error: ValidationError, value: any } = Joi.validate(process.env, envVarsSchema);

if (error) throw new Error(`Erro de validação no .env: ${error.message}`);

function getLogType() {
  switch (envVars.NODE_ENV) {
    case 'development':
      return 'dev'
    default:
      return 'tiny'
  }
}

const config = {
  NODE_ENV: envVars.NODE_ENV,
  PORT: envVars.PORT,
  BASE_URL: envVars.BASE_URL,
  LOG_TYPE: getLogType(),
  API_PATH: envVars.BASE_URL + 'api/',
  TAPI_PATH: envVars.BASE_URL + 'tap/'
};

export default config;