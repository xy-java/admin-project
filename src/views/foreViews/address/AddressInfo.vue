<template>
   <el-main>
      <el-header style="background-color: aliceblue;line-height: 55px;">
        <el-row>收货地址：<el-button class="addressButton el-icon-circle-plus-outline" @click="dialogVisible = true">新增</el-button></el-row>
        <el-dialog
          title="新增地址"
          :visible.sync="dialogVisible"
          width="40%">
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
                  <el-checkbox
                      v-model= addData.address_status
                      :true-label = "0"
                      :false-label = "1"
                      :disabled = "checkStatus"
                      @change="changetest">
                    设为默认
                  </el-checkbox>
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
          <el-table-column label="收货地址" prop="address_level1" align="center"></el-table-column>
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
                  @click="editAddress(scope.$index,scope.row)">编辑</el-button>
              <el-button
                  size="small"
                  icon="el-icon-delete" @click="deleteAddress">删除</el-button>
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
        address_status:1,
      },
      addressData: [],
      addressEdit: [],
      checkStatus: false,
      address_load:'',
      selectedOptions: [],
      options: regionData,
      dialogVisible: false
    }
  },
  created() {
    this.loadAddressData();
    this.check();
  },
  methods: {
    check(){
      this.axios.get(
        '/address/queryStatus',
        {
          params: {
            user_id:window.sessionStorage.getItem('user_id')
          }
        }
      ).then(res => {
        if(res.data > 0){
          this.checkStatus = true;
        }
      })
    },
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
          item.address_level1 = CodeToText[item.address_level1] + "/" + CodeToText[item.address_level2] + "/" + CodeToText[item.address_level3];
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
    handleAddressNode() {
      this.addData.address_level1 = this.selectedOptions[0];
      this.addData.address_level2 = this.selectedOptions[1];
      this.addData.address_level3 = this.selectedOptions[2];
    },
    editAddress(index,value) {

    },
    changetest(value) {
    },
    deleteAddress() {
       this.$confirm('此操作将永久删除该地址, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          
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
  position: relative;
  left: 80%;
}

</style>