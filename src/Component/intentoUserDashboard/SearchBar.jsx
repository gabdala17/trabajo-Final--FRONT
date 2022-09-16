import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getUsersByAdminById} from "../../Redux-actions";
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default function SearchBar(){

  const dispatch = useDispatch();
  const [name, setName] = useState("");

        const inputHandler = (e) => {
          setName(e.target.value);
        };
        
        const onClickHandler = (e) => {
          console.log('soy el target del search=>', name)
          if(name.length===0) return alert('ingresa un nombre');
        
          dispatch(getUsersByAdminById(name));
          setName('')
        };
            
          return (
            <div key="search1" >
               <InputGroup className="mb-3">
                <Form.Control
                  placeholder="busca por mail"
                  aria-label="busca por mail"
                  aria-describedby="basic-addon2"
                  value={name}
                onChange={(e) => inputHandler(e)}
                />
                <Button variant="outline-secondary" id="button-addon2" onClick={(e) => onClickHandler(e)}>
                  Buscar
                </Button>
              </InputGroup>
            </div>
          );
        };