// 权限问题后期增加
import { get, post } from '/@/utils/http/axios';
// import axios from 'axios';
const URL = {
    list: '/api/errorLog/list',
    create: '/api/errorLog/create',
    update: '/api/errorLog/update',
    delete: '/api/errorLog/delete',
    clear: '/api/errorLog/clearErrorLog',
};

const listErrorLogListApi = async (params) => get({ url: URL.list, params: params, data: {}, headers: {} });
const listUserThingApi = async (params) => get({ url: URL.listUserThing, params: params, data: {}, headers: {} });
const createApi = async (data) =>
    post({ url: URL.create, params: {}, data: data, headers: { 'Content-Type': 'multipart/form-data;charset=utf-8' } });
const updateApi = async (data) => post({ url: URL.update, data: data, headers: { 'Content-Type': 'multipart/form-data;charset=utf-8' } });
const deleteApi = async (params) => post({ url: URL.delete, params: params, headers: {} });
const clearErrorLogListApi = async (params) => post({ url: URL.clear, params: params, headers: {} });

export { listErrorLogListApi, createApi, updateApi, deleteApi, listUserThingApi, clearErrorLogListApi };
