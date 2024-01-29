"use client"

import Image from 'next/image';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation';
import TabComponent from './Tab';
import FormField from './FormField';
import Button from './Button';
import { Energy, Feeding, categoryFilters } from '@/constants';
import {  fetchToken,createNewPet, updatePet,  } from '@/lib/actions';
import { FormState, PetFormState, PetInterface, ProjectInterface, SessionInterface } from '@/common.types';
import PilPicker from './PilPicker';
import { Friendly } from '@/constants';
import { useGlobalContext } from '@/app/context';
type Props = {
    type: string,
    // session: SessionInterface,
    project?: ProjectInterface,
    petCr?:PetInterface
}

const PetForm = ({ type,  petCr }: Props) => {//the form that the user can create or edit the Pet
    console.log(petCr)
    const {logUser} = useGlobalContext()
    const session=logUser
    const router = useRouter()
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [form, setForm] = useState<PetFormState>({
        name: petCr?.name || "",
        else: petCr?.else || "",
        image: petCr?.image || "",
        sex: petCr?.sex || "Male",
        ageY: petCr?.ageY || 0, 
        ageM: petCr?.ageM || 0, 
        friendly: petCr?.friendly || "", 
        feeding: petCr?.feeding || "",
        energy:petCr?.energy || "",
        type:petCr?.type||"Dog",
        createdBy:session?.mongoDB.user.id
    })
    const handleStateChange = (fieldName: keyof PetFormState, value: string|number) => {//the form update when a value is changed
        setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
    };

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
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

            handleStateChange("image", result)
        };
    };

    const handleFormSubmit = async (e: FormEvent) => {//executes when the form is submitted
        e.preventDefault();

        setSubmitting(true)

        const { token } = await fetchToken()

        try {
            if (type === "create") {
                await createNewPet(form)

                router.push("/")
                router.refresh()

            }
            
            if (type === "edit") {
               
                 await updatePet(form, petCr?.id as string, token)
                router.push(`/profile/${session.mongoDB.user.id}`)
                router.refresh()

            }

        } catch (error) {
            alert(`Failed to ${type === "create" ? "create" : "edit"} a pet. Try again!`);
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }
    return (
        <form
            onSubmit={handleFormSubmit}
            className="flexStart form">
            <div className="flexStart form_image-container">
                <label htmlFor="poster" className="flexCenter form_image-label flex flex-col">
                <Image src="/camera-plus.svg" className='pb-4' width={60} height={60 } alt="camera" />

                    {!form.image && 'Select a photo for your Pet' }

                </label>
                <input //here the image can be changed
                    id="image"
                    type="file"
                    accept='image/*'
                    required={type === "create" ? true : false}
                    className="form_image-input"
                    onChange={(e) => handleChangeImage(e)}
                />
                {form.image && (
                    <Image
                        src={form?.image}
                        className="sm:p-10 object-contain z-20" alt="image"
                        fill
                    />
                )}
            </div>

            <div className='self-start'>
            <TabComponent name1='Dog' name2='Cat' state={form.type} setState={(value) => handleStateChange('type', value)} title='What type of pet?' iconSize={60} classActive='border-color_a' classInactive='border-color_in'
            icon1='/labrador-retriever.svg' icon2='/cat5.svg'/>
                    
            </div>
           
            { <FormField
                title="Name"
                state={form.name}
                placeholder="Rocky"
                setState={(value) => handleStateChange('name', value)}
            /> }
            <div className='sex-container gap-20'>
            <TabComponent name1='Male' name2='Female'  state={form.sex} setState={(value) => handleStateChange('sex', value)} title='Sex' iconSize={30} classActive='sex-icons_a' classInactive='sex_icons_in'
            icon1='/male-symbol.svg' icon2='/female-symbol.svg'/>
            <div className='flex-row flex'>
            <div>
            <label className="w-full text-gray-100">Age (Yr.)</label>

                <input  onChange={(e) => handleStateChange('ageY', parseInt(e.target.value))} min={0} type='number' className='input_Pet' value={form.ageY}/>
            </div>
            <div>
            <label className="w-full text-gray-100" >Age (Mo.)</label>

                <input onChange={(e) => handleStateChange('ageM', parseInt(e.target.value))} min={0} value={form.ageM} max={11} type='number'  className='input_Pet'/>
            </div>
            </div>
           
                     
            </div>
            <div className='pils-contain'>
                <PilPicker title='Friendly' classActive='pils pils-a' classInactive='pils ' arrayC={Friendly} state={form.friendly} setState={(value) => handleStateChange('friendly', value)}/>
            </div>
            <div  className='pils-contain'>
                <PilPicker title='Feeding Schedule' classActive='pils pils-a' classInactive='pils ' arrayC={Feeding} state={form.feeding} setState={(value) => handleStateChange('feeding', value)}/>
            </div>
            <div  className='pils-contain'>
                <PilPicker title='Energy' classActive='pils pils-a' classInactive='pils ' arrayC={Energy} state={form.energy} setState={(value) => handleStateChange('energy', value)}/>
            </div>
           

            { <FormField
                type="Description"
                title="Anything else a sitter should know?"
                state={form.else}
                placeholder="Add instructions for feeding schedule, Medications, Playtime or other"
                setState={(value) => handleStateChange('else', value)}
                isTextArea={true}
            /> }

            

            <div className="flexStart w-full">
                <Button //submit button
                    title={submitting ? `${type === "create" ? "Creating" : "Editing"}` : `${type === "create" ? "Create" : "Edit"}`}
                    type="submit"
                    leftIcon={submitting ? "" : "/plus.svg"}
                    submitting={submitting}
                />
            </div>
        </form>
    )
}

export default PetForm