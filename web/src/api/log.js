// 权限问题后期增加
import { get, post } from '/@/utils/http/axios';
// import axios from 'axios';
const URL = {
    listOpLogListApi: 'api/opLog/list',
    createOpLogApi: '/api/opLog/create',
    deleteOpLogApi: '/api/opLog/delete',
    updateOpLogApi: '/api/opLog/update',
    clearOpLogApi: '/api/opLog/clearLoginLog',

    listLoginLogApi: '/api/opLog/loginLogList',
    clearLoginLogApi: '/api/log/clearLoginLog',
};

const listOpLogListApi = async (params) => get({ url: URL.listOpLogListApi, params: params, data: {}, headers: {} });
const createOpLogApi = async (params) => post({ url: URL.createOpLogApi, params: params, data: {}, headers: {} });
const deleteOpLogApi = async (data) =>
    post({ url: URL.deleteOpLogApi, params: {}, data: data, headers: { 'Content-Type': 'multipart/form-data;charset=utf-8' } });
const updateOpLogApi = async (data) => post({ url: URL.updateOpLogApi, data: data, headers: { 'Content-Type': 'multipart/form-data;charset=utf-8' } });
const clearOpLogApi = async (params) => post({ url: URL.clearOpLogApi, params: params, headers: {} });


const listLoginLogApi = async (params) => get({ url: URL.listLoginLogApi, params: params, headers: {} });

const clearLoginLogApi = async (params) => post({ url: URL.clearLoginLogApi, params: params, headers: {} });

export { listOpLogListApi, createOpLogApi, deleteOpLogApi, updateOpLogApi, clearOpLogApi, listLoginLogApi, clearLoginLogApi};
