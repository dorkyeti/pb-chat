import { useNavigate } from "react-router-dom";
import { useAuth } from "../useAuth";
import { useForm } from "../useForm";
import { FormEvent, useEffect } from "react";
import { useColorModeValue } from "@chakra-ui/react";

export const useRegister = () => {
    const { isLoggedIn, signUp, logIn } = useAuth();
    const navigate = useNavigate();
    const { formState, onInputChange, submitting, submit } = useForm({
        username: '',
        email: '',
        emailVisibility: false,
        password: '',
        name: ''
    });
    const bg = useColorModeValue('white', 'dark')


    useEffect(() => {
        if (isLoggedIn) {
            navigate('/home')
        }
    }, [isLoggedIn]);

    const register = async (values: any) => {
        try {
            await signUp({ ...values, passwordConfirm: values.password });
            await logIn(values.email, values.password);
        } catch (e) {
            console.error('error')
        }
    }

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        return submit(async () => {
            await register(formState);
        })
    }


    return {
        bg,
        formState,
        onInputChange,
        onSubmit,
        submitting
    }
}