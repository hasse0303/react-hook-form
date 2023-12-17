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
            <input type="text" id='username' {...register('username')} />

            <label htmlFor="email">Email</label>
            <input type="email" id='email' {...register('email')} />

            <label htmlFor="channel">Channel</label>
            <input type="text" id='channel' {...register('channel')} />

            <button>Submit</button>
        </form>
        <DevTool control={control}/>
    </div>
  )
}
