<template>
  <div>
    <!-- :inline="true" 表单一行显示 -->
    <el-form ref="searchForm" :inline="true" :model="searchMap" style="margin-top: 20px">
      <!-- 重置会看 el-form-item 组件元素的 prop 上是否指定了字段名，指定了才会重置生效 -->
      <el-form-item prop="username">
        <el-input v-model="searchMap.username" placeholder="帐号" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="searchMap.name" placeholder="姓名" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchData">查询</el-button>
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <el-button @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="list" height="380" border style="width: 100%;font-size:10px">
      <!-- type="index"获取索引值，从1开始 ，label显示标题，prop 数据字段名，width列宽 -->
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="username" label="帐号"></el-table-column>
      <el-table-column prop="name" label="姓名" width="90"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="salary" label="薪酬"></el-table-column>
      <el-table-column prop="entryDate" label="入职时间"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <el-dialog title="员工编辑" :visible.sync="dialogFormVisible" width="500px">
      <el-form
        :rules="rules"
        ref="pojoForm"
        label-width="100px"
        label-position="right"
        style="width: 400px;"
        :model="pojo"
      >
        <el-form-item label="帐号" prop="username">
          <el-input v-model="pojo.username"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="pojo.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="pojo.age"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="pojo.mobile"></el-input>
        </el-form-item>
        <el-form-item label="薪酬" prop="salary">
          <el-input v-model="pojo.salary"></el-input>
        </el-form-item>
        <el-form-item label="入职时间" prop="entryDate">
          <el-date-picker
            style="width: 200px"
            value-format="yyyy-MM-dd"
            v-model="pojo.entryDate"
            placeholder="选择入职时间"
            type="date"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="pojo.id === null ? addData('pojoForm'): updateData('pojoForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import staffApi from "@/api/staff";
export default {
  data() {
    return {
      list: [],
      pageSize: 10, // 每页显示条数10条
      currentPage: 1, // 当前页码
      total: 0, // 总记录数
      searchMap: {
        userName: "",
        name: ""
      },
      dialogFormVisible: false,
      pojo: {
        id: null,
        username: "",
        name: "",
        age: null,
        mobile: "",
        salary: "",
        entryDate: null
      },
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      // supplierApi.getList().then(response=>{
      staffApi
        .search(this.currentPage, this.pageSize, this.searchMap)
        .then(response => {
          const data = response.data.data;
          this.list = data.rows;
          this.total = data.total;
          // console.log(this.list);
        });
    },
    // 当每页显示条数改变后,进行调用该方法,val是当前改变后的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData();
    },
    // 切换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    },

    // 新增
    handleAdd() {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["pojoForm"].resetFields();
      });
    },
    // 提交新增表单
    addData(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 提交表单
          staffApi.add(this.pojo).then(response => {
            const resp = response.data;
            if (resp.flag) {
              this.$message({
                message: "新增成功,初始密码为123456",
                type: "warning"
              });
              this.fetchData();
              this.dialogFormVisible = false;
            } else {
              this.$message({
                message: resp.message,
                type: "warning"
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    // 编辑
    handleEdit(id) {
      // console.log('编辑',id)
      this.handleAdd();
      staffApi.getById(id).then(response => {
        const resp = response.data;
        if (resp.flag) {
          this.pojo = resp.data;
        } else {
          // 提示获取数据失败
          this.$message({
            message: resp.message,
            type: "warning"
          });
        }
      });
    },
    // 更新表单数据
    updateData(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 页面校验通过,才可发送请求进行更新
          staffApi.update(this.pojo).then(response => {
            const resp = response.data;
            if (resp.flag) {
              // 更新成功,刷新数据,关闭窗口
              this.fetchData();
              this.dialogFormVisible = false;
            } else {
              //提示更新失败
              this.$message({
                message: resp.message,
                type: "warning"
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 删除一条员工信息
    handleDelete(id) {
      // console.log('删除',id)
      this.$confirm("确认删除这条记录吗?", "提示", {
        confirmButtonText: "确认",
        cancleButtonText: "取消"
      })
        .then(() => {
          staffApi.deleteById(id).then(response => {
            const resp = response.data;
            // 提示更新成功
            this.$message({
              message: resp.message,
              type: resp.flag ? "success" : "error"
            });
            if (resp.flag) {
              // 删除成功,刷新数据
              this.fetchData();
            }
          });
        })
        .catch(() => {
          // 取消删除
        });
    }
  }
};
</script>