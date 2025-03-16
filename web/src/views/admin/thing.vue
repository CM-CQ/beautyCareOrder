<template>
  <div>
    <!--页面区域-->
    <div class="page-view">
      <div class="table-operations">
        <a-space>
          <a-button type="primary" @click="handleAdd">新增</a-button>
          <a-button @click="handleBatchDelete">批量删除</a-button>
          <a-input-search addon-before="名称" enter-button @search="onSearch" @change="onSearchChange" />
        </a-space>
      </div>
      <a-table
        size="middle"
        rowKey="id"
        :loading="data.loading"
        :columns="columns"
        :data-source="data.dataList"
        :scroll="{ x: 'max-content' }"
        :row-selection="rowSelection"
        :pagination="{
          size: 'default',
          current: data.page,
          pageSize: data.pageSize,
          onChange: (current) => (data.page = current),
          showSizeChanger: false,
          showTotal: (total) => `共${total}条数据`,
        }"
      >
        <template #bodyCell="{ text, record, index, column }">
          <template v-if="column.key === 'status'">
            <span>
              <a-tag
                :color="record.status === '0' ? 'green' : 'red'"
              >
                {{ record.status === '0' ? "上架":"下架" }}
              </a-tag>
            </span>
          </template>
          <template v-else-if="column.key === 'operation'">
            <span>
              <a @click="handleEdit(record)">编辑</a>
              <a-divider type="vertical" />
              <a-popconfirm title="确定删除?" ok-text="是" cancel-text="否" @confirm="confirmDelete(record)">
                <a href="#">删除</a>
              </a-popconfirm>
            </span>
          </template>
        </template>
      </a-table>
    </div>

    <!--弹窗区域-->
    <div>
      <a-modal
        :visible="modal.visile"
        :forceRender="true"
        :title="modal.title"
        width="880px"
        ok-text="确认"
        cancel-text="取消"
        @cancel="handleCancel"
        @ok="handleOk"
      >
        <div>
          <a-form ref="myform" :label-col="{ style: { width: '80px' } }" :model="modal.form" :rules="modal.rules">
            <a-row :gutter="24">
              <a-col span="24">
                <a-form-item label="服务名称" name="title">
                  <a-input placeholder="请输入" v-model:value="modal.form.title" />
                </a-form-item>
              </a-col>
              <a-col span="24">
                <a-form-item label="服务分类" name="classificationId">
                  <a-select
                    placeholder="请选择"
                    allowClear
                    :options="modal.cData"
                    :field-names="{ label: 'title', value: 'id' }"
                    v-model:value="modal.form.classificationId"
                  />
                </a-form-item>
              </a-col>
              <a-col span="24">
                <a-form-item label="封面图">
<!--                  <a-upload-->
<!--                    v-model:file-list="fileList"-->
<!--                    name="picture"-->
<!--                    list-type="picture-card"-->
<!--                    class="picture-uploader"-->
<!--                    :show-upload-list="false"-->
<!--                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"-->
<!--                    :before-upload="beforeUpload"-->
<!--                    @change="handleChange"-->
<!--                  >-->
<!--                    <img v-if="modal.form.coverUrl" :src="modal.form.coverUrl" alt="avatar" />-->
<!--                    <div v-else>-->
<!--                      <loading-outlined v-if="loading"></loading-outlined>-->
<!--                      <plus-outlined v-else></plus-outlined>-->
<!--                      <div class="ant-upload-text">Upload</div>-->
<!--                    </div>-->
<!--                  </a-upload>-->

                  <a-upload-dragger
                    name="file"
                    accept="image/*"
                    :multiple="true"
                    :before-upload="beforeUpload"
                    v-model:file-list="fileList"
                  >
                    <p class="ant-upload-drag-icon">
                      <template v-if="modal.form.coverUrl">
                        <img :src="modal.form.coverUrl" style="width: 60px; height: 60px; object-fit: cover" />
                      </template>
                      <template v-else>
                        <file-image-outlined />
                      </template>
                    </p>
                    <p class="ant-upload-text"> 请选择要上传的图片 </p>
                  </a-upload-dragger>
                </a-form-item>
              </a-col>

              <a-col span="24">
                <a-form-item label="简介">
                  <a-textarea placeholder="请输入" v-model:value="modal.form.description" />
                </a-form-item>
              </a-col>
              <a-col span="12">
                <a-form-item label="价格" name="price">
                  <a-input-number placeholder="请输入" :min="0" v-model:value="modal.form.price" style="width: 100%" />
                </a-form-item>
              </a-col>
              <a-col span="12">
                <a-form-item label="医师" name="doctorId">
                  <a-select
                    placeholder="请选择"
                    allowClear
                    :options="modal.dData"
                    :field-names="{ label: 'title', value: 'id' }"
                    v-model:value="modal.form.doctorId"
                  />
                </a-form-item>
              </a-col>
              <a-col span="12">
                <a-form-item label="有效期">
                  <a-input placeholder="请输入" v-model:value="modal.form.youxiaoqi" style="width: 100%" />
                </a-form-item>
              </a-col>
              <a-col span="12">
                <a-form-item label="适用人群">
                  <a-input placeholder="请输入" v-model:value="modal.form.shiyong" style="width: 100%" />
                </a-form-item>
              </a-col>
              <a-col span="12">
                <a-form-item label="温馨提示">
                  <a-input placeholder="请输入" v-model:value="modal.form.tishi" style="width: 100%" />
                </a-form-item>
              </a-col>
              <a-col span="12">
                <a-form-item label="状态" name="status">
                  <a-select placeholder="请选择" allowClear v-model:value="modal.form.status">
                    <a-select-option key="0" value="0">上架</a-select-option>
                    <a-select-option key="1" value="1">下架</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script setup>
import {message} from 'ant-design-vue';
import {createApi, deleteApi, listApi, updateApi} from '/@/api/thing';
import {listApi as listClassificationApi} from '/@/api/classification';
import {listApi as listDoctorApi} from '/@/api/doctor';
import {BASE_URL} from '/@/store/constants';
import {FileImageOutlined} from '@ant-design/icons-vue';
import {compressImage} from '/@/utils/imageDeal';
// 引入封装的图片压缩工具




  const columns = reactive([
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: 60,
    },
    {
      title: '服务名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '对应医师',
      dataIndex: 'doctorTitle',
      key: 'doctorTitle',
    },
    {
      title: '有效期',
      dataIndex: 'youxiaoqi',
      key: 'youxiaoqi',
    },
    {
      title: '适用人群',
      dataIndex: 'shiyong',
      key: 'shiyong',
    },
    {
      title: '温馨提示',
      dataIndex: 'tishi',
      key: 'tishi',
    },
    {
      title: '简介',
      dataIndex: 'description',
      key: 'description',
      customRender: ({ text, record, index, column }) => (text ? text.substring(0, 10) + '...' : '--'),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      // customRender: ({ text, record, index, column }) => (text === '0' ? '上架' : '下架'),
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'operation',
      align: 'center',
      fixed: 'right',
      width: 140,
    },
  ]);


  const loading = false;
  const imageUrl = '';
  const beforeUpload = async (file) => {
    // 检查文件大小，例如限制为5MB
    const maxSize = 1 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      message.error('文件大小超过限制（1MB）');
      return false;
    }

    // 改文件名
    const fileName = new Date().getTime().toString() + '.' + file.type.substring(6);
    const copyFile = new File([file], fileName);
    console.log(copyFile);
    modal.form.imageFile = copyFile;
    // 将压缩后的文件赋值给表单数据
    // modal.form.imageFile = await compressImage(file);
    console.log("赋值的表单文件数据： "+ this.form.imageFile);
    return false;
  };
// const handleChange = (info: UploadChangeParam) => {
//   if (info.file.status === 'uploading') {
//     loading.value = true;
//     return;
//   }
//   if (info.file.status === 'done') {
//     // Get this url from response in real world.
//     getBase64(info.file.originFileObj, (base64Url: string) => {
//       imageUrl.value = base64Url;
//       loading.value = false;
//     });
//   }
//   if (info.file.status === 'error') {
//     loading.value = false;
//     message.error('upload error');
//   }
// };


  // 文件列表
  const fileList = ref([]);

  // 页面数据
  const data = reactive({
    dataList: [],
    loading: false,
    keyword: '',
    selectedRowKeys: [],
    pageSize: 10,
    page: 1,
  });

  // 弹窗数据源
  const modal = reactive({
    visile: false,
    editFlag: false,
    title: '',
    cData: [],
    form: {
      id: undefined,
      title: undefined,
      classificationId: undefined,
      doctorId: undefined,
      tag: [],
      price: undefined,
      youxiaoqi: undefined,
      shiyong: undefined,
      tishi: undefined,
      status: undefined,
      cover: undefined,
      coverUrl: undefined,
      imageFile: undefined,
    },
    rules: {
      title: [{ required: true, message: '请输入名称', trigger: 'change' }],
      classificationId: [{ required: true, message: '请选择分类', trigger: 'change' }],
      price: [{ required: true, message: '请输入定价', trigger: 'change' }],
      status: [{ required: true, message: '请选择状态', trigger: 'change' }],
    },
  });

  const myform = ref();

  onMounted(() => {
    getDataList();
    getCDataList();
    getDDataList();
  });

  const getDataList = () => {
    data.loading = true;
    listApi({
      keyword: data.keyword,
    })
      .then((res) => {
        data.loading = false;
        console.log(res);
        res.data.forEach((item, index) => {
          item.index = index + 1;
        });
        data.dataList = res.data;
      })
      .catch((err) => {
        data.loading = false;
        console.log(err);
      });
  };

  const getCDataList = () => {
    listClassificationApi({}).then((res) => {
      modal.cData = res.data;
    });
  };

  // 获取医师列表
  const getDDataList = () => {
    listDoctorApi({}).then((res) => {
      modal.dData = res.data;
    });
  };

  const onSearchChange = (e) => {
    data.keyword = e.target.value;
    console.log(data.keyword);
  };

  const onSearch = () => {
    getDataList();
  };

  const rowSelection = ref({
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      data.selectedRowKeys = selectedRowKeys;
    },
  });

  const handleAdd = () => {
    resetModal();
    modal.visile = true;
    modal.editFlag = false;
    modal.title = '新增';
    // 重置
    for (const key in modal.form) {
      modal.form[key] = undefined;
    }
    modal.form.cover = undefined;
  };
  const handleEdit = (record) => {
    resetModal();
    modal.visile = true;
    modal.editFlag = true;
    modal.title = '编辑';
    // 重置
    for (const key in modal.form) {
      modal.form[key] = undefined;
    }
    for (const key in record) {
      if (record[key]) {
        modal.form[key] = record[key];
      }
    }
    if (modal.form.cover) {
      modal.form.coverUrl = BASE_URL + '/api/staticfiles/image/' + modal.form.cover;
      modal.form.cover = undefined;
    }
  };

  const confirmDelete = (record) => {
    console.log('delete', record);
    deleteApi({ ids: record.id })
      .then((res) => {
        getDataList();
      })
      .catch((err) => {
        message.error(err.msg || '操作失败');
      });
  };

  const handleBatchDelete = () => {
    console.log(data.selectedRowKeys);
    if (data.selectedRowKeys.length <= 0) {
      console.log('hello');
      message.warn('请勾选删除项');
      return;
    }
    deleteApi({ ids: data.selectedRowKeys.join(',') })
      .then((res) => {
        message.success('删除成功');
        data.selectedRowKeys = [];
        getDataList();
      })
      .catch((err) => {
        message.error(err.msg || '操作失败');
      });
  };


  //确认修改按钮  提交修改
  const handleOk = () => {
    console.log("确认提交修改数据信息  ");
    myform.value
      ?.validate()
      .then(() => {
        console.log(modal.form);
        const formData = new FormData();
        if (modal.editFlag) {
          formData.append('id', modal.form.id);
        }
        formData.append('title', modal.form.title);
        if (modal.form.classificationId) {
          formData.append('classificationId', modal.form.classificationId);
        }
        if (modal.form.doctorId) {
          formData.append('doctorId', modal.form.doctorId);
        }
        if (modal.form.imageFile) {
          formData.append('imageFile', modal.form.imageFile);
          console.log("要上传的压缩图片文件内容   :" + modal.form.imageFile);
        }
        formData.append('description', modal.form.description || '');
        formData.append('price', modal.form.price || '');
        formData.append('youxiaoqi', modal.form.youxiaoqi || '');
        formData.append('shiyong', modal.form.shiyong || '');
        formData.append('tishi', modal.form.tishi || '');

        if (modal.form.status) {
          formData.append('status', modal.form.status);
        }
        if (modal.editFlag) {
          updateApi(
            formData,
          )
            .then((res) => {
              hideModal();
              getDataList();
              message.info('更新成功');
            })
            .catch((err) => {
              console.log(err);
              message.error(err.msg || '操作失败');
            });
        } else {
          createApi(formData)
            .then((res) => {
              hideModal();
              getDataList();
              message.info('创建成功');
            })
            .catch((err) => {
              console.log(err);
              message.error(err.msg || '操作失败');
            });
        }
      })
      .catch((err) => {
        console.log('不能为空');
      });
  };

  const handleCancel = () => {
    hideModal();
  };

  // 恢复表单初始状态
  const resetModal = () => {
    myform.value?.resetFields();
    fileList.value = [];
  };

  // 关闭弹窗
  const hideModal = () => {
    modal.visile = false;
  };
</script>

<style scoped lang="less">
  .page-view {
    min-height: 100%;
    background: #fff;
    padding: 24px;
    display: flex;
    flex-direction: column;
  }

  .table-operations {
    margin-bottom: 16px;
    text-align: right;
  }

  .table-operations > button {
    margin-right: 8px;
  }
   .avatar-uploader > .ant-upload {
     width: 128px;
     height: 128px;
   }
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }

</style>
