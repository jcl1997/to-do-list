import { toast } from 'react-toastify';

export const showToastMessage = () => {
    toast.success('Atenção !', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        type: toast.TYPE.WARNING,
        hideProgressBar: false,
        pauseOnHover: true,
    });
};

export const showToastMessageSuccess = () => {
    toast.success('Os dados foram salvos com sucesso!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        type: toast.TYPE.SUCCESS,
        hideProgressBar: false,
        pauseOnHover: true,
    });
};

export const showToastMessageSuccessExcluido = () => {
    toast.success('Os dados foram excluídos com sucesso!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        type: toast.TYPE.SUCCESS,
        hideProgressBar: false,
        pauseOnHover: true,
    });
};

export const showToastMessageErro = () => {
    toast.success('Houve um erro!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        type: toast.TYPE.ERROR,
        hideProgressBar: false,
        pauseOnHover: true,
    });
};