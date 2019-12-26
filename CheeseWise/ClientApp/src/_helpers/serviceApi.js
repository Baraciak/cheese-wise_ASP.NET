import {get, put, post, destroy} from './api';

const url = 'https://localhost:44356/api/services';
// const url = 'https://cheesewise.azurewebsites.net/api/services';

const getAll = async() => {
    return await get(`${url}`);
}

const getById = async(id) => {
    return await get(`${url}/${id}`);
}

const update = async (service) => {
    return await put(`${url}/${service.id}`, service);
}

const create = async (service) => {
    return await post(`${url}`, service);
}

const remove = async (id) => {
    return await destroy(`${url}/${id}`);
}

export const serviceApi = {
    getAll,
    getById,
    update,
    create,
    remove
}