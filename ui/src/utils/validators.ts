import * as Yup from 'yup';

export const profileNameSchema = () => {
  return Yup.object().shape({
    name: Yup.string()
      .min(3, ({ min }) => `Не менее ${min} символов`)
      .max(15, ({ max }) => `Не более ${max} символов`)
      .required(`«Имя профиля» не должно быть пустым`),
  });
};
