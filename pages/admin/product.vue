<template>
  <div class="content admin">
    <div class="related-products">
      <table class="table">
        <thead>
          <tr>
            <th>图片</th>
            <th>标题</th>
            <th>价格</th>
            <th>简介</th>
            <th>参数</th>
            <th>修改</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in products" :key="index">
            <td>{{ item.images }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.intro }}</td>
            <td>
              <div v-for="(attr, index) in item.parameters" :key="index">
                <span>{{ attr.key }}</span
                ><span>{{ attr.value }}</span>
              </div>
            </td>
            <td>
              <button class="btn material-icon" @click="changeProduct(item)">edit</button>
              <button class="btn material-icon" @click="remove(item)">delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div :class="['edit-product', active ? 'active' : '']">
      <div class="edit-header">
        <div class="material-icon">edit</div>
        <div>
          <div class="material-icon" @click="toggleModal(false)">close</div>
        </div>
      </div>
      <div class="edit-body">
        <div class="form edit-form">
          <div class="input-group"><label>标题</label><input type="text" v-model="form.title" /></div>
          <div class="input-group"><label>价格</label><input type="text" v-model="form.price" /></div>
          <div class="input-group"><label>简介</label><input type="text" v-model="form.intro" /></div>
          <div class="input-group">
            <label>图片</label>
            <div class="upload-images">
              <div class="img">
                <img src="" alt="" />
                <div class="tools">
                  <div class="material-icon"></div>
                </div>
              </div>
              <div class="upload-btn">
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="ic_backup_black_24px" transform="translate(-1.000000, -6.000000)">
                    <polygon id="Shape" points="0 0 55 0 55 55 0 55" />
                    <path
                      id="outline"
                      d="M42.6907609,20.7503727 C41.2853571,13.6200155 35.0230435,8.26708075 27.5,8.26708075 C21.5270342,8.26708075 16.339441,11.6565839 13.7559783,16.6168323 C7.535,17.2781988 2.69875776,22.5484627 2.69875776,28.9347826 C2.69875776,35.7757919 8.25836957,41.3354037 15.0993789,41.3354037 L41.9673913,41.3354037 C47.671677,41.3354037 52.3012422,36.7058385 52.3012422,31.0015528 C52.3012422,25.5452795 48.0643634,21.1223913 42.6907609,20.7503727 Z"
                      stroke="#78909C"
                      stroke-width="3"
                    />
                    <path
                      id="Shape"
                      d="M42.6907609,20.7503727 C41.2853571,13.6200155 35.0230435,8.26708075 27.5,8.26708075 C21.5270342,8.26708075 16.339441,11.6565839 13.7559783,16.6168323 C7.535,17.2781988 2.69875776,22.5484627 2.69875776,28.9347826 C2.69875776,35.7757919 8.25836957,41.3354037 15.0993789,41.3354037 L41.9673913,41.3354037 C47.671677,41.3354037 52.3012422,36.7058385 52.3012422,31.0015528 C52.3012422,25.5452795 48.0643634,21.1223913 42.6907609,20.7503727 Z M31.6335404,26.8680124 L31.6335404,35.1350932 L23.3664596,35.1350932 L23.3664596,26.8680124 L17.1661491,26.8680124 L27.5,16.5341615 L37.8338509,26.8680124 L31.6335404,26.8680124 Z"
                      fill="#CFD8DC"
                      fill-rule="nonzero"
                    />
                  </g>
                </g>
                <br />
                <div class="text">上传图片</div>
                <input type="file" />
              </div>
            </div>
          </div>
          <div class="input-group">
            <label>参数</label>
            <div class="parameters">
              <div class="inputs" v-for="(item, index) in form.parameters" :key="index">
                <input type="text" v-model="item.key" />
                <input type="text" v-model="item.value" />
                <div class="remove" @click="removeParams(index)">
                  <div class="material-icon">remove</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="edit-footer">
        <div class="btn save" @click="save" v-if="modalType === '0'">创建宝贝</div>
        <div class="btn save" @click="save" v-if="modalType === '1'">保存修改</div>
        <div class="btn add-parameter" @click="addParams">
          <div class="material-icon">add 添加参数</div>
        </div>
      </div>
    </div>
    <div class="float-btn" @click="addProduct">
      <div class="material-icon">add</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import _ from 'lodash'
export default {
  layout: 'admin',
  head() {
    return {
      title: '后台管理首页'
    }
  },
  data() {
    return {
      active: false,
      modalType: '', // 0-新增/1-修改
      form: {
        parameters: [{ key: '', value: '' }]
      }
    }
  },
  computed: {
    ...mapState(['products'])
  },
  methods: {
    ...mapActions(['fetchProducts', 'saveProduct', 'putProduct', 'removeProduct']),
    // ...mapMutations(['updatePorducts']),
    save() {
      const { _id, title, price, intro, parameters } = this.form
      if (this.modalType === '0') {
        this.$store.dispatch('saveProduct', { title, price, intro, parameters })
      } else if (this.modalType === '1') {
        this.$store.dispatch('putProduct', { id: _id, title, price, intro, parameters })
      }
      this.toggleModal(false)
    },
    addProduct() {
      this.modalType = '0'
      this.toggleModal(true)
    },
    changeProduct(row) {
      this.modalType = '1'
      this.form = _.cloneDeep(row)
      this.toggleModal(true)
    },
    remove(row) {
      this.removeProduct({ id: row._id })
    },
    toggleModal(flag) {
      if (!flag) {
        this.form = { parameters: [{ key: '', value: '' }] }
      }
      this.active = flag
    },
    removeParams(index) {
      this.form.parameters.splice(index, 1)
    },
    addParams() {
      this.form.parameters.push({ key: '', value: '' })
    }
  },
  created() {
    this.fetchProducts()
  }
}
</script>

<style lang="scss">
@import '~/assets/scss/var';
@import '~/assets/scss/color';
@import '~/assets/scss/mixin';

.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.admin.content {
  flex: 1;
  height: calc(100vh - 56px);
  padding: 10px 16px 50px 16px;
  overflow: scroll;
}
.admin hr {
  margin: 0.6 * $gutter 0;
}
.admin .card {
  width: 440px !important;
  height: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid$grey-300;
  box-shadow: $shadow-1db;

  .card-header {
    width: 100%;
    border-bottom: 1px solid$grey-300;

    .card-inner {
      margin: 12px 16px;
      font-size: 20px;
      line-height: 28px;
    }
  }

  .card-body {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 3 * $gutter;

    .login-icon {
      margin-bottom: 2 * $gutter;
    }

    .form {
      width: calc(100% - 4 * #{$gutter});

      .login-btn {
        background-color: $teal-300;
        color: $white;
      }
    }
  }
}
.admin .form {
  display: flex;
  flex-direction: column;
}

.admin .form-control {
  width: calc(100% - 2 * #{$gutter});
  height: 36px;
  padding: 0 $gutter;
  line-height: 36px;
  font-size: $supplement;
  margin-bottom: 0.6 * $gutter;
}

.admin .houses {
  width: 100%;
  padding: 0 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  .house {
    width: 240px;
    margin-bottom: 16px;
    cursor: pointer;
    margin-left: 16px;
  }

  img {
    width: 100%;
  }
}
.admin .characters {
  width: 100%;
  padding: 0 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  .character {
    width: 140px;
    margin: 0 8px 16px 8px;
    cursor: pointer;
    position: relative;

    img {
      width: 100%;
    }
  }
}
.admin .btn {
  min-width: 88px;
  min-height: 36px;
  padding: 0 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  user-select: none;
  cursor: pointer;
  background: none;
  border: 0;
  border-radius: 2px;
  color: $grey-900;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:focus {
    outline: none;
  }

  &:hover {
    background-color: hsla(0, 0%, 60%, 0.2);
  }
}
.admin .btn-blue {
  background-color: $blue;
  color: $white;

  &:hover {
    background-color: $blue-600;
  }
}

.admin .edit-form {
  width: 60vw;

  .input-group {
    display: flex;
    align-items: center;
    border-bottom: 1px solid $grey-300;
    min-height: 48px;
    font-size: 14px;
    input {
      min-height: 32px;
      color: rgba(0, 0, 0, 0.54);
      border-color: rgba(0, 0, 0, 0.12);
      border-width: 1px;
      border-radius: 2px;
      padding: 0 5px;
    }
  }

  label {
    width: 150px;
    margin-right: 20px;
  }

  .swornMembers {
    flex: 1;
    padding: 16px 0;

    .swornMember {
      display: flex;
      margin-bottom: 20px;

      .swornMember-text {
        flex: 1;
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        align-items: space-between;
        justify-content: center;
      }

      img {
        width: 100px;
        height: 150px;
      }
    }
  }

  .profile {
    width: 150px;
    margin: 16px 0;
    img {
      width: 100%;
    }
  }

  .images {
    flex: 1;
    margin-left: 20px;
    max-height: 235px;
    overflow: scroll;
    display: flex;
    flex-wrap: wrap;

    .img {
      border: 1px solid$grey-300;
      margin: 2px;
    }

    img {
      width: 100px;
    }
  }
  .sections {
    flex: 1;
    display: flex;
    flex-wrap: wrap;

    .section {
      border: 2px dotted$grey-400;
      padding: 3px;
      margin: 8px 0;

      &:hover {
        .tools {
          display: inline;
        }
      }
    }
  }
  .delete-section {
    font-size: 14px;
    padding: 6px;
    background-color: $red;
    color: $white;
    border-radius: 50%;
    cursor: pointer;
    margin-left: 16px;
  }

  input {
    flex: 1;
  }

  .tools {
    display: inline;
    margin-left: 10px;
    width: 50px;
    display: none;

    .material-icon {
      cursor: pointer;
      font-size: 12px;
      font-weight: 900;
      color: $white;
      border-radius: 50%;
      padding: 3px;
    }

    .edit {
      background-color: $green;
      margin-right: 12px;
    }

    .delete {
      background-color: $grey-400;
    }
  }
}
.admin .save-edit {
  float: right;
  width: 150px;
  height: 50px;
  color: $white;
  font-size: 20px;
  background-color: $green;
}
.admin .edit-product {
  width: 480px;
  min-height: 200px;
  background-color: $white;
  box-shadow: $shadow-4db;
  position: fixed;
  bottom: 0;
  right: 100px;
  transform: translateY(100%);
  transform-origin: top center;
  transition: all 275ms $fastOutLinearIn;
  border-radius: 4px 4px 0 0;
  z-index: 9;
  &.active {
    transform: translateY(0);
    transition: all 275ms $linearOutSlowIn;
  }
  .edit-header {
    width: 100%;
    height: 38px;
    padding: 0 16px;
    border-radius: 4px 4px 0 0;
    display: flex;
    align-items: center;
    background-color: $grey-800;
    color: $white;

    .material-icon {
      font-size: $title2;
    }
  }

  .edit-body {
    width: 100%;
    max-height: calc(100vh - 200px);
    overflow: scroll;
    padding: 16px;

    .edit-form {
      width: 100%;

      textarea {
        min-height: 100px;
        flex: 1;
        margin: 16px 0;
      }

      label {
        width: 80px;
      }
    }
    .input-group {
      width: 100%;
    }

    .parameters {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      padding: 16px 0;
    }

    .inputs {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      flex: 1;

      input {
        width: 120px;
        margin-right: 10px;
        flex: 1;
      }

      .remove {
        width: 25px;
        height: 25px;
        margin-top: 3px;
        background-color: $red;
        color: $white;
        font-size: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        cursor: pointer;
      }
    }

    .upload-images {
      flex: 1;
      min-height: 150px;
      padding: 16px 0;

      .img {
        width: 154px;
        height: 104px;
        text-align: center;
        float: left;
        margin: 0 10px 10px 0;
        border: 1px solid$grey-200;
        position: relative;

        &:hover {
          .tools {
            display: block;
          }
        }
      }

      .tools {
        width: 100%;
        height: 30px;
        line-height: 30px;
        position: absolute;
        top: 0;
        left: -10px;
        z-index: 2;
        background-color: $grey-800;
        opacity: 0.7;

        .material-icon {
          font-size: 20px;
          color: $white;
        }
      }

      img {
        max-width: 100%;
        max-height: 100%;
      }

      .upload-btn {
        width: 150px;
        height: 100px;
        cursor: pointer;
        border: 2px dotted$blue-grey-200;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: relative;

        input {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
          opacity: 0;
        }

        .text {
          color: $blue-grey-400;
        }
      }
    }
  }
  .edit-footer {
    padding: 16px;
    display: flex;

    .save {
      background-color: $blue;
      color: $white;
      box-shadow: $shadow-1db;
    }

    .add-parameter {
      width: 80px;
      margin-left: 20px;
      float: left;
    }
  }
}
.admin .table {
  width: 100%;
  background-color: $white;
  border: 0;
  box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.06), 0 0 3px rgba(0, 0, 0, 0.18), 0 1px 3px rgba(0, 0, 0, 0.18);
  margin-top: 16px;
  margin-bottom: 16px;
  width: 100%;
  thead {
    &:first-child > tr:first-child td,
    th {
      border-top: 0;
    }
    td,
    th {
      color: $grey-400;
      font-size: 14px;
      vertical-align: bottom;
      text-align: left;
    }
  }
  tbody {
    &:first-child > tr:first-child td,
    th {
      border-top: 0;
    }
    tr:hover {
      background-color: $white;
    }
  }

  td,
  th {
    border-top: 1px solid $grey-300;
    font-size: 20px;
    line-height: 30px;
    padding: 6px 32px 6px 24px;
    vertical-align: top;
    &.nowrap {
      white-space: nowrap;
      width: 1%;
    }
  }
  td {
    font-size: 14px;
    max-width: 260px;
  }

  .img {
    width: 50px;
    img {
      width: 100%;
    }
  }
}

.admin .float-btn {
  width: 56px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $white;
  position: absolute;
  bottom: 30px;
  right: 26px;
  border-radius: 50%;
  box-shadow: $shadow-1db;
  background-color: $pink;
  cursor: pointer;

  .material-icon {
    font-size: 26px;
  }
}

.admin .spinner-content {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
