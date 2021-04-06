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
          <tr v-for="(item, index) in payment" :key="index">
            <td>{{ item.product.images }}</td>
            <td>{{ item.product.title }}</td>
            <td>{{ item.product.price }}</td>
            <td>{{ item.product.intro }}</td>
            <td>
              <div v-for="(attr, index) in item.product.parameters" :key="index">
                <span>{{ attr.key }}</span
                ><span>{{ attr.value }}</span>
              </div>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import _ from 'lodash'
export default {
  layout: 'admin',
  middleware: ['auth'],
  head() {
    return {
      title: '后台管理首页'
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['payment'])
  },
  methods: {
    ...mapActions(['fetchPayment'])
    // ...mapMutations(['updatePorducts']),
  },
  created() {
    this.fetchPayment()
  }
}
</script>

<style lang="scss">
@import '~/assets/scss/var.scss';
@import '~/assets/scss/color.scss';
@import '~/assets/scss/mixin.scss';

.admin.content {
  flex: 1;
  height: calc(100vh - 56px);
  padding: 10px 16px 50px 16px;
  overflow: scroll;
}
.admin hr {
  margin: 0.6 * $gutter 0;
}
.admin .form {
  display: flex;
  flex-direction: column;
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
