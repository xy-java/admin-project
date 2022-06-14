<template>
   <el-main>
      <el-header style="background-color: aliceblue;line-height: 55px;">
        <el-row>收货地址：<el-button class="addressButton" type="text" @click="addAddress">新增</el-button></el-row>
        
      </el-header>
      <el-table :data="addressData" style="width: 100%">
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="address_id"  label="地址id"></el-table-column>
          <el-table-column prop="derive_name" label="收货人">
            <template slot-scope="scope">
              <el-input size="medium" v-model="scope.row.derive_name" v-if="addressEdit[scope.$index]"></el-input>
              <span v-else>{{scope.row.derive_name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="收货地址" align="center">
            <template slot-scope="scope">
              <el-cascader
                  placeholder="请选择"
                  @change="handleAddressNode"
                  v-model="address_level1"
                  :options="options"
                  filterable
                  :disabled="!addressEdit[scope.$index]"
              ></el-cascader>
            </template>
          </el-table-column>

          <el-table-column prop="address_info" label="详细地址" align="center">
            <template slot-scope="scope">
              <el-input size="medium" v-model="scope.row.address_info" v-if="addressEdit[scope.$index]"></el-input>
              <span v-else>{{scope.row.address_info}}</span>
            </template>
          </el-table-column>

           <el-table-column
              prop="address_status"
              label="默认地址">
            <template slot-scope="scope">
              <div v-if="addressEdit[scope.$index]">
                <el-checkbox
                    v-model= scope.row.address_status
                    :true-label = "0"
                    :false-label = "1"
                    @change="changetest">
                  设为默认
                </el-checkbox>
              </div>
              <div v-else>
                 <el-tag  v-if="scope.row.address_status==0" type="success" size="mini" >默认</el-tag>
              </div>
            </template>
          </el-table-column>

          <el-table-column
              label="操作"
              align="center">
            <template slot-scope="scope">
              <el-button
                  size="small"
                  icon="el-icon-edit"
                  v-if="!addressEdit[scope.$index]"
                  @click="editAddress(scope.$index,scope.row)">编辑</el-button>
              <el-button
                  size="small"
                  icon="el-icon-check"
                  v-else
                  @click="saveAddress(scope.$index, scope.row)">保存</el-button>
              <el-button
                  size="small"
                  icon="el-icon-delete" @click="deleteAddress(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
      </el-table>

   </el-main>
</template>

<script>
export default{
  name: 'AddressInfo',
  data() {
    return {
      addressData: [
        {
          address_id: 1,
          derive_name: '张三',
          address_info: '广东省广州市天河区天河路',
          address_status: 0,
        },
        {
          address_id: 2,
          derive_name: '李四',
          address_info: '广东省广州市天河区天河路',
          address_status: 1,
        },
        {
          address_id: 3,
          derive_name: '王五',
          address_info: '广东省广州市天河区天河路',
          address_status: 1,
        },
      ],
      addressEdit: [],
      address_level1: [],
      options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }]
    }
  },
  methods: {
    addAddress() {
      this.addressData.push({})
      this.addressEdit[this.addressData.length-1] = true
    },
    handleAddressNode(value) {
      console.log(value)
    },
    saveAddress(index,value){
      console.log(value);
      console.log(this.address_level1);
      // this.axios.get(
      //   '/address/insertAddress',
      //   {
      //     params: {
      //       derive_name: value.derive_name,
      //       address_level1: value.address_level1,
      //       address_level2: value.address_level2,
      //       address_level3: value.address_level3,
      //       address_info: value.address_info,
      //       address_status: value.address_status,
      //       user_id:window.sessionStorage.getItem('user_id')
      //     }
      //   }
      // ).then((res) => {
      //     console.log(res);
      //     this.addressEdit[index] = !this.addressEdit[index]
      //   })
    },
    editAddress(index,value) {
      console.log(index);
      console.log(value);
      this.addressEdit[index] = !this.addressEdit[index];
    },
    changetest(value) {
      console.log(typeof (value))
      console.log(value)
    },
    deleteAddress(index,value) {
      console.log(index);
      console.log(value);
       this.$confirm('此操作将永久删除该地址, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.addressData.splice(index,1);
            //删除地址
          }
        ).catch(() => {
        })
    }
  }
}
</script>

<style>
.addressButton{
  margin-right: 200px;
}

</style>