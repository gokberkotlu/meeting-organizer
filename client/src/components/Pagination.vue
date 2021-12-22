<template>
  <div class="overflow-auto" id="pagination">
    <b-pagination
      v-model="paginatedCurrentPage"
      :total-rows="totalPageNumber"
      :per-page="perPage"
    ></b-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        perPage: 1,
        paginatedCurrentPage: this.currentPage
      }
    },
    props: ["totalPageNumber", "currentPage"],
    watch: {
        paginatedCurrentPage() {
            this.$emit('updatedCurrentPage', this.paginatedCurrentPage);
        }
    }
  }
</script>

<style>
  .page-item.active .page-link {
    background-color: #000;
    border-color: #000;
  }

  .page-link {
    color: #000;
  }

  @media screen and (max-width: 991.5px) {
    #pagination {
      display: flex;
      justify-content: center;
    }
  }
</style>