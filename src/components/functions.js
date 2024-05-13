import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export function show_alert(mensaje, icono, foco=''){

    const Myswal = withReactContent(Swal);
    Myswal.fire({
        title:mensaje,
        icon:icono
    });
}

function onfocus(foco){
    if(foco!==''){
        document.getElementById(foco).focus();
    }
}