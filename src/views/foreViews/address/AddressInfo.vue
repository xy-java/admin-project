<template>
   <el-main>
      <el-header style="background-color: aliceblue;line-height: 55px;">
        <el-row>收货地址：<el-button class="addressButton el-icon-circle-plus-outline" @click="dialogVisible = true">新增</el-button></el-row>
        <el-dialog
          title="新增地址"
          :visible.sync="dialogVisible"
          width="40%" append-to-body>
            <el-form ref="addData" :model="addData" label-width="80px">
              <el-form-item label="收货人">
                 <template slot-scope="scope">
                    <el-input v-model="addData.derive_name" placeholder="请输入收货人"></el-input>
                 </template>
              </el-form-item>
              <el-form-item label="收货地址">
                 <template slot-scope="scope">
                  <el-cascader
                      placeholder="请选择"
                      @change="handleAddressNode"
                      v-model="selectedOptions"
                      :options="options"
                      filterable
                  ></el-cascader>
                </template>
              </el-form-item>
              <el-form-item label="详细地址">
                <template slot-scope="scope">
                  <el-input v-model="addData.address_info" placeholder="请输入详细地址"></el-input>
                </template>
              </el-form-item>
              <el-form-item >
                <template slot-scope="scope">
                  <el-radio
                      v-model= "addData.address_status" label="0">
                    设为默认
                  </el-radio>
                </template>
              </el-form-item>
            </el-form>
          <span slot="footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="mkSure('addData')">确 定</el-button>
          </span>
        </el-dialog>
      </el-header>


      <el-table :data="addressData" style="width: 100%">
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="address_id"  label="地址id"  v-if="false"></el-table-column>
          <el-table-column prop="derive_name" label="收货人"></el-table-column>
          <el-table-column label="收货地址" prop="address" align="center"></el-table-column>
          <el-table-column prop="address_info" label="详细地址" align="center"></el-table-column>
           <el-table-column
              prop="address_status"
              label="默认地址">
            <template slot-scope="scope">
              <el-tag  v-if="scope.row.address_status==0" type="success" size="mini" >默认</el-tag>
            </template>
          </el-table-column>

          <el-table-column
              label="操作"
              align="center">
            <template slot-scope="scope">
              <el-button
                  size="small"
                  icon="el-icon-edit"
                  @click="editAddress(scope.row)">编辑</el-button>

                  <el-dialog
          title="编辑地址"
          :visible.sync="editAddressVisible"
          width="40%" append-to-body>
            <el-form ref="editData" :model="editData" label-width="80px">
              <el-form-item label="收货人">
                 <template slot-scope="scope">
                    <el-input v-model="editData.derive_name" placeholder="请输入收货人"></el-input>
                 </template>
              </el-form-item>
              <el-form-item label="收货地址">
                  <el-cascader 
                      placeholder="请选择"
                      @change="handleAddress"
                      v-model="selectEditOptions"
                      :options="options1"
                      filterable
                  ></el-cascader>
              </el-form-item>
              <el-form-item label="详细地址">
                <template slot-scope="scope">
                  <el-input v-model="editData.address_info" placeholder="请输入详细地址"></el-input>
                </template>
              </el-form-item>
              <el-form-item >
                <template slot-scope="scope">
                  <el-radio
                      v-model="editData.address_status" label="0">
                    设为默认
                  </el-radio>
                </template>
              </el-form-item>
            </el-form>
          <span slot="footer">
            <el-button @click="editAddressVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateAddress('editData')">确 定</el-button>
          </span>
        </el-dialog>


              <el-button
                  size="small"
                  icon="el-icon-delete" @click="deleteAddress(scope.row)">删除</el-button>
            </template>
          </el-table-column>
      </el-table>

   </el-main>
</template>

<script>

import { regionData,CodeToText } from "element-china-area-data";


export default{
  name: 'AddressInfo',
  data() {
    return {
      addData:{
        user_id:window.sessionStorage.getItem('user_id'),
        address_status:'1',
      },
      editData:{},
      addressData: [],
      address_load:'',
      selectedOptions: [],
      selectEditOptions: [],
      options: regionData,
      options1: regionData,
      dialogVisible: false,
      editAddressVisible: false,
    }
  },
  created() {
    this.loadAddressData();
  },
  methods: {
    loadAddressData() {
      this.axios.get(
        '/address/queryAddress',
        {
          params:{
            user_id:window.sessionStorage.getItem('user_id')
          }
        }
      ).then(res => {
        this.addressData = res.data;
        this.addressData.forEach(item => {
          item.address = CodeToText[item.address_level1] + "/" + CodeToText[item.address_level2] + "/" + CodeToText[item.address_level3];
        });
      });
    },
    mkSure(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(this.addData);
          if (valid) {
            this.axios.get(
              '/address/insertAddress',
              {
                params:this.addData
              }
            ).then(res => {
                this.dialogVisible = false;
              if(res.data == '增加成功'){
                this.$message({
                    message: '新增成功',
                    type: 'success'
                });
              } else {
                this.$message({
                    message: '新增失败',
                    type: 'error'
                });
              }
              this.loadAddressData();
            });
          }
      })
    },
    updateAddress(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.get(
            '/address/update',
            {
              params:this.editData
            }
          ).then(res=>{
            if(res.data == '修改成功'){
                this.$message({
                    message: '修改成功',
                    type: 'success'
                });
              } else {
                this.$message({
                    message: '修改成功',
                    type: 'error'
                });
              }
              this.editAddressVisible = false;
              this.loadAddressData();
          })
        }
      
      })
    },
    handleAddressNode() {
      this.addData.address_level1 = this.selectedOptions[0];
      this.addData.address_level2 = this.selectedOptions[1];
      this.addData.address_level3 = this.selectedOptions[2];
    },
    handleAddress(){
      this.editData.address_level1 = this.selectEditOptions[0];
      this.editData.address_level2 = this.selectEditOptions[1];
      this.editData.address_level3 = this.selectEditOptions[2];
    
    },
    editAddress(value) {
      this.editAddressVisible = true;
      this.axios.get(
        '/address/selectById',
        {
          params:{
            address_id:value.address_id
          }
        }
      ).then(res=>{
        this.editData = res.data[0];
        this.editData.address_status = res.data[0].address_status == 0 ? '0' : '1';
        this.selectEditOptions = [this.editData.address_level1,this.editData.address_level2,this.editData.address_level3];
        console.log(res.data[0]);
        console.log(this.selectEditOptions);
      })
    },
    deleteAddress(value) {
       this.$confirm('此操作将永久删除该地址, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.axios.get(
              '/address/deleteById',
              {
                params:{
                  address_id:value.address_id
                }
              }
            ).then(res=>{
              if(res.data == '删除成功'){
                this.$message({
                      message: '删除成功',
                      type: 'success'
                  });
              } else {
                  this.$message({
                      message: '删除失败',
                      type: 'error'
                  });
              }
              this.loadAddressData();
            })
          }).catch(() => {
        })
    }
  }
}
</script>

<style>
.addressButton{
  position: relative;
  left: 80%;
}

</style>