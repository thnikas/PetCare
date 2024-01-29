'use client'
import { UserForm, UserProfile } from '@/common.types'
import React,{useState,ChangeEvent,FormEvent} from 'react'
import Image from 'next/image'
import { updateUser,fetchToken, deleteUser } from '@/lib/actions'
import { useRouter } from 'next/navigation';
import Button from '../Button'
import FormField from '../FormField'
import { signOut } from "next-auth/react";
import { useGlobalContext } from '@/app/context'

type Props={
    userD?:any
}
const ProfileEdit = ({userD}:Props) => {//when the user is logged in and want to change his profile
    const { setLoader, logUser, setLogUser} = useGlobalContext();
    const user = logUser?.mongoDB?.user
    const router = useRouter()
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const [form, setForm] = useState<UserForm>({
        name:user?.name,
        email: user?.email,
        avatarUrl:user?.avatarUrl,
        description:user?.description,
        passwordHash:user?.passwordHash
    })
    const handleStateChange = (fieldName: keyof UserForm, value: string) => {//when something changes in the form
        setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
    };
    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {//when a new image is uploaded
        e.preventDefault();

        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.includes('image')) {
            alert('Please upload an image!');

            return;
        }

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            const result = reader.result as string;

            handleStateChange("avatarUrl", result)
        };
    };
    const handleFormSubmit = async (e: FormEvent) => {//onsubmitting form
        e.preventDefault();

        setSubmitting(true)

        const { token } = await fetchToken()

        try {
            

                await updateUser(form, user?.id as string)

                router.push("/")
                router.refresh()


        } catch (error) {
            alert(`Failed to update User. Try again!`);
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }
    const handleDeleteUser = async () => {//executed when the bin icon is pressed
        setIsDeleting(true)
        
        const { token } = await fetchToken();

        try {
            signOut({
                callbackUrl: `${window.location.origin}`
              })
              setLogUser(null)

            await deleteUser(user.id);
            
            router.push("/");
        } catch (error) {
            console.error(error)
        } finally {
            setIsDeleting(false)
        }
    }
  return (
    <form onSubmit={handleFormSubmit}
    className="flexStart form">
        <div className="flexStart form_image-container">
                <label htmlFor="poster" className="flexCenter form_image-label">
                    {!form.avatarUrl && 'Choose a photo for your profile'}
                </label>
                <input
                    id="image"
                    type="file"
                    accept='image/*'
                    className="form_image-input"
                    onChange={(e) => handleChangeImage(e)}
                />
                
                    <Image
                        src={form?.avatarUrl}
                        className="sm:p-10 object-contain z-20 rounded-full" alt="image"
                        fill
                    />
                
            </div>
            <FormField
                title="Your Name"
                state={form.name}
                placeholder="Soger"
                setState={(value) => handleStateChange('name', value)}
            />

            <FormField
                title='Description'
                state={form.description}
                placeholder="Tell us about your self"
                isTextArea
                height='h-[10rem]'
                setState={(value) => handleStateChange('description', value)}
            />
            <div className='buttons-container'>
            <div  className="flexStart w-full">
                <Button
                handleClick={()=>setLoader(true)}
                    title={submitting ? `Updating Profile` : "Update Profile"}
                    type="submit"
                    leftIcon={submitting ? "" : "/plus.svg"}
                    submitting={submitting}
                />
           
            
           
            </div>
            <div>
            <button
                type="button"
                disabled={isDeleting}
                className={`flexCenter delete-action_btn ${isDeleting ? "bg-gray" : "pageThemeColor"}`}
                 onClick={handleDeleteUser}
            >
                <Image src="/trash.svg" width={15} height={15} alt="delete" />
            </button>
            </div>
            </div>
            
            
    </form>
  )
}

export default ProfileEdit