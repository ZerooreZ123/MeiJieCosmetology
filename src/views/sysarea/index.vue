<template>
  <div>
    <div class="flex-container">
      <div>
        <el-tree v-if="items" :data="items" node-key="id" default-expand-all :expand-on-click-node="false">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span class="tree-opt">
              <el-button type="text" size="mini" @click="append(data, true)">
                增加
              </el-button>
              <el-button type="text" size="mini" @click="append(data, false)">
                编辑
              </el-button>
              <el-button type="text" size="mini" @click="remove(node, data)">
                删除
              </el-button>
            </span>
          </span>
        </el-tree>
      </div>
    </div>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update :data="nodeTempData" v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
import API from "@/api";
import AddOrUpdate from "./add-or-update";
export default {
  data() {
    return {
      dataForm: {
        key: ""
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      items: [],
      products: [],
      nodeTempData: {}
    };
  },
  components: {
    AddOrUpdate
  },
  mounted() {
    console.log(this.items);
    this.getDataList();
  },
  methods: {
    hasChildren(node) {
      if (node.areaList === undefined || node.areaList.length === 0) {
        return false;
      } else {
        return true;
      }
    },
    transform(treeList) {
      treeList.forEach(node => {
        node.label = node.name;
        node.children = node.areaList;
        if (this.hasChildren(node)) {
          this.transform(node.areaList);
        }
      });
      return treeList;
    },
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      var params = {
        page: this.pageIndex,
        limit: this.pageSize
      };
      API.sysarea.list(params).then(({ data }) => {
        if (data && data.code === 0) {
          this.items = this.transform(data.list);
        } else {
          this.dataList = [];
        }
        this.dataListLoading = false;
      });
    },
    append(data, flag) {
      this.addOrUpdateVisible = true;
      if (flag === true) {
        this.nodeTempData.parentId = data.id;
        this.nodeTempData.name = "";
        delete this.nodeTempData.id;
      }
      this.$nextTick(() => {
        this.nodeTempData = data;
        this.$refs.addOrUpdate.init();
      });
    },
    remove(node, data) {
      this.$confirm(`确定删除?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        API.sysarea.del([data.id]).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                // this.getDataList();
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
              }
            });
          } else {
            this.$message.error(data.msg);
          }
        });
      });
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val;
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id);
      });
    },
    // 删除
    deleteHandle(id) {
      var ids = id
        ? [id]
        : this.dataListSelections.map(item => {
            return item.id;
          });
      this.$confirm(`确定对[id=${ids.join(",")}]进行[${id ? "删除" : "批量删除"}]操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        API.sysarea.del(ids).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.getDataList();
              }
            });
          } else {
            this.$message.error(data.msg);
          }
        });
      });
    }
  }
};
</script>
