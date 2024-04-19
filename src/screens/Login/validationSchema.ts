import {object, string} from 'yup';

const validationSchema = object({
  username: string()
    .min(4, 'Usuario invalido')
    .max(50, 'Usuario invalido')
    .required('Requerido'),
  password: string()
    .min(4, 'Clave invalida')
    .max(50, 'Clave invalida')
    .required('Requerido'),
});

export default validationSchema;
