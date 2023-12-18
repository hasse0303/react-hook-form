import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";

type FormValue = {
    username: string,
    email: string,
    channel: string
}

export const YouTubeForm = () => {

    const form = useForm<FormValue>({
        defaultValues: async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/users/2');
            const data = await response.json();
            return {
                username: data.username,
                email: data.email,
                channel: 'Has Has'
            }
        }
    });
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
                <input type="text" placeholder="Username" id='username' {...register('username', {
                    required: {
                        value: true,
                        message: 'Username is required'
                    }
                })} />
                <p className="error">{errors.username?.message}</p>
            </div>

            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Email" id='email' {...register('email', {
                    required: 'Email is required',
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'Invalid email address',
                    },
                    validate: {
                        isAdmin: (fieldValue) => {
                            return (
                                fieldValue !== 'admin@gmail.com' || 'Enter a different email address'
                            )
                        },
                        isBlackListed: (fieldValue) => {
                            return (
                                !fieldValue.endsWith('baddog.com') || 'This domain is not supported'
                            )
                        }
                    }
                })} />
                <p className="error">{errors.email?.message}</p>
            </div>
            <div className="form-control">
                <label htmlFor="channel">Channel</label>
                <input type="text" placeholder="Channel" id='channel' {...register('channel', { required: 'Channel is required'})} />
                <p className="error">{errors.channel?.message}</p>
            </div>

            <button>Submit</button>
        </form>
        <DevTool control={control}/>
    </div>
  )
}
