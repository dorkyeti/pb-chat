import { FormEvent, useEffect } from "react";
import { useAuth } from "../useAuth";
import { useNavigate } from "react-router-dom";
import { useColorModeValue, useToast } from "@chakra-ui/react";
import { useForm } from "../useForm";
import { route } from "../../services/routes";

export const useForgotPassword = () => {
    const { isLoggedIn, forgotPassword } = useAuth();
    const navigate = useNavigate()
    const bg = useColorModeValue('white', 'dark')
    const { formState, onInputChange, submitting, submit } = useForm({
        email: '',
    })
    const toast = useToast()

    useEffect(() => {
        if (isLoggedIn) {
            navigate(route('home')!)
        }
    }, [isLoggedIn])

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        return submit(async () => {
            try {
                toast.promise(forgotPassword(formState.email), {
                    loading: { title: 'Cargando' },
                    error: { title: 'Error' },
                    success: ({ title: 'Correo enviado', description: 'Verifique su bandeja de entrada' })
                })
            } catch (e) {
                console.log('error')
            }
        })
    }

    return {
        bg,
        email: formState.email,
        onInputChange,
        onSubmit,
        submitting,
    }
}