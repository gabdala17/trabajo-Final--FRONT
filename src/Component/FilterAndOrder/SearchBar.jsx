import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getName} from "../../Redux-actions";
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ModalErrors from "../ModalsErrors/ErrorsRouta";


const SearchBar1 = () => {
  const selected = useSelector((state) => state.selectedTime);
  const [name, setName] = useState("");
  const [modal, setModal] =useState(false);

  const dispatch = useDispatch();

  const inputHandler = (e) => {
    setName(e.target.value);
    
  };
  const onClickHandler = (e) => {
    
    if(name.length===0) return setModal(true);
  
    dispatch(getName(name));
    setName('')
  };
  const closeModal=()=>{
    setModal(false)
  }



  return (
    <div key="search1" >
       <InputGroup className="mb-3">
        {modal && <ModalErrors error={"Debes ingresar un nombre"} route={"/services"} funcion={closeModal}/>}
        <Form.Control
          placeholder="Nombre Profesional"
          aria-label="buscar por nombre"
          aria-describedby="modalIto"
          value={name}
        onChange={(e) => inputHandler(e)}
        />
        <Button variant="primary"  id="modalIto" onClick={(e) => onClickHandler(e)}>
          Buscar
        </Button>
      </InputGroup>
      
    </div>
  );
};

export default SearchBar1;