import * as yup from 'yup';

export const magicItemSchema = yup.object().shape({
	name: yup.string().required()
});