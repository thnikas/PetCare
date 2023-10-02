'use client'
import { useRouter } from 'next/navigation';
import React,{useState,FormEvent} from 'react'
import emailjs from '@emailjs/browser'
import { SessionInterface } from '@/common.types';
import FormField from '@/components/FormField';
import Button from '@/components/Button';
import ListService from '@/components/searchResults/ListService';
import RangePicker from '@/components/searchResults/RangePicker';
import DialogC from '@/components/DialogC';

type Props={
  session: SessionInterface,

}
const ContactSi = ({session}:Props) => {//the contact form when the user wants to contect the sitter
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [form, setForm]=useState({name:'',email:session?session.user.email:'',message:'',phone:'',service:{home:false,walk:false,drop:false},
    dates:{
      dateA:(new Date()),
      dateB:(new Date()) , 
      dayA:'',
      dayB:'',
    },
  })
  const [loading, setLoading]=useState(false)
  const [showDialog, setShowDialog] = useState(false);

    const router = useRouter()
    const handleStateChange = (fieldName: keyof any, value: string|number) => {//the form update when a value is changed
      setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
  };
    const handleSubmit = (e:any) => {//when the user submits the form
      e.preventDefault(); // Prevent the default form submission behavior

      if (!session) {
        setShowDialog(true);
        return;
      }else{
        setSubmitting(true)

        e.preventDefault();
        setLoading(true);
    
        emailjs //used to be send the mail in the specific mail
          .send(
            'service_s3mmosq',
            'template_x35m9zc',
            {
              from_name: form.name,
              to_name: "Thomas",
              from_email: session.user.email,
              to_email: "thomasnika97@gmail.com",
              message: form.message,
              dates:form.dates,
              service:form.service,
              phone:form.phone
            },
            'pJsgzKTjZvUx1NUhJ'      )
          .then(
            () => {
              setLoading(false);
               alert("Thank you. The sitter will get back to you as soon as possible.");
              if (confirm("Go back to the Sitter Profile?")) {
                // User pressed "OK" in the confirm dialog
                router.back(); // Navigate back to the previous page
              }
              setForm({
                name: form.name,
                email: session.user.email,
                message: form.message,
                service:form.service,
                phone:form.phone,
                dates:{
                  dateA:form.dates.dateA,
                  dateB:form.dates.dateB, 
                  dayA:form.dates.dayA,
                  dayB:form.dates.dayB,
                },
              });
            },
            (error:string) => {
              setLoading(false);
              console.error(error);
    
              alert("Ahh, something went wrong. Please try again.");
            }
          );
      }
      
      };
  return (
    
    <form onSubmit={handleSubmit}
      className="flexStart form">
      <div className='flex items-center	gap-[12rem]'>
        <div className='relative gap-3 flex flex-col'>
          <h2 className='mt-2'>Services</h2>
          <ListService fontSize='18px' iconSize={38} service={form.service} setState={(value:any) => handleStateChange('service', value)}/>
        </div>
    
        <RangePicker iconWidth={35} fontSize={15} width='9.9rem' dates={form.dates} setDates={(value:any) => handleStateChange('dates', value)}/>
      </div>
      <FormField
          title="Your Name"
          state={form.name}
          placeholder="JohnDoe"
          setState={(value:string) => handleStateChange('name', value)}
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
          placeholder="Tell a bit about your pet."
          isTextArea
          setState={(value) => handleStateChange('message', value)}
      />
      <div className='contents'>
        <div  className="flexStart w-full">
          <Button
            title={submitting ? `Sending` : "Send"}
            type="submit"
            leftIcon={submitting ? "" : "/email2.png "}
            submitting={submitting}
          />
    
        </div>
      </div>
            {/**show dialog in case the user is not logged in */}
      {showDialog && <DialogC message='Please Sign in first in order to send a message' isOpen={showDialog} setIsOpen={setShowDialog} />}

    </form>
  )
}

export default ContactSi