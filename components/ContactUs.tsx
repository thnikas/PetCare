'use client'
import React,{useState} from 'react'
import FormField from './FormField';
import Button from './Button';
import { useRouter } from 'next/navigation';
import emailjs from '@emailjs/browser'
import Image from 'next/image';

const ContactUs = () => {
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [form, setForm]=useState({name:'',email:'',message:'',phone:'',
   
  })
  const [loading, setLoading]=useState(false)
  const [showDialog, setShowDialog] = useState(false);

    const router = useRouter()
    const handleStateChange = (fieldName: keyof any, value: string|number) => {//the form update when a value is changed
      setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
  };
    const handleSubmit = (e:any) => {//when the user submits the form

    
        setSubmitting(true)

        e.preventDefault();
        setLoading(true);
    
        emailjs
          .send(
            'service_s3mmosq',
            'template_x35m9zc',
            {
              from_name: form.name,
              to_name: "Thomas",
              from_email: form.email,
              to_email: "thomasnika97@gmail.com",
              message: form.message,
              phone:form.phone,
              
            },
            'pJsgzKTjZvUx1NUhJ'      )
          .then(
            () => {
              setLoading(false);
               alert("Thank you. We will get back to you as soon as possible.");
              if (confirm("Go back Main Page?")) {
                // User pressed "OK" in the confirm dialog
                router.back(); // Navigate back to the previous page
              }
              setForm({
                name: form.name,
                email: form.email,
                message: form.message,
                
                phone:form.phone,
                
              });
            },
            (error:string) => {
              setLoading(false);
              console.error(error);
    
              alert("Ahh, something went wrong. Please try again.");
            }
          );
      
      
      };
  return (
    
    <form onSubmit={handleSubmit}
    className="flexStart formContact">
      <div className='flex items-center	gap-[9rem]'>
       
    <Image width={250} height={250} src="/logo1.svg" alt='logo'/>


      </div>
            <FormField
                title="Your Name"
                state={form.name}
                placeholder="JohnDoe"
                setState={(value:string) => handleStateChange('name', value)}
            />
            <FormField
                title="Your Email"
                state={form.email}
                placeholder="Petcare@example.com"
                setState={(value:string) => handleStateChange('email', value)}
            />
            <FormField
                title="Your Phone"
                state={form.phone}
                placeholder="+3012344"
                type='tel'
                setState={(value:string) => handleStateChange('phone', value)}
            />
            <FormField
                title='Message'
                state={form.message}
                placeholder="Write your message here"
                isTextArea
                setState={(value) => handleStateChange('message', value)}
            />
            <div className='contents'>
            <div  className="flexStart w-full">
                <Button
                    title={submitting ? `Sending` : "Send"}
                    type="submit"
                    leftIcon={submitting ? "" : "/email2.svg"}
                    submitting={submitting}
                />
           
            
           
            </div>
           
            </div>
            

    </form>
  )
}

export default ContactUs