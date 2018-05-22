<template>
  <div>
    <div class="flex-container">
      <div>
        <h1>1. 设置项目类别</h1>
        <el-tree v-if="items.length > 0" :data="items" node-key="id" default-expand-all :expand-on-click-node="false">
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
        <div v-else>
          <el-button @click="append({categoryType: 3, id: 0, level: 1, catsort: 0}, true)">增加</el-button>
        </div>
      </div>
      <div>
        <h1>2. 设置产品类型</h1>
        <el-tree v-if="products.length > 0" :data="products" node-key="id" default-expand-all :expand-on-click-node="false">
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
        <div v-else>
          <el-button @click="append({categoryType: 3, id: 0, level: 1, catsort: 0}, true)">增加</el-button>
        </div>
      </div>
    </div>
    <div class="flex-container">
      <div>
        <h1>3. 设置套餐</h1>
        <el-tree v-if="packageList.length > 0" :data="packageList" node-key="id" default-expand-all :expand-on-click-node="false">
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
        <div v-else>
          <el-button @click="append({categoryType: 3, id: 0, level: 1, catsort: 0}, true)">增加</el-button>
        </div>
      </div>
      <div>
        <h1>4. 设置卡</h1>
        <el-tree v-if="cardList.length > 0" :data="cardList" node-key="id" default-expand-all :expand-on-click-node="false">
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
        <div v-else>
          <el-button @click="append({categoryType: 4, id: 0, level: 1, catsort: 0}, true)">增加</el-button>
        </div>
      </div>
      <div>
        <h1>5. 设置券</h1>
        <el-tree v-if="couponList.length > 0" :data="couponList" node-key="id" default-expand-all :expand-on-click-node="false">
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
        <div v-else>
          <el-button @click="append({categoryType: 5, id: 0, level: 1, catsort: 0}, true)">增加</el-button>
        </div>
      </div>
    </div>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update :data="nodeTempData" v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
import "@/assets/scss/el-tree.scss";
import API from "@/api";
import AddOrUpdate from "@/views/servicecategory/add-or-update";
import transform from "@/utils/tree";
export default {
  components: { AddOrUpdate },
  data() {
    return {
      items: [],
      products: [],
      packageList: [],
      cardList: [],
      couponList: [],
      addOrUpdateVisible: false,
      nodeTempData: {}
    };
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    getDataList() {
      API.common.getCategoryList().then(({ data }) => {
        this.items = transform(data.list["items"]);
        this.products = transform(data.list["products"]);
        this.packageList = transform(data.list["packages"]);
      });
    },
    append(data, flag) {
      this.addOrUpdateVisible = true;
      this.nodeTempData = data;
      if (flag === true) {
        this.nodeTempData.parentId = data.id;
        this.nodeTempData.name = "";
        delete this.nodeTempData.id;
      }
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init();
      });
      // const newChild = { id: null, label: "testtest", children: [] };
      // if (!data.children) {
      //   this.$set(data, "children", []);
      // }
      // data.children.push(newChild);
    },

    remove(node, data) {
      this.$confirm(`确定删除?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        API.servicecategory.del([data.id]).then(({ data }) => {
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
    }
  }
};
</script>

<style lang="scss" scoped>
.flex-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  & > div {
    flex-grow: 1;
    padding: 0 20px;
  }
  h1 {
    font-size: 20px;
  }
}
</style>

