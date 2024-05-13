import React,{useEffect, useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alert} from '../components/functions';
import { useNavigate } from 'react-router-dom';

const CrearMovimiento = () => {

    const url='http://localhost:8080/api/v1/movimientos';
    const navigate = useNavigate();

    const editUrl = `${url}/editar/`;
    const [movimientos,setMovimientos]= useState([]);
    const [id,setId]= useState('');
    const [dcto,setDcto]= useState();
    const [tasaInteres,setTasaInteres]= useState();
    const [descripcion,setDescripcion]= useState('');
    const [valor,setValor]= useState('');
    const [total,SetTotal]= useState('');
    const [fecha,setFecha]=useState('');
    const [tipoTransaccion,setTipoTransaccion]= useState();
    const [metodoPago,setMetodoPago]= useState('');
    const[tipo_pago,setTipoPago]=useState('');
    const [cuentas,setCuentas]= useState([]);
    const [operacion,SetOperacion]= useState('1');
    const [estado,setEstado]= useState('');
    const [title,setTitle]= useState('');

   
    useEffect( ()=>{
        //getCuentas();
        getMovimientos();
    },[]);

    
    const getMovimientos = async () => {
        const respuesta = await axios.get(url);
        setCuentas(respuesta.data);
    }

    const redireccionarACrearMovimiento = () => {
        navigate('/'); // Redirige al usuario al nuevo componente
      };


    const buscarMovimientos = () => {
        navigate('/buscar-movimiento'); // Redirige al usuario al nuevo componente
      };
    

      const openModal = (op,id,dcto,tasaInteres, descripcion, valor,total,fecha,tipoTransaccion,metodoPago,tipo_pago) =>{
      setMovimientos('');
        setDescripcion('');
        setDcto('');
        setValor('');
        SetTotal('');
        setValor();
        setFecha();
        setTipoTransaccion('');
        setMetodoPago('');
        setTipoPago('');
        setTasaInteres('');
        setCuentas('');

        SetOperacion(op);
        if(op === 1){
            setTitle('Registrar Movimientos');

        }
        else if(op === 2){
            setTitle('Editar Movimiento');
  //           const editUrl = `${url}/editar/${id}`;

        setId(id);
  setMovimientos(dcto);
  setDescripcion(descripcion);
  setDcto(dcto);
  setValor(valor);
  SetTotal(total);
  setValor(valor);
  setFecha(fecha);
  setTasaInteres(tasaInteres);
  setTipoTransaccion(tipoTransaccion);
  setMetodoPago(metodoPago);
  setMetodoPago(tipo_pago);
  
  SetOperacion(op);

        }
        window.setTimeout(function(){
            document.getElementById('descripcion').focus();
        },500);
    }

    const validar = () => {
        var parametros;
        var metodo;
        if(dcto.trim() === ''){
            show_alert('Escribe el tipo de movimiento','warning');
        }
        else if(descripcion.trim() === ''){
            show_alert('Escribe la descripciona','warning');
        }
        else if(dcto === ''){
            show_alert('Escribe el descuento','warning');
        }
        else if(valor === ''){
            show_alert('Escribe el valor ','warning');
        }
        else if(total === ''){
            show_alert('Escribe total','warning');
        }
        else if(valor === ''){
          show_alert('Escribe la valor','warning');
      }
      else if(fecha === ''){
        show_alert('seleccionar una fecha','warning');
    }
        else if(tipoTransaccion === ''){
            show_alert('Escribe tipo de transaccion','warning');
        }
        else if(metodoPago === ''){
            show_alert('Escribe el metodo de pago','warning');
        }
        else{
            if(operacion === 1){
              
                metodo= 'POST';
            }
            else{

              parametros= {dcto:dcto.trim(),tasaInteres:tasaInteres.trim(),descripcion:descripcion.trim(),dcto:dcto.trim(),valor:valor.trim(),valor: valor,fecha: fecha,tipoTransaccion: tipoTransaccion.trim(),metodoPago: metodoPago.trim(),tipo_pago:tipo_pago.trim()};
                metodo= 'PUT';
            }
            envarSolicitud(metodo,parametros);
        }
    }


    const envarSolicitud = async(metodo,parametros) => {
        console.log("los parametros son",parametros);
        
        const requestUrl = operacion === 1 ? url : `${editUrl}${id}`;

        await axios({ method:metodo, url: requestUrl, data:parametros}).then(function(respuesta){
            var tipo = respuesta.data[0];
            var msj = respuesta.data[1];
            show_alert(msj,tipo);
            if(tipo === 'success'){
                document.getElementById('btnCerrar').click();
                getMovimientos();
            }
        })
        .catch(function(error){
            show_alert('Error en la solicitud','error');
            console.log(error);
        });
    }








    return(
        <div className='App'>
        <div className='container-fluid'>
        <div className='row mt-3'>
                <div className='col-md-12 offset-md-12'>
                    <div className='col-md-3 offset-md-3 d-grid mx-auto'>
                        <button onClick={redireccionarACrearMovimiento} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalMovimiento'>
                            <i className='fa-solid fa-circle-plus'></i> Crear Cuenta
                        </button>
                    </div> 
                    <div className='col-md-3 offset-md-3  d-grid mx-auto'>
                        <button onClick={redireccionarACrearMovimiento}  className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalMovimiento'>
                            <i className='fa-solid fa-circle-plus'></i> crear Movimiento
                        </button>
                    </div>

                    <div className='col-md-3 offset-md-3  d-grid mx-auto'>
                        <button onClick={buscarMovimientos}  className='btn btn-dark' >
                            <i className='fa-solid fa-circle-plus'></i> Buscar Movimiento
                        </button>
                    </div>

                </div>
                
            </div>

<div className='row mt-3'>
                <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                    <div className='table-responsive'>
                        <table className='table table-bordered'>
                            <thead>
                            
                            <tr><th>#</th><th>tipo Cuenta</th><th>descripcion </th><th>tasa de interesa </th><th>dcto</th><th>total</th><th>valor</th><th>Tipo Transaccion</th><th>Metodo Pago</th><th>valor</th><th>fecha</th><th>tipo pago</th></tr>
                            </thead>
                            <tbody className='table-group-divider'>
                              
                              
                               { movimientos.map((movimiento,i)=>(
                                <tr key={movimientos.id}>
                                    <td>{(i+1)}</td>
                                    <td>{(movimiento.tipo)}</td>
                                    <td>{(movimiento.descripcion)}</td>
                                    <td>{(movimiento.tasaInteres)}</td>
                                    <td>{(movimiento.dcto)}</td>
                                    <td>${new Intl.NumberFormat('es-co').format(movimiento.valor) }</td>
                                    <td>{(movimiento.total)}</td>
                                    <td>{(movimiento.tipoTransaccion)}</td>
                                    <td>{(movimiento.metodoPago)}</td>
                                    <td>{(movimiento.valor)}</td>
                                    <td>{(movimiento.fecha)}</td>
                                    <td>{(movimiento.tipo_pago)}</td>
                                    
                                    <td>
                                    <button onClick={() => openModal(2,movimiento.id,movimiento.descripcion,movimiento.tasaInteres,movimiento.dcto,movimiento.valor,movimiento.total,movimiento.fecha,movimiento.tipoTransaccion,movimiento.metodoPago,movimiento.tipo_pago)}
                                                 className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalMovimiento'>
                                                <i className='fa-solid fa-edit'></i>
                                            </button>

                                        &nbsp;
                                        <button className='btn btn-danger'>
                                        <i className='fa-solid fa-trash'></i>
                                        </button>
                                    </td>
                                    
                                </tr>

                                ))}

                            

                            </tbody>
                        </table>
            </div>
            </div>
            </div>
            </div>
            <div id='modalMovimiento' className='modal fade' aria-hidden='true'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <label className='h5'>{title}</label>
                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <div className='modal-body'>
                        <input type='hidden' id='id'></input>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                            <input type='text' id='descripcion' className='form-control' placeholder='Descripcion' value={descripcion}
                            onChange={(e)=> setDescripcion(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='text' id='dcto' className='form-control' placeholder='descuento' value={dcto}
                            onChange={(e)=> setDcto(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                            <input type='date' id='valor' className='form-control' placeholder='valor' value={valor}
                            onChange={(e)=> setValor(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-dollar-sign'></i></span>
                            <input type='double' id='total' className='form-control' placeholder='Total' value={total}
                            onChange={(e)=> SetTotal(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-dollar-sign'></i></span>
                            <input type='double' id='fecha' className='form-control'  value={fecha}
                            onChange={(e)=> setFecha(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-dollar-sign'></i></span>
                            <input type='double' id='tipoTransaccion' className='form-control' placeholder='tipo Transaccion' value={tipoTransaccion}
                            onChange={(e)=> setTipoTransaccion(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-dollar-sign'></i></span>
                            <input type='double' id='tasaInteres' className='form-control' placeholder='tasa de interes' value={tasaInteres}
                            onChange={(e)=> setTasaInteres(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-dollar-sign'></i></span>
                            <input type='double' id='metodoPago' className='form-control' placeholder='metodo pago' value={metodoPago}
                            onChange={(e)=> setMetodoPago(e.target.value)}></input>
                        </div>
                        <div className='input-group mb-3'>
                            <span className='input-group-text'><i className='fa-solid fa-dollar-sign'></i></span>
                            <input type='double' id='tipo_pago' className='form-control' placeholder='tasa de tipo de pago' value={tipo_pago}
                            onChange={(e)=> setTipoPago(e.target.value)}></input>
                        </div>
                       

                        <div className='d-grid col-6 mx-auto'>
                            <button onClick={() => validar()} className='btn btn-success'>
                                <i className='fa-solid fa-floppy-disk'></i> Guardar
                            </button>
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button type='button' id='btnCerrar' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
                    </div>
                </div>
            </div>

            </div>
           
                                </div>

            
            

    )




}

export default CrearMovimiento
