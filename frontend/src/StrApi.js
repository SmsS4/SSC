import axios from 'axios';
import { toast } from 'react-toastify';

// const URL = process.env.STR_API_ADDRESS;
const URL = "http://localhost:1337";

function failed(section, response) {
    toast.error(`Failed get ${section}. error: ${response.status}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

function callStrApi(section, route, callback) {
    axios.get(URL+'/api'+route).then(response => {
        if (response.status == 200) {
            callback(response.data)
        }else {
            failed(section, response)
        }
    });
}

function getBlogs(callback) {
    callStrApi("blogs", "/blogs", callback);
}

function getPresentations(callback) {
    callStrApi("presentations", "/presentations?populate=*", callback);
}

function getPresenter(callback) {
    callStrApi("presenters", "/presenters", callback);
}

export {getBlogs}