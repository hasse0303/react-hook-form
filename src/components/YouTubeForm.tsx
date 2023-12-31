import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import { FieldErrors, useFieldArray, useForm } from "react-hook-form";

type FormValue = {
    username: string,
    email: string,
    channel: string,
    social: {
        twitter: string,
        facebook: string
    },
    phoneNumbers: string[],
    phNumbers: { number: string}[],
    age: number,
    dob: Date
}

export const YouTubeForm = () => {

    const form = useForm<FormValue>({
        defaultValues: async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/users/2');
            const data = await response.json();
            return {
                username: data.username,
                email: '',
                channel: '',
                social: {
                    twitter: '',
                    facebook: ''
                },
                phoneNumbers: ['', ''],
                phNumbers: [{ number: '' }],
                age: 0,
                dob: new Date()
            }
        },
        mode: 'all' // onSubmit, onBlur, onChange, onTouched
    });
    const { register, control, handleSubmit, formState, watch, getValues, setValue, reset, trigger } = form;
    const { errors, touchedFields, dirtyFields, isDirty, isValid, isSubmitting, isSubmitted, isSubmitSuccessful, submitCount  } = formState;
    console.log(touchedFields, dirtyFields, isDirty, isValid);
    console.log({isSubmitting, isSubmitted, isSubmitSuccessful, submitCount});
    
    
    const { fields, append, remove } = useFieldArray({
        name: 'phNumbers',
        control
    })

    const onSubmit = (data: FormValue) => {
        console.log('Value', data);
        
    }

    const onError = (errors: FieldErrors) => {
        console.log('Error', errors); 
    }

    const handleGetValues = () => {
        console.log(getValues());
        console.log(getValues('social.facebook'));
        console.log(getValues(['username', 'channel']));
        
    }

    const handleSetValue = () => {
        setValue('username', '', {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    useEffect(() => {
      const subscription = watch((value) => {
        console.log(value);
      })
      return () => subscription.unsubscribe()
    }, [watch])
    
    useEffect(() => {
      if(isSubmitSuccessful) {
        reset();
      }
    }, [isSubmitSuccessful, reset])
    
    
  return (
    <div>
        {/* <pre>{JSON.stringify(formValue)}</pre> */}
        <form onSubmit={handleSubmit(onSubmit, onError)}>
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
                <label htmlFor="age">Age</label>
                <input type="text" placeholder="Age" id='age' {...register('age', {
                    valueAsNumber: true,
                    required: {
                        value: true,
                        message: 'Age is required'
                    }
                })} />
                <p className="error">{errors.age?.message}</p>
            </div>
            
            <div className="form-control">
                <label htmlFor="dob">Date of birth</label>
                <input type="date" placeholder="Date of birth" id='dob' {...register('dob', {
                    valueAsDate: true,
                    required: {
                        value: true,
                        message: 'Date of birth is required'
                    }
                })} />
                <p className="error">{errors.dob?.message}</p>
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
                        },
                        emailAvailable: async(fieldValue) => {
                            const response = await fetch(`https://jsonplaceholder.typicode.com/users?email=${fieldValue}`);
                            const data = await response.json();
                            return data.length ==0 || 'Email already exists'
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

            <div className="form-control">
                <label htmlFor="twitter">Twitter</label>
                <input type="text" placeholder="Twitter" id='twitter' {...register('social.twitter', {
                    disabled: watch('channel') === '',
                    required: 'Twitter is required'
                })} />
            </div>

            <div className="form-control">
                <label htmlFor="facebook">Facebook</label>
                <input type="text" placeholder="Facebook" id='facebook' {...register('social.facebook', {
                    disabled: watch('channel') === '',
                    required: 'Facebook is required'
                })} />
            </div>

            <div className="form-control">
                <label htmlFor="primary-phone">Primary Phone Number</label>
                <input type="text" placeholder="Primary Phone Number" id='primary-phone' {...register('phoneNumbers.0')} />
            </div>

            <div className="form-control">
                <label htmlFor="secondary-phone">Secondary Phone Number</label>
                <input type="text" placeholder="Secondary Phone Number" id='secondary-phone' {...register('phoneNumbers.1')} />
            </div>

            <div>
                <div className="d-flex-sb-ct">
                    <label>List of phone numbers</label>
                    <button type="button" onClick={ () => append({number: ''})}>Add</button>
                </div>
                <div>
                    {
                        fields.map((field, index) => {
                            return (
                                <div className="form-control d-flex-sb-ct" key={field.id}>
                                    <input className="w-300" type="text" {...register(`phNumbers.${index}.number` as const)}/>
                                {
                                    index > 0 && (
                                        <button onClick={ () => remove(index)}>Remove</button>
                                    )
                                }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <button disabled={!isDirty || !isValid}>Submit</button>
            <button type="button" onClick={() => {reset()}}>Reset</button>
            <button type="button" onClick={handleGetValues}>Get value</button>
            <button type="button" onClick={handleSetValue}>Set value</button>
            <button type="button" onClick={() => trigger('channel')}>Validate</button>
        </form>
        <DevTool control={control}/>
    </div>
  )
}
