type Props = {
  type?: string;
  title: string;
  state: string;
  placeholder: string;
  isTextArea?: boolean;
  setState: (value: string) => void;
  height?:string
}

const FormField = ({ type, title, state, placeholder, isTextArea, setState,height }: Props) => {//custom Input 
  return (
      <div className="flexStart flex-col w-full gap-4">
          <label className="w-full text-gray-100">{title}</label>

          {isTextArea ? (
              <textarea
                  placeholder={placeholder}
                  value={state}
                  className={`form_field-input ${height?height:''}`}
                  onChange={(e) => setState(e.target.value)}

              />
          ) : (
              <input
                  type={type || "text"}
                  placeholder={placeholder}
                  required
                  value={state}
                  className="form_field-input"
                  onChange={(e) => setState(e.target.value)}
              />
          )}
      </div>
  )
}

export default FormField;