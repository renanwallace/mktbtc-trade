import Joi, { JoiObject, ValidationError } from 'joi';
import dotenv from 'dotenv';

// le variaveis do .env e preenche no process.env
dotenv.config();

// valida nossas variaveis
const envVarsSchema: JoiObject = Joi.object({
  SECURE_TOKEN: Joi.string().required(),
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test'])
    .default('production')
    .required(),
  PORT: Joi.number().required().default(8000).description('Porta usada pela API'),
  BASE_URL: Joi.string().required().description('Url base do mercado bitcoin'),
  KEY: Joi.string().length(32).required().description('Key da API mercado bitcoin'),
  SECRET: Joi.string().required().description('SECRET da API mercado bitcoin'),
  API_PATH: Joi.string().required().description('PATH API mercado bitcoin'),
  TAPI_PATH: Joi.string().required().description('PATH TAPI mercado bitcoin')
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
  SECURE_TOKEN: envVars.SECURE_TOKEN,
  NODE_ENV: envVars.NODE_ENV,
  PORT: envVars.PORT,
  BASE_URL: envVars.BASE_URL,
  LOG_TYPE: getLogType(),
  KEY: envVars.KEY,
  SECRET: envVars.SECRET,
  API_PATH: envVars.API_PATH,
  TAPI_PATH: envVars.TAPI_PATH,
  API_URL: envVars.BASE_URL + envVars.API_PATH,
  TAPI_URL: envVars.BASE_URL + envVars.TAPI_PATH,
};

export default config;