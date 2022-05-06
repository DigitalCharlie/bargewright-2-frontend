import * as yup from 'yup';

export const adventureSchema = yup.object().shape({
	adventureName: yup.string().required()
});