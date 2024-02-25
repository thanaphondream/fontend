import axios from "axios";
import {useState} from "react";
import imgpromote from '../img/423422491_312187558510202_7161949334469326633_n.png'

export default function NewTodoForm() {
  const [input, setInput] = useState({
    title : '',
    dueDate : new Date()
  })

  const hdlChange = e => {
    setInput( prv => ( {...prv, [e.target.name] : e.target.value} ))
  }

  const hdlSubmit = async e => {
    try{
      e.preventDefault()
      // setInput(prv => ({...prv, dueDate: new Date(prv.dueDate) }))
      const output = { ...input, dueDate: new Date(input.dueDate) }
      const token = localStorage.getItem('token')
      const rs = await axios.post('http://localhost:8889/todos', output, {
        headers : { Authorization : `Bearer ${token}`}
      })
      alert('Create new OK')
    }catch(err) {
      alert(err.message)
    }
  }

  return (
    <form className="flex flex-col min-w-[600px] border rounded w-5/6 mx-auto p-4 gap-6"
        onSubmit={hdlSubmit}>
     <img src={imgpromote} alt="" />
    </form>
  );
}