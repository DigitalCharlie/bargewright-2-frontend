import * as yup from 'yup';

export const characterSchema = yup.object().shape({
	name: yup.string().required()
});