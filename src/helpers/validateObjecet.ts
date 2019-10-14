import Joi, { ValidationError } from "joi";
export default function validateObject(data: object, expectedData: object) {
  const { error }: { error: ValidationError, value: any } = Joi.validate(data, expectedData);
  if (error) {
    console.log("Erro de validação de Objeto:", error);
    return false;
  }
  return true;
}
