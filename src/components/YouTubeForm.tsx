import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";

type FormValue = {
    username: string,
    email: string,
    channel: string
}

export const YouTubeForm = () => {

    const form = useForm<FormValue>();
    const { register, control, handleSubmit } = form;

    const onSubmit = (data: FormValue) => {
        console.log('Value', data);
        
    }
  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="username">Username</label>
            <input type="text" id='username' {...register('username', {
                required: {
                    value: true,
                    message: 'Username is required'
                }
            })} />

            <label htmlFor="email">Email</label>
            <input type="email" id='email' {...register('email', {
                required: 'Email is required',
                pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invalid email address',
                }
            })} />

            <label htmlFor="channel">Channel</label>
            <input type="text" id='channel' {...register('channel', { required: 'Channel is required'})} />

            <button>Submit</button>
        </form>
        <DevTool control={control}/>
    </div>
  )
}
