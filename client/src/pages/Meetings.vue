<template>
  <div class="meetings-home-container">
    <b-table striped hover :items="meetings" :fields="fields">
      <template #cell(actions)="row">
        <b-button
          @click="editMeeting(row.item)"
          size="sm"
          class="btn btn-info mr-1"
        >
          Edit
        </b-button>
        <b-button
          @click="deleteMeeting(row.item._id)"
          size="sm"
          class="btn btn-danger"
        >
          Delete
        </b-button>
      </template>
    </b-table>

    <Pagination
      v-if="totalPageNumber"
      :totalPageNumber="totalPageNumber"
      :currentPage="currentPage"
      @updatedCurrentPage="paginateMeetings($event)"
    />

    <div class="d-flex justify-content-end mt-3">
      <b-button @click="openAddMeetingModal" class="btn btn-success"
        >New Meeting</b-button
      >
    </div>

    <meeting-add-modal @updated="listMeetings" />
    <meeting-edit-modal
      v-if="meetingInfoEdit"
      :meetingInfoEdit="meetingInfoEdit"
      @updated="listMeetings"
    />
  </div>
</template>

<script>
import axios from "axios";
import { serverUrl } from "../utils/serverUrl";
import MeetingAddModal from "../components/MeetingAddModal.vue";
import MeetingEditModal from "../components/MeetingEditModal.vue";
import Pagination from "../components/Pagination.vue";

export default {
  mounted() {
    this.listMeetings();
  },
  data() {
    return {
      meetings: null,
      meetingInfoEdit: {},
      currentPage: 1,
      totalPageNumber: null,
      limit: 5,
      fields: [
        {
          key: "subject",
          sortable: true,
        },
        {
          key: "date",
          sortable: true,
        },
        {
          key: "start_time",
          sortable: true,
        },
        {
          key: "end_time",
          sortable: true,
        },
        {
          key: "participants",
          sortable: true,
        },
        {
          key: "actions",
          label: "Actions",
        },
      ],
    };
  },
  methods: {
    listMeetings() {
      axios({
        url: `${serverUrl}/list-meetings`,
        method: "get",
        params: {
          page: this.currentPage,
          limit: this.limit,
        },
      }).then((res) => {
        const resData = res.data;
        // pull the totalpage number and meetings in current page
        this.totalPageNumber = resData.totalPages;

        if (this.currentPage > 1 && this.currentPage > resData.totalPages) {
          this.currentPage -= 1;
          this.listMeetings();
        }

        this.$bvModal.hide("modal-add-meeting");
        this.$bvModal.hide("modal-edit-meeting");

        this.meetings = [...resData.meetings].map((meeting) => {
          meeting.participants = meeting.participants.join(", ");
          return meeting;
        });
      });
    },
    editMeeting(row) {
      this.meetingInfoEdit = {
        ...row,
      };

      if (
        this.meetingInfoEdit.participants &&
        this.meetingInfoEdit.participants.includes(", ")
      ) {
        this.meetingInfoEdit.participants =
          this.meetingInfoEdit.participants.split(", ");
      } else {
        this.meetingInfoEdit.participants = [this.meetingInfoEdit.participants];
      }

      // this.meetingInfoEdit.date = new Date(this.meetingInfoEdit.date);
      if (this.meetingInfoEdit) {
        this.$bvModal.show("modal-edit-meeting");
      }
      console.log(this.meetingInfoEdit);
    },
    deleteMeeting(id) {
      axios({
        method: "delete",
        url: `${serverUrl}/delete-meeting`,
        data: {
          id,
        },
      }).then((res) => {
        if (res.status === 200) {
          this.listMeetings();
          this.$bvToast.toast("Meeting information deleted", {
            title: "Success",
            autoHideDelay: 3000,
          });
        }
      });
    },
    openAddMeetingModal() {
      this.$bvModal.show("modal-add-meeting");
    },
    paginateMeetings(pageNumber) {
      this.currentPage = pageNumber;
      this.listMeetings();
    },
  },
  components: {
    MeetingAddModal,
    Pagination,
    MeetingEditModal,
  },
};
</script>

<style scoped>
.meetings-home-container {
  width: 80%;
  min-width: 420px;
  margin: 5rem auto 0 auto;
}
</style>
