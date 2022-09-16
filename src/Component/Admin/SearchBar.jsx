import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getUsersByAdminById, addSpecialty} from "../../Redux-actions";
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default function SearchBar(){

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [name2, setName2] = useState({
    name: "",
  });

        const inputHandler = (e) => {
          setName(e.target.value);
        };

        const inputHandler2 = (e) => {
          setName2({
            name: e.target.value,
          });
        };

        const onClickHandler = (e) => {
          if(name.length===0) return alert('ingresa un nombre');
        
          dispatch(getUsersByAdminById(name));
          setName('')
        };


        const onClickHandler2 = (e) => {
          if(name2.length===0) return alert("ingresa una especialidad");
        
          dispatch(addSpecialty(name2));
          setName2({
            name: "",
          })
        };
            
          return (
            <div>
            <div key="search2" >
               <InputGroup className="mb-3">
                <Form.Control
                  placeholder="agrgegar especialidad"
                  aria-label="agregar especialidad"
                  aria-describedby="basic-addon2"
                  value={name2.name}
                onChange={(e) => inputHandler2(e)}
                />
                <Button variant="outline-secondary" id="button-addon2" onClick={(e) => onClickHandler2(e)}>
                  agregar
                </Button>
              </InputGroup>
            </div>

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
         </div>
          );
        };