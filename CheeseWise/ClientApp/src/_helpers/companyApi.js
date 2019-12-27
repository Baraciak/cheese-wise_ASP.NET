import {get, put, post, destroy} from './api';

const url = 'https://cheesewise.azurewebsites.net/api/companies';

const getAll = async() => {
    return await get(`${url}`);
}

const getByUserId = async(id) => {
    return await get(`${url}/user/${id}`);
}

const getById = async(id) => {
    return await get(`${url}/${id}`);
}

const getByCategoryId = async(id) => {
    return await get(`${url}/category/${id}`);
}

const update = async (company) => {
    return await put(`${url}/${company.id}`, company);
}

const create = async (company) => {
    return await post(`${url}`, company);
}

const remove = async (id) => {
    return await destroy(`${url}/${id}`);
}

export const companyApi = {
    getAll,
    getById,
    getByUserId,
    getByCategoryId,
    update,
    create,
    remove
}