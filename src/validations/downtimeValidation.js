import * as yup from 'yup';

export const downtimeSchema = yup.object().shape({
	activity: yup.string().required()
});