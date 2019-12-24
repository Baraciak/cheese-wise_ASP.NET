import {get, put, post, destroy} from './api';

// const url = 'https://localhost:44356/api/categories';
const url = 'https://cheesewise.azurewebsites.net/api/categories';

const getAll = async() => {
    return await get(`${url}`);
}

const getById = async(id) => {
    return await get(`${url}/${id}`);
}

const update = async (company) => {
    return await put(`${url}/${company.id}`, company);
}

const create = async (company) => {
    return await post(`${url}`, company);
}

const remove = async (company) => {
    return await destroy(`${url}`, company);
}

export const categoryApi = {
    getAll,
    getById,
    update,
    create,
    remove
}