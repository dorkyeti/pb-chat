import { useNavigate } from "react-router-dom";
import { useAuth } from '../useAuth';
import { useForm } from "../useForm";
import { FormEvent, useEffect } from "react";
import { useColorModeValue } from "@chakra-ui/react";

export const useLogin = () => {
    const { isLoggedIn, logIn } = useAuth();
    const navigate = useNavigate()
    const { formState, onInputChange, submitting, submit } = useForm({
        username: '',
        password: ''
    })
    const bg = useColorModeValue('white', 'dark')

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/home')
        }
    }, [isLoggedIn])

    const login = async (username: string, password: string) => {
        try {
            await logIn(username, password);
        } catch (e) {
            console.error('error')
        }
    }

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        return submit(async () => {
            await login(formState.username, formState.password);
        })
    }

    return {
        bg,
        ...formState,
        onInputChange,
        onSubmit,
        submitting,
    }
}