import { useState } from "react"

export const useForm = <T>(initialValues: T) => {
    const [formState, setFormState] = useState<T>(initialValues);
    const [submitting, setSubmitting] = useState<boolean>(false);

    const onInputChange = (e: any) => {
        // @ts-ignore
        const { name, value } = e.target;

        setFormState((oldValues) => ({
            ...oldValues,
            [name]: value
        }))
    }

    const resetForm = () => setFormState(initialValues);

    const submit = async (func: Function) => {
        setSubmitting(true);
        try {
            await func()
        } finally {
            setSubmitting(false);
        }
    }

    return {
        formState,
        onInputChange,
        resetForm,
        submit,
        submitting,
    }
}