import { fail, message, superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { schema } from './schema';

export const load = async () => {
	return {
		form: await superValidate({}, valibot(schema))
	};
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, valibot(schema));

		if (!form.valid) {
			return fail(400, { form });
		}

		return message(form, 'Posted!');
	}
};
