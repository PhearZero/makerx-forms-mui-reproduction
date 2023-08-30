import { ValidatedForm, z, zfd } from '@makerx/forms-mui';
import { formatISO, parseISO } from 'date-fns';

/**
 * Define schema
 */
export const formSchema = zfd.formData({
    myString: zfd.text(z.string().trim().min(1, 'Required')),
    myArray: zfd.repeatable(
        z
            .array(zfd.text(z.string().trim().min(1, 'Required')))
            .min(2, 'Must have at least 2 values')
    ),
    myDateTime: zfd.text(),
});

/**
 * Initialise with defaults
 */
const defaultValues: z.infer<typeof formSchema> = {
    myString: '',
    myArray: ['one value'],
    myDateTime: '',
};

/**
 * Render form
 */
export default function Form() {
    const onSubmit = (data: z.infer<typeof formSchema>) =>
        console.log('Received data:', data);

    return (
        <ValidatedForm
            validator={formSchema}
            onSubmit={onSubmit}
            defaultValues={defaultValues}
        >
            {(helper) => (
                <>
                    {helper.textField({
                        label: 'This is required',
                        field: 'myString',
                    })}

                    {helper.textFields({
                        label: 'Should be two or more',
                        field: 'myArray',
                        minimumItemCount: 2,
                    })}

                    {helper.dateTimeField({
                        label: 'Date',
                        field: 'myDateTime',
                        fromISO: parseISO,
                        toISO: formatISO,
                    })}

                    {helper.submitButton({ label: 'Submit' })}
                </>
            )}
        </ValidatedForm>
    );
}
