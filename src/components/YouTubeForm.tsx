import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";

type FormValue = {
    username: string,
    email: string,
    channel: string
}

export const YouTubeForm = () => {

    const form = useForm<FormValue>();
    const { register, control, handleSubmit, formState } = form;
    const { errors } = formState;

    const onSubmit = (data: FormValue) => {
        console.log('Value', data);
        
    }
  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
                <label htmlFor="username">Username</label>
                <input type="text" id='username' {...register('username', {
                    required: {
                        value: true,
                        message: 'Username is required'
                    }
                })} />
                <p className="error">{errors.username?.message}</p>
            </div>

            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input type="email" id='email' {...register('email', {
                    required: 'Email is required',
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'Invalid email address',
                    }
                })} />
                <p className="error">{errors.email?.message}</p>
            </div>
            <div className="form-control">
                <label htmlFor="channel">Channel</label>
                <input type="text" id='channel' {...register('channel', { required: 'Channel is required'})} />
                <p className="error">{errors.channel?.message}</p>
            </div>

            <button>Submit</button>
        </form>
        <DevTool control={control}/>
    </div>
  )
}
